import { HomeAssistant, NumberFormat } from 'custom-card-helpers';
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

const formatterLocaleFor = (fmt: NumberFormat | undefined, defaultLocale: string): string => {
  switch (fmt) {
    case 'comma_decimal':
      return 'en-US';
    case 'decimal_comma':
      return 'de-DE';
    case 'space_comma':
      return 'fr-FR';
    case 'none':
      return 'en-US';
    default:
      return defaultLocale;
  }
};

interface HassLocale {
  language?: string;
  number_format?: NumberFormat;
  time_zone?: 'local' | 'server';
}

export function resolveLocale(
  hass: HomeAssistant | undefined,
  cardConfig: { language?: string; timezone?: string; number_format?: NumberFormat } = {},
): ResolvedLocale {
  // const hassLocale = (hass as unknown as { locale?: HassLocale } | undefined)?.locale;
  const hassLocale = hass?.locale;
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

  console.info(`[hassLocale] language: ${hassLocale?.language}, timezone: ${hassConfig?.time_zone}, number_format: ${hassLocale?.number_format}`);
   console.info(`[cardLocale] language: ${cardConfig?.language}, timezone: ${cardConfig?.timezone}, number_format: ${cardConfig?.number_format}`);

  const numberFormat = cardConfig.number_format ?? hassLocale?.number_format;
  const locale = localeMap[language] ?? language;
  const formatterLocale = formatterLocaleFor(numberFormat, locale);

  const resolved: ResolvedLocale = {
    language,
    locale,
    timezone,
    formatterLocale,
  };

  console.info(`[resolveLocale] language: ${language}, locale: ${locale}, timezone: ${timezone}, formatterLocale: ${formatterLocale}`);
  
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
