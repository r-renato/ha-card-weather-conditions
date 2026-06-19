import { html, nothing } from 'lit';
import { renderSectionHeader } from '../utils/render-section';
import { translate } from '../utils/locale';

export interface iAirQualityPollutant {
  name: string;
  value: string | number;
  unit: string;
}

export interface iAirQualityRenderData {
  aqiValue?: string | number;
  aqiColor?: string;
  aqiLabel?: string;
  primaryPollutant?: string;
  pollutants: iAirQualityPollutant[];
}

export const renderAirQuality = (data: iAirQualityRenderData, wordDict: Record<string, string> = {}) => {
  const hasAqi = data.aqiValue !== undefined && data.aqiValue !== null;
  if (!hasAqi && data.pollutants.length === 0) return html``;

  return html`
    <div class="cwc-section">
      ${renderSectionHeader(translate('Air quality', wordDict))}

      ${hasAqi ? html`
        <div class="aqi-summary-row">
          <div class="aqi-badge" style="background: ${data.aqiColor ?? '#888888'};">
            <span class="aqi-badge__value">${data.aqiValue}</span>
            <span class="aqi-badge__unit">AQI</span>
          </div>
          <div class="aqi-summary-text">
            ${data.aqiLabel ? html`
              <div class="aqi-quality-label">${data.aqiLabel}</div>
            ` : nothing}
            ${data.primaryPollutant ? html`
              <div class="aqi-primary-pollutant">${translate('Primary', wordDict)} ${data.primaryPollutant}</div>
            ` : nothing}
          </div>
        </div>
      ` : nothing}

      ${data.pollutants.length > 0 ? html`
        <div class="aqi-pollutants-grid">
          ${data.pollutants.map((p) => html`
            <div class="aqi-pollutant-row">
              <span class="aqi-pollutant-name">${p.name}</span>
              <span class="aqi-pollutant-value">
                ${p.value}<span class="aqi-pollutant-unit"> ${p.unit}</span>
              </span>
            </div>
          `)}
        </div>
      ` : nothing}
    </div>
  `;
};
