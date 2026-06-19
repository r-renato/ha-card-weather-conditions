/* eslint-disable no-underscore-dangle */
import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { LovelaceBaseElement } from './base/lovelace-base';
import { CwcModuleName } from './utils/config-schema';
import { logo } from './utils/const';
import { MoonHemisphere } from './utils/helper-render';

import buildWeatherSummary from './builder/b-summary';
import buildWeatherPresent from './builder/b-present';
import buildUltraviolet from './builder/b-ultraviolet';
import buildPollen from './builder/b-pollen';
import buildWeatherForecast from './builder/b-weather-forecast';
import buildCamera from './builder/b-camera';
import buildAirQuality from './builder/b-airquality';
import buildMeteoDPCalarm from './builder/b-meteoalarm';
import buildWindMap from './builder/b-wind-map';

declare global {
  interface Window {
    customCards?: {
      type: string;
      name: string;
      description: string;
      preview: boolean;
      documentationURL: string;
    }[];
  }
}

/* -------------------- DEFINIZIONE COMPONENTE -------------------- */

@customElement('ha-card-weather-conditions')
// eslint-disable-next-line import/prefer-default-export
export class HaCardWeatherConditions extends LovelaceBaseElement {
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
    const modules: Partial<Record<CwcModuleName, TemplateResult>> = {};

    const getWeatherForecast = (mode: 0 | 1 | 2 | 3) => buildWeatherForecast(
      this.hass,
      this._resolvedLocale,
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
      const resolvedHemisphere: MoonHemisphere = this._config?.weather?.hemisphere
        ?? ((this.hass?.config?.latitude ?? 0) < 0 ? 'south' : 'north');

      modules.summary = buildWeatherSummary(
        this.hass,
        this._resolvedLocale,
        this._terms,
        this._iconsConfig,
        this._config.weather?.name,
        this._config?.weather?.present || null,
        this._config?.weather?.sun,
        this._config?.weather?.moonphase,
        resolvedHemisphere,
      );

      modules.present = buildWeatherPresent(
        this.hass,
        this._resolvedLocale,
        this._terms,
        this._config?.weather?.present || {},
        this._config?.weather?.sun,
        this._config?.weather?.sun_time_format,
      );
    }

    if (this._hasMetealarm || this._hasDPCalarm) {
      modules.meteoalarm = buildMeteoDPCalarm(
        this.hass,
        this._resolvedLocale,
        this._terms,
        this._config?.weather?.meteoalarm,
        this._config?.weather?.dpcalarm,
      );
    }

    if (this._hasDailyForecasts) {
      modules.daily_forecasts = getWeatherForecast(0);
    }
    if (this._hasHourlyForecasts) {
      modules.hourly_forecasts = getWeatherForecast(1);
    }
    if (this._hasMarineDailyForecasts) {
      modules.marine_daily = getWeatherForecast(2);
    }
    if (this._hasMarineHourlyForecasts) {
      modules.marine_hourly = getWeatherForecast(3);
    }

    if (this._hasUltraviolet) {
      modules.ultraviolet = buildUltraviolet(this.hass, this._resolvedLocale, this._config.ultraviolet, this._terms);
    }

    if (this._hasPollen) {
      modules.pollen = buildPollen(this.hass, this._config.pollen, this._terms);
    }

    if (this._hasAirQuality) {
      modules.airquality = buildAirQuality(this.hass, this._resolvedLocale, this._config.airquality, this._terms);
    }

    if (this._hasCamera) {
      modules.camera = buildCamera(this.hass, this._terms, this._handlePopup.bind(this), this._config.camera);
    }

    if (this._hasWindMap) {
      modules.wind_map = buildWindMap(
        this.hass,
        this._terms.windDirections,
        this._config.wind_map,
        this._config?.weather?.present,
        this._terms.words,
      );
    }

    // Ordine di default (retrocompatibile) se module_order non è impostato.
    const defaultOrder: CwcModuleName[] = [
      'summary',
      'present',
      'hourly_forecasts',
      'daily_forecasts',
      'marine_hourly',
      'marine_daily',
      'meteoalarm',
      'pollen',
      'ultraviolet',
      'airquality',
      'camera',
      'wind_map',
    ];

    const moduleOrder = this._config?.module_order;

    if (moduleOrder?.length) {
      const missing = (Object.keys(modules) as CwcModuleName[])
        .filter((name) => modules[name] && !moduleOrder.includes(name));
      if (missing.length > 0) {
        console.warn(
          `${logo} - module_order: i moduli configurati ma non elencati non verranno mostrati: ${missing.join(', ')}.`,
        );
      }
      return html`${moduleOrder.map((name) => modules[name] ?? html``)}`;
    }

    return html`${defaultOrder.map((name) => modules[name] ?? html``)}`;
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

/* -------------------- REGISTRAZIONE CARD -------------------- */

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'ha-card-weather-conditions',
  name: 'Weather Conditions Card',
  description: 'Displays weather data with animated icons, forecasts, UV, pollen, air quality and more.',
  preview: true,
  documentationURL: 'https://github.com/r-renato/ha-card-weather-conditions',
});
