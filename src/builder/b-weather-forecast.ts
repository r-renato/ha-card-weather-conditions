import { HomeAssistant } from 'custom-card-helpers/dist';
import { getWeatherIcon } from '../utils/helper-render';
import { iIconsConfig, iTerms } from '../base/lovelace-base';
import {
  getEntityIcon,
  getEntityNumericValue,
  getEntityRawAttribute,
  getEntityRawValue,
  getEntityUnit,
  getLocaleInfo,
  getWindDirections,
} from '../utils/helper';
import { iconPrecipitation, iconTemperature } from '../utils/const';
import { iForecastDataItem, renderWeatherForecast } from '../templates/t-weather-forecast';
import {
  iDailyForecast,
  iHourlyForecast,
  iMarineDailyForecast,
  iMarineHourlyForecast,
} from '../utils/config-schema';

const getDefaultIcon = (metric: string): string => {
  if (metric.includes('temperature')) return iconTemperature;
  if (metric.includes('precipitation')) return iconPrecipitation;
  return 'mdi:help-circle-outline';
};

const buildHourlyForecastSlot = (
  hass: HomeAssistant,
  lang: string,
  cwcLocWindDirections,
  forecast: iHourlyForecast,
  forecastType: number,
  iconsConfig: iIconsConfig,
  sunState: string,
  slotId: string,
) => {
  const record: Record<string, iForecastDataItem> = {};
  const localeInfo = getLocaleInfo(lang);

  let datetime: Date;

  // Condizione meteo
  if (forecast.condition && forecast.condition[slotId]) {
    record['condition'] = {
      img: getWeatherIcon(getEntityRawValue(hass, forecast.condition[slotId]), iconsConfig, sunState),
    };
  }

  // Wind Bearing
  if (forecast.wind_bearing && forecast.wind_bearing[slotId]) {
    record['wind_bearing'] = {
      value: getWindDirections(getEntityRawValue(hass, forecast.wind_bearing[slotId]), cwcLocWindDirections),
    };
  }
   
  // Metriche da gestire
  const metrics = [
    'temperature',
    'temperature_feelslike',
    'precipitation_intensity',
    'precipitation_probability',
    'wind_speed',
  ];

  metrics.forEach((metricKey) => {
    const metricSlots = forecast[metricKey];
    const entityId = metricSlots?.[slotId];
    let decimals = 0;

    if (!entityId) return;

    if (metricKey === 'precipitation_intensity') decimals = 2;

    datetime = new Date(getEntityRawAttribute(hass, entityId, 'datetime'));

    record[metricKey] = {
      value: getEntityNumericValue({
        entityId, hass, lang, decimals,
      }),
      unit: getEntityUnit(hass, entityId),
      img: getEntityIcon(hass, entityId) || getDefaultIcon(metricKey),
    };
  });

  if (datetime && Object.keys(record).length > 0) {
    const hourTime = datetime.toLocaleTimeString(localeInfo.locale, {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: localeInfo.timezone,
    });

    record['reference'] = {
      value: (forecastType === 0 ? hourTime : hourTime),
    };
  }

  return record;
};

const buildDailyForecastSlot = (
  hass: HomeAssistant,
  lang: string,
  forecast: iDailyForecast,
  forecastType: number,
  iconsConfig: iIconsConfig,
  sunState: string,
  slotId: string,
) => {
  const record: Record<string, iForecastDataItem> = {};
  const localeInfo = getLocaleInfo(lang);

  let datetime: Date;

  // Gestione condizione meteo
  if (forecast.condition && forecast.condition[slotId]) {
    record['condition'] = {
      img: getWeatherIcon(getEntityRawValue(hass, forecast.condition[slotId]), iconsConfig, sunState),
    };
  }

  // Lista fissa delle metriche da considerare
  const metrics = [
    'temperature_high',
    'temperature_low',
    'precipitation_intensity',
    'precipitation_probability',
  ];

  metrics.forEach((metricKey) => {
    const metricSlots = forecast[metricKey];
    const entityId = metricSlots?.[slotId];
    let decimals = 0;

    if (!entityId) return;

    if (metricKey === 'precipitation_intensity') {
      decimals = 2;
    }

    datetime = new Date(getEntityRawAttribute(hass, entityId, 'datetime'));
    // console.debug(`>>> ${entityId} ${lang} ${getEntityNumericValue({ entityId, hass, lang })}`);
    record[metricKey] = {
      value: getEntityNumericValue({
        entityId, hass, lang, decimals,
      }),
      unit: getEntityUnit(hass, entityId),
      img: getEntityIcon(hass, entityId) || getDefaultIcon(metricKey),
    };
  });

  if (datetime && Object.keys(record).length > 0) {
    // Giorno della settimana abbreviato (es. "Lun")
    const weekday = datetime.toLocaleDateString(localeInfo.locale, {
      weekday: 'short',
      timeZone: 'UTC', // forza la lettura senza conversione locale
    });

    // Ora e minuti (es. "13:45")
    const hourday = datetime.toLocaleTimeString(localeInfo.locale, {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: localeInfo.timezone,
    });

    record['reference'] = {
      value: (forecastType === 0 ? weekday.toUpperCase() : hourday),
    };
  }

  return record;
};

const buildMarineDailyForecastSlot = (
  hass: HomeAssistant,
  lang: string,
  cwcLocWindDirections,
  forecast: iMarineDailyForecast,
  forecastType: number,
  iconsConfig: iIconsConfig,
  sunState: string,
  slotId: string,
) => {
  const record: Record<string, iForecastDataItem> = {};

  const fieldColor = (
    waveHeightMax: number,
    swellWaveHeightMax: number,
    windWaveHeightMax: number,
  ) => {
    // 🟥 Bandiera rossa – condizioni pericolose
    if (waveHeightMax >= 1.8) {
      return 'red';
    }

    if (swellWaveHeightMax >= 1.5 && windWaveHeightMax >= 0.8) {
      return 'red';
    }

    // 🟨 Bandiera gialla – condizioni da attenzionare
    if (waveHeightMax >= 1.0) {
      return 'yellow';
    }

    if (swellWaveHeightMax >= 0.8) {
      return 'yellow';
    }

    if (windWaveHeightMax >= 0.6) {
      return 'yellow';
    }

    // 🟩 Bandiera verde – condizioni sicure
    return 'green';
  };

  const localeInfo = getLocaleInfo(lang);

  let datetime: Date;

  // Gestione condizione meteo
  if (
    forecast.wave_height_max &&
    forecast.swell_wave_height_max &&
    forecast.wind_wave_height_max &&
    forecast.swell_wave_height_max[slotId] &&
    forecast.wind_wave_height_max[slotId]
  ) {
    record['condition'] = {
      icon: 'mdi:flag-variant',
      iconColor: fieldColor(forecast.wave_height_max[slotId], forecast.swell_wave_height_max[slotId], forecast.wind_wave_height_max[slotId]),
    };
  }

  // Wind Bearing
  if (forecast.wave_direction && forecast.wave_direction[slotId]) {
    record['wave_direction'] = {
      value: getWindDirections(getEntityRawValue(hass, forecast.wave_direction[slotId]), cwcLocWindDirections),
      icon: getEntityRawValue(hass, forecast.wave_direction[slotId]),
    };
  }

  // Lista fissa delle metriche da considerare
  const metrics = [
    'wave_height_max',
    'swell_wave_height_max',
    'wind_wave_height_max',
  ];

  metrics.forEach((metricKey) => {
    const metricSlots = forecast[metricKey];
    const entityId = metricSlots?.[slotId];
    const decimals = 1;

    if (!entityId) return;

    datetime = new Date(getEntityRawAttribute(hass, entityId, 'datetime'));
    // console.debug(`>>> ${entityId} ${lang} ${getEntityNumericValue({ entityId, hass, lang })}`);
    record[metricKey] = {
      value: getEntityNumericValue({
        entityId, hass, lang, decimals,
      }),
      unit: getEntityUnit(hass, entityId),
      img: getEntityIcon(hass, entityId) || getDefaultIcon(metricKey),
    };
  });

  if (datetime && Object.keys(record).length > 0) {
    // Giorno della settimana abbreviato (es. "Lun")
    const weekday = datetime.toLocaleDateString(localeInfo.locale, {
      weekday: 'short',
      timeZone: 'UTC', // forza la lettura senza conversione locale
    });

    // Ora e minuti (es. "13:45")
    const hourday = datetime.toLocaleTimeString(localeInfo.locale, {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: localeInfo.timezone,
    });

    record['reference'] = {
      value: (forecastType === 2 ? weekday.toUpperCase() : hourday),
    };
  }

  return record;
};

const buildWeatherForecast = (
  hass: HomeAssistant,
  lang: string,
  terms: iTerms,
  dailyForecast: iDailyForecast,
  hourlyForecast: iHourlyForecast,
  marineDailyForecasts: iMarineDailyForecast,
  marineHourlyForecasts: iMarineHourlyForecast,
  forecastType: (0 | 1 | 2 | 3),
  iconsConfig: iIconsConfig,
  sunEntityId: string,
) => {
  const voidRecord: Record<string, iForecastDataItem>[] = [];
  
  const sunState = getEntityRawValue(hass, sunEntityId);

  let dailyForecastData = voidRecord;
  if (dailyForecast) {
    const dailySlotIds = Object.keys(
      dailyForecast.condition ||
      dailyForecast.temperature_high || dailyForecast.temperature_low ||
      dailyForecast.precipitation_intensity || dailyForecast.precipitation_probability ||
      {},
    );
    dailyForecastData = dailySlotIds.map((slotId) => buildDailyForecastSlot(
      hass,
      lang,
      dailyForecast,
      forecastType,
      iconsConfig,
      sunState,
      slotId,
    ));
  }

  let hourlyforecastData = voidRecord;
  if (hourlyForecast) {
    const hourlySlotIds = Object.keys(
      hourlyForecast.condition ||
      hourlyForecast.temperature || hourlyForecast.temperature_feelslike ||
      hourlyForecast.precipitation_intensity || hourlyForecast.precipitation_probability ||
      {},
    );
    hourlyforecastData = hourlySlotIds.map((slotId) => buildHourlyForecastSlot(
      hass,
      lang,
      terms.windDirections,
      hourlyForecast,
      forecastType,
      iconsConfig,
      sunState,
      slotId,
    ));
  }

  let marineDailyForecastData = voidRecord;
  if (marineDailyForecasts) {
    const marineDailySlotIds = Object.keys(
      marineDailyForecasts.swell_wave_height_max ||
      marineDailyForecasts.wave_direction || marineDailyForecasts.wave_height_max ||
      marineDailyForecasts.wind_wave_height_max ||
      {},
    );
    marineDailyForecastData = marineDailySlotIds.map((slotId) => buildMarineDailyForecastSlot(
      hass,
      lang,
      terms.windDirections,
      marineDailyForecasts,
      forecastType,
      iconsConfig,
      sunState,
      slotId,
    ));
  }

  switch (forecastType) {
    case 0:
      return renderWeatherForecast(forecastType, dailyForecastData);
    case 1:
      return renderWeatherForecast(forecastType, hourlyforecastData);
    case 2:
      return renderWeatherForecast(forecastType, marineDailyForecastData);
    default:
      return renderWeatherForecast(forecastType, voidRecord);
  }
};

export default buildWeatherForecast;
