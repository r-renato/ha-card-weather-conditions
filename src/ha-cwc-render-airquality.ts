import { html } from "lit-element";
import {AirQuality} from "./types";
import {HomeAssistant} from "custom-card-helpers/dist";
import {HassEntity} from "home-assistant-js-websocket/dist"

/**
 *
 * @param entity
 * @param icon
 * @private
 */
const _renderAirQuality = (entity: HassEntity, icon: string) => {

  return(entity ? html`
    <li>
      <svg viewBox="0 0 24 15" width="24" height="15" xmlns="http://www.w3.org/2000/svg">
        <style>.small {font: 8px sans-serif;}</style>
        <text x="0" y="14" class="small">${icon}</text>
      </svg>${entity.state} ${entity.attributes.unit_of_measurement ? entity.attributes.unit_of_measurement : ""}
    </li>    
  ` : "") ;
} ;

/**
 *
 * @param hass
 * @param airquality
 */
export const renderAirQualities = (hass: HomeAssistant, airquality: AirQuality) => {
  let pm25 = undefined !== airquality.pm25 ? _renderAirQuality(hass.states[airquality.pm25], 'pm25') : undefined ;
  let pm10 = undefined !== airquality.pm10 ? _renderAirQuality(hass.states[airquality.pm10], 'pm10') : undefined ;
  let o3 = undefined !== airquality.o3 ? _renderAirQuality(hass.states[airquality.o3], 'o3') : undefined ;
  let no2 = undefined !== airquality.no2 ? _renderAirQuality(hass.states[airquality.no2], 'no2') : undefined ;
  let co = undefined !== airquality.co ? _renderAirQuality(hass.states[airquality.co], 'co') : undefined ;
  let so2 = undefined !== airquality.so2 ? _renderAirQuality(hass.states[airquality.so2], 'so2') : undefined ;
  let epa_aqi = undefined !== airquality.epa_aqi ? _renderAirQuality(hass.states[airquality.epa_aqi], 'aqi') : undefined ;
  let epa_health_concern = undefined !== airquality.epa_health_concern
    ? _renderAirQuality(hass.states[airquality.epa_health_concern], 'aqi') : undefined ;

  return html`
    <ul class="variations polles">
        ${epa_aqi ? epa_aqi : ""}${epa_health_concern ? epa_health_concern : ""}
        ${pm25 ? pm25 : ""}${pm10 ? pm10 : ""}${o3 ? o3 : ""}${no2 ? no2 : ""}${co ? co : ""}${so2 ? so2 : ""}
    </ul>
  `;
} ;
