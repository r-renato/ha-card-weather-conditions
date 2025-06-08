import { html } from 'lit';

export interface iPollenData {
  name: string;
  value: number;
}

const LEVEL_NAMES = ['basso', 'moderato', 'alto', 'molto-alto', 'estremo'];

const getLevelIndex = (value: number, levelMin: number, levelMax: number): number => {
  const range = levelMax - levelMin + 1;
  const step = range / LEVEL_NAMES.length;
  const index = Math.floor((value - levelMin) / step);
  return Math.min(index, LEVEL_NAMES.length - 1);
};

export const renderPollen = (data: iPollenData[], levelMin: number, levelMax: number) => {
  const numLevels = levelMax - levelMin + 1;
  const levels = LEVEL_NAMES.slice(0, numLevels);

  if (data.length === 0) {
    return html``;
  }

  return html`
    <div class="pollen-grid-container">
      ${data.map((item) => {
    const activeIndex = getLevelIndex(item.value, levelMin, levelMax);
    return html`
          <div class="pollen-stack">
            <div class="levels">
              ${levels.map((levelName, index) => html`
                <div
                  class="level ${levelName} ${index === activeIndex ? 'active' : ''}"
                  title="${levelName}"
                ></div>
              `)}
            </div>
            <div class="pollen-name">${item.name}</div>
          </div>
        `;
  })}
    </div>
  `;
};
