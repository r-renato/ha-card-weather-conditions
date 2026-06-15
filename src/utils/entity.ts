/* eslint-disable camelcase */
import { HomeAssistant } from 'custom-card-helpers';
import { formatNumber } from './locale';

const UNAVAILABLE_STATES = new Set(['unavailable', 'unknown', 'none', '']);

export const getEntityRawValue = (
  hass: HomeAssistant,
  entityId?: string,
): string | undefined => {
  if (!entityId) return undefined;
  const state = hass.states[entityId]?.state;
  return state === undefined || UNAVAILABLE_STATES.has(state) ? undefined : state;
};

export const getEntityRawAttribute = (
  hass: HomeAssistant,
  entityId: string | undefined,
  attribute: string,
): string | undefined => {
  if (!entityId) return undefined;
  return hass.states[entityId]?.attributes[attribute];
};

export const getEntityNumericValue = ({
  entityId,
  hass,
  lang,
  formatterLocale,
  decimals = 0,
}: {
  entityId?: string;
  hass?: HomeAssistant;
  lang?: string;
  formatterLocale?: string;
  decimals?: number;
} = {}): string | undefined => {
  if (!hass || !entityId) return undefined;
  const state = hass.states[entityId]?.state;
  if (!state || UNAVAILABLE_STATES.has(state)) return undefined;
  return formatNumber({
    stringNumber: state,
    lang,
    formatterLocale,
    fractionDigits: decimals,
  });
};

export const getEntityUnit = (
  hass: HomeAssistant,
  entityId?: string,
): string | undefined =>
  entityId ? hass.states[entityId]?.attributes?.unit_of_measurement : undefined;

export const getEntityIcon = (
  hass: HomeAssistant,
  entityId?: string,
): string | undefined =>
  entityId ? hass.states[entityId]?.attributes?.icon : undefined;

export const getWindDirections = (
  wd: number | string | undefined,
  cwcLocWindDirections: Record<string, string>,
): string | null => {
  if (wd === undefined || wd === null) return null;
  const wdNumber = typeof wd === 'number' ? wd : parseFloat(wd as string);
  if (Number.isNaN(wdNumber)) return cwcLocWindDirections[wd as string] ?? null;
  const normalized = ((wdNumber % 360) + 360) % 360;
  const directions = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE',
    'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW',
    'W', 'WNW', 'NW', 'NNW',
  ];
  const index = Math.floor((normalized + 11.25) / 22.5) % 16;
  return cwcLocWindDirections[directions[index]] ?? null;
};
