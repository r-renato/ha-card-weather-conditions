import { HomeAssistant } from 'custom-card-helpers/dist';

import renderWeatherSummary from '../templates/t-summary';
import {
  getEntityNumericValue,
  getEntityRawValue,
  getEntityUnit,
  translate,
} from '../utils/helper';

import { getMoonIcon, getWeatherIcon } from '../utils/helper-render';
import { iPresentData } from '../utils/config-schema';
import { iIconsConfig, iTerms } from '../base/lovelace-base';

const buildWeatherSummary = (
  hass: HomeAssistant,
  language: string,
  terms: iTerms,
  iconsConfig: iIconsConfig,
  name: string,
  presentData: iPresentData,
  sunId: string,
  moonphase: string,
) => {
  const moonPhase = getEntityRawValue(hass, moonphase);
  const moonIcon: string = moonPhase ? getMoonIcon(moonPhase) : '';
  const sun = getEntityRawValue(hass, sunId);
  const currentConditions = getEntityRawValue(hass, presentData.condition)?.toLowerCase() || 'na';
  // eslint-disable-next-line max-len
  const temperature = presentData.temperature ? getEntityNumericValue({ entityId: presentData.temperature, hass, lang: language }) ?? undefined : undefined;
  // eslint-disable-next-line max-len
  const temperatureFeelsLike = presentData.temperature_feelslike ? getEntityNumericValue({ entityId: presentData.temperature_feelslike, hass, lang: language }) ?? undefined : undefined;
  const temperatureFeelsLikeIcon = hass.states[presentData.temperature_feelslike]?.attributes.icon ?? '';

  return renderWeatherSummary({
    title: name ?? undefined, // 'Verkhnenovokutlumbetyevo',
    moonText: (moonphase ? translate(moonPhase, terms.words) : undefined),
    moonIcon,
    conditionText: currentConditions,
    conditionIcon: getWeatherIcon(currentConditions, iconsConfig, sun),
    temperature,
    temperatureUnit: getEntityUnit(hass, presentData.temperature),
    feelsLikeTerm: translate('Feels Like', terms.words),
    temperatureFeelsLike,
    temperatureFeelsLikeIcon,
  });
};

export default buildWeatherSummary;
