import {HomeAssistant} from "custom-card-helpers/dist";
import {AirQuality, Uv} from "./types";
import {html} from "lit-html";
import {HassEntity} from "home-assistant-js-websocket/dist"
import {getUnit, getWeatherIcon} from "./ha-cwc-utils";

const num = ['I', 'II', 'III', 'IV', 'V', 'VI'] ;
const colors = [ '#F1D1B1', '#E4B590', '#CF9F7D', '#B67851', '#A15E2D', '#513938'] ;

/**
 *
 * @param entity
 * @param icon
 * @private
 */
const _renderUvSingle = (entity: HassEntity, icon: string, round: boolean) => {
  let value = round ? Math.round(parseFloat(entity.state)) : entity.state ;

  return(entity ? html`
    <li>
        <ha-icon icon="${icon}"></ha-icon>${value} ${entity.attributes.unit_of_measurement ? entity.attributes.unit_of_measurement : ""}
    </li>    
  ` : "") ;
} ;

/**
 *
 * @param entity1
 * @param entity2
 * @param icon
 * @private
 */
const _renderUvDouble = (entity1: HassEntity, entity2: HassEntity, icon: string) => {
  let value1 = undefined !== entity1 ? Math.round(parseFloat(entity1.state) * 10) / 10 : "--" ;
  let value2 = undefined !== entity2 ? Math.round(parseFloat(entity2.state) * 10) / 10 : "--" ;

  return(entity1 || entity2 ? html`
    <li>
        <ha-icon icon="${icon}"></ha-icon>${value1} / <b>${value2}</b>
        ${entity1.attributes.unit_of_measurement ? entity1.attributes.unit_of_measurement : ""}
    </li>    
  ` : "") ;
} ;

/**
 *
 * @param hass
 * @param uv
 * @param border
 */
export const renderUv = (hass: HomeAssistant, uv: Uv, border: boolean) => {
  let protection_window = undefined !== uv.protection_window && hass.states[uv.protection_window]
    ? _renderUvSingle(hass.states[uv.protection_window], 'mdi:sunglasses', false) : undefined ;
  let uv_level = undefined !== uv.uv_level && hass.states[uv.uv_level]
    ? _renderUvSingle(hass.states[uv.uv_level], 'mdi:weather-sunny', false) : undefined ;

  let uv_index = undefined !== uv.uv_index && undefined !== uv.max_uv_index
    ? _renderUvDouble( hass.states[uv.uv_index], hass.states[uv.max_uv_index], 'mdi:weather-sunny') : "";
  let ozone_level = undefined !== uv.ozone_level && hass.states[uv.ozone_level]
    ? _renderUvSingle(hass.states[uv.ozone_level], 'mdi:vector-triangle', true) : undefined ;


  return html`
    <ul class="variations ${border ? "spacer" : ""}">
        ${uv_level ? uv_level : ""}${protection_window ? protection_window : ""}
        ${uv_index ? uv_index : ""}${ozone_level ? ozone_level : ""}
    </ul>
    <div class="forecast clear" style="margin-top:  4px; margin-bottom: 4px;">
    ${[1,2,3,4,5,6].map(stypen => {
      let stype = 'set_skin_type_' + stypen ;
      let sensorId = uv[stype] ;
      let sstate = sensorId && hass.states[sensorId] ? hass.states[sensorId] : undefined ;
      return sstate ? html`
        <div class="day ${stypen}">
            <div id="rectangle" style="color: black; background: ${colors[stypen-1]};width:32px;height:32px;display: table;margin: 0 auto;">${num[stypen-1]}</div>
            <div class="lowTemp">
              ${Math.trunc(parseInt(sstate.state) / 60 )} h
            </div>  
        </div>
      ` :  "" ;      
    })}
    </div>
  `;

} ;