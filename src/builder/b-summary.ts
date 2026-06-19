import { HomeAssistant } from 'custom-card-helpers/dist';
import { ResolvedLocale, translate } from '../utils/locale';
import { getEntityNumericValue, getEntityRawValue, getEntityUnit } from '../utils/entity';
import renderWeatherSummary from '../templates/t-summary';
import { getMoonIcon, getWeatherIcon, MoonHemisphere } from '../utils/helper-render';
import { iPresentData } from '../utils/config-schema';
import { iIconsConfig, iTerms } from '../base/lovelace-base';

const buildWeatherSummary = (
  hass: HomeAssistant,
  resolvedLocale: ResolvedLocale,
  terms: iTerms,
  iconsConfig: iIconsConfig,
  name: string,
  presentData: iPresentData,
  sunId: string,
  moonphase: string,
  hemisphere: MoonHemisphere = 'north',
) => {
  const { formatterLocale } = resolvedLocale;
  const moonPhase = getEntityRawValue(hass, moonphase);
  const moonIcon: string = moonPhase ? getMoonIcon(moonPhase, hemisphere) : '';
  const sun = getEntityRawValue(hass, sunId);
  const currentConditions = getEntityRawValue(hass, presentData.condition)?.toLowerCase() || 'na';

  const temperature = presentData.temperature
    ? getEntityNumericValue({ entityId: presentData.temperature, hass, formatterLocale }) ?? undefined
    : undefined;
  const temperatureFeelsLike = presentData.temperature_feelslike
    ? getEntityNumericValue({ entityId: presentData.temperature_feelslike, hass, formatterLocale }) ?? undefined
    : undefined;
  const temperatureFeelsLikeIcon = hass.states[presentData.temperature_feelslike]?.attributes.icon ?? '';

  const lightningAzimuth = parseFloat(getEntityRawValue(hass, presentData.lightning_azimuth) ?? '0');
  const lightningDistance = parseFloat(getEntityRawValue(hass, presentData.lightning_distance) ?? '0');
  const lightningStrikes = parseFloat(getEntityRawValue(hass, presentData.lightning_strikes) ?? '0');

  return renderWeatherSummary({
    title: name ?? undefined,
    moonText: moonphase ? translate(moonPhase, terms.words) : undefined,
    moonIcon,
    conditionText: currentConditions,
    conditionIcon: getWeatherIcon(currentConditions, iconsConfig, sun),
    temperature,
    temperatureUnit: getEntityUnit(hass, presentData.temperature),
    feelsLikeTerm: translate('Feels Like', terms.words),
    temperatureFeelsLike,
    temperatureFeelsLikeIcon,
    lightningAzimuth,
    lightningDistance,
    lightningStrikes,
  });
};

export default buildWeatherSummary;
