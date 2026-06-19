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

/* ── Lightning (invariato) ──────────────────────────────────── */

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

  const points: string[] = [];
  let x = cx;
  let y = 0;
  for (let i = 0; i < segments; i += 1) {
    x += r(i * 2) * svgWidth * 1.2 - svgWidth * 0.6;
    y += (svgHeight / segments) * (0.75 + r(i * 2 + 1) * 0.5);
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const mainPath = `M${cx},0 ${points.map((p) => `L${p}`).join(' ')}`;

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
  const duration = 0.15 + r(31) * 0.35;
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
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <path
        d="${mainPath}"
        stroke="#7090ff"
        stroke-width="3.5"
        fill="none"
        opacity="0.35"
        filter="url(#${filterId})"
      />
      <path
        d="${mainPath}"
        stroke="#dce8ff"
        stroke-width="1.5"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
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
  const azRad = (azimuth * Math.PI) / 180;
  const centerX = 50 + Math.cos(azRad) * 30;
  const spread = Math.max(15, 50 - distance * 2);
  const cappedStrikes = Math.min(strikes, 12);

  return Array.from({ length: cappedStrikes }, (_, i) => {
    const seed = i * 137.5 + azimuth;
    const x = Math.max(5, Math.min(95, centerX + (seededRandom(seed + 100) * spread * 2 - spread)));
    const y = 5 + seededRandom(seed + 101) * 60;
    return renderLightningFlashZigzag(x, y, seed);
  });
};

/* Hero summary */

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
  lightningAzimuth,
  lightningDistance,
  lightningStrikes,
}: WeatherSummaryInterface) => {
  if (!conditionIcon && !temperature && !moonText) return html``;

  const showLightning = lightningStrikes > 0
    && typeof lightningAzimuth === 'number'
    && typeof lightningDistance === 'number';

  return html`
    <div class="summary-wrapper">
      ${showLightning ? html`
        <div class="lightning-background">
          ${renderLightningFlashes(lightningAzimuth!, lightningDistance!, lightningStrikes)}
        </div>
      ` : nothing}

      <div class="summary-hero">

        <!-- Colonna icona meteo -->
        ${conditionIcon ? html`
          <div class="summary-icon-col">
            <img
              class="weather-condition-icon"
              src="${conditionIcon}"
              alt="${conditionText}"
            />
          </div>
        ` : html`<div></div>`}

        <!-- Colonna meta: localita + luna -->
        <div class="summary-meta-col">
          ${title ? html`
            <div class="summary-location">${title}</div>
          ` : nothing}
          ${moonText ? html`
            <div class="summary-moon">
              <span class="summary-moon-icon">${moonIcon}</span>
              <span class="summary-moon-text">${moonText}</span>
            </div>
          ` : nothing}
        </div>

        <!-- Colonna temperatura -->
        ${temperature ? html`
          <div class="summary-temp-col">
            <div class="summary-temp-value">
              <span class="temperature">${temperature}</span><span class="temp-unit">${temperatureUnit}</span>
            </div>
            ${temperatureFeelsLike ? html`
              <div class="summary-feels-like">${feelsLikeTerm} ${temperatureFeelsLike} ${temperatureUnit}</div>
            ` : nothing}
          </div>
        ` : nothing}

      </div>
    </div>
  `;
};

export default renderWeatherSummary;
