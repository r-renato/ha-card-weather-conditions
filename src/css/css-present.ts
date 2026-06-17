import { css } from 'lit';

const presentStyle = css`

/* ── Sun bar: alba → tramonto ───────────────────────────────── */

.sun-bar-row {
  display: flex;
  align-items: center;
  gap: var(--cwc-space-xs);
}

.sun-bar-icon {
  --mdc-icon-size: 18px;
  flex-shrink: 0;
  color: var(--cwc-text-secondary);
}

.sun-bar-icon--rise { color: #f59e0b; }

.sun-bar-time {
  font-size: var(--cwc-font-sm);
  color: var(--cwc-text-primary);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.sun-bar-track {
  flex: 1;
  height: 3px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  overflow: hidden;
}

.sun-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #f59e0b, #fbbf24);
  border-radius: 2px;
  min-width: 3px;
}

/* ── Griglia chip 3 colonne fisse ───────────────────────────────
   Ogni chip occupa esattamente 1/3 della larghezza disponibile,
   indipendentemente dalla lunghezza del contenuto.
*/

.present-chip-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--cwc-space-xs);
}

.present-chip {
  background: transparent;
  border: none;
  padding: var(--cwc-space-xs) var(--cwc-space-sm);
  display: flex;
  align-items: center;
  gap: var(--cwc-space-xs);
  min-width: 0;
  overflow: hidden;
}

.present-chip__icon {
  --mdc-icon-size: 16px;
  flex-shrink: 0;
  color: var(--cwc-text-secondary);
}

.present-chip__content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.present-chip__value {
  font-size: var(--cwc-font-sm);
  color: var(--cwc-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
}

.present-chip__unit {
  font-size: var(--cwc-font-xs);
  color: var(--cwc-text-secondary);
}

/* Etichetta descrittiva opzionale: visibile solo se il builder
   popola iRenderDataItem.label (futura evoluzione). */
.present-chip__label {
  font-size: var(--cwc-font-xs);
  color: var(--cwc-text-muted);
  line-height: 1.2;
  margin-top: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
`;

export default presentStyle;
