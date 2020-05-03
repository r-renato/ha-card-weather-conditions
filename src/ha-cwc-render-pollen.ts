import {
  html
} from "lit-element";

import {Pollen, PollenItem} from "./types";
import {HomeAssistant} from "custom-card-helpers/dist";

const _renderPollen = (hass: HomeAssistant, item: PollenItem) => {
  let entity = hass.states[item.entity] ;
  let min = undefined !== item.min ? item.min : 0 ;
  let max = undefined !== item.max ? item.max : 5 ;
  let low = undefined !== item.low ? item.low : min ;
  let high = undefined !== item.high ? item.high : max ;
  let d = min == 0 ? 1 : 0 ;

  return(entity ? html`
     <li>
       <ha-icon icon="${entity.attributes.icon}"></ha-icon>
       <meter class="meter" value="${parseInt(entity.state) + d}" optimum="${(high-low)/2}"
            min="${min}" max="${max + d}" low="${low + d}" high="${high + d}">${entity.state}/${max}</meter>
     </li>
  ` : "") ;
} ;

/**
 <li>
 <ha-icon icon="${entity.attributes.icon}"></ha-icon>
 0<meter class="meter" value="${0 + d}"
 min="${min}" max="${max + d}" low="${low + d}" high="${high + d}" optimum="${(high-low)/2}">
 <div class="meter-gauge"><span style="width: 46.42%;">${entity.state}/${max}</span></div>
 </meter>
 </li>
 <li>
 <ha-icon icon="${entity.attributes.icon}"></ha-icon>
 1<meter class="meter" value="${1 + d}"
 min="${min}" max="${max + d}" low="${low + d}" high="${high + d}" optimum="${(high-low)/2}">
 <div class="meter-gauge"><span style="width: 46.42%;">${entity.state}/${max}</span></div>
 </meter>
 </li>
 <li>
 <ha-icon icon="${entity.attributes.icon}"></ha-icon>
 2<meter class="meter" value="${2 + d}"
 min="${min}" max="${max + d}" low="${low + d}" high="${high + d}" optimum="${(high-low)/2}">
 <div class="meter-gauge"><span style="width: 46.42%;">${entity.state}/${max}</span></div>
 </meter>
 </li>
 <li>
 <ha-icon icon="${entity.attributes.icon}"></ha-icon>
 3<meter class="meter" value="${3 + d}"
 min="${min}" max="${max + d}" low="${low + d}" high="${high + d}" optimum="${(high-low)/2}">
 ${entity.state}/${max}
 </meter>
 </li>
 <li>
 <ha-icon icon="${entity.attributes.icon}"></ha-icon>
 4<meter class="meter" value="${4 + d}"
 min="${min}" max="${max + d}" low="${low + d}" high="${high + d}" optimum="${(high-low)/2}">
 <div class="meter-gauge"><span style="width: 46.42%;">${entity.state}/${max}</span></div>
 </meter>
 </li>
 <li>
 <ha-icon icon="${entity.attributes.icon}"></ha-icon>
 5<meter class="meter" value="${5 + d}"
 min="${min}" max="${max + d}" low="${low + d}" high="${high + d}" optimum="${(high-low)/2}">
 <div class="meter-gauge"><span style="width: 46.42%;">${entity.state}/${max}</span></div>
 </meter>
 </li>
 */
export function renderPollens(hass: HomeAssistant, pollen: Pollen) {
  let tree = pollen.tree && pollen.tree.entity ? _renderPollen(hass, pollen.tree ): undefined ;
  let weed = pollen.weed && pollen.weed.entity ? _renderPollen(hass, pollen.weed ): undefined ;
  let grass = pollen.grass && pollen.grass.entity ? _renderPollen(hass, pollen.grass ): undefined ;

  return html`
    <ul class="variations polles">
        ${tree ? tree : ""}${weed ? weed : ""}${grass ? grass : ""}
    </ul>
  `;
}
