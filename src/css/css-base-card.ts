import { css } from 'lit';

const cardStyle = css`
  ha-card {
    cursor: pointer;
    position: relative;
    width: 100%;
  }

  .ha-card-weather-conditions {
    width: 100%;
    box-sizing: border-box;
    background-color: var(--card-background-color, #1c1c1c);
    color: var(--primary-text-color, #ffffff);
    border-radius: var(--ha-card-border-radius, 12px);
    box-shadow: var(--ha-card-box-shadow, 0 2px 6px rgba(0, 0, 0, 0.2));
    overflow: hidden;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .nd-container {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 16px 20px;
    gap: 12px;
    background-size: cover;
    background-position: center;
    transition: background-image 0.3s ease-in-out;

    /* ── Design tokens ─────────────────────────────────────────────
       Sovrascrivibili da tema HA o da card-mod senza toccare il TS.
       Prefisso --cwc- per evitare collisioni con variabili HA.
    ────────────────────────────────────────────────────────────── */

    /* Spaziatura */
    --cwc-space-xs: 4px;
    --cwc-space-sm: 8px;
    --cwc-space-md: 12px;
    --cwc-space-lg: 16px;
    --cwc-space-xl: 24px;

    /* Tipografia */
    --cwc-font-xs:  0.688rem;   /* ~11px */
    --cwc-font-sm:  0.75rem;    /* ~12px */
    --cwc-font-md:  0.875rem;   /* ~14px */
    --cwc-font-lg:  1rem;       /* ~16px */
    --cwc-font-xl:  1.25rem;    /* ~20px */

    /* Colori testo */
    --cwc-text-primary:   var(--primary-text-color, rgba(255, 255, 255, 0.92));
    --cwc-text-secondary: rgba(255, 255, 255, 0.55);
    --cwc-text-muted:     rgba(255, 255, 255, 0.32);

    /* Separatori e superfici */
    --cwc-separator:      rgba(255, 255, 255, 0.07);
    --cwc-chip-bg:        rgba(255, 255, 255, 0.055);
    --cwc-chip-border:    rgba(255, 255, 255, 0.09);

    /* Raggi */
    --cwc-radius-sm:  6px;
    --cwc-radius-md:  10px;
    --cwc-radius-lg:  14px;
  }

  /* ── Section header ─────────────────────────────────────────────
     Stile condiviso tra tutte le sezioni. Generato da
     renderSectionHeader() in utils/render-section.ts.
  ────────────────────────────────────────────────────────────── */

  .cwc-section {
    padding: var(--cwc-space-md) var(--cwc-space-lg);
    border-top: 0.5px solid var(--cwc-separator);
    display: flex;
    flex-direction: column;
    gap: var(--cwc-space-sm);
  }

  .cwc-section-header {
    display: flex;
    align-items: center;
    gap: var(--cwc-space-sm);
  }

  .cwc-section-label {
    font-size: var(--cwc-font-xs);
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--cwc-text-muted);
    white-space: nowrap;
  }

  .cwc-section-line {
    flex: 1;
    height: 0.5px;
    background: var(--cwc-separator);
  }

  /* Quando la sezione è il primo modulo visibile della card (subito dopo
     l'eventuale header nativo di Lovelace), il border-top e la linea
     decorativa accanto al titolo non separano nulla: si nascondono. */
  .nd-container > .cwc-section:first-child {
    border-top: none;
  }

  .nd-container > .cwc-section:first-child .cwc-section-line {
    display: none;
  }

  /* ── Background dinamico (invariato) ───────────────────────── */

  .nd-container.sunny {
    background-image: url('/local/images/sunny-bg.jpg');
  }

  .nd-container.rainy {
    background-image: url('/local/images/rainy-bg.jpg');
  }

`;

export default cardStyle;
