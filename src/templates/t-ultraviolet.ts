import { html } from 'lit';

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
  const allItems: RenderDataItem[] = [];

  const buildBlockLeft = (item: RenderDataItem) => html`
    <span class="ultraviolet-value-block">
      <ha-icon icon="${item.icon}" style="${item.value === 'on' ? 'color: red;' : ''}"></ha-icon>
      ${item.value}${item.unit ? html`<span class="ultraviolet-unit">${item.unit}</span>` : ''}
    </span>
  `;

  const buildBlockRight = (item: RenderDataItem) => html`
    <span class="ultraviolet-value-block">
      ${item.value}${item.unit ? html`<span class="ultraviolet-unit">${item.unit}</span>` : ''}
      <ha-icon icon="${item.icon}" style="${item.value === 'on' ? 'color: red;' : ''}"></ha-icon>
    </span>
  `;
  
  const addIfValid = (key: keyof RenderData, item?: RenderDataItem) => {
    if (item?.value === undefined) return;

    allItems.push(item);
  };

  let keys: (keyof RenderData)[] = [
    'protectionWindow',
    'currentUVLevel',
  ];
  keys.forEach((k) => addIfValid(k, data[k]));

  // UV Level current/max combinata
  if (
    data.currentUVIndex?.value !== undefined &&
    data.maxUVIndex?.value !== undefined
  ) {
    allItems.push({
      icon: data.currentUVIndex.icon || data.maxUVIndex.icon || 'mdi:weather-sunny',
      value: `${data.currentUVIndex.value} / ${data.maxUVIndex.value}`,
      unit: data.currentUVIndex.unit || data.maxUVIndex.unit,
    });
  }

  keys = [
    'currentOzoneLevel',
  ];
  keys.forEach((k) => addIfValid(k, data[k]));

  const summaryRows = [];
  for (let i = 0; i < allItems.length; i += 2) {
    const left = allItems[i];
    const right = allItems[i + 1];
    summaryRows.push(html`
      <div class="ultraviolet-row">
        <div class="ultraviolet-left">${left ? buildBlockLeft(left) : html``}</div>
        <div class="ultraviolet-right">${right ? buildBlockRight(right) : html``}</div>
      </div>
    `);
  }

  const skinTypes = [
    skinData.skinType1,
    skinData.skinType2,
    skinData.skinType3,
    skinData.skinType4,
    skinData.skinType5,
    skinData.skinType6,
  ];

  const renderSkinGrid = html`
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
        <div class="ultraviolet-skin-type-label">${num[i]}</div>
        <div class="ultraviolet-exposure-time" style="color: ${textColor};">${item.value || '--'}</div>
      </div>
    `;
  })}
  </div>
  `;

  return html`
    <div class="ultraviolet-grid-container">
      ${summaryRows}
      ${renderSkinGrid}
    </div>
  `;
};

export default renderUltraviolet;
