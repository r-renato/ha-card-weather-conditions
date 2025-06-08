import { css } from 'lit';

const weatherForecastStyle = css`

.weather-forecast-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(78px, 1fr));
  column-gap: 2px; /* spazio orizzontale tra i giorni */
  row-gap: 6px;    /* spazio verticale tra righe, se ci sono */
  align-items: stretch;
  font-family: 'Segoe UI', sans-serif;
  width: 100%;
}
  
.weather-forecast-grid-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center; /* centrare il titolo orizzontalmente */
}

.weather-forecast-title {
  font-size: clamp(0.85em, 1vw, 0.95em);
  font-weight: bold;
  // margin-bottom: 0.5em;
  text-align: center;
}

.weather-forecast-slot {
  text-align: center;
  padding: 8px 4px;
  min-width: 0;
  overflow: hidden;
}

.weather-forecast-slot:last-child {
  border-right: none;
}

.weather-forecast-label-slot {
  font-size: 0.9em;
  font-weight: bold;
  margin-bottom: 6px; /* ridotto */
}

.weather-forecast-icon {
  font-size: 1.6rem; /* ridotto */
  /* margin: 6px 0; ridotto */
  height: 32px;
}

.weather-forecast-temperature {
  font-size: clamp(0.8em, 1vw, 0.9em); /* leggermente più piccolo */
  margin: 4px 0; /* meno margine */
}

.weather-forecast-temperature .high {
  font-weight: bold;
}

.weather-forecast-precipitation {
  font-size: clamp(0.65em, 1vw, 0.75em);
  line-height: 1.2; /* compatta verticalmente */
}

.weather-forecast-precipitation .mm {
  font-weight: bold;
}
`;

export default weatherForecastStyle;
