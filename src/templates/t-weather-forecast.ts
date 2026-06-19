/* eslint-disable max-len */
/* eslint-disable camelcase */
import { html, nothing, TemplateResult } from 'lit';
import { renderSectionHeader } from '../utils/render-section';
import { translate } from '../utils/locale';

export interface iForecastDataItem {
  value?: number | string | Date;
  unit?: string;
  img?: string;
  icon?: string;
  iconColor?: string;
}

export const renderHourlyForecast = (
  data: Record<string, iForecastDataItem>[],
  wordDict: Record<string, string> = {},
) => {
  if (data.length === 0) return html``;

  const now = Date.now();
  let activeIndex = -1;

  data.forEach((item, idx) => {
    const iso = item.datetime?.value;
    if (typeof iso !== 'string') return;

    const ts = new Date(iso).getTime();
    if (Number.isNaN(ts)) return;
    if (ts <= now) activeIndex = idx;
  });

  if (activeIndex === -1) activeIndex = 0;

  const slots = data.map((item, idx) => {
    const time = item.reference?.value;
    const img = item.condition?.img;
    const icon = item.condition?.icon;
    const iconColor = item.condition?.iconColor;

    const tempCurrent = item.temperature?.value;
    const tempFeels = item.temperature_feelslike?.value;
    const tempUnit = item.temperature?.unit || item.temperature_feelslike?.unit;

    const windSpeed = item.wind_speed?.value;
    const windSpeedUnit = item.wind_speed?.unit;
    const windBearing = item.wind_bearing?.value;
    const hasWind = windSpeed !== undefined;

    const precipProb = item.precipitation_probability?.value;
    const precipInt = item.precipitation_intensity?.value;
    const precipUnit = item.precipitation_intensity?.unit;
    const hasRain = precipProb !== undefined && Number(precipProb) > 0;

    let weatherIcon: TemplateResult | typeof nothing = nothing;
    if (img) {
      weatherIcon = html`<img class="fc-hourly-icon-img" src="${img}" alt="" />`;
    } else if (icon) {
      weatherIcon = html`<ha-icon
        class="fc-hourly-icon"
        icon="${icon}"
        style=${iconColor ? `color: ${iconColor}` : ''}
      ></ha-icon>`;
    }

    return html`
      <div class="fc-hourly-slot ${idx === activeIndex ? 'fc-hourly-slot--active' : ''}">
        ${time ? html`<div class="fc-hourly-time">${time}</div>` : nothing}

        ${weatherIcon}

        ${tempCurrent !== undefined && tempFeels !== undefined ? html`
          <div class="fc-hourly-temp">
            ${tempCurrent}° / <span class="fc-hourly-temp-high">${tempFeels}°${tempUnit ? ` ${tempUnit}` : ''}</span>
          </div>
        ` : nothing}

        ${hasWind ? html`
          <div class="fc-hourly-wind">
            <ha-icon class="fc-hourly-wind-icon" icon="mdi:weather-windy"></ha-icon>
            ${windSpeed}${windSpeedUnit ? ` ${windSpeedUnit}` : ''}${windBearing ? ` ${windBearing}` : ''}
          </div>
        ` : nothing}

        ${hasRain ? html`
          <div class="fc-hourly-rain">
            <ha-icon class="fc-hourly-rain-icon" icon="mdi:water"></ha-icon>
            ${precipProb}% · ${precipInt}${precipUnit ? ` ${precipUnit}` : ''}
          </div>
        ` : nothing}
      </div>
    `;
  });

  return html`
    <div class="cwc-section">
      ${renderSectionHeader(translate('Hourly forecast', wordDict))}
      <div class="fc-hourly-grid">
        ${slots}
      </div>
    </div>
  `;
};

export const renderDailyForecast = (
  data: Record<string, iForecastDataItem>[],
  wordDict: Record<string, string> = {},
) => {
  if (data.length === 0) return html``;

  const slots = data.map((item) => {
    const day = item.reference?.value;
    const img = item.condition?.img;
    const icon = item.condition?.icon;
    const iconColor = item.condition?.iconColor;

    const tempLow = item.temperature_low?.value;
    const tempHigh = item.temperature_high?.value;
    const tempUnit = item.temperature_high?.unit || item.temperature_low?.unit;

    const precipProb = item.precipitation_probability?.value;
    const precipInt = item.precipitation_intensity?.value;
    const precipUnit = item.precipitation_intensity?.unit;
    const hasRain = precipProb !== undefined && Number(precipProb) > 0;

    let weatherIcon: TemplateResult | typeof nothing = nothing;
    if (img) {
      weatherIcon = html`<img class="fc-daily-icon-img" src="${img}" alt="" />`;
    } else if (icon) {
      weatherIcon = html`<ha-icon
        class="fc-daily-icon"
        icon="${icon}"
        style=${iconColor ? `color: ${iconColor}` : ''}
      ></ha-icon>`;
    }

    return html`
      <div class="fc-daily-slot">
        ${day ? html`<div class="fc-daily-day">${day}</div>` : nothing}

        ${weatherIcon}

        ${tempLow !== undefined && tempHigh !== undefined ? html`
          <div class="fc-daily-temp">
            ${tempLow}° / <span class="fc-daily-temp-high">${tempHigh}°${tempUnit ? ` ${tempUnit}` : ''}</span>
          </div>
        ` : nothing}

        ${hasRain ? html`
          <div class="fc-daily-rain">
            <ha-icon class="fc-daily-rain-icon" icon="mdi:water"></ha-icon>
            ${precipProb}% · ${precipInt}${precipUnit ? ` ${precipUnit}` : ''}
          </div>
        ` : nothing}
      </div>
    `;
  });

  return html`
    <div class="cwc-section">
      ${renderSectionHeader(translate('Daily forecast', wordDict))}
      <div class="fc-daily-grid">
        ${slots}
      </div>
    </div>
  `;
};

const SEA_STATE_MAP: Record<string, { label: string; color: string }> = {
  green: { label: 'Calm', color: '#10b981' },
  yellow: { label: 'Rough', color: '#f59e0b' },
  red: { label: 'Stormy', color: '#ef4444' },
};

const buildSmoothPath = (points: { x: number; y: number }[]): string => {
  if (points.length === 0) return '';
  if (points.length === 1) return `M${points[0].x},${points[0].y}`;

  let path = `M${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i === 0 ? i : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} `
      + `${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }

  return path;
};

const fmtMeters = (value: number): string => value.toFixed(1).replace('.', ',');

const toNumber = (val: number | string | Date | undefined): number => {
  if (typeof val === 'number') return val;
  if (typeof val !== 'string') return NaN;

  const normalized = val.includes(',') && !val.includes('.') ? val.replace(',', '.') : val;
  return Number(normalized);
};

export const renderMarineDailyForecast = (
  data: Record<string, iForecastDataItem>[],
  wordDict: Record<string, string> = {},
) => {
  if (data.length === 0) return html``;

  const slots = data.map((item) => {
    const day = item.reference?.value;
    const flagColor = item.condition?.iconColor;
    const seaState = flagColor ? SEA_STATE_MAP[flagColor] : undefined;

    const waveHeight = item.wave_height_max?.value;
    const waveHeightUnit = item.wave_height_max?.unit;

    const swellHeight = item.swell_wave_height_max?.value;
    const swellHeightUnit = item.swell_wave_height_max?.unit;
    const swellPeriod = item.swell_wave_period_max?.value;
    const swellPeriodUnit = item.swell_wave_period_max?.unit;

    const windWaveHeight = item.wind_wave_height_max?.value;
    const windWaveHeightUnit = item.wind_wave_height_max?.unit;
    const windWavePeriod = item.wind_wave_period_max?.value;
    const windWavePeriodUnit = item.wind_wave_period_max?.unit;

    const waveDir = item.wave_direction?.value;

    return html`
      <div class="fc-marine-slot">
        ${day ? html`<div class="fc-marine-day">${day}</div>` : nothing}

        ${waveHeight !== undefined ? html`
          <div class="fc-marine-wave-h">${waveHeight}${waveHeightUnit ? ` ${waveHeightUnit}` : ''}</div>
        ` : nothing}

        ${seaState ? html`
          <span
            class="fc-marine-badge"
            style="background: ${seaState.color}26; color: ${seaState.color}"
            title="${translate('Beach flag', wordDict)}"
          >${translate(seaState.label, wordDict)}</span>
        ` : nothing}

        ${waveDir ? html`
          <div class="fc-marine-dir">
            <span class="fc-marine-dir-label">${waveDir}</span>
          </div>
        ` : nothing}

        ${swellHeight !== undefined ? html`
          <div class="fc-marine-component" title="${translate('Swell', wordDict)}">
            <ha-icon class="fc-marine-mini-icon" icon="mdi:waves"></ha-icon>
            <span class="fc-marine-component-value">
              ${swellHeight}${swellHeightUnit ? ` ${swellHeightUnit}` : ''}${swellPeriod !== undefined
                ? html` · ${swellPeriod}${swellPeriodUnit ? ` ${swellPeriodUnit}` : ''}`
                : nothing}
            </span>
          </div>
        ` : nothing}

        ${windWaveHeight !== undefined ? html`
          <div class="fc-marine-component" title="${translate('Wind wave', wordDict)}">
            <ha-icon class="fc-marine-mini-icon" icon="mdi:weather-windy"></ha-icon>
            <span class="fc-marine-component-value">
              ${windWaveHeight}${windWaveHeightUnit ? ` ${windWaveHeightUnit}` : ''}${windWavePeriod !== undefined
                ? html` · ${windWavePeriod}${windWavePeriodUnit ? ` ${windWavePeriodUnit}` : ''}`
                : nothing}
            </span>
          </div>
        ` : nothing}
      </div>
    `;
  });

  const waveHeights = data.map((item) => toNumber(item.wave_height_max?.value));
  const swellHeights = data.map((item) => toNumber(item.swell_wave_height_max?.value));
  const windWaveHeights = data.map((item) => toNumber(item.wind_wave_height_max?.value));

  const allValidHeights = [...waveHeights, ...swellHeights, ...windWaveHeights]
    .filter((height) => Number.isFinite(height));
  const validWaveHeights = waveHeights.filter((height) => Number.isFinite(height));

  let chart = html``;
  if (validWaveHeights.length >= 2 && allValidHeights.length > 0) {
    const maxHeight = Math.max(...allValidHeights);
    const domainTop = Math.max(0.5, Math.ceil(maxHeight / 0.5) * 0.5);
    const domainMid = domainTop / 2;

    const plotLeft = 40;
    const plotRight = 300;
    const plotTop = 10;
    const plotBottom = 42;
    const plotHeight = plotBottom - plotTop;
    const stepX = data.length > 1 ? (plotRight - plotLeft) / (data.length - 1) : 0;

    const plainSeriesPoints = (heights: number[]) => heights.map((height, idx) => {
      const safeHeight = Number.isFinite(height) ? Math.max(0, height) : 0;
      return {
        x: plotLeft + idx * stepX,
        y: plotBottom - (safeHeight / domainTop) * plotHeight,
      };
    });

    const wavePoints = data.map((item, idx) => {
      const height = toNumber(item.wave_height_max?.value);
      const safeHeight = Number.isFinite(height) ? Math.max(0, height) : 0;
      const itemFlagColor = item.condition?.iconColor;
      const itemSeaState = itemFlagColor ? SEA_STATE_MAP[itemFlagColor] : undefined;

      return {
        x: plotLeft + idx * stepX,
        y: plotBottom - (safeHeight / domainTop) * plotHeight,
        color: itemSeaState?.color ?? '#38bdf8',
        label: item.wave_height_max?.value !== undefined
          ? `${item.wave_height_max.value}${item.wave_height_max.unit ? ` ${item.wave_height_max.unit}` : ''}`
          : '',
        day: item.reference?.value ?? '',
      };
    });

    const swellPoints = plainSeriesPoints(swellHeights);
    const windWavePoints = plainSeriesPoints(windWaveHeights);

    const wavePath = buildSmoothPath(wavePoints.map((point) => ({ x: point.x, y: point.y })));
    const swellPath = buildSmoothPath(swellPoints);
    const windWavePath = buildSmoothPath(windWavePoints);

    chart = html`
      <div class="fc-marine-chart-wrap">
        <div class="fc-marine-chart-title">${translate('Wave height trend', wordDict)}</div>
        <svg class="fc-marine-chart-svg" viewBox="0 0 308 56" preserveAspectRatio="none">
          <line x1="${plotLeft}" y1="${plotTop}" x2="${plotRight}" y2="${plotTop}" class="fc-marine-chart-grid" />
          <line
            x1="${plotLeft}"
            y1="${plotTop + plotHeight / 2}"
            x2="${plotRight}"
            y2="${plotTop + plotHeight / 2}"
            class="fc-marine-chart-grid"
          />
          <line x1="${plotLeft}" y1="${plotBottom}" x2="${plotRight}" y2="${plotBottom}" class="fc-marine-chart-grid" />

          <text x="0" y="${plotTop + 3}" class="fc-marine-chart-axis">${fmtMeters(domainTop)} m</text>
          <text x="0" y="${plotTop + plotHeight / 2 + 3}" class="fc-marine-chart-axis">${fmtMeters(domainMid)} m</text>
          <text x="0" y="${plotBottom + 3}" class="fc-marine-chart-axis">0,0 m</text>

          <path d="${swellPath}" class="fc-marine-chart-line fc-marine-chart-line--swell" />
          <path d="${windWavePath}" class="fc-marine-chart-line fc-marine-chart-line--windwave" />
          <path d="${wavePath}" class="fc-marine-chart-line fc-marine-chart-line--wave" />

          ${wavePoints.map((point) => html`
            <circle cx="${point.x}" cy="${point.y}" r="3.2" fill="${point.color}" stroke="#1a1a1a" stroke-width="1.2" />
            <text
              x="${point.x}"
              y="${point.y - 7}"
              class="fc-marine-chart-value"
              text-anchor="middle"
            >${point.label}</text>
            <text
              x="${point.x}"
              y="${plotBottom + 14}"
              class="fc-marine-chart-day"
              text-anchor="middle"
            >${point.day}</text>
          `)}
        </svg>
      </div>
    `;
  }

  const legend = html`
    <div class="fc-marine-legend">
      <div class="fc-marine-legend-row">
        <span class="fc-marine-legend-item">
          <span
            class="fc-marine-legend-dot"
            style="background: #10b981"
            title="${translate('Max wave below 1.0 m', wordDict)}"
          ></span>${translate('Calm', wordDict)}
        </span>
        <span class="fc-marine-legend-item">
          <span
            class="fc-marine-legend-dot"
            style="background: #f59e0b"
            title="${translate('Max wave 1.0-1.8 m, or swell >= 0.8 m or wind wave >= 0.6 m', wordDict)}"
          ></span>${translate('Rough', wordDict)}
        </span>
        <span class="fc-marine-legend-item">
          <span
            class="fc-marine-legend-dot"
            style="background: #ef4444"
            title="${translate('Max wave 1.8 m or more, or swell >= 1.5 m with wind wave >= 0.8 m', wordDict)}"
          ></span>${translate('Stormy', wordDict)}
        </span>
      </div>
      <div class="fc-marine-legend-row">
        <span class="fc-marine-legend-item">
          <span class="fc-marine-legend-line fc-marine-legend-line--wave"></span>${translate('Max wave', wordDict)}
        </span>
        <span class="fc-marine-legend-item">
          <span class="fc-marine-legend-line fc-marine-legend-line--swell"></span>
          <ha-icon class="fc-marine-legend-icon" icon="mdi:waves"></ha-icon>${translate('Swell', wordDict)}
        </span>
        <span class="fc-marine-legend-item">
          <span class="fc-marine-legend-line fc-marine-legend-line--windwave"></span>
          <ha-icon class="fc-marine-legend-icon" icon="mdi:weather-windy"></ha-icon>${translate('Wind wave', wordDict)}
        </span>
      </div>
    </div>
  `;

  return html`
    <div class="cwc-section">
      ${renderSectionHeader(translate('Marine daily forecast', wordDict))}
      <div class="fc-marine-grid">
        ${slots}
      </div>
      ${chart}
      ${legend}
    </div>
  `;
};

export const renderWeatherForecast = (
  forecastType: number,
  data: Record<string, iForecastDataItem>[],
  wordDict: Record<string, string> = {},
) => {
  const rows = data.map((dayData) => {
    const day = dayData.reference?.value;
    const img = dayData.condition?.img;
    const icon = dayData.condition?.icon;
    const iconColor = dayData.condition?.iconColor;
    const tempLow = dayData.temperature_low?.value;
    const tempHigh = dayData.temperature_high?.value;
    const tempHLUnit = dayData.temperature_high?.unit || dayData.temperature_low?.unit;
    const precipProb: number = Number(dayData.precipitation_probability?.value ?? 0);
    const precipInt = dayData.precipitation_intensity?.value;
    const precipUnit = dayData.precipitation_intensity?.unit;

    const temp = dayData.temperature?.value;
    const tempUnit = dayData.temperature?.unit || dayData.temperature_feelslike?.unit;
    const temp_feelslike = dayData.temperature_feelslike?.value;
    const wind_speed = dayData.wind_speed?.value;
    const wind_speedUnit = dayData.wind_speed?.unit;
    const wind_bearing = dayData.wind_bearing?.value;

    const wind_wave_height_max = dayData.wind_wave_height_max?.value;
    const swell_wave_height_max = dayData.swell_wave_height_max?.value;
    const wave_height_max = dayData.wave_height_max?.value;
    const wave_direction = dayData.wave_direction?.value;
    const wave_height_max_unit = dayData.wave_height_max?.unit;

    return html`
      <div class="weather-forecast-slot">
        ${day ? html`<div class="weather-forecast-label-slot">${day}</div>` : ''}
        ${img ? html`<img class="weather-forecast-icon" src="${img}" alt="${img}" />` : ''}
        ${icon ? html`<ha-icon icon="${icon}" style=${iconColor ? `color: ${iconColor}` : ''}></ha-icon>` : ''}
        ${
  tempLow !== undefined && tempHigh !== undefined
    ? html`
                <div class="weather-forecast-temperature">
                  ${tempLow} / <span class="high">${tempHigh}${tempHLUnit ? ` ${tempHLUnit}` : ''}</span>
                </div>
              `
    : ''
}
        ${
  temp !== undefined && temp_feelslike !== undefined
    ? html`
                <div class="weather-forecast-temperature">
                  ${temp} / <span class="high">${temp_feelslike}${tempUnit ? ` ${tempUnit}` : ''}</span>
                </div>
              `
    : ''
}
        ${
  wind_speed !== undefined && wind_bearing !== undefined
    ? html`
                <div class="weather-forecast-temperature">
                  ${wind_speed} ${wind_speedUnit} ${wind_bearing}</span>
                </div>
              `
    : ''
}
        ${
  wave_height_max !== undefined
    ? html`
                <div class="weather-forecast-temperature">
                  ${wave_height_max} ${wave_height_max_unit ? ` ${wave_height_max_unit}` : ''}
                </div>
              `
    : ''
}
        ${
  wave_direction !== undefined
    ? html`
                <div class="weather-forecast-temperature">
                  ${wave_direction}
                </div>
              `
    : ''
}
        ${
  wind_wave_height_max !== undefined && swell_wave_height_max !== undefined
    ? html`
                <div class="weather-forecast-temperature">
                  ${swell_wave_height_max} / ${wind_wave_height_max} ${wave_height_max_unit ? ` ${wave_height_max_unit}` : ''}
                </div>
              `
    : ''
}
        ${
  precipProb !== undefined && precipInt !== undefined && precipProb !== 0
    ? html`
                <div class="weather-forecast-precipitation">
                  ${precipProb} % / <span class="mm">${precipInt}${precipUnit ? ` ${precipUnit}` : ''}</span>
                </div>
              `
    : ''
}
      </div>
    `;
  });

  let title = translate('Daily forecast', wordDict);
  if (forecastType === 1) {
    title = translate('Hourly forecast', wordDict);
  } else if (forecastType === 2) {
    title = translate('Marine daily forecast', wordDict);
  } else if (forecastType === 3) {
    title = translate('Marine hourly forecast', wordDict);
  }

  return html`
  <div class="weather-forecast-grid-wrapper">
    <div class="weather-forecast-title">${title}</div>
    <div class="weather-forecast-grid-container">
      ${rows}
    </div>
  </div>
  `;
};
