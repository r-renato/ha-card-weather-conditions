import { css } from 'lit';

const presentStyle = css`
.present-grid-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.present-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.present-left,
.present-right {
  flex: 1;
}

.present-left {
  display: flex;
  justify-content: flex-start;
}

.present-right {
  display: flex;
  justify-content: flex-end;
}

.present-value-block {
  display: flex;
  align-items: center;
  gap: 4px;
}

.present-unit {
  font-size: 0.9em;
  opacity: 0.8;
}
`;

export default presentStyle;
