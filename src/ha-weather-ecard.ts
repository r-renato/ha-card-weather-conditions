/* eslint-disable no-underscore-dangle */
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { LovelaceBaseElement, preloadResources } from './base/lovelace-base';

import buildWeatherSummary from './builder/b-summary';
import buildWeatherPresent from './builder/b-present';
import buildUltraviolet from './builder/b-ultraviolet';
import buildPollen from './builder/b-pollen';
import buildWeatherForecast from './builder/b-weather-forecast';
import buildCamera from './builder/b-camera';
import buildAirQuality from './builder/b-airquality';
import buildMeteoDPCalarm from './builder/b-meteoalarm';

const { translations, imagePath } = await preloadResources(); // esecuzione immediata

/* -------------------- DEFINIZIONE COMPONENTE -------------------- */

@customElement('ha-card-weather-conditions')
// eslint-disable-next-line import/prefer-default-export
export class HaCardWeatherConditions extends LovelaceBaseElement {
  _translations = translations;

  _imagesPath = imagePath;

  // eslint-disable-next-line class-methods-use-this
  protected _render(): TemplateResult {
    return html`
      <ha-card class="ha-card-weather-conditions">
        <div class="nd-container">
          ${this._buildTemplate()}
        </div>
      </ha-card>
    `;
  }

  private _buildTemplate(): TemplateResult {
    let summary = html``;
    let present = html``;
    let dailyWeatherForecast = html``;
    let hourlyWeatherForecast = html``;
    let marineDailyWeatherForecast = html``;
    let marineHourlyWeatherForecast = html``;
    let meteoDPCalarm = html``;
    let ultraviolet = html``;
    let pollen = html``;
    let airQuality = html``;
    let camera = html``;

    const getWeatherForecast = (mode: 0 | 1 | 2 | 3) => buildWeatherForecast(
      this.hass,
      this._language,
      this._terms,
      this._config.weather.daily_forecasts,
      this._config.weather.hourly_forecasts,
      this._config.weather.marine_daily_forecasts,
      this._config.weather.marine_hourly_forecasts,
      mode,
      this._iconsConfig,
      this._config.weather.sun,
    );

    if (this._hasPresent) {
      summary = buildWeatherSummary(
        this.hass,
        this._language,
        this._terms,
        this._iconsConfig,
        this._config.weather?.name,
        this._config?.weather?.present || null,
        this._config?.weather?.sun,
        this._config?.weather?.moonphase,
      );
    }

    if (this._hasPresent) {
      present = buildWeatherPresent(
        this.hass,
        this._language,
        this._terms,
        this._config?.weather?.present || {},
        this._config?.weather?.sun,
      );
    }

    if (this._hasMetealarm || this._hasDPCalarm) {
      meteoDPCalarm = buildMeteoDPCalarm(
        this.hass,
        this._language,
        this._terms,
        this._config?.weather?.meteoalarm,
        this._config?.weather?.dpcalarm,
      );
    }

    if (this._hasDailyForecasts) {
      dailyWeatherForecast = getWeatherForecast(0);
    }
    if (this._hasHourlyForecasts) {
      hourlyWeatherForecast = getWeatherForecast(1);
    }
    if (this._hasMarineDailyForecasts) {
      marineDailyWeatherForecast = getWeatherForecast(2);
    }
    if (this._hasMarineHourlyForecasts) {
      marineHourlyWeatherForecast = getWeatherForecast(3);
    }

    if (this._hasUltraviolet) {
      ultraviolet = buildUltraviolet(this.hass, this._language, this._config.ultraviolet);
    }

    if (this._hasPollen) {
      pollen = buildPollen(this.hass, this._language, this._config.pollen);
    }

    if (this._hasAirQuality) {
      airQuality = buildAirQuality(this.hass, this._language, this._config.airquality);
    }

    if (this._hasCamera) {
      camera = buildCamera(this.hass, this._language, this._terms, this._handlePopup.bind(this), this._config.camera);
    }

    return html`
    ${summary}
    ${present}
    ${hourlyWeatherForecast}
    ${dailyWeatherForecast}
    ${marineHourlyWeatherForecast}
    ${marineDailyWeatherForecast}
    ${meteoDPCalarm}
    ${pollen}
    ${ultraviolet}
    ${airQuality}
    ${camera}`;
  }

  /**
   * Apre il popup di dettaglio per l'entità specificata.
   * @param e L'evento click originale.
   * @param entityId L'ID dell'entità Home Assistant da mostrare.
   */
  protected _handlePopup(e: Event, entityId: string) {
    e.stopPropagation();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const moreInfoEvent = new Event('hass-more-info', { composed: true }) as any;
    moreInfoEvent.detail = { entityId };
    this.dispatchEvent(moreInfoEvent);
  }
}
