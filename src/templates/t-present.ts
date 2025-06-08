import { html } from 'lit';
import { getLocale, parseLocalizedNumber } from '../utils/helper';

export interface iRenderDataItem {
  value?: number | string | Date;
  unit?: string;
  icon?: string;
  icon_color?: string;
}

export interface WeatherData {
  temperatureHigh?: iRenderDataItem;
  temperatureLow?: iRenderDataItem;
  precipitationProbability?: iRenderDataItem;
  precipitationIntensity?: iRenderDataItem;
  nextRising?: iRenderDataItem;
  nextSetting?: iRenderDataItem;

  // precipitation?: iRenderDataItem;
  humidity?: iRenderDataItem;
  windBearing?: iRenderDataItem;
  windSpeed?: iRenderDataItem;
  pressure?: iRenderDataItem;
  visibility?: iRenderDataItem;
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

const prepareWeatherPresent = (data: WeatherData, language: string) => {
  const allItems: iRenderDataItem[] = [];

  const addIfValid = (key: keyof WeatherData, item?: iRenderDataItem) => {
    if (item?.value === undefined) return;

    allItems.push(item);
  };

  const pi = data.precipitationIntensity?.value;
  const pp = data.precipitationProbability?.value;

  if (isValidInput(pi) && isValidInput(pp)) {
    const locale = getLocale(language);
    const parsedPI = parseLocalizedNumber(pi, locale);
    const parsedPP = parseLocalizedNumber(pp, locale);

    if (!Number.isNaN(Number(parsedPI)) && !Number.isNaN(Number(parsedPP)) && parsedPI > 0 && parsedPP > 0) {
      allItems.push({
        icon:
          data.precipitationIntensity.icon ||
          data.precipitationProbability.icon ||
          'mdi:weather-rainy',
        // eslint-disable-next-line max-len
        value: `${data.precipitationIntensity.value} ${data.precipitationIntensity.unit} / ${data.precipitationProbability.value} ${data.precipitationProbability.unit}`,
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
      value: `${data.temperatureLow.value} / ${data.temperatureHigh.value}`,
      unit: data.temperatureLow.unit || data.temperatureHigh.unit,
    });
  }

  const keys: (keyof WeatherData)[] = [
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
      value: `${data.windBearing?.value ? `${data.windBearing.value} ` : ''}${data.windSpeed?.value ?? ''}`,
      unit: data.windSpeed?.unit ? `${data.windSpeed.unit}` : '',
    });
  }

  // Sun times
  ['nextRising', 'nextSetting'].forEach((k) => {
    const item = data[k as keyof WeatherData];
    if (item?.value instanceof Date) {
      allItems.push({
        icon: item.icon,
        value: item.value.toLocaleTimeString(),
        unit: '',
      });
    }
  });

  return allItems;
};

const prepareAirQuality = (data: iAirQualityData, language: string) => {
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

export const renderWeatherPresent = (data, language: string) => {
  const allItems: iRenderDataItem[] = [];

  const buildBlockLeft = (item: iRenderDataItem) => html`
    <span class="present-value-block">
      <ha-icon icon="${item.icon}" style=${item.icon_color ? `color: ${item.icon_color}` : ''}></ha-icon>
      ${item.value}${item.unit ? html`<span class="present-unit">${item.unit}</span>` : ''}
    </span>
  `;

  const buildBlockRight = (item: iRenderDataItem) => html`
    <span class="present-value-block">
      ${item.value}${item.unit ? html`<span class="present-unit">${item.unit}</span>` : ''}
      <ha-icon icon="${item.icon}" style=${item.icon_color ? `color: ${item.icon_color}` : ''}></ha-icon>
    </span>
  `;

  allItems.push(...prepareWeatherPresent(data, language), ...prepareAirQuality(data, language));

  const rows = [];
  for (let i = 0; i < allItems.length; i += 2) {
    const left = allItems[i];
    const right = allItems[i + 1];

    if ((left && left.value) || (right && right.value)) {
      rows.push(html`
        <div class="present-row">
          <div class="present-left">${left ? buildBlockLeft(left) : html``}</div>
          <div class="present-right">${right ? buildBlockRight(right) : html``}</div>
        </div>
      `);
    }
  }

  return rows.length > 0 ? html`
    <div class="present-grid-container">
      ${rows}
    </div>
  ` : html``;
};
