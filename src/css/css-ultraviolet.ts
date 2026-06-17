import { css } from 'lit';

const ultravioletStyle = css`

/* ── Riga summary: indice + livello a sinistra, ozono a destra ── */

.uv-summary-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--cwc-space-sm);
}

.uv-summary-left {
  display: flex;
  align-items: baseline;
  gap: var(--cwc-space-xs);
  flex-wrap: wrap;
}

.uv-index {
  font-size: var(--cwc-font-xl);
  font-weight: 300;
  color: var(--cwc-text-primary);
  line-height: 1;
}

.uv-index-max {
  font-size: var(--cwc-font-md);
  color: var(--cwc-text-muted);
}

.uv-level {
  font-size: var(--cwc-font-md);
  font-weight: 500;
  color: #e8a234;
}

.uv-summary-right {
  display: flex;
  align-items: baseline;
  gap: 1px;
  white-space: nowrap;
}

.uv-ozone {
  font-size: var(--cwc-font-md);
  color: var(--cwc-text-secondary);
}

.uv-ozone-unit {
  font-size: var(--cwc-font-xs);
  color: var(--cwc-text-muted);
}

/* ── Indicatore protezione (solo quando attiva) ─────────────── */

.uv-protection-on {
  display: flex;
  align-items: center;
  gap: var(--cwc-space-xs);
  font-size: var(--cwc-font-sm);
  color: #e05555;
}

.uv-protection-on ha-icon {
  --mdc-icon-size: 16px;
  color: #e05555;
}

/* ── Griglia fototipi cutanei ────────────────────────────────── */

.ultraviolet-skin-type-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--cwc-space-xs);
}

.ultraviolet-skin-type-cell {
  height: 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: var(--cwc-radius-sm);
  gap: 2px;
}

.ultraviolet-skin-type-label {
  font-weight: 600;
  font-size: var(--cwc-font-sm);
  line-height: 1;
}

.ultraviolet-exposure-time {
  font-size: var(--cwc-font-xs);
  opacity: 0.85;
}
`;

export default ultravioletStyle;
