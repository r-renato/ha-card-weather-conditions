import { HomeAssistant } from 'custom-card-helpers/dist';
import { ResolvedLocale } from '../utils/locale';
import { getEntityNumericValue, getEntityRawValue } from '../utils/entity';
import renderUltraviolet from '../templates/t-ultraviolet';
import { iUltraviolet } from '../utils/config-schema';
import { iTerms } from '../base/lovelace-base';

const getTime = (state?: string | number): string => {
  const value = typeof state === 'string' && state.toLowerCase() === 'unknown'
    ? NaN
    : Number(state);
  if (!Number.isFinite(value) || value < 0) return '--';

  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, '0')} h`
    : `${minutes} m`;
};

const summaryData = (hass: HomeAssistant, formatterLocale: string, uv: iUltraviolet) => ({
  protectionWindow: {
    value: (!getEntityRawValue(hass, uv.protection_window) || getEntityRawValue(hass, uv.protection_window) === 'unknown'
      ? 'off'
      : getEntityRawValue(hass, uv.protection_window)),
    icon: 'mdi:sunglasses',
  },
  currentUVLevel: {
    value: getEntityRawValue(hass, uv.uv_level),
    icon: 'mdi:weather-sunny',
  },
  currentUVIndex: {
    value: getEntityNumericValue({ entityId: uv.uv_index, hass, formatterLocale }),
    unit: 'UV Idx',
    icon: 'mdi:weather-sunny',
  },
  maxUVIndex: {
    value: getEntityNumericValue({ entityId: uv.max_uv_index, hass, formatterLocale }),
    unit: 'UV Idx',
    icon: 'mdi:weather-sunny',
  },
  currentOzoneLevel: {
    value: getEntityNumericValue({ entityId: uv.ozone_level, hass, formatterLocale }),
    unit: 'DU',
    icon: 'mdi:vector-triangle',
  },
});

const skinData = (hass: HomeAssistant, formatterLocale: string, uv: iUltraviolet) => ({
  skinType1: { value: getTime(getEntityNumericValue({ entityId: uv.set_skin_type_1, hass, formatterLocale })) },
  skinType2: { value: getTime(getEntityNumericValue({ entityId: uv.set_skin_type_2, hass, formatterLocale })) },
  skinType3: { value: getTime(getEntityNumericValue({ entityId: uv.set_skin_type_3, hass, formatterLocale })) },
  skinType4: { value: getTime(getEntityNumericValue({ entityId: uv.set_skin_type_4, hass, formatterLocale })) },
  skinType5: { value: getTime(getEntityNumericValue({ entityId: uv.set_skin_type_5, hass, formatterLocale })) },
  skinType6: { value: getTime(getEntityNumericValue({ entityId: uv.set_skin_type_6, hass, formatterLocale })) },
});

const buildUltraviolet = (hass: HomeAssistant, resolvedLocale: ResolvedLocale, uv: iUltraviolet, terms: iTerms) => {
  return renderUltraviolet(
    { ...summaryData(hass, resolvedLocale.formatterLocale, uv) },
    { ...skinData(hass, resolvedLocale.formatterLocale, uv) },
    terms.words,
  );
};

export default buildUltraviolet;
