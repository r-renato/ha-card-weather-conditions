/* eslint-disable camelcase */
/* eslint-disable quote-props */
import { HomeAssistant } from 'custom-card-helpers/dist';
import { ResolvedLocale } from '../utils/locale';
import { iTerms } from '../base/lovelace-base';
import { iDPCAlert } from '../utils/config-schema';
import renderMeteoDPCalarm, { iWeatherMeteoDPCAlarmDataInterface } from '../templates/t-meteoalarm';

const getEffectiveLabel = (effective: string) => {
  const effectiveDatetime = new Date(effective);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const effDate = new Date(effectiveDatetime.getFullYear(), effectiveDatetime.getMonth(), effectiveDatetime.getDate());
  const dayDiff = Math.round((effDate.getTime() - today.getTime()) / 86400000);
  if (dayDiff === 0) return 'oggi';
  if (dayDiff === 1) return 'domani';
  if (dayDiff === 2) return 'dopodomani';
  return undefined;
};

const buildMeteoAlarmData = (
  hass: HomeAssistant,
  resolvedLocale: ResolvedLocale,
  meteoalarmId: string,
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
  if (meteoalarm.state === 'on') {
    const {
      event,
      severity,
      awareness_type,
      awareness_level,
      effective,
    } = meteoalarm.attributes;
    const effectiveDatetime = getEffectiveLabel(effective);

    fpcData['meteoalarm'] = {
      event: event || '',
      severity: severity?.split(';')[1]?.trim() || '',
      icon: eventIcon[awareness_type?.split(';')[1]?.trim().toLowerCase() || ''] || 'mdi:alert',
      icon_color: eventIconColor[awareness_level?.split(';')[1]?.trim().toLowerCase() || ''] || 'grey',
      datetime: effectiveDatetime || new Date(effective).toLocaleDateString(resolvedLocale.locale, {
        weekday: 'short',
        timeZone: resolvedLocale.timezone,
      }).toLocaleUpperCase(),
    };
  }
  return fpcData;
};

const buildDPCAlarmData = (
  hass: HomeAssistant,
  resolvedLocale: ResolvedLocale,
  dpcalarm: iDPCAlert,
): Record<string, iWeatherMeteoDPCAlarmDataInterface> => {
  if (!dpcalarm) return {};
  const eventIconColor: Record<number, string> = {
    0: 'gray',
    1: 'green',
    2: '#ffa600',
    3: 'orange',
    4: 'red',
  };
  const fpcData: Record<string, iWeatherMeteoDPCAlarmDataInterface> = {};

  (['thunderstorms', 'hydraulic', 'hydrogeological'] as const).forEach((key) => {
    const entityId = dpcalarm[key];
    const entity = entityId && hass.states[entityId];
    if (entity?.state === 'on' && entity.attributes) {
      const { level, info, icon } = entity.attributes;
      fpcData[key] = {
        event: info,
        severity: level,
        icon,
        icon_color: eventIconColor[level],
        datetime: new Date().toLocaleDateString(resolvedLocale.locale, {
          weekday: 'short',
          timeZone: resolvedLocale.timezone,
        }).toLocaleUpperCase(),
      };
    }
  });
  return fpcData;
};

const buildMeteoDPCalarm = (
  hass: HomeAssistant,
  resolvedLocale: ResolvedLocale,
  terms: iTerms,
  meteoalarmId: string,
  dpcalarm: iDPCAlert,
) => renderMeteoDPCalarm({
  ...buildMeteoAlarmData(hass, resolvedLocale, meteoalarmId),
  ...buildDPCAlarmData(hass, resolvedLocale, dpcalarm),
});

export default buildMeteoDPCalarm;
