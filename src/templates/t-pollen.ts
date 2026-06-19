import { html } from 'lit';
import { renderSectionHeader } from '../utils/render-section';
import { translate } from '../utils/locale';

export interface iPollenData {
  name: string;
  value: number;
}

const LEVEL_NAMES = ['basso', 'moderato', 'alto', 'molto-alto', 'estremo'];

// Chiavi inglesi usate solo per il tooltip tradotto; l'ordine corrisponde
// 1:1 a LEVEL_NAMES, che resta invariato perché usato anche come classe CSS.
const LEVEL_LABEL_KEYS = ['Low', 'Moderate', 'High', 'Very high', 'Extreme'];

const getLevelIndex = (value: number, levelMin: number, levelMax: number): number => {
  const range = levelMax - levelMin + 1;
  const step = range / LEVEL_NAMES.length;
  const index = Math.floor((value - levelMin) / step);
  return Math.min(index, LEVEL_NAMES.length - 1);
};

export const renderPollen = (
  data: iPollenData[],
  levelMin: number,
  levelMax: number,
  wordDict: Record<string, string> = {},
) => {
  const numLevels = levelMax - levelMin + 1;
  const levels = LEVEL_NAMES.slice(0, numLevels);
  const levelLabels = LEVEL_LABEL_KEYS.slice(0, numLevels);

  if (data.length === 0) {
    return html``;
  }

  return html`
    <div class="cwc-section">
      ${renderSectionHeader(translate('Pollen', wordDict))}
      <div class="pollen-grid-container">
        ${data.map((item) => {
          const activeIndex = getLevelIndex(item.value, levelMin, levelMax);
          return html`
            <div class="pollen-stack">
              <div class="levels">
                ${levels.map((levelName, index) => html`
                  <div
                    class="level ${levelName} ${index === activeIndex ? 'active' : ''}"
                    title="${translate(levelLabels[index], wordDict)}"
                  ></div>
                `)}
              </div>
              <div class="pollen-name">${item.name}</div>
            </div>
          `;
        })}
      </div>
    </div>
  `;
};
