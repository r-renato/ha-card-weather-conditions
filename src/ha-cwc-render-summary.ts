import {
  html
} from "lit-element";

import {getUnit, getWeatherIcon,translate} from "./ha-cwc-utils" ;
import {Current, IconsConfig} from "./types" ;
import {HomeAssistant} from "custom-card-helpers/dist" ;

/**
 *
 * @param hass
 * @param currentCfg
 * @param name
 * @param iconsConfig
 */
export const renderSummary = (hass: HomeAssistant, currentCfg: Current, name: string, iconsConfig: IconsConfig, lang: string) => {
  let temperature, feels_like ;
  let sun = currentCfg.sun && hass.states[currentCfg.sun] ? hass.states[currentCfg.sun].state : undefined ;
  let current_conditions = currentCfg.current_conditions && hass.states[currentCfg.current_conditions]
    ? hass.states[currentCfg.current_conditions].state : "Na" ;

  if( currentCfg.temperature && hass.states[currentCfg.temperature] ) {
    if(getUnit(hass, "temperature") == "°F")
      temperature = Math.round(parseFloat(hass.states[currentCfg.temperature].state)) ;
    else temperature = parseFloat(hass.states[currentCfg.temperature].state) ;
  } else {
    temperature = "Na" ;
  }

  if( currentCfg.feels_like && hass.states[currentCfg.feels_like] ) {
    if( hass.states[currentCfg.feels_like].attributes.unit_of_measurement == "F" )
      feels_like = Math.round(parseFloat(hass.states[currentCfg.feels_like].state)) ;
    else feels_like = parseFloat(hass.states[currentCfg.feels_like].state) ;
  } else feels_like = "Na" ;

  return html`
      <div class="current">
        <span class="icon bigger" style="background: none,
            url('${getWeatherIcon(current_conditions.toLowerCase(), iconsConfig, sun)}') no-repeat ; 
            background-size: contain;">${current_conditions}</span>
        ${name ? html`<span class="title"> ${name} </span>` : ""}
        <span class="temp">${temperature}</span>
        <span class="tempc"> ${getUnit(hass,"temperature")}</span>
      </div>
      ${feels_like !== "Na" ? html`
        <ul class="variations polles" style="border: 0;margin-top: 4px;">
          <li><ha-icon icon="none"></ha-icon><span class="unit"></span></li>
          <li>
            <ha-icon icon="${hass.states[currentCfg.feels_like].attributes.icon}"></ha-icon>${translate('Feels Like', lang)} ${feels_like}
            <span class="unit"> ${getUnit(hass,"temperature")}</span>
          </li>
        </ul>      
      ` : ""}
   `;
} ;

