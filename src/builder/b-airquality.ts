/* eslint-disable camelcase */
/* eslint-disable no-else-return */
/* eslint-disable object-curly-newline */
import { HomeAssistant } from 'custom-card-helpers/dist';
import { iAirQuality } from '../utils/config-schema';
import { getEntityNumericValue, getEntityRawValue, getEntityUnit } from '../utils/helper';
import { renderWeatherPresent } from '../templates/t-present';

/**
 * Restituisce un colore (in formato hex) in base al valore dell'indice EPA AQI.
 * @param {number} aqi - Valore AQI compreso tra 0 e 500
 * @returns {string} - Colore esadecimale associato alla fascia AQI
 */
function getAQIColor(aqi: number): string {
  if (aqi <= 50) {
    return '#009966'; // Verde (Buona)
  } else if (aqi <= 100) {
    return '#ffde33'; // Giallo (Moderata)
  } else if (aqi <= 150) {
    return '#ff9933'; // Arancione (Sensibili)
  } else if (aqi <= 200) {
    return '#cc0033'; // Rosso (Non salutare)
  } else if (aqi <= 300) {
    return '#660099'; // Viola (Molto non salutare)
  } else {
    return '#7e0023'; // Marrone scuro (Pericolosa)
  }
}

const buildAirQuality = (
  hass: HomeAssistant,
  language: string,
  airquality: iAirQuality,
) => {
  const lang = language || hass.selectedLanguage || hass.language;

  const pm25 = getEntityNumericValue({ entityId: airquality.pm25, hass, lang: language, decimals: 0 });
  const pm10 = getEntityNumericValue({ entityId: airquality.pm10, hass, lang: language, decimals: 0 });
  const o3 = getEntityNumericValue({ entityId: airquality.o3, hass, lang: language, decimals: 1 });
  const no2 = getEntityNumericValue({ entityId: airquality.no2, hass, lang: language, decimals: 0 });
  const co = getEntityNumericValue({ entityId: airquality.co, hass, lang: language, decimals: 1 });
  const so2 = getEntityNumericValue({ entityId: airquality.so2, hass, lang: language, decimals: 0 });
  const epa_aqi = getEntityNumericValue({ entityId: airquality.epa_aqi, hass, lang: language, decimals: 0 });
  const epa_primary_pollutant = getEntityRawValue(hass, airquality.epa_primary_pollutant);

  const airQualityData = {
    pm25: {
      value: (pm25 ? `pm2.5 ${pm25}` : pm25),
      unit: getEntityUnit(hass, airquality.pm25) || 'µg/m³',
      icon: 'mdi:weather-hazy',
    },
    pm10: {
      value: (pm10 ? `pm10 ${pm10}` : pm10),
      unit: getEntityUnit(hass, airquality.pm10) || 'µg/m³',
      icon: 'mdi:weather-hazy',
    },
    o3: {
      value: (o3 ? `o3 ${o3}` : o3),
      unit: getEntityUnit(hass, airquality.o3) || 'µg/m³',
      icon: 'mdi:molecule',
    },
    no2: {
      value: (no2 ? `no2 ${no2}` : no2),
      unit: getEntityUnit(hass, airquality.no2) || 'µg/m³',
      icon: 'mdi:molecule',
    },
    co: {
      value: (co ? `co ${co}` : co),
      unit: getEntityUnit(hass, airquality.co) || 'µg/m³',
      icon: 'mdi:molecule',
    },
    so2: {
      value: (so2 ? `so2 ${so2}` : so2),
      unit: getEntityUnit(hass, airquality.so2) || 'µg/m³',
      icon: 'mdi:molecule',
    },
    epa_aqi: {
      value: (epa_aqi ? `Air Quality Index ${epa_aqi}` : epa_aqi),
      // unit: getEntityUnit(hass, airquality.epa_aqi) || 'µg/m³',
      icon: 'mdi:weather-hazy',
      icon_color: getAQIColor(Number(getEntityRawValue(hass, airquality.epa_aqi))),
    },
    epa_primary_pollutant: {
      value: (epa_primary_pollutant ? `Primary ${epa_primary_pollutant}` : epa_primary_pollutant),
      // unit: getEntityUnit(hass, airquality.epa_aqi) || 'µg/m³',
      icon: 'mdi:weather-hazy',
    },
  };

  return renderWeatherPresent(airQualityData, lang);
};

export default buildAirQuality;
