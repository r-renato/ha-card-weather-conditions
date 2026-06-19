/* eslint-disable camelcase */
import { HomeAssistant } from 'custom-card-helpers/dist';
import { ResolvedLocale, translate } from '../utils/locale';
import {
  getEntityNumericValue,
  getEntityRawValue,
  getEntityUnit,
  getWindDirections,
} from '../utils/entity';
import { renderWeatherPresent } from '../templates/t-present';
import { iPresentData, SunTimeFormat } from '../utils/config-schema';
import { iTerms } from '../base/lovelace-base';

const present = (
  hass: HomeAssistant,
  resolvedLocale: ResolvedLocale,
  cwcLocWindDirections: Record<string, string>,
  presentData: iPresentData,
  sunId: string,
  sunTimeFormat: SunTimeFormat = 'hh_mm',
  wordDict: Record<string, string> = {},
) => {
  const { locale, timezone, formatterLocale } = resolvedLocale;
  const sunEntity = sunId ? hass.states[sunId] : undefined;
  const { next_rising, next_setting } = sunEntity?.attributes ?? {};

  const fmtTime = (iso: string) => new Date(iso).toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    ...(sunTimeFormat === 'hh_mm_ss' ? { second: '2-digit' as const } : {}),
    hour12: false,
    timeZone: timezone,
  });

  return {
    nextRising: {
      value: next_rising ? fmtTime(next_rising) : undefined,
      icon: 'mdi:weather-sunset-up',
      icon_color: '#fb923c',
      label: translate('Sunrise', wordDict),
    },
    nextSetting: {
      value: next_setting ? fmtTime(next_setting) : undefined,
      icon: 'mdi:weather-sunset-down',
      icon_color: '#f97316',
      label: translate('Sunset', wordDict),
    },
    nextRisingISO: next_rising || undefined,
    nextSettingISO: next_setting || undefined,
    lightningStrikes: {
      value: getEntityNumericValue({ entityId: presentData.lightning_strikes, hass, formatterLocale, decimals: 0 }),
      unit: null,
      icon: 'mdi:lightning-bolt',
      icon_color: '#fbbf24',
      label: translate('Lightning / Distance', wordDict),
    },
    lightningDistance: {
      value: getEntityNumericValue({ entityId: presentData.lightning_distance, hass, formatterLocale, decimals: 1 }),
      unit: getEntityUnit(hass, presentData.lightning_distance),
      icon: 'mdi:lightning-bolt',
    },
    precipitationIntensity: {
      value: getEntityNumericValue({ entityId: presentData.precipitation_intensity, hass, formatterLocale, decimals: 2 }),
      unit: getEntityUnit(hass, presentData.precipitation_intensity),
      icon: 'mdi:weather-rainy',
      icon_color: '#38bdf8',
      label: translate('Precipitation', wordDict),
    },
    precipitationProbability: {
      value: getEntityNumericValue({ entityId: presentData.precipitation_probability, hass, formatterLocale, decimals: 0 }),
      unit: getEntityUnit(hass, presentData.precipitation_probability),
      icon: 'mdi:weather-rainy',
    },
    precipitationAccumulation: {
      value: getEntityNumericValue({ entityId: presentData.precipitation_accumulation, hass, formatterLocale, decimals: 1 }),
      unit: getEntityUnit(hass, presentData.precipitation_accumulation),
      icon: 'mdi:weather-rainy',
    },
    humidity: {
      value: getEntityNumericValue({ entityId: presentData.humidity, hass, formatterLocale, decimals: 0 }),
      unit: getEntityUnit(hass, presentData.humidity),
      icon: 'mdi:water-percent',
      icon_color: '#60a5fa',
      label: translate('Humidity', wordDict),
    },
    windBearing: {
      value: getWindDirections(getEntityRawValue(hass, presentData.wind_bearing), cwcLocWindDirections),
    },
    windSpeed: {
      value: getEntityNumericValue({ entityId: presentData.wind_speed, hass, formatterLocale, decimals: 0 }),
      unit: getEntityUnit(hass, presentData.wind_speed),
      icon: 'mdi:weather-windy',
      icon_color: '#7dd3fc',
      label: translate('Wind', wordDict),
    },
    pressure: {
      value: getEntityNumericValue({ entityId: presentData.pressure, hass, formatterLocale, decimals: 0 }),
      unit: getEntityUnit(hass, presentData.pressure),
      icon: 'mdi:gauge',
      icon_color: '#a78bfa',
      label: translate('Pressure', wordDict),
    },
    visibility: {
      value: getEntityNumericValue({ entityId: presentData.visibility, hass, formatterLocale, decimals: 0 }),
      unit: getEntityUnit(hass, presentData.visibility),
      icon: 'mdi:weather-fog',
      icon_color: '#94a3b8',
      label: translate('Visibility', wordDict),
    },
    temperatureHigh: {
      value: getEntityNumericValue({ entityId: presentData.temperature_max, hass, formatterLocale, decimals: 0 }),
      unit: getEntityUnit(hass, presentData.temperature_max),
      icon: 'mdi:thermometer',
    },
    temperatureLow: {
      value: getEntityNumericValue({ entityId: presentData.temperature_min, hass, formatterLocale, decimals: 0 }),
      unit: getEntityUnit(hass, presentData.temperature_min),
      icon: 'mdi:thermometer',
      icon_color: '#f87171',
      label: 'Min / Max',
    },
  };
};

const buildWeatherPresent = (
  hass: HomeAssistant,
  resolvedLocale: ResolvedLocale,
  terms: iTerms,
  presentData: iPresentData,
  sunId: string,
  sunTimeFormat?: SunTimeFormat,
) => renderWeatherPresent(
  { ...present(hass, resolvedLocale, terms.windDirections, presentData, sunId, sunTimeFormat, terms.words) },
  resolvedLocale.formatterLocale,
);

export default buildWeatherPresent;
