/* eslint-disable no-underscore-dangle */
import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  PropertyValues,
  TemplateResult,
} from 'lit';
import { property } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';

import { defaultColorCss, defaultDarkColorCss } from '../utils/colors';
import { iCardConfig, iLovelaceCardConfig } from '../utils/config-schema';
import { logo, optConsoleParam1, optConsoleParam2, optConsoleParam3 } from '../utils/const';
import { cwcLocale, resolveLocale, ResolvedLocale } from '../utils/locale';
import { getIconModelData, IconsConfigResult } from '../utils/icon-registry';
import { logInfo, preloadResources } from '../utils/network';
import { getCardStyles } from '../utils/helper-render';

export interface iTerms {
  windDirections: Record<string, string>;
  words: Record<string, string>;
}

export interface iIconsConfig {
  path: string;
  iconType: string;
  icons_model: string;
  iconsDay: { [key: string]: string };
  iconsNight: { [key: string]: string };
}

export interface iLovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  isPanel?: boolean;
  editMode?: boolean;
  getCardSize(): number;
  setConfig(config: iLovelaceCardConfig): void;
}

interface HassDarkMode { darkMode: boolean; }

export function computeDarkMode(hass?: HomeAssistant): boolean {
  return (hass?.themes as unknown as HassDarkMode)?.darkMode ?? false;
}

export abstract class LovelaceBaseElement extends LitElement implements iLovelaceCard {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ attribute: false }) protected _config?: iCardConfig;

  public isPanel?: boolean = false;

  public editMode?: boolean = false;

  public invalidConfig: boolean = false;

  private _pendingConfig?: iCardConfig;

  protected _resolvedLocale: ResolvedLocale = {
    language: 'en',
    locale: 'en-US',
    timezone: 'UTC',
    formatterLocale: 'en-US',
  };

  protected _iconsConfig!: iIconsConfig;

  protected _imagesPath: string = '';

  protected _name?: string;

  protected _translations: string[] = [];

  protected _terms!: iTerms;

  protected _hasPresent: boolean = false;

  protected _hasDailyForecasts: boolean = false;

  protected _hasHourlyForecasts: boolean = false;

  protected _hasMarineDailyForecasts: boolean = false;

  protected _hasMarineHourlyForecasts: boolean = false;

  protected _hasMetealarm: boolean = false;

  protected _hasDPCalarm: boolean = false;

  protected _hasAirQuality: boolean = false;

  protected _hasPollen: boolean = false;

  protected _hasUltraviolet: boolean = false;

  protected _hasCamera: boolean = false;

  public override connectedCallback(): void {
    super.connectedCallback();
    if (this._pendingConfig && !this._config) {
      void this._applyConfig(this._pendingConfig);
    }
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (!changedProps.has('hass') || !this.hass) return;

    const prevHass = changedProps.get('hass') as HomeAssistant | undefined;

    // prima volta che hass diventa disponibile: ricalcola locale e ricarica traduzioni
    if (!prevHass && this._config) {
      this._resolvedLocale = resolveLocale(this.hass, this._config);
      this._loadTranslations(this._resolvedLocale.language);
    }

    const currentDarkMode = computeDarkMode(prevHass);
    const newDarkMode = computeDarkMode(this.hass);
    if (currentDarkMode !== newDarkMode) {
      this.toggleAttribute('dark-mode', newDarkMode);
    }

    if (this._config) {
      const previous = this._resolvedLocale;
      const next = resolveLocale(this.hass, this._config);
      const langChanged = previous.language !== next.language;
      const localeChanged = (
        langChanged ||
        previous.timezone !== next.timezone ||
        previous.formatterLocale !== next.formatterLocale
      );
      if (localeChanged) {
        this._resolvedLocale = next;
        if (langChanged) this._loadTranslations(next.language);
        this.requestUpdate();
      }
    }
  }

  static get styles(): CSSResultGroup {
    return [
      css`
        :host {
          ${defaultColorCss}
        }
        :host([dark-mode]) {
          ${defaultDarkColorCss}
        }
        ${getCardStyles()}
      `,
    ];
  }

  public setConfig(config: iLovelaceCardConfig): void {
    if (!config) {
      this.invalidConfig = true;
      console.error(`${logo} - Failed initialaizing card: invalid configuration`);
      throw new Error('Invalid configuration');
    }
    const cardConfig = config as unknown as iCardConfig;
    this._pendingConfig = cardConfig;
    void this._applyConfig(cardConfig);
  }

  private async _applyConfig(config: iCardConfig): Promise<void> {
    try {
      if (!this._translations?.length || !this._imagesPath) {
        const { translations, imagePath } = await preloadResources();
        this._translations = translations;
        this._imagesPath = imagePath || '';
      }
      this._name = config?.weather?.name ?? undefined;
      this._resolvedLocale = resolveLocale(this.hass, config);
      this._loadTranslations(this._resolvedLocale.language);
      this._detectDataSections(config);
      this._config = config;
      this._setupIcons(config.weather?.icons_model);
      logInfo(`${logo} - Config loaded. lang=${this._resolvedLocale.language} tz=${this._resolvedLocale.timezone}`);
      this.requestUpdate();
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e));
      console.error(`${logo} - Failed to initialize:`, err.message);
      console.error(err.stack);
      this.invalidConfig = true;
      this.requestUpdate();
    }
  }

  public getCardSize(): number {
    let size = 0;
    if (this._hasPresent) size += 3;
    if (this._hasDailyForecasts || this._hasHourlyForecasts) size += 2;
    if (this._hasMarineDailyForecasts || this._hasMarineHourlyForecasts) size += 2;
    if (this._hasUltraviolet) size += 2;
    if (this._hasPollen) size += 2;
    if (this._hasAirQuality) size += 2;
    if (this._hasCamera) size += 3;
    if (this._hasMetealarm || this._hasDPCalarm) size += 1;
    return Math.max(size, 1);
  }

  private _loadTranslations(language: string): void {
    const tryParse = (index: number | undefined): Record<string, unknown> | null => {
      if (index === undefined || !this._translations[index]) return null;
      try { return JSON.parse(this._translations[index]); } catch { return null; }
    };

    let transls = tryParse(cwcLocale[language]);

    if (!transls) {
      console.warn(`${logo} - Locale '${language}' unavailable, falling back to 'en'.`);
      transls = tryParse(cwcLocale.en);
    }

    if (!transls) {
      console.error(`${logo} - Unable to load any translations.`);
      return;
    }

    this._terms = {
      windDirections: transls.cwcLocWindDirections as Record<string, string>,
      words: transls.cwcTerms as Record<string, string>,
    };

    logInfo(
      `${logo}%c card "${this._name}", locale='${language}', tz='${this._resolvedLocale.timezone}'.`,
      optConsoleParam1,
      optConsoleParam2,
      optConsoleParam3,
    );
  }

  private _detectDataSections(config: iCardConfig): void {
    this._hasPresent = !!config.weather?.present;
    this._hasDailyForecasts = !!config.weather?.daily_forecasts;
    this._hasHourlyForecasts = !!config.weather?.hourly_forecasts;
    this._hasMarineDailyForecasts = !!config.weather?.marine_daily_forecasts;
    this._hasMarineHourlyForecasts = !!config.weather?.marine_hourly_forecasts;
    this._hasMetealarm = !!config.weather?.meteoalarm;
    this._hasDPCalarm = !!config.weather?.dpcalarm;
    this._hasAirQuality = !!config.airquality;
    this._hasPollen = config.pollen && Array.isArray(config.pollen.entities) && config.pollen.entities.length > 0;
    this._hasUltraviolet = !!config.ultraviolet;
    this._hasCamera = !!config.camera;
  }

  private _setupIcons(iconsModel?: string): void {
    const modelData: IconsConfigResult = getIconModelData(iconsModel || 'pirateweather');
    this._iconsConfig = {
      path: this._imagesPath,
      iconType: this._config?.weather?.animation ? 'animated' : 'static',
      icons_model: modelData.iconsModel,
      iconsDay: modelData.iconsDay,
      iconsNight: modelData.iconsNight,
    };
  }

  public render(): TemplateResult {
    if (this.invalidConfig) {
      return html`
        <ha-card class="ha-card-weather-conditions">
            <div class='banner'>
                <div class="header">ha-card-weather-conditions</div>
            </div>
            <div class='content'>
                Configuration ERROR!
            </div>
        </ha-card>
      `;
    }
    if (!this._config || !this._terms) {
      return html`<ha-card class="ha-card-weather-conditions"></ha-card>`;
    }
    return this._render();
  }

  protected abstract _render(): TemplateResult;
}
