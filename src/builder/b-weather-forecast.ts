import { HomeAssistant } from 'custom-card-helpers/dist';
import { getWeatherIcon } from '../utils/helper-render';
import { iIconsConfig, iTerms } from '../base/lovelace-base';
import {
  getEntityIcon,
  getEntityNumericValue,
  getEntityRawAttribute,
  getEntityRawValue,
  getEntityUnit,
  getWindDirections,
} from '../utils/entity';
import { ResolvedLocale } from '../utils/locale';
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
  resolvedLocale: ResolvedLocale,
  cwcLocWindDirections: Record<string, string>,
  forecast: iHourlyForecast,
  forecastType: number,
  iconsConfig: iIconsConfig,
  sunState: string,
  slotId: string,
) => {
  const record: Record<string, iForecastDataItem> = {};
  const { locale, timezone, formatterLocale } = resolvedLocale;

  let datetime: Date;

  if (forecast.condition && forecast.condition[slotId]) {
    record['condition'] = {
      img: getWeatherIcon(getEntityRawValue(hass, forecast.condition[slotId]), iconsConfig, sunState),
    };
  }

  if (forecast.wind_bearing && forecast.wind_bearing[slotId]) {
    record['wind_bearing'] = {
      value: getWindDirections(getEntityRawValue(hass, forecast.wind_bearing[slotId]), cwcLocWindDirections),
    };
  }

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
      value: getEntityNumericValue({ entityId, hass, formatterLocale, decimals }),
      unit: getEntityUnit(hass, entityId),
      img: getEntityIcon(hass, entityId) || getDefaultIcon(metricKey),
    };
  });

  if (datetime && Object.keys(record).length > 0) {
    const hourTime = datetime.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: timezone,
    });
    record['reference'] = { value: hourTime };
  }

  return record;
};

const buildDailyForecastSlot = (
  hass: HomeAssistant,
  resolvedLocale: ResolvedLocale,
  forecast: iDailyForecast,
  forecastType: number,
  iconsConfig: iIconsConfig,
  sunState: string,
  slotId: string,
) => {
  const record: Record<string, iForecastDataItem> = {};
  const { locale, timezone, formatterLocale } = resolvedLocale;

  let datetime: Date;

  if (forecast.condition && forecast.condition[slotId]) {
    record['condition'] = {
      img: getWeatherIcon(getEntityRawValue(hass, forecast.condition[slotId]), iconsConfig, sunState),
    };
  }

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
    if (metricKey === 'precipitation_intensity') decimals = 2;

    datetime = new Date(getEntityRawAttribute(hass, entityId, 'datetime'));
    record[metricKey] = {
      value: getEntityNumericValue({ entityId, hass, formatterLocale, decimals }),
      unit: getEntityUnit(hass, entityId),
      img: getEntityIcon(hass, entityId) || getDefaultIcon(metricKey),
    };
  });

  if (datetime && Object.keys(record).length > 0) {
    const weekday = datetime.toLocaleDateString(locale, {
      weekday: 'short',
      timeZone: 'UTC',
    });
    const hourday = datetime.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: timezone,
    });
    record['reference'] = { value: forecastType === 0 ? weekday.toUpperCase() : hourday };
  }

  return record;
};

const buildMarineDailyForecastSlot = (
  hass: HomeAssistant,
  resolvedLocale: ResolvedLocale,
  cwcLocWindDirections: Record<string, string>,
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
    if (waveHeightMax >= 1.8) return 'red';
    if (swellWaveHeightMax >= 1.5 && windWaveHeightMax >= 0.8) return 'red';
    if (waveHeightMax >= 1.0) return 'yellow';
    if (swellWaveHeightMax >= 0.8) return 'yellow';
    if (windWaveHeightMax >= 0.6) return 'yellow';
    return 'green';
  };

  const { locale, timezone, formatterLocale } = resolvedLocale;

  let datetime: Date;

  if (
    forecast.wave_height_max &&
    forecast.swell_wave_height_max &&
    forecast.wind_wave_height_max &&
    forecast.swell_wave_height_max[slotId] &&
    forecast.wind_wave_height_max[slotId]
  ) {
    record['condition'] = {
      icon: 'mdi:flag-variant',
      iconColor: fieldColor(
        forecast.wave_height_max[slotId],
        forecast.swell_wave_height_max[slotId],
        forecast.wind_wave_height_max[slotId],
      ),
    };
  }

  if (forecast.wave_direction && forecast.wave_direction[slotId]) {
    record['wave_direction'] = {
      value: getWindDirections(getEntityRawValue(hass, forecast.wave_direction[slotId]), cwcLocWindDirections),
      icon: getEntityRawValue(hass, forecast.wave_direction[slotId]),
    };
  }

  const metrics = ['wave_height_max', 'swell_wave_height_max', 'wind_wave_height_max'];

  metrics.forEach((metricKey) => {
    const metricSlots = forecast[metricKey];
    const entityId = metricSlots?.[slotId];
    const decimals = 1;

    if (!entityId) return;

    datetime = new Date(getEntityRawAttribute(hass, entityId, 'datetime'));
    record[metricKey] = {
      value: getEntityNumericValue({ entityId, hass, formatterLocale, decimals }),
      unit: getEntityUnit(hass, entityId),
      img: getEntityIcon(hass, entityId) || getDefaultIcon(metricKey),
    };
  });

  if (datetime && Object.keys(record).length > 0) {
    const weekday = datetime.toLocaleDateString(locale, {
      weekday: 'short',
      timeZone: 'UTC',
    });
    const hourday = datetime.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: timezone,
    });
    record['reference'] = { value: forecastType === 2 ? weekday.toUpperCase() : hourday };
  }

  return record;
};

const buildMarineHourlyForecastSlot = (
  hass: HomeAssistant,
  resolvedLocale: ResolvedLocale,
  cwcLocWindDirections: Record<string, string>,
  forecast: iMarineHourlyForecast,
  slotId: string,
): Record<string, iForecastDataItem> => {
  const record: Record<string, iForecastDataItem> = {};
  const { locale, timezone, formatterLocale } = resolvedLocale;

  let datetime: Date;

  const metrics = ['air_temperature', 'water_temperature', 'wind_speed', 'swell_height', 'swell_period'];
  metrics.forEach((metricKey) => {
    const entityId = forecast[metricKey]?.[slotId];
    if (!entityId) return;
    datetime = new Date(getEntityRawAttribute(hass, entityId, 'datetime'));
    record[metricKey] = {
      value: getEntityNumericValue({ entityId, hass, formatterLocale, decimals: 1 }),
      unit: getEntityUnit(hass, entityId),
      img: getEntityIcon(hass, entityId) || getDefaultIcon(metricKey),
    };
  });

  if (forecast.wind_direction?.[slotId]) {
    record['wind_direction'] = {
      value: getWindDirections(
        getEntityRawValue(hass, forecast.wind_direction[slotId]),
        cwcLocWindDirections,
      ),
    };
  }

  if (datetime && Object.keys(record).length > 0) {
    record['reference'] = {
      value: datetime.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: timezone,
      }),
    };
  }

  return record;
};

const buildWeatherForecast = (
  hass: HomeAssistant,
  resolvedLocale: ResolvedLocale,
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
      hass, resolvedLocale, dailyForecast, forecastType, iconsConfig, sunState, slotId,
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
      hass, resolvedLocale, terms.windDirections, hourlyForecast, forecastType, iconsConfig, sunState, slotId,
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
      hass, resolvedLocale, terms.windDirections, marineDailyForecasts, forecastType, iconsConfig, sunState, slotId,
    ));
  }

  let marineHourlyForecastData = voidRecord;
  if (marineHourlyForecasts) {
    const marineHourlySlotIds = Object.keys(
      marineHourlyForecasts.wind_direction ||
      marineHourlyForecasts.wind_speed ||
      marineHourlyForecasts.air_temperature ||
      {},
    );
    marineHourlyForecastData = marineHourlySlotIds.map((slotId) => buildMarineHourlyForecastSlot(
      hass, resolvedLocale, terms.windDirections, marineHourlyForecasts, slotId,
    ));
  }

  switch (forecastType) {
    case 0: return renderWeatherForecast(forecastType, dailyForecastData);
    case 1: return renderWeatherForecast(forecastType, hourlyforecastData);
    case 2: return renderWeatherForecast(forecastType, marineDailyForecastData);
    case 3: return renderWeatherForecast(forecastType, marineHourlyForecastData);
    default: return renderWeatherForecast(forecastType, voidRecord);
  }
};

export default buildWeatherForecast;
