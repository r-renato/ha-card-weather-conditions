import { html, nothing } from 'lit';

export interface WeatherSummaryInterface {
  title?: string;
  moonText?: string | undefined;
  moonIcon?: string;
  conditionText: string;
  conditionIcon: string;
  temperature?: string;
  temperatureUnit?: string;
  feelsLikeTerm?: string;
  temperatureFeelsLike?: string;
  temperatureFeelsLikeIcon?: string;
  lightningAzimuth?: number;
  lightningDistance?: number;
  lightningStrikes?: number;
}

// const renderLightningFlashZigzag = (xPercent: number, yPercent: number, segments: number = 7) => {
//   const width = 10; // larghezza in pixel della viewport SVG
//   const height = 20 + Math.random() * 50;

//   const points = [];
//   let x = width / 2;
//   let y = 0;

//   for (let i = 0; i < segments; i += 1) {
//     // x += (Math.random() * width - width / 2);
//     // y += height / segments;
//     x += (Math.random() * width * 1.5 - width * 0.75); // maggiore zigzag
//     y += (height / segments) * (0.7 + Math.random() * 0.6); // lunghezza variabile
//     points.push(`${x},${y}`);
//   }

//   const pathD = `M${width / 2},0 ${points.map((p) => `L${p}`).join(' ')}`;

//   const delay = Math.random() * 15.5;
//   const duration = 0.2 + Math.random() * 0.3 * 33;

//   return html`
//     <svg
//       class="lightning-svg"
//       style="
//         top: ${yPercent}%;
//         left: ${xPercent}%;
//         animation-delay: ${delay}s;
//         animation-duration: ${duration}s;
//       "
//       width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
//       <path d="${pathD}" stroke="white" stroke-width="1.5" fill="none" />
//     </svg>
//   `;
// };

// const renderLightningFlashes = (azimuth: number, distance: number, strikes: number) => {
//   const flashes = [];
//   for (let i = 0; i < strikes; i += 1) {
//     const x = Math.random() * 100;
//     const y = Math.random() * 20;
//     flashes.push(renderLightningFlashZigzag(x, y));
//   }
//   return flashes;
// };

// Genera punti deterministici da un seed per evitare re-render instabili
const seededRandom = (seed: number) => {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
};

const renderLightningFlashZigzag = (
  xPercent: number,
  yPercent: number,
  seed: number,
  segments: number = 7,
) => {
  const r = (offset: number) => seededRandom(seed + offset);

  const svgWidth = 24;
  const svgHeight = 40 + r(0) * 60;
  const cx = svgWidth / 2;

  // Percorso principale
  const points: string[] = [];
  let x = cx;
  let y = 0;
  for (let i = 0; i < segments; i += 1) {
    x += r(i * 2) * svgWidth * 1.2 - svgWidth * 0.6;
    y += (svgHeight / segments) * (0.75 + r(i * 2 + 1) * 0.5);
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const mainPath = `M${cx},0 ${points.map((p) => `L${p}`).join(' ')}`;

  // Ramificazione secondaria (parte a metà del percorso)
  const branchStart = points[Math.floor(segments / 2)];
  const [bx, by] = branchStart.split(',').map(Number);
  const branchPoints: string[] = [];
  let bxCur = bx;
  let byCur = by;
  for (let i = 0; i < 3; i += 1) {
    bxCur += r(20 + i) * svgWidth * 0.8 - svgWidth * 0.4;
    byCur += (svgHeight / segments) * (0.5 + r(21 + i) * 0.4);
    branchPoints.push(`${bxCur.toFixed(1)},${byCur.toFixed(1)}`);
  }
  const branchPath = `M${bx},${by} ${branchPoints.map((p) => `L${p}`).join(' ')}`;

  const delay = r(30) * 12;
  const duration = 0.15 + r(31) * 0.35; // 0.15s–0.5s, bug precedenza risolto

  const filterId = `glow-${seed}`;

  return html`
    <svg
      class="lightning-svg"
      style="
        top: ${yPercent}%;
        left: ${xPercent}%;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
        overflow: visible;
      "
      width="${svgWidth}"
      height="${svgHeight}"
      viewBox="0 0 ${svgWidth} ${svgHeight}"
      overflow="visible"
    >
      <defs>
        <filter id="${filterId}" x="-100%" y="-10%" width="300%" height="120%">
          <!-- alone esterno morbido -->
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- Alone (stroke largo, bassa opacità) -->
      <path
        d="${mainPath}"
        stroke="#7090ff"
        stroke-width="3.5"
        fill="none"
        opacity="0.35"
        filter="url(#${filterId})"
      />
      <!-- Nucleo principale -->
      <path
        d="${mainPath}"
        stroke="#dce8ff"
        stroke-width="1.5"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <!-- Ramificazione secondaria, più sottile e semitrasparente -->
      <path
        d="${branchPath}"
        stroke="#a0b8ff"
        stroke-width="0.8"
        fill="none"
        opacity="0.6"
        stroke-linecap="round"
      />
    </svg>
  `;
};

const renderLightningFlashes = (azimuth: number, distance: number, strikes: number) => {
  // Usa azimuth per concentrare i lampi in una direzione (0°=N, 90°=E, ecc.)
  const azRad = (azimuth * Math.PI) / 180;
  const centerX = 50 + Math.cos(azRad) * 30; // sposta il centro nella direzione
  const spread = Math.max(15, 50 - distance * 2); // più vicino = più concentrato

  const cappedStrikes = Math.min(strikes, 12);

  return Array.from({ length: cappedStrikes }, (_, i) => {
    const seed = i * 137.5 + azimuth;
    const x = Math.max(5, Math.min(95, centerX + (seededRandom(seed + 100) * spread * 2 - spread)));
    const y = 5 + seededRandom(seed + 101) * 60;
    return renderLightningFlashZigzag(x, y, seed);
  });
};

const renderWeatherSummary = ({
  title,
  moonText,
  moonIcon,
  conditionText,
  conditionIcon,
  temperature,
  temperatureUnit,
  feelsLikeTerm,
  temperatureFeelsLike,
  temperatureFeelsLikeIcon,
  lightningAzimuth,
  lightningDistance,
  lightningStrikes,
}: WeatherSummaryInterface) => {
  // const lightningAzimuth = 0; // Replace with actual data
  // const lightningDistanceKm = 0; // Replace with actual data
  // const lightningStrikes = 0; // Replace with actual data

  const showLightning =
  lightningStrikes > 0 &&
  typeof lightningAzimuth === 'number' &&
  typeof lightningDistance === 'number';

  if (conditionIcon || moonText || temperature) {
    return html`
    <div class="summary-wrapper">
      ${showLightning ? html`
        <div class="lightning-background">
          ${renderLightningFlashes(lightningAzimuth!, lightningDistance!, lightningStrikes)}
        </div>
      ` : nothing}
      <div class="summary-grid-container">
        ${conditionIcon ? html`
          <div class="summary-col-left">
            <img class="weather-condition-icon" src="${conditionIcon}" alt="${conditionText}" />
          </div>
        ` : nothing}
        ${title ? html`
          <div class="summary-top-right">
            <span class="weather-city-name">${title}</span>
          </div>    
        ` : nothing}
        ${moonText ? html`
          <div class="summary-bottom-right-left">
            <div class="moon-row">
              <span class="summary-moon-icon">${moonIcon}</span>
              <span class="summary-moon-text">${moonText}</span>
            </div>  
          </div>   
        ` : nothing}
        ${temperature ? html`
          <div class="summary-bottom-right-right">
            <div class="temperature-block">
              <div>
                <span class="temperature">${temperature}</span>
                <span class="temp-unit">${temperatureUnit}</span>
              </div>
              ${temperatureFeelsLike && html`<div class="feels-like">${feelsLikeTerm} <div>${temperatureFeelsLike} ${temperatureUnit}</div></div>`}
            </div>  
          </div>
          ` : nothing}
      </div>
    </div>
    `;
  }

  return html``;
};

export default renderWeatherSummary;
