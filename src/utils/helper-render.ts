import { css } from 'lit';
// import { HomeAssistant } from 'custom-card-helpers/dist';

import { cwcMoonPhaseIcons } from '../../backup/ha-cwc-consts';

import cardStyle from '../css/css-base-card';
import summaryStyles from '../css/css-summary';
import presentStyle from '../css/css-present';
import ultravioletStyle from '../css/css-ultraviolet';
import pollenStyle from '../css/css-pollen';
import cameraStyle from '../css/css-camera';
import { iIconsConfig } from '../base/lovelace-base';
import weatherForecastStyle from '../css/css-weather-forecast';
import meteodcpalarmStyle from '../css/css-meteoalarm';

export const getMoonIcon = (phase: string): string => cwcMoonPhaseIcons[phase.toLowerCase()];

export const getWeatherIcon = (
  condition: string,
  iconsConfig: iIconsConfig,
  sunState: string,
): string => {
  const isNight = sunState === 'below_horizon';
  const iconMap = isNight ? iconsConfig.iconsNight : iconsConfig.iconsDay;
  const iconName = iconMap[condition];

  if (!iconsConfig.path) {
    console.info('Image path not found.');
  }

  if (!iconName) {
    console.info(
      `Icons issue. Model=${iconsConfig.icons_model}, Time=${isNight ? 'night' : 'day'}, Condition=${condition}`,
    );
    return '';
  }

  return `${iconsConfig.path}/${iconsConfig.iconType}/${iconName}.svg`;
};

// export const getSensorUnit = (hass: HomeAssistant, measure: string): string => {
//   const lengthUnit = hass.config.unit_system.length;

//   const unitOverrides: Record<string, string> = {
//     air_pressure: lengthUnit === 'km' ? 'hPa' : 'inHg',
//     precipitation: lengthUnit === 'km' ? 'mm' : 'in',
//     length: lengthUnit,
//   };

//   if (measure in unitOverrides) {
//     return unitOverrides[measure];
//   }

//   const unit = (hass.config.unit_system as Record<string, string>)[measure];

//   if (unit !== undefined) {
//     return unit;
//   }

//   console.warn(`Unit for '${measure}' not found in hass.config.unit_system.`);
//   return '';
// };

export const getCardStyles = () => css`
${cardStyle}
${summaryStyles}
${presentStyle}
${weatherForecastStyle}
${ultravioletStyle}
${pollenStyle}
${cameraStyle}
${meteodcpalarmStyle}
`;
