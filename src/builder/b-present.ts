/* eslint-disable camelcase */
import { HomeAssistant } from 'custom-card-helpers/dist';
import {
  getEntityNumericValue,
  getEntityRawValue,
  getEntityUnit,
  getLocaleInfo,
  getWindDirections,
} from '../utils/helper';
// import { getSensorUnit } from '../utils/helper-render';
import { renderWeatherPresent } from '../templates/t-present';
import { iPresentData } from '../utils/config-schema';
import { iTerms } from '../base/lovelace-base';

const present = (hass: HomeAssistant, language: string, cwcLocWindDirections, presentData: iPresentData, sunId: string) => {
  const localeInfo = getLocaleInfo(language);
  const sunEntity = sunId ? hass.states[sunId] : undefined;
  const { next_rising, next_setting } = sunEntity?.attributes ?? {};

  const next_rising_formatted = next_rising ? new Date(next_rising).toLocaleTimeString(localeInfo.locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: localeInfo.timezone,
  }) : undefined;

  const next_setting_formatted = next_rising ? new Date(next_setting).toLocaleTimeString(localeInfo.locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: localeInfo.timezone,
  }) : undefined;

  return {
    nextRising: { value: next_rising_formatted, icon: 'mdi:weather-sunset-up' },
    nextSetting: { value: next_setting_formatted, icon: 'mdi:weather-sunset-down' },

    precipitationIntensity: {
      // eslint-disable-next-line object-curly-newline
      value: getEntityNumericValue({ entityId: presentData.precipitation_intensity, hass, lang: language, decimals: 2 }),
      unit: getEntityUnit(hass, presentData.precipitation_intensity),
      icon: 'mdi:weather-rainy',
    },
    precipitationProbability: {
      // eslint-disable-next-line object-curly-newline
      value: getEntityNumericValue({ entityId: presentData.precipitation_probability, hass, lang: language, decimals: 0 }),
      unit: getEntityUnit(hass, presentData.precipitation_probability),
      icon: 'mdi:weather-rainy',
    },
    humidity: {
      // eslint-disable-next-line object-curly-newline
      value: getEntityNumericValue({ entityId: presentData.humidity, hass, lang: language, decimals: 0 }),
      unit: getEntityUnit(hass, presentData.humidity),
      icon: 'mdi:water-percent',
    },
    windBearing: { value: getWindDirections(getEntityRawValue(hass, presentData.wind_bearing), cwcLocWindDirections) },
    windSpeed: {
      // eslint-disable-next-line object-curly-newline
      value: getEntityNumericValue({ entityId: presentData.wind_speed, hass, lang: language, decimals: 0 }),
      unit: getEntityUnit(hass, presentData.wind_speed),
      icon: 'mdi:weather-windy',
    },
    pressure: {
      // eslint-disable-next-line object-curly-newline
      value: getEntityNumericValue({ entityId: presentData.pressure, hass, lang: language, decimals: 0 }),
      unit: getEntityUnit(hass, presentData.pressure),
      icon: 'mdi:gauge',
    },
    visibility: {
      // eslint-disable-next-line object-curly-newline
      value: getEntityNumericValue({ entityId: presentData.visibility, hass, lang: language, decimals: 0 }),
      unit: getEntityUnit(hass, presentData.visibility),
      icon: 'mdi:weather-fog',
    },
    temperatureHigh: {
      // eslint-disable-next-line object-curly-newline
      value: getEntityNumericValue({ entityId: presentData.temperature_max, hass, lang: language, decimals: 0 }),
      unit: getEntityUnit(hass, presentData.temperature_max),
      icon: 'mdi:thermometer',
    },
    temperatureLow: {
      // eslint-disable-next-line object-curly-newline
      value: getEntityNumericValue({ entityId: presentData.temperature_min, hass, lang: language, decimals: 0 }),
      unit: getEntityUnit(hass, presentData.temperature_min),
      icon: 'mdi:thermometer',
    },
  };
};

// const presentFromForecastData = (hass: HomeAssistant, language: string, forecastCfg: Forecast) => {
//   const getValue = (obj: Record<string, string>) => {
//     const [key, entityId] = Object.entries(obj)[0] ?? [];
//     const state = entityId && hass.states[entityId]?.state;
//     return state !== undefined ? formatNumber({ stringNumber: state, lang: language, fractionDigits: 0 }) : undefined;
//   };

//   const {
//     temperature_high = {},
//     temperature_low = {},
//     precipitation_probability = {},
//     precipitation_intensity = {},
//   } = forecastCfg;

//   return {
//     temperatureHigh: { value: getValue(temperature_high), unit: getEntityUnit(hass, temperature_high), icon: 'mdi:thermometer' },
//     temperatureLow: { value: getValue(temperature_low), unit: getEntityUnit(hass, 'temperature'), icon: 'mdi:thermometer' },
//     precipitationProbability: { value: getValue(precipitation_probability), unit: '%', icon: 'mdi:weather-rainy' },
//     precipitationIntensity: { value: getValue(precipitation_intensity), unit: getEntityUnit(hass, 'precipitation'), icon: 'mdi:weather-rainy' },
//   };
// };

const buildWeatherPresent = (
  hass: HomeAssistant,
  language: string,
  terms: iTerms,
  presentData: iPresentData,
  sunId: string,
) => {
  const lang = language || hass.selectedLanguage || hass.language;

  const presentObj = present(hass, lang, terms.windDirections, presentData, sunId);
  // const presentFromForecastObj = presentFromForecastData(hass, language, forecastCfg);

  // console.debug('buildWeatherPresent', { presentObj });
  return renderWeatherPresent({ ...presentObj }, lang);
};

export default buildWeatherPresent;
