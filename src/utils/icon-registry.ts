import { cwcBuienradarDayIcons, cwcBuienradarNightIcons } from '../iconmodels/im-buienradar';
import { cwcClimacellDayIcons, cwcClimacellNightIcons } from '../iconmodels/im-climacell';
import { cwcDarkskyDayIcons, cwcDarkskyNightIcons } from '../iconmodels/im-darksky';
import { cwcDefaultHassDayIcons, cwcDefaultHassNightIcons } from '../iconmodels/im-hass';
import { cwcOpenWeatherMapDayIcons, cwcOpenWeatherMapNightIcons } from '../iconmodels/im-openweathermap';
import { cwcDaytimePirateWeatherIcons, cwcNightlyPirateWeaterIcons } from '../iconmodels/im-pirateweather';

export interface IconsConfigResult {
  iconsModel: string;
  iconsDay: Record<string, string>;
  iconsNight: Record<string, string>;
}

export const iconsModels: Record<string, IconsConfigResult> = {
  pirateweather: {
    iconsModel: 'pirateweather',
    iconsDay: cwcDaytimePirateWeatherIcons,
    iconsNight: cwcNightlyPirateWeaterIcons,
  },
  climacell: {
    iconsModel: 'climacell',
    iconsDay: cwcClimacellDayIcons,
    iconsNight: cwcClimacellNightIcons,
  },
  darksky: {
    iconsModel: 'darksky',
    iconsDay: cwcDarkskyDayIcons,
    iconsNight: cwcDarkskyNightIcons,
  },
  openweathermap: {
    iconsModel: 'openweathermap',
    iconsDay: cwcOpenWeatherMapDayIcons,
    iconsNight: cwcOpenWeatherMapNightIcons,
  },
  buienradar: {
    iconsModel: 'buienradar',
    iconsDay: cwcBuienradarDayIcons,
    iconsNight: cwcBuienradarNightIcons,
  },
  defaulthass: {
    iconsModel: 'defaulthass',
    iconsDay: cwcDefaultHassDayIcons,
    iconsNight: cwcDefaultHassNightIcons,
  },
};

export const getIconModelData = (iconsModel: string): IconsConfigResult => {
  const modelName = iconsModel.toLowerCase();
  if (modelName in iconsModels) {
    return { ...iconsModels[modelName] };
  }
  console.warn(`Unknown icons model: "${modelName}". Falling back to "pirateweather".`);
  return { ...iconsModels.pirateweather };
};
