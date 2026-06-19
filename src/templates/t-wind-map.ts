import { html, nothing } from 'lit';
import { renderSectionHeader } from '../utils/render-section';
import { translate } from '../utils/locale';

export interface iWindMapData {
  /** 9 URL di tile, ordine riga per riga (griglia 3x3, 768x768px). */
  tiles: string[];
  /** Posizione in pixel del punto esatto (lat/lon) dentro il mosaico 768x768. */
  markerX: number;
  markerY: number;
  /** Filtro CSS completo applicato al mosaico (es. 'brightness(0.65)' o 'invert(90%) hue-rotate(180deg) brightness(1)'). */
  filter: string;
  windBearingDeg?: number;
  windBearingLabel?: string | null;
  windSpeedValue?: string;
  windSpeedUnit?: string;
  attribution: string;
}

const renderWindMap = (data: iWindMapData | null, wordDict: Record<string, string> = {}) => {
  if (!data) return html``;

  const {
    tiles,
    markerX,
    markerY,
    filter,
    windBearingDeg,
    windBearingLabel,
    windSpeedValue,
    windSpeedUnit,
    attribution,
  } = data;

  const hasWindBearing = windBearingDeg !== undefined;

  const chipLabel = [
    windBearingLabel ?? undefined,
    windSpeedValue !== undefined ? `${windSpeedValue}${windSpeedUnit ? ` ${windSpeedUnit}` : ''}` : undefined,
  ].filter(Boolean).join(' · ');

  return html`
    <div class="cwc-section">
      ${renderSectionHeader(translate('Wind direction', wordDict))}
      <div class="windmap-container">
        <div
          class="windmap-mosaic"
          style="transform: translate(${-markerX}px, ${-markerY}px); filter: ${filter}"
        >
          ${tiles.map((url) => html`<img class="windmap-tile" src="${url}" alt="" loading="lazy" referrerpolicy="origin" />`)}
        </div>

        <div class="windmap-marker">
          ${hasWindBearing ? html`
            <div class="windmap-compass">
              <span class="windmap-compass-n">N</span>
              <ha-icon
                class="windmap-compass-arrow"
                icon="mdi:navigation"
                style="transform: rotate(${windBearingDeg}deg)"
              ></ha-icon>
            </div>
          ` : html`<div class="windmap-pin"></div>`}
        </div>

        ${chipLabel ? html`
          <div class="windmap-chip">
            <ha-icon class="windmap-chip-icon" icon="mdi:weather-windy"></ha-icon>${chipLabel}
          </div>
        ` : nothing}

        <div class="windmap-attribution">${attribution}</div>
      </div>
    </div>
  `;
};

export default renderWindMap;
