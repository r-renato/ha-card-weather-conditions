import { css } from 'lit';

const airqualityStyle = css`

.aqi-summary-row {
  display: flex;
  align-items: center;
  gap: var(--cwc-space-md);
}

.aqi-badge {
  width: 48px;
  height: 48px;
  border-radius: var(--cwc-radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  gap: 1px;
}

.aqi-badge__value {
  font-size: var(--cwc-font-lg);
  font-weight: 600;
  color: #fff;
  line-height: 1;
}

.aqi-badge__unit {
  font-size: var(--cwc-font-xs);
  color: rgba(255, 255, 255, 0.8);
  line-height: 1;
}

.aqi-summary-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.aqi-quality-label {
  font-size: var(--cwc-font-md);
  font-weight: 500;
  color: var(--cwc-text-primary);
}

.aqi-primary-pollutant {
  font-size: var(--cwc-font-sm);
  color: var(--cwc-text-muted);
}

.aqi-pollutants-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px var(--cwc-space-lg);
}

.aqi-pollutant-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.aqi-pollutant-name {
  font-size: var(--cwc-font-sm);
  color: var(--cwc-text-muted);
}

.aqi-pollutant-value {
  font-size: var(--cwc-font-sm);
  color: var(--cwc-text-primary);
  font-variant-numeric: tabular-nums;
}

.aqi-pollutant-unit {
  font-size: var(--cwc-font-xs);
  color: var(--cwc-text-muted);
}
`;

export default airqualityStyle;
