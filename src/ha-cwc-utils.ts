import {cwcLocale, cwcLocWindDirections} from "./ha-cwc-consts";
import {HomeAssistant} from "custom-card-helpers/dist";
import {IconsConfig} from "./types";

/**
 *
 * @param condition
 * @param sun
 */
export const getWeatherIcon = (condition: string, iconsConfig: IconsConfig, sunState: string) => {
  let isNight = sunState && sunState == "below_horizon" ;

  if (iconsConfig.path == null)
    console.info("Image path not found.") ;

  //console.info(this._config.weather.icons_model + ' - ' + condition + ' - ' + this._weatherIconsDay[condition]) ;
  return `${iconsConfig.path}/${iconsConfig.iconType}/${isNight 
    ? iconsConfig.iconsNight[condition] : iconsConfig.iconsDay[condition]}.svg`;
} ;

/**
 *
 * @param measure
 * @param hass
 */
export const getUnit = (hass: HomeAssistant, measure: string) => {
  const lengthUnit = hass.config.unit_system.length ;

  switch (measure) {
    case "air_pressure":
      return lengthUnit === "km" ? "hPa" : "inHg";
    case "length":
      return lengthUnit;
    case "precipitation":
      return lengthUnit === "km" ? "mm" : "in";
    default:
      return hass.config.unit_system[measure] || "";
  }
} ;

export const getWindDirections = (wd: number, locale: string) => {
  if (wd < 0 || wd > 360) {
    console.log("Enter a degree between 0 and 360 degrees.");
    return null;
  }

  if (wd >= 0 && wd <= 11.25)
    return cwcLocWindDirections['N'][cwcLocale[locale]];

  if (wd > 348.75 && wd <= 360)
    return cwcLocWindDirections['N'][cwcLocale[locale]];

  if (wd > 11.25 && wd <= 33.75)
    return cwcLocWindDirections['NNE'][cwcLocale[locale]];

  if (wd > 33.75 && wd <= 56.25)
    return cwcLocWindDirections['NE'][cwcLocale[locale]];

  if (wd > 56.25 && wd <= 78.75)
    return cwcLocWindDirections['ENE'][cwcLocale[locale]];

  if (wd > 78.75 && wd <= 101.25)
    return cwcLocWindDirections['E'][cwcLocale[locale]];

  if (wd > 101.25 && wd <= 123.75)
    return cwcLocWindDirections['ESE'][cwcLocale[locale]];

  if (wd > 123.75 && wd <= 146.25)
    return cwcLocWindDirections['SE'][cwcLocale[locale]];

  if (wd > 146.25 && wd <= 168.75)
    return cwcLocWindDirections['SSE'][cwcLocale[locale]];

  if (wd > 168.75 && wd <= 191.25)
    return cwcLocWindDirections['S'][cwcLocale[locale]];

  if (wd > 191.25 && wd <= 213.75)
    return cwcLocWindDirections['SSW'][cwcLocale[locale]];

  if (wd > 213.75 && wd <= 236.25)
    return cwcLocWindDirections['SW'][cwcLocale[locale]];

  if (wd > 236.25 && wd <= 258.75)
    return cwcLocWindDirections['WSW'][cwcLocale[locale]];

  if (wd > 258.75 && wd <= 281.25)
    return cwcLocWindDirections['W'][cwcLocale[locale]];

  if (wd > 281.25 && wd <= 303.75)
    return cwcLocWindDirections['WNW'][cwcLocale[locale]];

  if (wd > 303.75 && wd <= 326.25)
    return cwcLocWindDirections['NW'][cwcLocale[locale]];

  if (wd > 326.25 && wd <= 348.75)
    return cwcLocWindDirections['NNW'][cwcLocale[locale]];

  return null;
} ;

/**
 *
 * @param e
 * @param entityId
 */
export const handlePopup = (e, entityId: string) => {
  e.stopPropagation();

  let ne = new Event('hass-more-info', {composed: true});
  // @ts-ignore
  ne.detail = {entityId};
  dispatchEvent(ne);
} ;


