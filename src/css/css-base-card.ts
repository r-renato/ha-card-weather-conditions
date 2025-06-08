import { css } from 'lit';

const cardStyle = css`
  ha-card {
    cursor: pointer;
    position: relative;
    width: 100%;
  }

  .ha-card-weather-conditions {
    width: 100%;
    box-sizing: border-box;
    background-color: var(--card-background-color, #1c1c1c);
    color: var(--primary-text-color, #ffffff);
    border-radius: var(--ha-card-border-radius, 12px);
    box-shadow: var(--ha-card-box-shadow, 0 2px 6px rgba(0, 0, 0, 0.2));
    overflow: hidden;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .nd-container {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 16px 20px; /* ← padding orizzontale più ampio */
    gap: 12px;
    background-size: cover;
    background-position: center;
    transition: background-image 0.3s ease-in-out;
  }

  /* Esempio di stile dinamico aggiuntivo se habgImage è una classe */
  .nd-container.sunny {
    background-image: url('/local/images/sunny-bg.jpg');
  }

  .nd-container.rainy {
    background-image: url('/local/images/rainy-bg.jpg');
  }

  /* -------------- */

`;

export default cardStyle;
