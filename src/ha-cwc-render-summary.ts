import {
  html
} from "lit-element";

import {getUnit, getWeatherIcon} from "./ha-cwc-utils" ;
import {Current, IconsConfig} from "./types" ;
import {HomeAssistant} from "custom-card-helpers/dist" ;

/**
 *
 * @param hass
 * @param currentCfg
 * @param name
 * @param iconsConfig
 */
export const renderSummary = (hass: HomeAssistant, currentCfg: Current, name: string, iconsConfig: IconsConfig) => {
  let sun = hass.states[currentCfg.sun].state ;
  let current_conditions = currentCfg.current_conditions ? hass.states[currentCfg.current_conditions].state : "" ;
  let temperature: number = parseFloat(hass.states[currentCfg.temperature].state) ;

  return html`
      <div class="current">
        <span class="icon bigger" style="background: none,
            url('${getWeatherIcon(current_conditions.toLowerCase(), iconsConfig, sun)}') no-repeat ; 
            background-size: contain;">${current_conditions}</span>
        ${name ? html`<span class="title"> ${name} </span>` : ""}
        <span class="temp">${getUnit(hass, "temperature") == "°F" ? Math.round(temperature) : temperature}</span>
        <span class="tempc"> ${getUnit(hass,"temperature")}</span>
      </div>
      `;
} ;

