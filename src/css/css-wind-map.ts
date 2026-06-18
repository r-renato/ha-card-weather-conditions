import { css } from 'lit';

const windMapStyle = css`

.windmap-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--cwc-radius-md);
  overflow: hidden;
  background: rgba(255, 255, 255, 0.035);
}

.windmap-mosaic {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 768px;
  height: 768px;
  display: grid;
  grid-template-columns: repeat(3, 256px);
  grid-template-rows: repeat(3, 256px);
}

.windmap-tile {
  width: 256px;
  height: 256px;
  display: block;
}

.windmap-marker {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.windmap-compass {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.windmap-compass-n {
  position: absolute;
  top: 2px;
  font-size: 8px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.45);
}

.windmap-compass-arrow {
  --mdc-icon-size: 18px;
  color: #7dd3fc;
}

.windmap-pin {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #7dd3fc;
  border: 2px solid rgba(125, 211, 252, 0.35);
}

.windmap-chip {
  position: absolute;
  bottom: var(--cwc-space-sm);
  left: var(--cwc-space-sm);
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--cwc-chip-bg);
  border: 0.5px solid var(--cwc-chip-border);
  border-radius: var(--cwc-radius-sm);
  padding: 3px 8px;
  font-size: var(--cwc-font-xs);
  color: var(--cwc-text-primary);
  z-index: 1;
}

.windmap-chip-icon {
  --mdc-icon-size: 12px;
  color: var(--cwc-text-muted);
}

.windmap-attribution {
  position: absolute;
  bottom: 3px;
  right: 6px;
  font-size: 9px;
  color: var(--cwc-text-muted);
  opacity: 0.75;
  z-index: 1;
}
`;

export default windMapStyle;
