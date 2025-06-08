/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  cwcLocale,
  hacsImagePath,
  logo,
  manImagePath,
  optConsoleParam1,
  optConsoleParam2,
  optConsoleParam3,
} from '../utils/const';
import {
  getIconModelData,
  imageExist,
  loadJSON,
  logInfo,
} from '../utils/helper';
import { cwcClimacellDayIcons, cwcClimacellNightIcons } from '../iconmodels/im-climacell';
import { getCardStyles } from '../utils/helper-render';
import { cwcDaytimePirateWeatherIcons, cwcNightlyPirateWeaterIcons } from '../iconmodels/im-pirateweather';

export interface iTerms {
   windDirections: string;
   words: Record<string, string>;
}

export interface iIconsConfig {
  path: string ;
  iconType: string ;
  icons_model: string ;
  iconsDay: { [key: string]: string; } ;
  iconsNight: { [key: string]: string; } ;
}

export interface iLovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  isPanel?: boolean;
  editMode?: boolean;
  getCardSize(): number | Promise<number>;
  setConfig(config: iLovelaceCardConfig): void;
}

export function computeDarkMode(hass?: HomeAssistant): boolean {
  if (!hass) return false;
  return (hass.themes as any).darkMode as boolean;
}

/* -------------------- VARIABILI GLOBALI -------------------- */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// let loadedTranslations: any[] = [];
// let resolvedImagePath: string | null = null;

export async function preloadResources(): Promise<{ translations: any[]; imagePath: string | null }> {
  const [hacsResult, manResult] = await Promise.all([
    imageExist(`${hacsImagePath}/static/cloudy.svg`),
    imageExist(`${manImagePath}/static/cloudy.svg`),
  ]);

  let imagePath: string | null = null;

  if (hacsResult) {
    imagePath = hacsImagePath;
  } else if (manResult) {
    imagePath = manImagePath;
  } else {
    imagePath = null;
  }

  if (!imagePath) {
    logInfo(`${logo} - Impossibile determinare il path immagini.`);
    return { translations: [], imagePath: null };
  }

  const langs = ['en', 'it', 'nl', 'es', 'de', 'fr', 'sr-latn', 'pt', 'da', 'no-NO', 'cs'];
  const translPath = `${imagePath}/../transl/`;
  const translations = await Promise.all(langs.map((lang) => loadJSON(`${translPath}${lang}.json`)));

  return { translations, imagePath };
}

export abstract class LovelaceBaseElement extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ attribute: false }) protected _config?: iCardConfig;

  public isPanel?: boolean = false;

  public editMode?: boolean = false;

  public invalidConfig: boolean = false;

  protected _iconsConfig: iIconsConfig;

  protected _imagesPath: string;

  protected _name: string;

  protected _language: string;

  protected _translations: string[];

  protected _terms: iTerms;

  protected _hasPresent: boolean = false;

  protected _hasDailyForecasts: boolean = false;

  protected _hasHourlyForecasts: boolean = false;

  protected _hasMarineDailyForecasts: boolean = false;

  protected _hasMarineHourlyForecasts: boolean = false;

  protected _hasMetealarm: boolean = false;

  protected _hasDPCalarm: boolean = false;

  protected _hasMeteogram: boolean = false;

  protected _hasAirQuality: boolean = false;

  protected _hasPollen: boolean = false;

  protected _hasUltraviolet: boolean = false;

  protected _hasAlert: boolean = false;

  protected _hasSea: boolean = false;

  protected _hasCamera: boolean = false;

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('hass') && this.hass) {
      const currentDarkMode = computeDarkMode(changedProps.get('hass'));
      const newDarkMode = computeDarkMode(this.hass);
      if (currentDarkMode !== newDarkMode) {
        this.toggleAttribute('dark-mode', newDarkMode);
      }
    }
  }

  static get styles(): CSSResultGroup {
    return [
      // animations,
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

  public async setConfig(config: iCardConfig) {
    if (!config) {
      this.invalidConfig = true;
      throw new Error('Invalid configuration');
    }

    // console.log({ card_config: config });

    if (!this._translations?.length || !this._imagesPath) {
      const { translations, imagePath } = await preloadResources();
      this._translations = translations;
      this._imagesPath = imagePath;
    }

    this._name = config?.weather?.name ?? undefined;
    this._language = config.language?.toLowerCase() || 'en';

    this._loadTranslations(this._language);
    // this._initNumberFormatters(this._language);

    // this._setupDisplaySections(config.display ?? []);
    this._detectDataSections(config);

    this._setupIcons(config.weather?.icons_model);
    this._config = config;

    logInfo(`${logo} - Config loaded.`);
  }

  // eslint-disable-next-line class-methods-use-this
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  private _loadTranslations(lang: string) {
    try {
      const transls = JSON.parse(this._translations[cwcLocale[lang]]);
      this._terms = {
        windDirections: transls.cwcLocWindDirections,
        words: transls.cwcTerms,
      };

      logInfo(
        `${logo}%c card "${this._name}", locale is '${lang}'.`,
        optConsoleParam1,
        optConsoleParam2,
        optConsoleParam3,
      );
    } catch (e) {
      const fallback = 'en';
      const transls = JSON.parse(this._translations[cwcLocale[fallback]]);
      this._terms = {
        windDirections: transls.cwcLocWindDirections,
        words: transls.cwcTerms,
      };

      logInfo(
        `${logo}%c card "${this._name}" unable to use '${lang}' locale, set as default '${fallback}'.`,
        optConsoleParam1,
        optConsoleParam2,
        optConsoleParam3,
      );
    }
  }

  private _detectDataSections(config: iCardConfig) {
    this._hasPresent = !!config.weather?.present;
    this._hasDailyForecasts = !!config.weather?.daily_forecasts;
    this._hasHourlyForecasts = !!config.weather?.hourly_forecasts;
    this._hasMarineDailyForecasts = !!config.weather?.marine_daily_forecasts;
    this._hasMarineHourlyForecasts = !!config.weather?.marine_hourly_forecasts;
    this._hasMetealarm = !!config.weather?.meteoalarm;
    this._hasDPCalarm = !!config.weather?.dpcalarm;
    // this._hasMeteogram = !!config.weather?.forecast?.meteogram;
    this._hasAirQuality = !!config.airquality;
    this._hasPollen = config.pollen && Array.isArray(config.pollen.entities) && config.pollen.entities.length > 0;
    this._hasUltraviolet = !!config.ultraviolet;
    this._hasCamera = !!config.camera;
    // this._hasAlert = !!config.alert;
  }

  private _setupIcons(iconsModel?: string) {
    this._iconsConfig = {
      path: this._imagesPath,
      iconType: this._config?.weather?.animation ? 'animated' : 'static',
      icons_model: iconsModel || 'pirateweather',
      iconsDay: cwcDaytimePirateWeatherIcons,
      iconsNight: cwcNightlyPirateWeaterIcons,
    };

    if (iconsModel) {
      const modelData = getIconModelData(iconsModel);
      this._iconsConfig.icons_model = modelData.iconsModel;
      this._iconsConfig.iconsDay = modelData.iconsDay;
      this._iconsConfig.iconsNight = modelData.iconsNight;
    }
  }

  /**
   * generates the card HTML
   * @return {TemplateResult}
   */
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

    return this._render();
  }

  protected abstract _render(): TemplateResult;
}
