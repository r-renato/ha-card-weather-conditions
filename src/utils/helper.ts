/* eslint-disable camelcase */
import { HomeAssistant } from 'custom-card-helpers/dist';
import { iconsModels } from '../../backup/types';

export interface IconsConfigResult {
  iconsModel: string;
  iconsDay: Record<string, string>;
  iconsNight: Record<string, string>;
}

// export const getEntityState = (hass: HomeAssistant, entityId?: string) => (
//   entityId ? hass.states[entityId]?.state : undefined
// );

/**
 * Restituisce la traduzione di un termine usando un dizionario, in modo case-insensitive.
 * Se il termine non è trovato, restituisce l'originale.
 */
export const translate = (term: string, dictionary: Record<string, string>): string => {
  const key = Object.keys(dictionary).find((k) => k.toLowerCase() === term.toLowerCase());
  return key ? dictionary[key] : term;
};

type LocaleInfo = {
  locale: string;
  timezone: string;
  cwc?: number;
};

export const getLocaleInfo = (lang: string): LocaleInfo => {
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
  };

  const timezoneMap: Record<string, string> = {
    en: 'America/New_York',
    it: 'Europe/Rome',
    nl: 'Europe/Amsterdam',
    es: 'Europe/Madrid',
    de: 'Europe/Berlin',
    fr: 'Europe/Paris',
    'sr-latn': 'Europe/Belgrade',
    ja: 'Asia/Tokyo',
    pt: 'Europe/Lisbon',
    da: 'Europe/Copenhagen',
    'no-no': 'Europe/Oslo',
    cs: 'Europe/Prague',
  };

  const cwcLocale: Record<string, number> = {
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
  };

  return {
    locale: localeMap[lang] || lang,
    timezone: timezoneMap[lang] || 'UTC',
    ...(lang in cwcLocale && { cwc: cwcLocale[lang] }),
  };
};

export const getLocale = (lang: string) => {
  const map = {
    it: 'it-IT',
    en: 'en-US',
    fr: 'fr-FR',
    de: 'de-DE',
    es: 'es-ES',
    ja: 'ja-JP',
    zh: 'zh-CN',
    // Aggiungi altri se servono
  };
  return map[lang] || `${lang}-${lang.toUpperCase()}`; // fallback generico
};

export const getFormatter = (
  locale: string = 'en-US',
  fractionDigits: number = 1,
  useGrouping: boolean = false,
): Intl.NumberFormat => new Intl.NumberFormat(locale, {
  minimumFractionDigits: fractionDigits,
  maximumFractionDigits: fractionDigits,
  useGrouping,
});

export const formatNumber = (
  {
    stringNumber,
    lang = 'en',
    fractionDigits = 1,
    useGrouping = false,
  }: {
    stringNumber: string;
    lang?: string;
    fractionDigits?: number;
    useGrouping?: boolean;
  },
): string => {
  const number = parseFloat(stringNumber);
  if (Number.isNaN(number)) return '';

  const effectiveFormatter = getFormatter(getLocale(lang), fractionDigits, useGrouping);
  // console.debug(`>>>|| ${number} ${effectiveFormatter.format(number)}`);
  return effectiveFormatter.format(number);
};

export const getIconModelData = (iconsModel: string): IconsConfigResult => {
  const modelName = iconsModel.toLowerCase() ?? 'climacell';

  if (modelName in iconsModels) {
    const { iconsDay, iconsNight } = iconsModels[modelName];
    return {
      iconsModel: modelName,
      iconsDay,
      iconsNight,
    };
  }

  console.warn(`Unknown icons model: ${modelName}. Falling back to 'climacell'.`);

  const fallback = iconsModels['climacell'];
  return {
    iconsModel: 'climacell',
    iconsDay: fallback.iconsDay,
    iconsNight: fallback.iconsNight,
  };
};

export function pad(n: number | string, width: number, z = '0'): string {
  return n.toString().padStart(width, z);
}

/**
 * Converte una stringa numerica localizzata in un numero.
 * Esempio: '1.234,56' (it-IT) → 1234.56
 * @param input - La stringa o numero da convertire.
 * @param locale - Il locale da utilizzare per determinare i separatori.
 * @returns Il numero convertito o NaN se la conversione fallisce.
 */
export const string2Number = (input: string | number, locale: string = 'en-US'): number => {
  if (typeof input === 'number') return input;

  const formatter = new Intl.NumberFormat(locale);
  const parts = formatter.formatToParts(1234567.89);

  const group = parts.find((part) => part.type === 'group')?.value || '';
  const decimal = parts.find((part) => part.type === 'decimal')?.value || '.';

  // Rimuove i separatori delle migliaia e sostituisce il separatore decimale con '.'
  const normalized = input
    .replace(new RegExp(`\\${group}`, 'g'), '')
    .replace(new RegExp(`\\${decimal}`), '.');

  return Number(normalized);
};

export const getEntityRawValue = (hass: HomeAssistant, entityId?: string): string | undefined => (
  entityId && hass.states[entityId]?.state
);

export const getEntityRawAttribute = (hass: HomeAssistant, entityId: string, attribute: string): string | undefined => (
  entityId && hass.states[entityId]?.attributes[attribute]
);

export const getEntityNumericValue = (
  {
    entityId,
    hass,
    lang = 'en',
    decimals = 0,
  }: {
    entityId?: string;
    hass?: HomeAssistant;
    lang?: string;
    decimals?: number;
  } = {},
): string | undefined => {
  const state = hass && entityId && hass.states[entityId]?.state;
  return state !== undefined ? formatNumber({ stringNumber: state, fractionDigits: decimals, lang }) : undefined;
};

export const getEntityUnit = (hass: HomeAssistant, entityId?: string): string | undefined => (
  entityId && hass.states[entityId]?.attributes?.unit_of_measurement
);

export const getEntityIcon = (hass: HomeAssistant, entityId?: string): string | undefined => (
  entityId && hass.states[entityId]?.attributes?.icon
);

export const getWindDirections = (
  wd: number | string,
  cwcLocWindDirections,
): string | null => {
  const wdNumber = typeof wd === 'number' ? wd : parseFloat(wd);

  if (Number.isNaN(wdNumber)) {
    return cwcLocWindDirections[wd] ?? null;
  }

  if (wdNumber < 0 || wdNumber > 360) {
    console.error(`Invalid wind direction: '${wd}'. Valid values are between 0 and 360 degrees.`);
    return null;
  }

  const directions = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE',
    'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW',
    'W', 'WNW', 'NW', 'NNW',
  ];

  const index = Math.floor(((wdNumber + 11.25) % 360) / 22.5);

  const dirKey = directions[index];

  return cwcLocWindDirections[dirKey] ?? null;
};

export function imageExist(imageSrc: string, timeout = 5000): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const img = new Image();
    const timer = setTimeout(() => {
      img.src = ''; // forza stop
      resolve(false);
    }, timeout);

    img.onload = () => {
      clearTimeout(timer);
      resolve(true);
    };
    img.onerror = () => {
      clearTimeout(timer);
      resolve(false);
    };
    img.src = imageSrc;
  });
}

export async function loadJSON(full_path_file: string): Promise<string> {
  try {
    const response = await fetch(full_path_file);
    if (!response.ok) {
      const err = `ERROR retrieving JSON file: '${full_path_file}', status: ${response.status} ${response.statusText}`;
      console.info(err);
      throw new Error(err);
    }
    console.info(`Locale '${full_path_file}' loaded`);
    return await response.text();
  } catch (error) {
    console.info(`Fetch failed for '${full_path_file}':`, error);
    throw error;
  }
}

export function logInfo(message: string, ...styles: unknown[]) {
  console.info(message, ...(styles.length ? styles : []));
}

export function parseLocalizedNumber(value: string | number, locale = 'en-US'): number {
  if (typeof value === 'number') return value;

  // Semplificazione solo per 'it-IT': usa virgola come separatore decimale
  const normalized = value.replace(/\./g, '').replace(',', '.');
  return Number(normalized);
}
