import { css } from 'lit';

const summaryStyle = css`

/* ── Hero layout: icona · meta · temperatura ────────────────── */

.summary-wrapper {
  position: relative;
  width: 100%;
  overflow: visible;
}

.summary-hero {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 72px 1fr auto;
  align-items: center;
  gap: var(--cwc-space-xs) var(--cwc-space-md);
  padding: var(--cwc-space-lg) var(--cwc-space-lg) var(--cwc-space-md);
}

/* Icona meteo */

.summary-icon-col {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
}

.weather-condition-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.2s ease;
}

.summary-icon-col:hover .weather-condition-icon {
  transform: scale(1.05);
}

/* ── Meta: localita + luna ───────────────────────────────────── */

.summary-meta-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--cwc-space-xs);
  min-width: 0;
}

.summary-location {
  font-size: var(--cwc-font-xs);
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--cwc-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.summary-moon {
  display: flex;
  align-items: center;
  gap: var(--cwc-space-xs);
}

.summary-moon-icon {
  font-size: 1em;
  line-height: 1;
}

.summary-moon-text {
  font-size: var(--cwc-font-sm);
  color: var(--cwc-text-secondary);
}

/* Temperatura */

.summary-temp-col {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  white-space: nowrap;
}

.summary-temp-value {
  display: flex;
  align-items: flex-start;
  line-height: 1;
}

.temperature {
  font-size: 2rem;
  font-weight: 300;
  color: var(--cwc-text-primary);
  line-height: 1;
}

.temp-unit {
  font-size: var(--cwc-font-md);
  color: var(--cwc-text-secondary);
  margin-top: 3px;
  margin-left: 2px;
}

.summary-feels-like {
  font-size: var(--cwc-font-xs);
  color: var(--cwc-text-muted);
}

/* ── Lightning (invariato) ───────────────────────────────────── */

.lightning-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.lightning-svg {
  position: absolute;
  transform: translate(-50%, 0);
  opacity: 0;
  filter: drop-shadow(0 0 4px rgba(98, 61, 173, 0.6));
  animation-name: flash-zigzag-svg;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
  z-index: 3;
}

@keyframes flash-zigzag-svg {
  0%, 100% { opacity: 0; }
  40%       { opacity: 1; }
  60%       { opacity: 0.5; }
}
`;

export default summaryStyle;
