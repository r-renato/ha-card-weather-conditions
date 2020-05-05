import {
  LitElement,
  html,
  customElement,
  property,
  CSSResult,
  TemplateResult
} from "lit-element";

import {HomeAssistant} from "custom-card-helpers";

import {cwcClimacellDayIcons, cwcClimacellNightIcons} from "./ha-cwc-climacell" ;
import {cwcDarkskyDayIcons, cwcDarkskyNightIcons} from "./ha-cwc-darksky" ;
import {cwcOpenWeatherMapDayIcons, cwcOpenWeatherMapNightIcons} from "./ha-cwc-openweathermap" ;

import {IconsConfig, CardConfig} from "./types" ;
import {renderSummary} from "./ha-cwc-render-summary" ;
import {renderPresent} from "./ha-cwc-render-present" ;
import {renderForecasts} from "./ha-cwc-render-forecast" ;
import {renderPollens} from "./ha-cwc-render-pollen";
import {renderAirQualities} from "./ha-cwc-render-airquality";

import style from './style' ;

const hacsImagePath: string = "/local/community/ha-card-weather-conditions/icons" ;
const manImagePath: string = "/local/ha-card-weather-conditions/icons" ;

let hacsImagePathExist: boolean = false ;
let manImagePathExist: boolean = false ;

function imageExist(imageSrc, good, bad) {
  let img = new Image();
  img.onload = good;
  img.onerror = bad;
  img.src = imageSrc;
}

/**
 *
 */
imageExist(hacsImagePath + "/weather/cloudy.svg",
  function(){ hacsImagePathExist = true },
  function(){ hacsImagePathExist = false } );

/**
 *
 */
imageExist(manImagePath + "/icons/static/cloudy.svg",
  function(){ manImagePathExist = true },
  function(){ manImagePathExist = false } );

console.info("%c WEATHER-CONDITION-CARD %c 1.0.0 ", "color: white; background: green; font-weight: 700;", "color: coral; background: white; font-weight: 700;");

setTimeout(function () {

  @customElement("ha-card-weather-conditions")
  class HaCardWeatherConditions extends LitElement {
    @property() public hass?: HomeAssistant;
    @property() private _config?: CardConfig;

    private _iconsConfig: IconsConfig = new class implements IconsConfig {
      iconType: string;
      iconsDay: { [p: string]: string };
      iconsNight: { [p: string]: string };
      path: string ;
    };
    // private weatherIconsDay: { [key: string]: string; } ;
    // private weatherIconsNight: { [key: string]: string; } ;

    private invalidConfig: boolean = false ;
    private numberElements: number = 0 ;

    private _header: boolean = true ;
    private _name: string = '' ;
    private _language: string ;
    // private _weatherIconsDay: { [key: string]: string; } ;
    // private _weatherIconsNight: { [key: string]: string; } ;
    // private _animation: boolean = false ;
    private _hasCurrent: boolean = false ;
    private _hasForecast: boolean = false ;
    private _hasMeteogram: boolean = false ;
    private _hasAirQuality: boolean = false ;
    private _hasPollen: boolean = false ;

    private _displayTop: boolean = true ;
    private _displayCurrent: boolean = true ;
    private _displayForecast: boolean = true ;

    /**
     *
     * @param {CardConfig} config
     */
    public setConfig(config: CardConfig): void {
      console.log({card_config: config});

      if (!config) {
        this.invalidConfig = true;
        throw new Error("Invalid configuration");
      }

      if (config.name && config.name.length > 0) {
        this._name = config.name;
      }
      if (config.language && config.language.length > 0) {
        this._language = config.language.toLowerCase() ;
      } else this._language = 'en' ;

      if (undefined !== config.display) {
        this._displayTop = config.display.findIndex(item => 'top' === item.toLowerCase()) >= 0;
        this._displayCurrent = config.display.findIndex(item => 'current' === item.toLowerCase()) >= 0;
        this._displayForecast = config.display.findIndex(item => 'forecast' === item.toLowerCase()) >= 0;
      }

      this._hasCurrent = (!!config.weather) && (!!config.weather.current);
      this._hasForecast = (!!config.weather) && (!!config.weather.forecast);
      this._hasMeteogram = this._hasForecast && (!!config.weather.forecast.meteogram);
      this._hasAirQuality = !!config.air_quality;
      this._hasPollen = !!config.pollen && (!!config.pollen.tree || !!config.pollen.weed || !!config.pollen.grass);

      this._iconsConfig.path = hacsImagePathExist ? hacsImagePath : manImagePathExist ? manImagePath : null;
      // this._iconsConfig.iconType = config.animation ? "animated" : "static";
      this._iconsConfig.iconType = config.animation ? "animated" : "static";
      this._iconsConfig.iconsDay = cwcClimacellDayIcons ;
      this._iconsConfig.iconsNight = cwcClimacellNightIcons ;
      if ((!!config.weather) && (!!config.weather.icons_model))
        switch (config.weather.icons_model.toLowerCase()) {
          case 'darksky':
            this._iconsConfig.iconsDay = cwcDarkskyDayIcons;
            this._iconsConfig.iconsNight = cwcDarkskyNightIcons;
            break;
          case 'openweathermap':
            this._iconsConfig.iconsDay = cwcOpenWeatherMapDayIcons;
            this._iconsConfig.iconsNight = cwcOpenWeatherMapNightIcons;
            break;
        }

      this._config = config;
    }

    /**
     * get the current size of the card
     * @return {Number}
     */
    getCardSize() {
      return 1;
    }

    /**
     *
     * @returns {CSSResult}
     */
    static get styles(): CSSResult {
      return style;
    }

    /**
     * generates the card HTML
     * @return {TemplateResult}
     */
    render() {
      if (this.invalidConfig) return html`
            <ha-card class="ha-card-weather-conditions">
                <div class='banner'>
                    <div class="header">ha-card-weather-conditions</div>
                </div>
                <div class='content'>
                    Configuration ERROR!
                </div>
            </ha-card>
        `;
      else return this._render();
    }

    /**
     *
     * @returns {TemplateResult}
     * @private
     */
    _render() {
      this.numberElements = 0;

      return html`
      <ha-card class="ha-card-weather-conditions">
        ${this._header ? html`
            ${this._hasCurrent && this._displayTop
              ? renderSummary(this.hass, this._config.weather.current, this._config.name, this._iconsConfig) : ""}
            ${this._hasCurrent && this._displayCurrent 
              ? renderPresent(this.hass, this._config.weather.current, this._config.weather.forecast, this._language) : ""}
            ${this._hasAirQuality ? renderAirQualities(this.hass, this._config.air_quality) : "" }
            ${this._hasPollen ? renderPollens(this.hass, this._config.pollen) : ""}
            ${this._hasForecast 
              ? renderForecasts(this.hass, this._config.weather.current, this._config.weather.forecast, 
                  this._iconsConfig, this._language) : ""}
            ${this._hasMeteogram ? this.renderCamera(this.hass, this._config.weather.forecast.meteogram) : ""}
            ${this._config.camera ? this.renderCamera(this.hass, this._config.camera) : ""}
        ` : html``}
      </ha-card>
    `;
    }

    /**
     *
     * @param hass
     * @param camId
     */
    renderCamera(hass: HomeAssistant, camId: string) {
      let camera = hass.states[camId];
      let entity_picture: string = camera ? camera.attributes.entity_picture : undefined ;

      return entity_picture ? html`
        <div @click=${e => this.handlePopup(e, camId)} class="container">
          <div class="mainImage">
            <img src="${entity_picture}" alt="${camera.attributes.friendly_name}"/>
          </div>
        </div>
      ` : html``;
    }

    /**
     *
     * @param e
     * @param entityId
     */
    handlePopup(e, entityId: string) {
      e.stopPropagation();

      let ne = new Event('hass-more-info', {composed: true});
      // @ts-ignore
      ne.detail = {entityId};
      this.dispatchEvent(ne);
    }

  }
}, 2000) ;



