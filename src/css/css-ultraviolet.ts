import { css } from 'lit';

const ultravioletStyle = css`
.ultraviolet-grid-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ultraviolet-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.ultraviolet-left,
.present-right {
  flex: 1;
}

.ultraviolet-left {
  display: flex;
  justify-content: flex-start;
}

.ultraviolet-right {
  display: flex;
  justify-content: flex-end;
}

.ultraviolet-value-block {
  display: flex;
  align-items: center;
  gap: 4px;
}

.ultraviolet-unit {
  font-size: 0.9em;
  opacity: 0.8;
}

------------------------------------------------------------------

// .ultraviolet-grid-container {
//   display: flex;
//   flex-direction: column;
//   gap: 12px;
// }

// .ultraviolet-row {
//   display: flex;
//   justify-content: space-between;
//   padding: 4px 0;
// }

// .ultraviolet-value-block {
//   display: flex;
//   align-items: center;
//   gap: 4px;
// }

// .ultraviolet-unit {
//   font-size: 0.9em;
//   opacity: 0.7;
// }

.ultraviolet-skin-type-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(48px, 1fr));
  gap: 8px;
  margin-top: 8px;
}

.ultraviolet-skin-type-cell {
  flex: 1;
  min-width: 48px;
  height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-family: 'Segoe UI', sans-serif;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  color: black;
}

.ultraviolet-skin-type-label {
  font-weight: bold;
  font-size: 0.95em;
  line-height: 1em;
}

.ultraviolet-exposure-time {
  font-size: 0.75em;
  margin-top: 2px;
  color: #222;
  opacity: 0.85;
}






`;

export default ultravioletStyle;
