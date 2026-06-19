/* eslint-disable camelcase */
import { HomeAssistant } from 'custom-card-helpers/dist';
import { ResolvedLocale, translate } from '../utils/locale';
import { iAirQuality } from '../utils/config-schema';
import { getEntityNumericValue, getEntityRawValue, getEntityUnit } from '../utils/entity';
import { renderAirQuality, iAirQualityPollutant } from '../templates/t-airquality';
import { iTerms } from '../base/lovelace-base';

const getAQIColor = (aqi: number): string => {
  if (aqi <= 50) return '#009966';
  if (aqi <= 100) return '#ffde33';
  if (aqi <= 150) return '#ff9933';
  if (aqi <= 200) return '#cc0033';
  if (aqi <= 300) return '#660099';
  return '#7e0023';
};

const getAQILabel = (aqi: number, wordDict: Record<string, string>): string => {
  if (aqi <= 50) return translate('Good', wordDict);
  if (aqi <= 100) return translate('Moderate', wordDict);
  if (aqi <= 150) return translate('Unhealthy for sensitive groups', wordDict);
  if (aqi <= 200) return translate('Unhealthy', wordDict);
  if (aqi <= 300) return translate('Very unhealthy', wordDict);
  return translate('Hazardous', wordDict);
};

const formatPollutantName = (raw: string): string => {
  const map: Record<string, string> = {
    o3: 'O₃',
    pm2_5: 'PM2.5',
    pm25: 'PM2.5',
    'pm2.5': 'PM2.5',
    pm10: 'PM10',
    no2: 'NO₂',
    co: 'CO',
    so2: 'SO₂',
  };
  return map[raw?.toLowerCase()] ?? raw?.toUpperCase() ?? raw;
};

const buildAirQuality = (
  hass: HomeAssistant,
  resolvedLocale: ResolvedLocale,
  airquality: iAirQuality,
  terms: iTerms,
) => {
  const { formatterLocale } = resolvedLocale;

  const aqiRaw = getEntityRawValue(hass, airquality.epa_aqi);
  const aqiNum = aqiRaw !== undefined ? Number(aqiRaw) : undefined;
  const aqiDisplay = getEntityNumericValue({
    entityId: airquality.epa_aqi,
    hass,
    formatterLocale,
    decimals: 0,
  });

  const primaryRaw = getEntityRawValue(hass, airquality.epa_primary_pollutant);

  const candidatePollutants: { key: keyof iAirQuality; display: string; decimals: number }[] = [
    { key: 'pm25', display: 'PM2.5', decimals: 0 },
    { key: 'pm10', display: 'PM10', decimals: 0 },
    { key: 'o3', display: 'O₃', decimals: 1 },
    { key: 'no2', display: 'NO₂', decimals: 0 },
    { key: 'co', display: 'CO', decimals: 1 },
    { key: 'so2', display: 'SO₂', decimals: 0 },
  ];

  const pollutants: iAirQualityPollutant[] = candidatePollutants.reduce<iAirQualityPollutant[]>(
    (acc, { key, display, decimals }) => {
      const val = getEntityNumericValue({
        entityId: airquality[key],
        hass,
        formatterLocale,
        decimals,
      });
      if (val !== undefined && val !== null) {
        acc.push({
          name: display,
          value: val,
          unit: getEntityUnit(hass, airquality[key]) || 'µg/m³',
        });
      }
      return acc;
    },
    [],
  );

  return renderAirQuality({
    aqiValue: aqiDisplay,
    aqiColor: aqiNum !== undefined && !Number.isNaN(aqiNum) ? getAQIColor(aqiNum) : undefined,
    aqiLabel: aqiNum !== undefined && !Number.isNaN(aqiNum) ? getAQILabel(aqiNum, terms.words) : undefined,
    primaryPollutant: primaryRaw ? formatPollutantName(primaryRaw) : undefined,
    pollutants,
  }, terms.words);
};

export default buildAirQuality;
