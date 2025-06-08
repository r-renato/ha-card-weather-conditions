import { css } from 'lit';

const summaryStyle = css`

.summary-grid-container {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* <-- 3 colonne reali */
  grid-template-rows: auto auto;
  width: 100%;
  max-width: 600px;
  // background: #1c1c1c;
  // color: white;
  gap: 4px;
  padding: 0px;
  box-sizing: border-box;
  // border: 1px solid #444; /* debug */
}

.summary-col-left {
  grid-column: 1;
  grid-row: 1 / span 2;
  // background: #2c2c2c;
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  
  display: flex;                 /* Attiva Flexbox */
  justify-content: center;      /* Centra orizzontalmente */
  align-items: center;          /* Centra verticalmente */

  width: 100%;
  max-width: 100%;
  aspect-ratio: 1 / 1; /* opzionale: mantiene forma quadrata */
  overflow: hidden;
}

.summary-top-right {
  grid-column: 2 / span 2; /* occupa colonne 2 e 3 */
  grid-row: 1;
  // background: #3c3c3c;
  padding-top: 0px;
  padding-right: 8px;
  padding-bottom: 0px;
  padding-left: 8px;
  display: flex;            /* aggiunto */
  align-items: center;      /* centra verticalmente */
  justify-content: flex-start; /* allinea a sinistra */
}

.summary-bottom-right-left {
  grid-column: 2;
  grid-row: 2;
  // background: #4c4c4c;
  padding-top: 0px;
  padding-right: 8px;
  padding-bottom: 0px;
  padding-left: 8px;

  display: flex;                 /* Attiva Flexbox */
  justify-content: center;      /* Centra orizzontalmente */
  align-items: center;          /* Centra verticalmente */
}

.summary-bottom-right-right {
  grid-column: 3;
  grid-row: 2;
  // background: #5c5c5c;
  padding-top: 0px;
  padding-right: 8px;
  padding-bottom: 0px;
  padding-left: 8px;
}

.weather-condition-icon {
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  // max-width: 100%;
  // max-height: 100%;
  // width: 72px;
  // height: 72px;
  // object-fit: contain;

  transition: transform 0.2s ease;
}
  
.summary-col-left:hover .weather-condition-icon {
  transform: scale(1.05);
}

.weather-city-name {
  font-size: clamp(1em, 2vw, 1.2em);
  text-align: left;
}

.moon-row {
  display: flex;
  align-items: center;
  gap: 6px;
  // font-size: 0.95em;
  // color: #eeeeee;
}

.summary-moon-icon {
  font-size: 1.8em;
  display: inline-block;
}

.temperature-block {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.temperature {
  font-size: 1.6em;
  font-weight: bold;
}

.temp-unit {
  font-size: 0.95em;
  vertical-align: super;
  margin-left: 2px;
}

.feels-like {
  font-size: 0.85em;
  // color: #aaaaaa;
}

.summary-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100px; /* oppure clamp() dinamico */
  overflow: visible;
}

.lightning-background {
  position: absolute;
  inset: 0; /* top: 0; right: 0; bottom: 0; left: 0 */
  pointer-events: none;
  z-index: 0;
}

.lightning-flash {
  position: absolute;
  width: 2px;
  background: white;
  opacity: 0.7;
  transform: translate(-50%, -50%);
  animation-name: flash-blink;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  border-radius: 1px;
  filter: blur(0.5px);
  box-shadow: 0 0 4px rgba(255,255,255,0.6);

  z-index: 0;
}

@keyframes flash-blink {
  0%, 100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.9;
  }
}

.lightning-flash-zigzag {
  position: absolute;
  width: 2px;
  height: 0;
  background: linear-gradient(to bottom, yellow, white);
  clip-path: polygon(var(--points));
  animation: flash-zigzag linear forwards;
  z-index: 3;
}

@keyframes flash-zigzag {
  0% {
    opacity: 1;
    transform: scaleY(1);
  }
  100% {
    opacity: 0;
    transform: scaleY(1.2);
  }
}

.lightning-svg {
  position: absolute;
  transform: translate(-50%, 0);
  opacity: 0;
  filter: drop-shadow(0 0 4px rgba(98, 61, 173, 0.6));
  animation-name: flash-zigzag-svg;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
  z-index: 3;
}

@keyframes flash-zigzag-svg {
  0%, 100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  60% {
    opacity: 0.5;
  }
}
`;

export default summaryStyle;
