import { css } from 'lit';

const weatherForecastStyle = css`

.fc-marine-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--cwc-space-xs);
}

.fc-marine-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: var(--cwc-space-sm) 2px;
  border-radius: var(--cwc-radius-md);
  background: rgba(255, 255, 255, 0.035);
  border: 0.5px solid rgba(255, 255, 255, 0.07);
  min-width: 0;
}

.fc-marine-day {
  font-size: var(--cwc-font-xs);
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--cwc-text-secondary);
}

.fc-marine-wave-h {
  font-size: var(--cwc-font-md);
  font-weight: 700;
  color: var(--cwc-text-primary);
  line-height: 1;
  margin-top: 2px;
}

.fc-marine-badge {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 999px;
  margin-top: 1px;
}

.fc-marine-dir {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 3px;
}

.fc-marine-dir-label {
  font-size: 10px;
  color: var(--cwc-text-muted);
}

.fc-marine-component {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  font-size: 9px;
  color: var(--cwc-text-secondary);
  width: 100%;
  margin-top: 1px;
}

.fc-marine-mini-icon {
  --mdc-icon-size: 11px;
  color: var(--cwc-text-muted);
  flex-shrink: 0;
}

.fc-marine-component-value {
  color: var(--cwc-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.fc-marine-chart-wrap {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: var(--cwc-space-xs);
}

.fc-marine-chart-title {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--cwc-text-muted);
}

.fc-marine-chart-svg {
  width: 100%;
  height: auto;
  overflow: visible;
}

.fc-marine-chart-grid {
  stroke: rgba(255, 255, 255, 0.07);
  stroke-width: 1;
}

.fc-marine-chart-axis {
  font-size: 8px;
  fill: var(--cwc-text-muted);
}

.fc-marine-chart-line {
  stroke-width: 2;
  fill: none;
  stroke-linecap: round;
}

.fc-marine-chart-line--wave {
  stroke: #38bdf8;
}

.fc-marine-chart-line--swell {
  stroke: #a78bfa;
  stroke-width: 1.5;
  opacity: 0.85;
}

.fc-marine-chart-line--windwave {
  stroke: #f472b6;
  stroke-width: 1.5;
  opacity: 0.85;
}

.fc-marine-chart-value {
  font-size: 8px;
  fill: var(--cwc-text-secondary);
}

.fc-marine-chart-day {
  font-size: 8px;
  fill: var(--cwc-text-muted);
}

/* ── Legenda stato del mare + serie grafico ─────────────────── */

.fc-marine-legend {
  display: flex;
  flex-direction: column;
  gap: var(--cwc-space-xs);
  padding-top: var(--cwc-space-xs);
  border-top: 0.5px solid var(--cwc-separator);
}

.fc-marine-legend-row {
  display: flex;
  align-items: center;
  gap: var(--cwc-space-sm);
  flex-wrap: wrap;
}

.fc-marine-legend-item {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 9px;
  color: var(--cwc-text-muted);
  white-space: nowrap;
}

.fc-marine-legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.fc-marine-legend-line {
  width: 12px;
  height: 2px;
  border-radius: 1px;
  flex-shrink: 0;
}

.fc-marine-legend-line--wave {
  background: #38bdf8;
}

.fc-marine-legend-line--swell {
  background: #a78bfa;
}

.fc-marine-legend-line--windwave {
  background: #f472b6;
}

.fc-marine-legend-icon {
  --mdc-icon-size: 10px;
  color: var(--cwc-text-muted);
}

.fc-daily-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--cwc-space-xs);
}

.fc-daily-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: var(--cwc-space-xs) 2px;
  min-width: 0;
}

.fc-daily-day {
  font-size: var(--cwc-font-xs);
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--cwc-text-secondary);
}

.fc-daily-icon-img {
  width: 24px;
  height: 24px;
  object-fit: contain;
  margin: 2px 0;
}

.fc-daily-icon {
  --mdc-icon-size: 22px;
  margin: 2px 0;
}

.fc-daily-temp {
  font-size: var(--cwc-font-xs);
  color: var(--cwc-text-secondary);
  text-align: center;
  white-space: nowrap;
}

.fc-daily-temp-high {
  color: var(--cwc-text-primary);
  font-weight: 600;
}

.fc-daily-rain {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 10px;
  color: #60a5fa;
  white-space: nowrap;
  margin-top: 1px;
}

.fc-daily-rain-icon {
  --mdc-icon-size: 11px;
  color: #38bdf8;
}

.fc-hourly-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--cwc-space-xs);
}

.fc-hourly-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: var(--cwc-space-xs) 2px;
  border-radius: var(--cwc-radius-sm);
  border: 0.5px solid transparent;
  min-width: 0;
}

.fc-hourly-slot--active {
  background: rgba(59, 130, 246, 0.14);
  border-color: rgba(59, 130, 246, 0.35);
}

.fc-hourly-time {
  font-size: var(--cwc-font-sm);
  font-weight: 700;
  color: var(--cwc-text-primary);
}

.fc-hourly-icon-img {
  width: 24px;
  height: 24px;
  object-fit: contain;
  margin: 2px 0;
}

.fc-hourly-icon {
  --mdc-icon-size: 22px;
  margin: 2px 0;
}

.fc-hourly-temp {
  font-size: var(--cwc-font-xs);
  color: var(--cwc-text-secondary);
  text-align: center;
  white-space: nowrap;
}

.fc-hourly-temp-high {
  color: var(--cwc-text-primary);
  font-weight: 600;
}

.fc-hourly-wind {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 10px;
  color: var(--cwc-text-muted);
  white-space: nowrap;
}

.fc-hourly-wind-icon {
  --mdc-icon-size: 11px;
}

.fc-hourly-rain {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 10px;
  color: #60a5fa;
  white-space: nowrap;
  margin-top: 1px;
}

.fc-hourly-rain-icon {
  --mdc-icon-size: 11px;
  color: #38bdf8;
}

.weather-forecast-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(78px, 1fr));
  column-gap: 2px; /* spazio orizzontale tra i giorni */
  row-gap: 6px;    /* spazio verticale tra righe, se ci sono */
  align-items: stretch;
  font-family: 'Segoe UI', sans-serif;
  width: 100%;
}
  
.weather-forecast-grid-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center; /* centrare il titolo orizzontalmente */
}

.weather-forecast-title {
  font-size: clamp(0.85em, 1vw, 0.95em);
  font-weight: bold;
  // margin-bottom: 0.5em;
  text-align: center;
}

.weather-forecast-slot {
  text-align: center;
  padding: 8px 4px;
  min-width: 0;
  overflow: hidden;
}

.weather-forecast-slot:last-child {
  border-right: none;
}

.weather-forecast-label-slot {
  font-size: 0.9em;
  font-weight: bold;
  margin-bottom: 6px; /* ridotto */
}

.weather-forecast-icon {
  font-size: 1.6rem; /* ridotto */
  /* margin: 6px 0; ridotto */
  height: 32px;
}

.weather-forecast-temperature {
  font-size: clamp(0.8em, 1vw, 0.9em); /* leggermente più piccolo */
  margin: 4px 0; /* meno margine */
}

.weather-forecast-temperature .high {
  font-weight: bold;
}

.weather-forecast-precipitation {
  font-size: clamp(0.65em, 1vw, 0.75em);
  line-height: 1.2; /* compatta verticalmente */
}

.weather-forecast-precipitation .mm {
  font-weight: bold;
}
`;

export default weatherForecastStyle;
