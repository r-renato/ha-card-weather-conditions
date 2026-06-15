/* eslint-disable camelcase */
import { HomeAssistant } from 'custom-card-helpers/dist';
import { ResolvedLocale } from '../utils/locale';
import {
  getEntityNumericValue,
  getEntityRawValue,
  getEntityUnit,
  getWindDirections,
} from '../utils/entity';
import { renderWeatherPresent } from '../templates/t-present';
import { iPresentData } from '../utils/config-schema';
import { iTerms } from '../base/lovelace-base';

const present = (
  hass: HomeAssistant,
  resolvedLocale: ResolvedLocale,
  cwcLocWindDirections: Record<string, string>,
  presentData: iPresentData,
  sunId: string,
) => {
  const { locale, timezone, formatterLocale } = resolvedLocale;
  const sunEntity = sunId ? hass.states[sunId] : undefined;
  const { next_rising, next_setting } = sunEntity?.attributes ?? {};

  const fmtTime = (iso: string) => new Date(iso).toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: timezone,
  });

  return {
    nextRising: {
      value: next_rising ? fmtTime(next_rising) : undefined,
      icon: 'mdi:weather-sunset-up',
    },
    nextSetting: {
      value: next_setting ? fmtTime(next_setting) : undefined,
      icon: 'mdi:weather-sunset-down',
    },
    lightningStrikes: {
      value: getEntityNumericValue({ entityId: presentData.lightning_strikes, hass, formatterLocale, decimals: 0 }),
      unit: null,
      icon: 'mdi:lightning-bolt',
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
    },
    windBearing: {
      value: getWindDirections(getEntityRawValue(hass, presentData.wind_bearing), cwcLocWindDirections),
    },
    windSpeed: {
      value: getEntityNumericValue({ entityId: presentData.wind_speed, hass, formatterLocale, decimals: 0 }),
      unit: getEntityUnit(hass, presentData.wind_speed),
      icon: 'mdi:weather-windy',
    },
    pressure: {
      value: getEntityNumericValue({ entityId: presentData.pressure, hass, formatterLocale, decimals: 0 }),
      unit: getEntityUnit(hass, presentData.pressure),
      icon: 'mdi:gauge',
    },
    visibility: {
      value: getEntityNumericValue({ entityId: presentData.visibility, hass, formatterLocale, decimals: 0 }),
      unit: getEntityUnit(hass, presentData.visibility),
      icon: 'mdi:weather-fog',
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
    },
  };
};

const buildWeatherPresent = (
  hass: HomeAssistant,
  resolvedLocale: ResolvedLocale,
  terms: iTerms,
  presentData: iPresentData,
  sunId: string,
) => renderWeatherPresent(
  { ...present(hass, resolvedLocale, terms.windDirections, presentData, sunId) },
  resolvedLocale.formatterLocale,
);

export default buildWeatherPresent;
