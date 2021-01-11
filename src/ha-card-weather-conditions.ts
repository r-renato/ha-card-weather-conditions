import {
  LitElement,
  html,
  customElement,
  property,
  CSSResult,
  TemplateResult, css,
} from "lit-element";
import { unsafeCSS } from 'lit-element/lib/css-tag.js';
import {HomeAssistant} from "custom-card-helpers";

import style from './style' ;
import styleSummary from './ha-style-summary';
import styleMeter from './ha-style-meter' ;
import styleForecast from './ha-style-forecast' ;
import styleCamera from './ha-style-camera' ;
import styleNightAndDay from './ha-style-day-night';
import {getSeaStyle} from "./ha-style-sea"

import {cwcClimacellDayIcons, cwcClimacellNightIcons, cwcClimacellDayBg} from "./ha-cwc-climacell" ;
import {cwcDarkskyDayIcons, cwcDarkskyNightIcons} from "./ha-cwc-darksky" ;
import {cwcOpenWeatherMapDayIcons, cwcOpenWeatherMapNightIcons} from "./ha-cwc-openweathermap" ;
import {cwcBuienradarDayIcons, cwcBuienradarNightIcons} from "./ha-cwc-buienradar" ;
import {cwcDefaultHassDayIcons, cwcDefaultHassNightIcons} from "./ha-cwc-hass" ;

import {IconsConfig, ITerms, CardConfig} from "./types" ;

import {cwcLocale} from "./ha-cwc-consts" ;
import {imageExist, loadJSON} from "./ha-cwc-utils" ;
import {renderSummary} from "./ha-cwc-render-summary" ;
import {renderPresent} from "./ha-cwc-render-present" ;
import {renderForecasts} from "./ha-cwc-render-forecast" ;
import {renderPollens} from "./ha-cwc-render-pollen";
import {renderAirQualities} from "./ha-cwc-render-airquality";
import {renderUv} from "./ha-cwc-render-uv" ;
import {renderAlert} from "./ha-cwc-render-alert" ;
import {renderSeaForecast} from "./ha-cwc-render-sea" ;

const hacsImagePath: string = "/local/community/ha-card-weather-conditions/icons" ;
const manImagePath: string = "/local/ha-card-weather-conditions/icons" ;

export let hacsImagePathExist: boolean = false ;
export let manImagePathExist: boolean = false ;

let logo: string = "%c WEATHER-CONDITION-CARD %c 1.9.9" ;
let optConsoleParam1: string = "color: white; background: green; font-weight: 700;" ;
let optConsoleParam2: string = "color: green; background: white; font-weight: 700;" ;
let optConsoleParam3: string = "color: black; background: white; font-weight: 700;" ;

export let numberFormat_0dec = null ;
export let numberFormat_1dec = null ;

let globalImagePath: string ;

const UNDEFINED = "undefined" ;
Object.defineProperty(Object.prototype, 'isSet',{
  value: function(object, testIsBlank) {
    let t1 = !(typeof object === UNDEFINED || null === object) ;
    return( testIsBlank ? t1 && object.length > 0 : t1 ) ;
  },
  writable: true,
  configurable: true,
  enumerable: false
});

console.info(logo, optConsoleParam1, optConsoleParam2);

let findImagePath = [imageExist(hacsImagePath + "/static/cloudy.svg"),
  imageExist(manImagePath + "/static/cloudy.svg"), ] ;

Promise.all(findImagePath).then((testResults) => {
  let hacsImages: boolean, manImages: boolean ;

  hacsImages = hacsImagePathExist = testResults[0] ;
  manImages = manImagePathExist = testResults[1] ;

  globalImagePath = (hacsImages ? hacsImagePath : manImages ? manImagePath : null) ;
  let translPath = globalImagePath + '/../transl/' ;
  let findTranslation = [
    loadJSON(translPath + 'en.json'),
    loadJSON(translPath + 'it.json'),
    loadJSON(translPath + 'nl.json'),
    loadJSON(translPath + 'es.json'),
    loadJSON(translPath + 'de.json'),
    loadJSON(translPath + 'fr.json'),
    loadJSON(translPath + 'sr-latn.json'),
    loadJSON(translPath + 'pt.json'),
    loadJSON(translPath + 'da.json'),
    loadJSON(translPath + 'no-NO.json')
  ] ;

  if( hacsImages ) console.info(logo + "%c use HACS path to retrieve icons.", optConsoleParam1, optConsoleParam2, optConsoleParam3);
  else if ( manImages ) console.info(logo + "%c use www root path to retrieve icons.", optConsoleParam1, optConsoleParam2, optConsoleParam3);
  else console.info(logo + "%c error setting right icons path.", optConsoleParam1, optConsoleParam2, optConsoleParam3);

  Promise.all(findTranslation).then((translations) => {

    @customElement("ha-card-weather-conditions")
    class HaCardWeatherConditions extends LitElement {
      @property() public hass?: HomeAssistant;
      @property() private _config?: CardConfig;

      private _iconsConfig: IconsConfig = new class implements IconsConfig {
        iconType: string;
        icons_model: string ;
        iconsDay: { [p: string]: string };
        iconsNight: { [p: string]: string };
        path: string ;
      };
      private _terms: ITerms = new class implements ITerms {
        windDirections;
        words;
      };

      private invalidConfig: boolean = false ;
      private numberElements: number = 0 ;

      private _header: boolean = true ;
      private _name: string = '' ;
      private _language: string ;

      private _hasCurrent: boolean = false ;
      private _hasForecast: boolean = false ;
      private _hasMeteogram: boolean = false ;
      private _hasAirQuality: boolean = false ;
      private _hasPollen: boolean = false ;
      private _hasUv: boolean = false ;
      private _hasAlert: boolean = false ;
      private _hasSea: boolean = false ;

      private _displayTop: boolean = true ;
      private _displayCurrent: boolean = true ;
      private _displayForecast: boolean = true ;

      private _classNameSuffix: string ;

      private _showSummary: boolean = true ;
      private _showPresent: boolean = true ;
      private _showUv: boolean = true ;
      private _showAirQuality: boolean = true ;
      private _showPollen: boolean = true ;
      private _showForecast: boolean = true ;
      private _showAlert: boolean = true ;
      private _showSea: boolean = true ;

      /**
       *
       * @param {CardConfig} config
       */
      public setConfig(config: CardConfig) {
        console.log({card_config: config});

        if (!config) {
          this.invalidConfig = true;
          throw new Error("Invalid configuration");
        }

        if (config.name && config.name.length > 0) {
          this._name = config.name;
        }
        if (config.language && config.language.length > 0) {
          this._language = config.language.toLowerCase();
        } else this._language = 'en';

        let transls ;
        try {
          transls = JSON.parse(translations[cwcLocale[this._language]]);
          this._terms.windDirections = transls.cwcLocWindDirections ;
          this._terms.words = transls.cwcTerms ;
          console.info(logo + "%c card \"" + this._name + "\", locale is '" + this._language + "'.",
            optConsoleParam1, optConsoleParam2, optConsoleParam3);
        } catch(e) {
          transls = JSON.parse(translations[cwcLocale['en']]);
          this._terms.windDirections = transls.cwcLocWindDirections ;
          this._terms.words = transls.cwcTerms ;
          console.info(logo + "%c card \"" + this._name + "\" unable to use '" + this._language + "' locale, set as default 'en'.",
            optConsoleParam1, optConsoleParam2, optConsoleParam3);
        }

        numberFormat_0dec = new Intl.NumberFormat(this._language, { maximumFractionDigits: 0 }) ;
        numberFormat_1dec = new Intl.NumberFormat(this._language, { maximumFractionDigits: 1 }) ;

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
        this._hasUv = !!config.uv;
        this._hasAlert = !!config.alert;
        this._hasSea = !!config.sea;

        this._iconsConfig.path = hacsImages ? hacsImagePath : manImages ? manImagePath : null;
        // this._iconsConfig.iconType = config.animation ? "animated" : "static";
        this._iconsConfig.iconType = config.animation ? "animated" : "static";
        this._iconsConfig.iconsDay = cwcClimacellDayIcons;
        this._iconsConfig.iconsNight = cwcClimacellNightIcons;
        this._iconsConfig.icons_model = "climacell";
        if ((!!config.weather) && (!!config.weather.icons_model))
          switch (config.weather.icons_model.toLowerCase()) {
            case 'darksky':
              this._iconsConfig.iconsDay = cwcDarkskyDayIcons;
              this._iconsConfig.iconsNight = cwcDarkskyNightIcons;
              this._iconsConfig.icons_model = "darksky";
              break;
            case 'openweathermap':
              this._iconsConfig.iconsDay = cwcOpenWeatherMapDayIcons;
              this._iconsConfig.iconsNight = cwcOpenWeatherMapNightIcons;
              this._iconsConfig.icons_model = "openweathermap";
              break;
            case 'buienradar':
              this._iconsConfig.iconsDay = cwcBuienradarDayIcons;
              this._iconsConfig.iconsNight = cwcBuienradarNightIcons;
              this._iconsConfig.icons_model = "buienradar";
              break;
            case 'defaulthass':
              this._iconsConfig.iconsDay = cwcDefaultHassDayIcons;
              this._iconsConfig.iconsNight = cwcDefaultHassNightIcons;
              this._iconsConfig.icons_model = "defaulthass";
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
        return css`${style}${styleSummary}${styleForecast}${styleMeter}${styleCamera}${styleNightAndDay}${unsafeCSS(getSeaStyle(globalImagePath))}`;
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
        else {
          return this._render();
        }
      }

      /**
       *
       * @returns {TemplateResult}
       * @private
       */
      _render() {
        let sunrise, sunriseEnd, sunsetStart, sunset, now ;
        let dynStyle, condition, habgImage ;

        let _renderedSummary, _renderedPresent, _renderedUv, _renderedAirQuality, _renderedPollen, _renderedForecast,
          _renderedAlert, _renderedSea ;
        // let _renderSummury: boolean = false ;

        let posix:number = 0 ;
        let states = this.hass.states ;

        if( this._showSummary && this._hasCurrent ) {
          let current = this._config.weather.current ;

          if((current.current_conditions && typeof states[ current.current_conditions ] !== undefined)
            || (current.temperature && typeof states[ current.temperature ] !== undefined)) {
            _renderedSummary = renderSummary(this.hass,
              this._config.weather.current, this._config.name, this._iconsConfig, this._terms) ;
            posix++ ;
          } else _renderedSummary = "" ;
        } else _renderedSummary = "" ;

        // Test if render >Present<
        if( this._showPresent && this._hasCurrent) {
          let current = this._config.weather.current ;

          if((current.sun && typeof states[ current.sun ] !== undefined)
            || (current.humidity && typeof states[ current.humidity ] !== undefined)
            || (current.pressure && typeof states[ current.pressure ] !== undefined)
            || (current.visibility && typeof states[ current.visibility ] !== undefined)
            || (current.wind_bearing && typeof states[ current.wind_bearing ] !== undefined)
            || (current.wind_speed && typeof states[ current.wind_speed ] !== undefined)) {

            _renderedPresent = renderPresent(this.hass,
              this._config.weather.current, this._config.weather.forecast, this._language, this._terms, posix > 0) ;
            posix++ ;
          } else {
            if(current.forecast && this._hasForecast) {
              let forecast = this._config.weather.forecast ;

              if((forecast.temperature_low && forecast.temperature_low.day_1 && typeof states[ forecast.temperature_low.day_1 ] !== undefined)
                || (forecast.temperature_high && forecast.temperature_high.day_1 && typeof states[ forecast.temperature_high.day_1 ] !== undefined)
                || (forecast.precipitation_intensity && forecast.precipitation_intensity.day_1 && typeof states[ forecast.precipitation_intensity.day_1 ] !== undefined)
                || (forecast.precipitation_probability && forecast.precipitation_probability.day_1 && typeof states[ forecast.precipitation_probability.day_1 ] !== undefined)) {

                _renderedPresent = renderPresent(this.hass,
                  this._config.weather.current, this._config.weather.forecast, this._language, this._terms, posix > 0) ;
                posix++ ;
              } else _renderedPresent = "" ;
            } else _renderedPresent = "" ;
          }
        } else _renderedPresent = "" ;

        // Test AirQuality
        if(this._showAirQuality && this._hasAirQuality ) {
          let airQuality = this._config.air_quality ;

          if((airQuality.co && typeof states[ airQuality.co ] !== undefined)
            || (airQuality.epa_aqi && typeof states[ airQuality.epa_aqi ] !== undefined)
            || (airQuality.epa_health_concern && typeof states[ airQuality.epa_health_concern ] !== undefined)
            || (airQuality.no2 && typeof states[ airQuality.no2 ] !== undefined)
            || (airQuality.o3 && typeof states[ airQuality.o3 ] !== undefined)
            || (airQuality.pm10 && typeof states[ airQuality.pm10 ] !== undefined)
            || (airQuality.pm25 && typeof states[ airQuality.pm25 ] !== undefined)
            || (airQuality.so2 && typeof states[ airQuality.so2 ] !== undefined)) {

            _renderedAirQuality = renderAirQualities(this.hass, this._config.air_quality, posix > 0) ;
            posix++ ;
          } else _renderedAirQuality = "" ;
        } else _renderedAirQuality = "" ;

        // Test uv
        if(this._showUv && this._hasUv ) {
          let uv = this._config.uv ;

          if((uv.protection_window && typeof states[ uv.protection_window ] !== undefined)
            || (uv.ozone_level && typeof states[ uv.ozone_level ] !== undefined)
            || (uv.uv_index && typeof states[ uv.uv_index ] !== undefined)
            || (uv.uv_level && typeof states[ uv.uv_level ] !== undefined)
            || (uv.max_uv_index && typeof states[ uv.max_uv_index ] !== undefined)) {

            _renderedUv = renderUv(this.hass, this._config.uv, posix > 0) ;
            posix++ ;
          } else _renderedUv = "" ;
        } else _renderedUv = "" ;

        if(this._showPollen && this._hasPollen ) {
          let pollen = this._config.pollen ;

          if((pollen.grass && pollen.grass.entity &&  typeof states[ pollen.grass.entity ] !== undefined)
            || (pollen.tree && pollen.tree.entity &&  typeof states[ pollen.tree.entity ] !== undefined)
            || (pollen.weed && pollen.weed.entity &&  typeof states[ pollen.weed.entity ] !== undefined)) {

            _renderedPollen = renderPollens(this.hass, this._config.pollen, posix > 0) ;
            posix++ ;
          } else _renderedPollen = "" ;
        } else _renderedPollen = "" ;

        if( this._showForecast && this._hasForecast ) {
          let forecast = this._config.weather.forecast ;

          _renderedForecast = renderForecasts(this.hass,
            this._config.weather.current, forecast, this._iconsConfig, this._language, posix > 0) ;
          posix++ ;
        } else _renderedForecast = "" ;

        // Test Alert
        if( this._showAlert && this._hasAlert ) {
          let alert = this._config.alert ;

          _renderedAlert = renderAlert(this.hass, alert, posix > 0) ;
          posix++ ;
        } else _renderedAlert = "" ;

        // Test Sea
        if( this._showSea && this._hasSea ) {
          let sea = this._config.sea ;
          _renderedSea = renderSeaForecast(this.hass, sea, this._iconsConfig, this._language, posix > 0) ;
          posix++ ;
        } else _renderedSea = "" ;

        return html`
      ${dynStyle ? html`
      <style>${dynStyle}</style>` : "" }
      
      <ha-card class="ha-card-weather-conditions ">
        <div class="nd-container ${habgImage ? habgImage : ''}">
        ${this._header ? html`
            ${_renderedSummary}
            ${_renderedAlert}
            ${_renderedPresent}
            ${_renderedUv}
            ${_renderedAirQuality}
            ${_renderedPollen}
            ${_renderedForecast}
            ${_renderedSea}
            ${this._hasMeteogram ? this.renderCamera(this.hass, this._config.weather.forecast.meteogram) : ""}
            ${this._config.camera ? this.renderCamera(this.hass, this._config.camera) : ""}
        ` : html``}
        </div>
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
        <div @click=${e => this.handlePopup(e, camId)} class="camera-container">
          <div class="camera-image">
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
  }) ;
}) ;



