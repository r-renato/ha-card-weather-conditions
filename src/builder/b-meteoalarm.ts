/* eslint-disable camelcase */
/* eslint-disable quote-props */
import { HomeAssistant } from 'custom-card-helpers/dist';
import { iTerms } from '../base/lovelace-base';
import { iDPCAlert } from '../utils/config-schema';
import renderMeteoDPCalarm, { iWeatherMeteoDPCAlarmDataInterface } from '../templates/t-meteoalarm';
import { getLocaleInfo } from '../utils/helper';

const getEffectiveLabel = (effective: string) => {
  const effectiveDatetime = new Date(effective);
  const now = new Date();

  // Reset dell'ora per confronto solo a livello di giorno
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const effectiveDate = new Date(effectiveDatetime.getFullYear(), effectiveDatetime.getMonth(), effectiveDatetime.getDate());

  const msInDay = 24 * 60 * 60 * 1000;
  const dayDifference = Math.round((effectiveDate.getTime() - today.getTime()) / msInDay);

  let effectiveLabel: 'oggi' | 'domani' | 'dopodomani' | undefined;

  if (dayDifference === 0) {
    effectiveLabel = 'oggi';
  } else if (dayDifference === 1) {
    effectiveLabel = 'domani';
  } else if (dayDifference === 2) {
    effectiveLabel = 'dopodomani';
  } else {
    effectiveLabel = undefined;
  }
  return effectiveLabel;
};

const buildMeteoAlarmData = (
  hass: HomeAssistant,
  lang: string,
  terms: iTerms,
  meteoalarmId: string,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, iWeatherMeteoDPCAlarmDataInterface> => {
  const eventIcon: Record<string, string> = {
    'wind': 'mdi:weather-windy',
    'snow-ice': 'mdi:snowflake-alert',
    'thunderstorm': 'mdi:weather-lightning',
    'fog': 'mdi:weather-fog',
    'high-temperature': 'mdi:weather-sunny-alert',
    'low-temperature': 'mdi:thermometer-low',
    'coastal-event': 'mdi:home-flood',
    'forest-fire': 'mdi:pine-tree-fire',
    'avalanche': 'mdi:image-filter-hdr',
    'rain': 'mdi:weather-pouring',
    'flood': 'mdi:home-flood',
    'rain-flood': 'mdi:weather-pouring',
    'marine-hazard': 'mdi:weather-hurricane',
    'drought': 'mdi:water-off',
  };

  const eventIconColor: Record<string, string> = {
    green: 'green',
    yellow: '#ffa600',
    orange: 'orange',
    red: 'red',
  };

  const meteoalarm = meteoalarmId && hass.states[meteoalarmId];
  if (!meteoalarm?.attributes) return {};

  const fpcData: Record<string, iWeatherMeteoDPCAlarmDataInterface> = {};

  if (meteoalarm.state === 'on' && meteoalarm.attributes) {
    const localeInfo = getLocaleInfo(lang);
    const {
      event,
      severity,
      awareness_type,
      awareness_level,
      effective,
    } = meteoalarm.attributes;

    const awarenessType = awareness_type?.split(';')[1]?.trim().toLowerCase() || '';
    const awarenessLevel = awareness_level?.split(';')[1]?.trim().toLowerCase() || '';
    const eventName = event || '';
    const severityLevel = severity?.split(';')[1]?.trim() || '';
    const effectiveDatetime = getEffectiveLabel(effective);

    fpcData['meteoalarm'] = {
      event: eventName,
      severity: severityLevel,
      icon: eventIcon[awarenessType] || 'mdi:alert',
      icon_color: eventIconColor[awarenessLevel] || 'grey',
      datetime: (new Date(effective)).toLocaleDateString(localeInfo.locale, {
        weekday: 'short',
        timeZone: localeInfo.timezone,
      }).toLocaleUpperCase(),
    };
  }

  return fpcData;
};

const buildDPCAlarmData = (
  hass: HomeAssistant,
  lang: string,
  terms: iTerms,
  dpcalarm: iDPCAlert,
) => {
  if (!dpcalarm) return {};

  const localeInfo = getLocaleInfo(lang);
  const eventIconColor = {
    0: 'gray',
    1: 'green',
    2: '#ffa600',
    3: 'orange',
    4: 'red',
  };

  const sources = ['thunderstorms', 'hydraulic', 'hydrogeological'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fpcData: Record<string, iWeatherMeteoDPCAlarmDataInterface> = {};

  sources.forEach((key) => {
    const entityId = dpcalarm[key as keyof iDPCAlert];
    const entity = entityId && hass.states[entityId];

    if (entity && entity.state === 'on' && entity.attributes) {
      const { level, info, icon } = entity.attributes;
      fpcData[key] = {
        event: info,
        severity: level,
        icon,
        icon_color: eventIconColor[level],
        datetime: (new Date()).toLocaleDateString(localeInfo.locale, {
          weekday: 'short',
          timeZone: localeInfo.timezone,
        }).toLocaleUpperCase(),
      };
    }
  });
  return fpcData;
};

const buildMeteoDPCalarm = (
  hass: HomeAssistant,
  lang: string,
  terms: iTerms,
  meteoalarmId: string,
  dpcalarm: iDPCAlert, 
) => {
  const alarmsData = { ...buildMeteoAlarmData(hass, lang, terms, meteoalarmId), ...buildDPCAlarmData(hass, lang, terms, dpcalarm) };
  // console.debug('buildMeteoDPCalarm', alarmsData);
  return renderMeteoDPCalarm(alarmsData);
};

export default buildMeteoDPCalarm;
