import { css } from 'lit';

const meteodcpalarmStyle = css`

/* ── Banner base ─────────────────────────────────────────────── */

.alarm-banner {
  display: flex;
  align-items: center;
  gap: var(--cwc-space-sm);
  padding: var(--cwc-space-sm) var(--cwc-space-md);
  border-radius: var(--cwc-radius-sm);
  border: 0.5px solid transparent;
  border-left-width: 3px;
  position: relative;
}

.alarm-banner__icon {
  --mdc-icon-size: 22px;
  flex-shrink: 0;
}

.alarm-banner__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.alarm-banner__event {
  font-size: var(--cwc-font-md);
  font-weight: 500;
  color: var(--cwc-text-primary);
  line-height: 1.2;
}

.alarm-banner__when {
  font-size: var(--cwc-font-sm);
  color: var(--cwc-text-secondary);
}

.alarm-banner__badge {
  font-size: var(--cwc-font-xs);
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: var(--cwc-radius-sm);
  flex-shrink: 0;
  white-space: nowrap;
}

/* ── Modificatori colore ─────────────────────────────────────── */

.alarm--green {
  background: rgba(76, 175, 80, 0.08);
  border-color: rgba(76, 175, 80, 0.55);
}
.alarm--green .alarm-banner__icon { color: #4caf50; }
.alarm--green__badge {
  background: rgba(76, 175, 80, 0.15);
  color: #4caf50;
}

.alarm--yellow {
  background: rgba(255, 166, 0, 0.08);
  border-color: rgba(255, 166, 0, 0.55);
}
.alarm--yellow .alarm-banner__icon { color: #ffa600; }
.alarm--yellow__badge {
  background: rgba(255, 166, 0, 0.15);
  color: #ffa600;
}

.alarm--orange {
  background: rgba(255, 100, 0, 0.09);
  border-color: rgba(255, 100, 0, 0.55);
}
.alarm--orange .alarm-banner__icon { color: #ff6400; }
.alarm--orange__badge {
  background: rgba(255, 100, 0, 0.15);
  color: #ff6400;
}

.alarm--red {
  background: rgba(220, 50, 50, 0.10);
  border-color: rgba(220, 50, 50, 0.55);
}
.alarm--red .alarm-banner__icon { color: #dc3232; }
.alarm--red__badge {
  background: rgba(220, 50, 50, 0.15);
  color: #dc3232;
}

.alarm--gray {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.20);
}
.alarm--gray .alarm-banner__icon { color: var(--cwc-text-secondary); }
.alarm--gray__badge {
  background: rgba(255, 255, 255, 0.08);
  color: var(--cwc-text-secondary);
}
`;

export default meteodcpalarmStyle;
