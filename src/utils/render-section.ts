import { html, TemplateResult, nothing } from 'lit';

/**
 * Genera l'header standard di una sezione della card.
 *
 * Produce:
 *   <div class="cwc-section-header">
 *     <span class="cwc-section-label">{label}</span>
 *     <div class="cwc-section-line"></div>        ← solo se showLine = true
 *   </div>
 *
 * Gli stili .cwc-section-header / .cwc-section-label / .cwc-section-line
 * sono definiti in css/css-base-card.ts e quindi sempre disponibili.
 *
 * @param label    Testo dell'etichetta (es. "Pollini", "Qualità dell'aria")
 * @param showLine Mostra la linea separatrice orizzontale (default: true)
 */
/* eslint-disable import/prefer-default-export */
export const renderSectionHeader = (
  label: string,
  showLine = true,
): TemplateResult => html`
  <div class="cwc-section-header">
    <span class="cwc-section-label">${label}</span>
    ${showLine ? html`<div class="cwc-section-line"></div>` : nothing}
  </div>
`;
