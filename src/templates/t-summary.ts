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
}

const renderLightningFlashZigzag = (xPercent: number, yPercent: number, segments: number = 7) => {
  const width = 10; // larghezza in pixel della viewport SVG
  const height = 20 + Math.random() * 50;

  const points = [];
  let x = width / 2;
  let y = 0;

  for (let i = 0; i < segments; i += 1) {
    // x += (Math.random() * width - width / 2);
    // y += height / segments;
    x += (Math.random() * width * 1.5 - width * 0.75); // maggiore zigzag
    y += (height / segments) * (0.7 + Math.random() * 0.6); // lunghezza variabile
    points.push(`${x},${y}`);
  }

  const pathD = `M${width / 2},0 ${points.map((p) => `L${p}`).join(' ')}`;

  const delay = Math.random() * 15.5;
  const duration = 0.2 + Math.random() * 0.3 * 33;

  return html`
    <svg
      class="lightning-svg"
      style="
        top: ${yPercent}%;
        left: ${xPercent}%;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
      "
      width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <path d="${pathD}" stroke="white" stroke-width="1.5" fill="none" />
    </svg>
  `;
};

const renderLightningFlashes = (azimuth: number, distance: number, strikes: number) => {
  const flashes = [];
  for (let i = 0; i < strikes; i += 1) {
    const x = Math.random() * 100;
    const y = Math.random() * 20;
    flashes.push(renderLightningFlashZigzag(x, y));
  }
  return flashes;
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
}: WeatherSummaryInterface) => {
  const lightningAzimuth = 0; // Replace with actual data
  const lightningDistanceKm = 0; // Replace with actual data
  const lightningStrikes = 0; // Replace with actual data

  const showLightning =
  lightningStrikes > 0 &&
  typeof lightningAzimuth === 'number' &&
  typeof lightningDistanceKm === 'number';

  if (conditionIcon || moonText || temperature) {
    return html`
    <div class="summary-wrapper">
      ${showLightning ? html`
        <div class="lightning-background">
          ${renderLightningFlashes(lightningAzimuth!, lightningDistanceKm!, lightningStrikes)}
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
