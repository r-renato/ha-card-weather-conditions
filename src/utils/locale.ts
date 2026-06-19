import { HomeAssistant, NumberFormat, TimeFormat } from 'custom-card-helpers';
import { iLocaleOverride } from './config-schema';

export const cwcLocale: Record<string, number> = {
  en: 0,
  it: 1,
  nl: 2,
  es: 3,
  de: 4,
  fr: 5,
  'sr-latn': 6,
  pt: 7,
  da: 8,
  'no-no': 9,
  cs: 10,
  ru: 11,
  is: 12,
};

export interface ResolvedLocale {
  language: string;
  locale: string;
  timezone: string;
  formatterLocale: string;
  timeFormat: '12h' | '24h';
}

const localeMap: Record<string, string> = {
  en: 'en-US',
  it: 'it-IT',
  nl: 'nl-NL',
  es: 'es-ES',
  de: 'de-DE',
  fr: 'fr-FR',
  'sr-latn': 'sr-Latn',
  pt: 'pt-PT',
  da: 'da-DK',
  'no-no': 'nb-NO',
  cs: 'cs-CZ',
  ru: 'ru-RU',
  is: 'is-IS',
};

// Locale "proxy" usati solo come fallback quando il locale risolto dalla lingua
// non produce nativamente lo stile numerico richiesto da hass.locale.number_format.
const PROXY_LOCALE: Record<'comma_decimal' | 'decimal_comma' | 'space_comma', string> = {
  comma_decimal: 'en-US', // 1,234.56
  decimal_comma: 'de-DE', // 1.234,56
  space_comma: 'fr-FR', // 1 234,56
};

const numberStyleOf = (locale: string): { group: string; decimal: string } => {
  try {
    const parts = new Intl.NumberFormat(locale).formatToParts(1234.5);
    return {
      group: parts.find((p) => p.type === 'group')?.value ?? '',
      decimal: parts.find((p) => p.type === 'decimal')?.value ?? '.',
    };
  } catch {
    return { group: ',', decimal: '.' };
  }
};

const matchesNumberFormat = (locale: string, fmt: 'comma_decimal' | 'decimal_comma' | 'space_comma'): boolean => {
  const { group, decimal } = numberStyleOf(locale);
  switch (fmt) {
    case 'comma_decimal':
      return decimal === '.' && group === ',';
    case 'decimal_comma':
      return decimal === ',' && (group === '.' || group === '');
    case 'space_comma':
      return decimal === ',' && (group === ' ' || group === '\u00a0' || group === '\u202f');
    default:
      return false;
  }
};

// Deriva il locale da usare per Intl.NumberFormat: se la lingua/locale già risolta
// (es. it-IT) produce nativamente lo stile numerico richiesto da HA, lo riusa
// senza cambiare lingua; altrimenti ricade su un locale proxy dedicato a quello stile.
const formatterLocaleFor = (fmt: NumberFormat | undefined, defaultLocale: string): string => {
  if (fmt === 'none' || fmt === undefined) return defaultLocale;
  if (fmt !== 'comma_decimal' && fmt !== 'decimal_comma' && fmt !== 'space_comma') return defaultLocale;

  if (matchesNumberFormat(defaultLocale, fmt)) return defaultLocale;

  return PROXY_LOCALE[fmt];
};

interface HassLocale {
  language?: string;
  number_format?: NumberFormat;
  time_zone?: 'local' | 'server';
  time_format?: TimeFormat | '12h' | '24h';
}

const usesAmPm = (timeFormat: HassLocale['time_format'], language: string): boolean => {
  if (timeFormat === TimeFormat.am_pm || timeFormat === '12h') return true;
  if (timeFormat === TimeFormat.twenty_four || timeFormat === '24h') return false;

  const testLanguage = timeFormat === TimeFormat.language ? language : undefined;
  const formattedDate = new Date().toLocaleString(testLanguage);
  return formattedDate.includes('AM') || formattedDate.includes('PM');
};

export function resolveLocale(
  hass: HomeAssistant | undefined,
  cardConfig: { language?: string; timezone?: string; number_format?: NumberFormat } = {},
): ResolvedLocale {
  const hassLocale = (hass as unknown as { locale?: HassLocale } | undefined)?.locale;
  const hassConfig = hass?.config;

  const language = (
    cardConfig.language?.toLowerCase()
    ?? hassLocale?.language?.toLowerCase()
    ?? hass?.language
    ?? 'en'
  );

  let timezone: string;
  if (cardConfig.timezone) {
    timezone = cardConfig.timezone;
  } else if (hassConfig?.time_zone) {
    timezone = hassConfig.time_zone;
  } else {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  const numberFormat = cardConfig.number_format ?? hassLocale?.number_format;
  const locale = localeMap[language] ?? language;
  const formatterLocale = formatterLocaleFor(numberFormat, locale);
  const timeFormat = usesAmPm(hassLocale?.time_format, language) ? '12h' : '24h';

  const resolved: ResolvedLocale = {
    language,
    locale,
    timezone,
    formatterLocale,
    timeFormat,
  };

  // console.debug('[resolveLocale] resolved locale:', resolved, 'from', {
  //   cardConfig,
  //   hassLocale,
  //   hassConfig,
  // });
  return resolved;
}

export type LocaleInfo = {
  locale: string;
  cwc?: number;
};

export const getLocaleInfo = (lang: string): LocaleInfo => ({
  locale: localeMap[lang] ?? lang,
  ...(lang in cwcLocale && { cwc: cwcLocale[lang] }),
});

export const getLocale = (lang: string): string => localeMap[lang] ?? `${lang}-${lang.toUpperCase()}`;

const formatterCache = new Map<string, Intl.NumberFormat>();

export const getFormatter = (
  locale: string = 'en-US',
  fractionDigits: number = 1,
  useGrouping: boolean = false,
): Intl.NumberFormat => {
  const key = `${locale}|${fractionDigits}|${useGrouping}`;
  if (!formatterCache.has(key)) {
    formatterCache.set(key, new Intl.NumberFormat(locale, {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
      useGrouping,
    }));
  }
  return formatterCache.get(key)!;
};

export const formatNumber = ({
  stringNumber,
  lang,
  formatterLocale,
  fractionDigits = 1,
  useGrouping = false,
}: {
  stringNumber: string;
  lang?: string;
  formatterLocale?: string;
  fractionDigits?: number;
  useGrouping?: boolean;
}): string => {
  const number = parseFloat(stringNumber);
  if (Number.isNaN(number)) return '';
  const effective = formatterLocale ?? (lang ? (localeMap[lang] ?? lang) : 'en-US');
  return getFormatter(effective, fractionDigits, useGrouping).format(number);
};

export const parseLocalizedNumber = (input: string | number, formatterLocale: string = 'en-US'): number => {
  if (typeof input === 'number') return input;
  const parts = new Intl.NumberFormat(formatterLocale).formatToParts(1234567.89);
  const group = parts.find((p) => p.type === 'group')?.value ?? '';
  const decimal = parts.find((p) => p.type === 'decimal')?.value ?? '.';
  const withoutGroup = group ? String(input).split(group).join('') : String(input);
  const normalized = decimal !== '.' ? withoutGroup.replace(decimal, '.') : withoutGroup;
  return Number(normalized);
};

export const string2Number = parseLocalizedNumber;

export const translate = (term: string, dictionary: Record<string, string>): string => {
  const key = Object.keys(dictionary).find((k) => k.toLowerCase() === term.toLowerCase());
  return key ? dictionary[key] : term;
};

export function pad(n: number | string, width: number, z = '0'): string {
  return n.toString().padStart(width, z);
}
