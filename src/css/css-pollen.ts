import { css } from 'lit';

const pollenStyle = css`
.pollen-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(48px, 1fr));
  gap: 8px 12px;
  width: 100%;
  justify-items: center;
  align-items: end;
  padding: 8px 4px;
  box-sizing: border-box;
}


.pollen-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 48px;
}


  .levels {
    display: flex;
    flex-direction: column-reverse;
    gap: clamp(1px, 0.2vw, 2px);
  }

  .level {
    width: clamp(16px, 3.5vw, 24px);
    height: clamp(5px, 0.7vw, 8px);     /* 👈 anche in altezza */
    border-radius: 3px;
    opacity: 0.3;
    transition: opacity 0.2s ease;
  }

  .level.active {
    opacity: 1;
    outline: 1px solid #333;
  }

  .molto-alto {
    background-color: #f44336;
  }

  .alto {
    background-color: #ff9800;
  }

  .moderato {
    background-color: #ffeb3b;
  }

  .basso {
    background-color: #4caf50;
  }

  .pollen-name {
    font-size: clamp(0.55em, 1.3vw, 0.85em); /* 👈 stringe di più */
    // font-weight: 500;
    text-align: center;
    // color: #333;
    white-space: nowrap;
  }

  .label {
    width: 100%;
    text-align: center;
    font-size: clamp(0.55em, 1.3vw, 0.85em);
    // font-weight: 500;
    margin-top: clamp(4px, 0.5vw, 8px);
  }
`;

export default pollenStyle;
