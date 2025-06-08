import { HomeAssistant } from 'custom-card-helpers/dist';

import { getEntityNumericValue, getEntityRawValue, pad } from '../utils/helper';
import renderUltraviolet from '../templates/t-ultraviolet';
import { iUltraviolet } from '../utils/config-schema';

// const getRawValue = (hass: HomeAssistant, entityId?: string): string | undefined => entityId && hass.states[entityId]?.state;
// const getValue = (hass: HomeAssistant, entityId?: string, lang: string = 'en', decimals = 0): string | undefined => {
//   const state = entityId && hass.states[entityId]?.state;
//   return state !== undefined ? formatNumber(state, lang, decimals) : undefined;
// };

const getTime = (state?: string | number): string => {
  const value = typeof state === 'string' && state.toLowerCase() === 'unknown'
    ? NaN
    : Number(state);
  // console.debug(state);
  if (!Number.isFinite(value) || value < 0) return '--';

  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  return hours > 0
    ? `${hours}:${pad(minutes, 2)} h`
    : `${minutes} m`;
};

const summaryData = (hass: HomeAssistant, lang: string, uv: iUltraviolet) => ({
  protectionWindow: {
    value: (!getEntityRawValue(hass, uv.protection_window) || getEntityRawValue(hass, uv.protection_window) === 'unknown' ? 'off' :
      getEntityRawValue(hass, uv.protection_window)
    ),
    icon: 'mdi:sunglasses',
  },
  currentUVLevel: { value: getEntityRawValue(hass, uv.uv_level), icon: 'mdi:weather-sunny' },
  currentUVIndex: { value: getEntityNumericValue({ entityId: uv.uv_index, hass, lang }), unit: 'UV Idx', icon: 'mdi:weather-sunny' },
  maxUVIndex: { value: getEntityNumericValue({ entityId: uv.max_uv_index, hass, lang }), unit: 'UV Idx', icon: 'mdi:weather-sunny' },
  currentOzoneLevel: { value: getEntityNumericValue({ entityId: uv.ozone_level, hass, lang }), unit: 'DU', icon: 'mdi:vector-triangle' },
});

const skinData = (hass: HomeAssistant, lang: string, uv: iUltraviolet) => ({
  skinType1: { value: getTime(getEntityNumericValue({ entityId: uv.set_skin_type_1, hass, lang })) },
  skinType2: { value: getTime(getEntityNumericValue({ entityId: uv.set_skin_type_2, hass, lang })) },
  skinType3: { value: getTime(getEntityNumericValue({ entityId: uv.set_skin_type_3, hass, lang })) },
  skinType4: { value: getTime(getEntityNumericValue({ entityId: uv.set_skin_type_4, hass, lang })) },
  skinType5: { value: getTime(getEntityNumericValue({ entityId: uv.set_skin_type_5, hass, lang })) },
  skinType6: { value: getTime(getEntityNumericValue({ entityId: uv.set_skin_type_6, hass, lang })) },
});

const buildUltraviolet = (hass: HomeAssistant, lang: string, uv: iUltraviolet) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  renderUltraviolet({ ...summaryData(hass, lang, uv) }, { ...skinData(hass, lang, uv) });

export default buildUltraviolet;
