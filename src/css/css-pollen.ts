import { css } from 'lit';

const pollenStyle = css`

.pollen-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
  gap: var(--cwc-space-xs) var(--cwc-space-sm);
  width: 100%;
  justify-items: center;
  align-items: end;
}

.pollen-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--cwc-space-xs);
}

.levels {
  display: flex;
  flex-direction: column-reverse;
  gap: 2px;
}

.level {
  width: 20px;
  height: 6px;
  border-radius: 3px;
  opacity: 0.2;
  transition: opacity 0.2s ease;
}

.level.active {
  opacity: 1;
}

.molto-alto { background-color: #f44336; }
.alto       { background-color: #ff9800; }
.moderato   { background-color: #ffeb3b; }
.basso      { background-color: #4caf50; }

.pollen-name {
  font-size: var(--cwc-font-xs);
  color: var(--cwc-text-muted);
  text-align: center;
  white-space: nowrap;
}
`;

export default pollenStyle;
