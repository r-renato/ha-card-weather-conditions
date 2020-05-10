import {cwcLocale, cwcLocWindDirections, cwcTerms, cwcMoonPhaseIcons} from "./ha-cwc-consts";
import {HomeAssistant} from "custom-card-helpers/dist";
import {IconsConfig} from "./types";

import {hacsImagePathExist, manImagePathExist} from "./ha-card-weather-conditions" ;

/**
 *
 * @param imageSrc
 */
export function imageExist(imageSrc: string) {
  return new Promise<boolean>((resolve)  => {
    setTimeout(() => {
      let img = new Image();
      img.onload = () => { resolve(true) ; };
      img.onerror = () => { resolve(false) ; };
      img.src = imageSrc;
    }, 100);
  });
}

/**
 *
 * @param term
 * @param lang
 */
export const translate = (term:string, lang: string) => {
  // console.info(">>>>loc:" + lang + "" + cwcLocale[lang] ) ;
  return cwcTerms[term][cwcLocale[lang]] ;
} ;

/**
 *
 * @param condition
 * @param iconsConfig
 * @param sunState
 */
export const getWeatherIcon = (condition: string, iconsConfig: IconsConfig, sunState: string) => {
  let isNight:boolean = sunState && sunState == "below_horizon" ;
  let iconName = isNight ? iconsConfig.iconsNight[condition] : iconsConfig.iconsDay[condition] ;

  if (iconsConfig.path == null) {
    console.info("Image path not found. (hacsImagePathExist=" + hacsImagePathExist
                  + ")(manImagePathExist=" + manImagePathExist) ;
  }

  if(undefined === iconName)
    console.info( "Icons issue. States: icons_model=" + iconsConfig.icons_model
      + " - isDay=" + (!isNight) + " - condition: " + condition + ".") ;

  //console.info(this._config.weather.icons_model + ' - ' + condition + ' - ' + this._weatherIconsDay[condition]) ;
  return `${iconsConfig.path}/${iconsConfig.iconType}/${iconName}.svg` ;
} ;

/**
 *
 * @param condition
 * @param iconsConfig
 * @param sunState
 */
export const getWeatherBg = (condition: string, iconsConfig: IconsConfig, sunState: string) => {
  let isNight:boolean = sunState && sunState == "below_horizon" ;
  let iconName = isNight ? iconsConfig.iconsNight[condition] : iconsConfig.iconsDay[condition] ;

  if (iconsConfig.path == null) {
    console.info("Image path not found. (hacsImagePathExist=" + hacsImagePathExist
      + ")(manImagePathExist=" + manImagePathExist) ;
  }

  if(undefined === iconName)
    console.info( "Icons issue. States: icons_model=" + iconsConfig.icons_model
      + " - isDay=" + (!isNight) + " - condition: " + condition + ".") ;

  //console.info(this._config.weather.icons_model + ' - ' + condition + ' - ' + this._weatherIconsDay[condition]) ;
  return `${iconsConfig.path}/background/${iconName}` ;
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

export function getMoonIcon(phase:string) {
  return( cwcMoonPhaseIcons[phase.toLowerCase()] ) ;
}

// export function circadianRhythm( hass: HomeAssistant, sunId: string ) {
//   let lightRatio;
//   // let nextUpdate;
//
//   let sun = hass.states[sunId] ;
//
//   const now = (new Date()).getTime();
//
//   let times = {
//     sunrise: (new Date(sun.attributes.next_dawn)).getTime(),
//     sunriseEnd: (new Date(sun.attributes.next_rising)).getTime(),
//
//     sunsetStart: (new Date(sun.attributes.next_setting)).getTime(),
//     sunset: (new Date(sun.attributes.next_dusk)).getTime(),
//   };
//
//   console.info( JSON.stringify(times));
//   if (now > times.sunrise && now < times.sunriseEnd) {
//     lightRatio = (now - times.sunrise) / (times.sunriseEnd - times.sunrise);
//     // nextUpdate = now + UPDATE_FREQUENCY;
//   } else if(now > times.sunriseEnd && now < times.sunsetStart) {
//     lightRatio = 1;
//     // nextUpdate = times.sunsetStart;
//   } else if (now > times.sunsetStart && now < times.sunset) {
//     lightRatio = (times.sunset - now) / (times.sunset - times.sunsetStart);
//     // nextUpdate = now + UPDATE_FREQUENCY;
//   } else {
//     lightRatio = 0;
//     // nextUpdate = times.sunrise;
//   }
//
// // Range (in lux) from 0.0001 to 100000 in increments of 0.0001.
//   const lightLevel = Math.round(1 + lightRatio * 999999999) / 10000;
//
//   console.info( "lightLevel=" + lightLevel + " - lightRatio: " + lightRatio ) ;
//   return lightLevel ;
// }

