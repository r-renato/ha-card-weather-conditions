import { html } from "lit-element";
import {AirQuality} from "./types";
import {HomeAssistant} from "custom-card-helpers/dist";
import {HassEntityAttributeBase} from "home-assistant-js-websocket/dist"
import {numFormat} from "./ha-cwc-utils";

/**
 *
 * @param state
 * @param attributes
 * @param icon
 * @private
 */
const _renderAirQuality = (state: string, attributes: HassEntityAttributeBase, icon: string) => {

  return(state ? html`
    <li>
      <svg viewBox="0 0 24 15" width="24" height="15" xmlns="http://www.w3.org/2000/svg">
        <style>.small {font: 8px sans-serif;}</style>
        <text x="0" y="14" class="small">${icon}</text>
      </svg>${state} ${attributes.unit_of_measurement ? attributes.unit_of_measurement : ""}
    </li>    
  ` : "") ;
} ;

/**
 *
 * @param hass
 * @param airquality
 */
export const renderAirQualities = (hass: HomeAssistant, airquality: AirQuality, border: boolean) => {
  let pm25 = undefined !== airquality.pm25 && undefined !== hass.states[airquality.pm25]
    ? _renderAirQuality(numFormat(hass.states[airquality.pm25].state), hass.states[airquality.pm25].attributes, 'pm25') : undefined ;
  let pm10 = undefined !== airquality.pm10 && undefined !== hass.states[airquality.pm10]
    ? _renderAirQuality(numFormat(hass.states[airquality.pm10].state), hass.states[airquality.pm10].attributes, 'pm10') : undefined ;
  let o3 = undefined !== airquality.o3 && undefined !== hass.states[airquality.o3]
    ? _renderAirQuality(numFormat(hass.states[airquality.o3].state), hass.states[airquality.o3].attributes, 'o3') : undefined ;
  let no2 = undefined !== airquality.no2 && undefined !== hass.states[airquality.no2]
    ? _renderAirQuality(numFormat(hass.states[airquality.no2].state), hass.states[airquality.no2].attributes, 'no2') : undefined ;
  let co = undefined !== airquality.co && undefined !== hass.states[airquality.co]
    ? _renderAirQuality(numFormat(hass.states[airquality.co].state), hass.states[airquality.co].attributes, 'co') : undefined ;
  let so2 = undefined !== airquality.so2 && undefined !== hass.states[airquality.so2]
    ? _renderAirQuality(numFormat(hass.states[airquality.so2].state), hass.states[airquality.so2].attributes, 'so2') : undefined ;
  let epa_aqi = undefined !== airquality.epa_aqi && undefined !== hass.states[airquality.epa_aqi]
    ? _renderAirQuality(numFormat(hass.states[airquality.epa_aqi].state), hass.states[airquality.epa_aqi].attributes, 'aqi') : undefined ;
  let epa_health_concern = undefined !== airquality.epa_health_concern && undefined !== hass.states[airquality.epa_health_concern]
    ? _renderAirQuality(hass.states[airquality.epa_health_concern].state, hass.states[airquality.epa_health_concern].attributes, 'aqi') : undefined ;

  return html`
    <ul class="variations ${border ? "spacer" : ""}">
        ${epa_aqi ? epa_aqi : ""}${epa_health_concern ? epa_health_concern : ""}
        ${pm25 ? pm25 : ""}${pm10 ? pm10 : ""}${o3 ? o3 : ""}${no2 ? no2 : ""}${co ? co : ""}${so2 ? so2 : ""}
    </ul>
  `;
} ;
