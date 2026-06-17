import { html, nothing } from 'lit';
import { renderSectionHeader } from '../utils/render-section';
import { parseLocalizedNumber } from '../utils/locale';

export interface iRenderDataItem {
  value?: number | string | Date;
  unit?: string;
  icon?: string;
  icon_color?: string;
  /** Etichetta descrittiva opzionale mostrata sotto il valore nel chip.
   *  I builder esistenti non la popolano ancora: quando presente viene
   *  resa, quando assente il chip mostra solo icona + valore + unità. */
  label?: string;
}

export interface WeatherData {
  temperatureHigh?: iRenderDataItem;
  temperatureLow?: iRenderDataItem;
  precipitationProbability?: iRenderDataItem;
  precipitationIntensity?: iRenderDataItem;
  precipitationAccumulation?: iRenderDataItem;
  nextRising?: iRenderDataItem;
  nextSetting?: iRenderDataItem;
  /** Stringhe ISO grezze da sun.sun, usate nel template per calcolare il progresso solare */
  nextRisingISO?: string;
  nextSettingISO?: string;

  // precipitation?: iRenderDataItem;
  humidity?: iRenderDataItem;
  windBearing?: iRenderDataItem;
  windSpeed?: iRenderDataItem;
  pressure?: iRenderDataItem;
  visibility?: iRenderDataItem;

  lightningStrikes?: iRenderDataItem;
  lightningDistance?: iRenderDataItem;
}

export interface iAirQualityData {
  pm25: iRenderDataItem,
  pm10:iRenderDataItem,
  o3: iRenderDataItem,
  no2: iRenderDataItem,
  co: iRenderDataItem,
  so2: iRenderDataItem,
  epa_aqi: iRenderDataItem,
  epa_primary_pollutant: iRenderDataItem,
}

const isValidInput = (val: unknown): val is string | number => typeof val === 'string' || typeof val === 'number';

const prepareWeatherPresent = (data: WeatherData, formatterLocale: string) => {
  const allItems: iRenderDataItem[] = [];

  const addIfValid = (key: keyof WeatherData, item?: iRenderDataItem) => {
    if (item?.value === undefined) return;

    allItems.push(item);
  };

  const pi = data.precipitationIntensity?.value;
  const pp = data.precipitationProbability?.value;
  const pa = data.precipitationAccumulation?.value;

  if (isValidInput(pi) && isValidInput(pp)) {
    const parsedPI = parseLocalizedNumber(pi, formatterLocale);
    const parsedPP = parseLocalizedNumber(pp, formatterLocale);
    const parsedPA = isValidInput(pa) ? parseLocalizedNumber(pa, formatterLocale) : 0;

    if ((!Number.isNaN(Number(parsedPI)) && !Number.isNaN(Number(parsedPP)) && parsedPI > 0 && parsedPP > 0)
      || (!Number.isNaN(Number(parsedPA)) && parsedPA > 0)) {
      const pit = `${parsedPI} ${data.precipitationIntensity.unit}`;
      const ppt = `${parsedPP} ${data.precipitationProbability.unit}`;
      const pat = `${parsedPA} ${data.precipitationAccumulation.unit || data.precipitationIntensity.unit}`;

      allItems.push({
        icon:
          data.precipitationIntensity.icon ||
          data.precipitationProbability.icon ||
          data.precipitationAccumulation.icon ||
          'mdi:weather-rainy',
        icon_color: data.precipitationIntensity?.icon_color || data.precipitationProbability?.icon_color,
        // eslint-disable-next-line max-len
        value: isValidInput(pa) ? `${pit} / ${ppt} / ${pat}` : `${pit} / ${ppt}`,
        label: data.precipitationIntensity?.label || data.precipitationProbability?.label,
      });
    }
  }

  const ld = data.lightningDistance?.value;
  const ls = data.lightningStrikes?.value;

  if (isValidInput(ld) && isValidInput(ls)) {
    const parsedLD = parseLocalizedNumber(ld, formatterLocale);
    const parsedLS = parseLocalizedNumber(ls, formatterLocale);

    if (!Number.isNaN(Number(parsedLD)) && !Number.isNaN(Number(parsedLS)) && parsedLD > 0 && parsedLS > 0) {
      allItems.push({
        icon:
          data.lightningDistance.icon ||
          data.lightningStrikes.icon ||
          'mdi:lightning-bolt',
        icon_color: data.lightningStrikes?.icon_color || data.lightningDistance?.icon_color,
        // eslint-disable-next-line max-len
        value: `${data.lightningDistance.value} ${data.lightningDistance.unit} / ${data.lightningStrikes.value} stks`,
        label: data.lightningStrikes?.label || data.lightningDistance?.label,
      });
    }
  }

  // Temperatura min/max combinata
  if (
    data.temperatureLow?.value !== undefined &&
    data.temperatureHigh?.value !== undefined
  ) {
    allItems.push({
      icon: data.temperatureLow.icon || data.temperatureHigh.icon || 'mdi:thermometer',
      icon_color: data.temperatureLow?.icon_color || data.temperatureHigh?.icon_color,
      value: `${data.temperatureLow.value} / ${data.temperatureHigh.value}`,
      unit: data.temperatureLow.unit || data.temperatureHigh.unit,
      label: data.temperatureLow?.label || 'Min / Max',
    });
  }

  const keys: ('humidity' | 'pressure' | 'visibility')[] = [
    'humidity',
    'pressure',
    'visibility',
  ];
  keys.forEach((k) => addIfValid(k, data[k]));

  // Wind (bearing + speed)
  // eslint-disable-next-line max-len
  if (data.windSpeed?.value !== undefined || data.windBearing?.value !== undefined) {
    allItems.push({
      icon: data.windSpeed?.icon || 'mdi:weather-windy',
      icon_color: data.windSpeed?.icon_color,
      value: `${data.windBearing?.value ? `${data.windBearing.value} ` : ''}${data.windSpeed?.value ?? ''}`,
      unit: data.windSpeed?.unit ? `${data.windSpeed.unit}` : '',
      label: data.windSpeed?.label,
    });
  }

  // Sun times are rendered as a dedicated bar, not as chips

  return allItems;
};

const prepareAirQuality = (data: iAirQualityData) => {
  const allItems: iRenderDataItem[] = [];

  const addIfValid = (key: keyof iAirQualityData, item?: iRenderDataItem) => {
    if (item?.value === undefined) return;

    allItems.push(item);
  };

  const keys: (keyof iAirQualityData)[] = [
    'epa_aqi',
    'epa_primary_pollutant',
    'pm25',
    'pm10',
    'o3',
    'no2',
    'co',
    'so2',
  ];
  keys.forEach((k) => addIfValid(k, data[k]));

  return allItems;
};

/* Chip singolo */

const buildChip = (item: iRenderDataItem) => html`
  <div class="present-chip">
    <ha-icon
      class="present-chip__icon"
      icon="${item.icon}"
      style=${item.icon_color ? `color: ${item.icon_color}` : ''}
    ></ha-icon>
    <div class="present-chip__content">
      <span class="present-chip__value">
        ${item.value}${item.unit ? html`<span class="present-chip__unit"> ${item.unit}</span>` : nothing}
      </span>
      ${item.label ? html`<span class="present-chip__label">${item.label}</span>` : nothing}
    </div>
  </div>
`;

/* Render pubblico */

export const renderWeatherPresent = (
  data: WeatherData | Record<string, iRenderDataItem>,
  formatterLocale: string,
  sectionLabel?: string,
) => {
  const allItems: iRenderDataItem[] = [
    ...prepareWeatherPresent(data as WeatherData, formatterLocale),
    ...prepareAirQuality(data as iAirQualityData),
  ].filter((i) => i.value !== undefined);

  const sunData = data as WeatherData;

  const computeSunProgress = (riseISO?: string, setISO?: string): number | undefined => {
    if (!riseISO || !setISO) return undefined;
    const now = Date.now();
    const riseTs = new Date(riseISO).getTime();
    const setTs = new Date(setISO).getTime();
    if (Number.isNaN(riseTs) || Number.isNaN(setTs)) return undefined;

    if (setTs < riseTs) {
      const todayRise = riseTs - 24 * 60 * 60 * 1000;
      const range = setTs - todayRise;
      if (range <= 0) return undefined;
      return Math.min(1, Math.max(0, (now - todayRise) / range));
    }

    return 1;
  };

  const sunProgress = computeSunProgress(sunData.nextRisingISO, sunData.nextSettingISO);
  const hasSunBar = sunData.nextRising?.value !== undefined
    && sunData.nextSetting?.value !== undefined;

  const sunBar = hasSunBar ? html`
    <div class="sun-bar-row">
      <ha-icon
        class="sun-bar-icon sun-bar-icon--rise"
        icon="${sunData.nextRising!.icon || 'mdi:weather-sunset-up'}"
      ></ha-icon>
      <span class="sun-bar-time">${sunData.nextRising!.value}</span>
      <div class="sun-bar-track">
        ${sunProgress !== undefined ? html`
          <div class="sun-bar-fill" style="width: ${(sunProgress * 100).toFixed(1)}%"></div>
        ` : nothing}
      </div>
      <span class="sun-bar-time">${sunData.nextSetting!.value}</span>
      <ha-icon
        class="sun-bar-icon sun-bar-icon--set"
        icon="${sunData.nextSetting!.icon || 'mdi:weather-sunset-down'}"
      ></ha-icon>
    </div>
  ` : nothing;

  if (allItems.length === 0 && !hasSunBar) return html``;

  const grid = html`
    ${sunBar}
    <div class="present-chip-grid">
      ${allItems.map(buildChip)}
    </div>
  `;

  if (sectionLabel) {
    return html`
      <div class="cwc-section">
        ${renderSectionHeader(sectionLabel)}
        ${grid}
      </div>
    `;
  }

  return grid;
};
