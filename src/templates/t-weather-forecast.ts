/* eslint-disable max-len */
/* eslint-disable camelcase */
import { html } from 'lit';

export interface iForecastDataItem {
  value?: number | string | Date;
  unit?: string;
  img?: string;
  icon?: string;
  iconColor?: string;
}

export const renderWeatherForecast = (forecastType: number, data: Record<string, iForecastDataItem>[]) => {
  const rows = data.map((dayData) => {
    const day = dayData.reference?.value;
    const img = dayData.condition?.img;
    const icon = dayData.condition?.icon;
    const iconColor = dayData.condition?.iconColor;
    const tempLow = dayData.temperature_low?.value;
    const tempHigh = dayData.temperature_high?.value;
    const tempHLUnit = dayData.temperature_high?.unit || dayData.temperature_low?.unit;
    const precipProb: number = Number(dayData.precipitation_probability?.value ?? 0);
    const precipInt = dayData.precipitation_intensity?.value;
    const precipUnit = dayData.precipitation_intensity?.unit;

    const temp = dayData.temperature?.value;
    const tempUnit = dayData.temperature?.unit || dayData.temperature_feelslike?.unit;
    const temp_feelslike = dayData.temperature_feelslike?.value;
    const wind_speed = dayData.wind_speed?.value;
    const wind_speedUnit = dayData.wind_speed?.unit;
    const wind_bearing = dayData.wind_bearing?.value;

    const wind_wave_height_max = dayData.wind_wave_height_max?.value;
    const swell_wave_height_max = dayData.swell_wave_height_max?.value;
    const wave_height_max = dayData.wave_height_max?.value;
    const wave_direction = dayData.wave_direction?.value;
    const wave_direction_degrees = dayData.wave_direction?.icon;
    const wave_height_max_unit = dayData.wave_height_max?.unit;

    return html`
      <div class="weather-forecast-slot">
        ${day ? html`<div class="weather-forecast-label-slot">${day}</div>` : ''}
        ${img ? html`<img class="weather-forecast-icon" src="${img}" alt="${img}" />` : ''}
        ${icon ? html`<ha-icon icon="${icon}" style=${iconColor ? `color: ${iconColor}` : ''}></ha-icon>` : ''}
        ${
  tempLow !== undefined && tempHigh !== undefined
    ? html`
                <div class="weather-forecast-temperature">
                  ${tempLow} / <span class="high">${tempHigh}${tempHLUnit ? ` ${tempHLUnit}` : ''}</span>
                </div>
              `
    : ''
}
        ${
  temp !== undefined && temp_feelslike !== undefined
    ? html`
                <div class="weather-forecast-temperature">
                  ${temp} / <span class="high">${temp_feelslike}${tempUnit ? ` ${tempUnit}` : ''}</span>
                </div>
              `
    : ''
}
        ${
  wind_speed !== undefined && wind_bearing !== undefined
    ? html`
                <div class="weather-forecast-temperature">
                  ${wind_speed} ${wind_speedUnit} ${wind_bearing}</span>
                </div>
              `
    : ''
}
        ${
  wave_height_max !== undefined
    ? html`
                <div class="weather-forecast-temperature">
                  ${wave_height_max} ${wave_height_max_unit ? ` ${wave_height_max_unit}` : ''}
                </div>
              `
    : ''
}
        ${
  wave_direction !== undefined
    ? html`
                <div class="weather-forecast-temperature">
                  ${wave_direction_degrees ? html`<ha-icon
                        icon="mdi:arrow-up-thin"
                        style="display:inline-block; transform: rotate(${wave_direction_degrees}deg);"
                      ></ha-icon>` : ''} ${wave_direction}
                </div>
              `
    : ''
}
        ${
  wind_wave_height_max !== undefined && swell_wave_height_max !== undefined
    ? html`
                <div class="weather-forecast-temperature">
                  ${swell_wave_height_max} / ${wind_wave_height_max} ${wave_height_max_unit ? ` ${wave_height_max_unit}` : ''}
                </div>
              `
    : ''
}
        ${
  precipProb !== undefined && precipInt !== undefined && precipProb !== 0
    ? html`
                <div class="weather-forecast-precipitation">
                  ${precipProb} % / <span class="mm">${precipInt}${precipUnit ? ` ${precipUnit}` : ''}</span>
                </div>
              `
    : ''
}
      </div>
    `;
  });

  let title = 'Daily';
  if (forecastType === 1) {
    title = 'Hourly';
  } else if (forecastType === 2) {
    title = 'Marine daily';
  } else if (forecastType === 3) {
    title = 'Marine hourly';
  }

  return html`
  <div class="weather-forecast-grid-wrapper">
    <div class="weather-forecast-title">${title} forecast</div>
    <div class="weather-forecast-grid-container">
      ${rows}
    </div>
  </div>
  `;
};
