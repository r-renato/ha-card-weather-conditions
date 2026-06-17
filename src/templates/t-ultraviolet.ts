import { html, nothing } from 'lit';
import { renderSectionHeader } from '../utils/render-section';

export interface RenderDataItem {
  value?: number | string | Date;
  unit?: string;
  icon?: string;
}
export interface RenderData {
  protectionWindow?: RenderDataItem,
  currentUVLevel?: RenderDataItem,
  currentUVIndex?: RenderDataItem,
  maxUVIndex?: RenderDataItem,
  currentOzoneLevel?: RenderDataItem,
}

export interface RenderSkinData {
  skinType1: RenderDataItem,
  skinType2: RenderDataItem,
  skinType3: RenderDataItem,
  skinType4: RenderDataItem,
  skinType5: RenderDataItem,
  skinType6: RenderDataItem,
}

const num = ['I', 'II', 'III', 'IV', 'V', 'VI'];
const colors = ['#F1D1B1', '#E4B590', '#CF9F7D', '#B67851', '#A15E2D', '#513938'];

const getTextColor = (hex: string): string => {
  const c = hex.replace('#', '');
  const r = parseInt(c.substr(0, 2), 16);
  const g = parseInt(c.substr(2, 2), 16);
  const b = parseInt(c.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 125 ? '#000' : '#fff';
};

const renderUltraviolet = (data: RenderData, skinData: RenderSkinData) => {
  const hasIndex = data.currentUVIndex?.value !== undefined
    && data.maxUVIndex?.value !== undefined;

  const skinTypes = [
    skinData.skinType1,
    skinData.skinType2,
    skinData.skinType3,
    skinData.skinType4,
    skinData.skinType5,
    skinData.skinType6,
  ];

  const protectionOn = String(data.protectionWindow?.value).toLowerCase() === 'on';

  return html`
    <div class="cwc-section">
      ${renderSectionHeader('Radiazione UV')}

      <!-- Riga summary: indice/livello a sinistra, ozono a destra -->
      <div class="uv-summary-row">
        <div class="uv-summary-left">
          ${hasIndex ? html`
            <span class="uv-index">${data.currentUVIndex!.value}</span>
            <span class="uv-index-max"> / ${data.maxUVIndex!.value}</span>
          ` : nothing}
          ${data.currentUVLevel?.value ? html`
            <span class="uv-level">${data.currentUVLevel.value}</span>
          ` : nothing}
        </div>
        <div class="uv-summary-right">
          ${data.currentOzoneLevel?.value ? html`
            <span class="uv-ozone">${data.currentOzoneLevel.value}</span>
            <span class="uv-ozone-unit"> DU</span>
          ` : nothing}
        </div>
      </div>

      <!-- Protezione: visibile solo quando attiva -->
      ${protectionOn ? html`
        <div class="uv-protection-on">
          <ha-icon icon="mdi:sunglasses"></ha-icon>
          <span>Protezione consigliata</span>
        </div>
      ` : nothing}

      <!-- Griglia fototipi cutanei -->
      <div class="ultraviolet-skin-type-grid">
        ${skinTypes.map((item, i) => {
          const bgColor = colors[i];
          const textColor = getTextColor(bgColor);
          return html`
            <div
              class="ultraviolet-skin-type-cell"
              style="background: ${bgColor};"
              title="Fototipo ${num[i]}"
            >
              <div class="ultraviolet-skin-type-label" style="color: ${textColor};">${num[i]}</div>
              <div class="ultraviolet-exposure-time" style="color: ${textColor};">${item.value || '--'}</div>
            </div>
          `;
        })}
      </div>
    </div>
  `;
};

export default renderUltraviolet;
