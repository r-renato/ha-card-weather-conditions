import {HomeAssistant} from "custom-card-helpers/dist";
import {Current, Forecast, IconsConfig, Sea} from "./types";
import { html } from "lit-element";
import {getUnit, getWeatherIcon,numFormat, pad} from "./ha-cwc-utils";

const _renderSeaTemperature = (hass: HomeAssistant, hours,
                        air_temperatures: [string, any][],
                        water_temperatures: [string, any][]) => {

  return html`
    <div class="day">
      ${hours.map(hour => {
    let air_temperatures_name = air_temperatures[hour.toString()][1],
      air_temperatures_sensor = hass.states[air_temperatures_name] ;
    let water_temperatures_name = water_temperatures[hour.toString()][1],
      water_temperatures_sensor = hass.states[water_temperatures_name] ;
    
    let air_temperature = numFormat( air_temperatures_sensor.state, 0 ),
      air_temperature_unit = air_temperatures_sensor.attributes.unit_of_measurement ;
    let water_temperature = numFormat( water_temperatures_sensor.state, 0 ),
      water_temperature_unit = water_temperatures_sensor.attributes.unit_of_measurement ;
    
    return html`
          <div class="highTemp">
              <div class="list-group-content">
                <div class="inline-block">${water_temperature} - ${air_temperature} ${water_temperature_unit}</div>         
              </div>
          </div>
          ` ;
  })}
    </div>           
  `;

} ;

const _renderSeaWind = (hass: HomeAssistant, hours,
                         wind_directions: [string, any][],
                         wind_speeds: [string, any][]) => {

  return html`
    <div class="day">
      ${hours.map(hour => {
        let wind_dir_name = wind_directions[hour.toString()][1],
          wind_dir_sensor = hass.states[wind_dir_name] ;
        let wind_speed_name = wind_speeds[hour.toString()][1],
          wind_speed_sensor = hass.states[wind_speed_name] ;
    
        let degree = parseFloat( wind_dir_sensor.state ) + "deg"; // , cssclass = (degree % 10==0) ? degree : degree-degree%5 +5 ;
        let wind_speed = numFormat( wind_speed_sensor.state, 0),
          wind_speed_unit = wind_speed_sensor.attributes.unit_of_measurement ;

        return html`
          <div class="highTemp">
              <div class="list-group-content">
                <div class="inline-block">${wind_speed} ${wind_speed_unit}</div>
                <span class="svg-icon svg-wind-icon svg-wind-icon-dark" style="transform: rotate(${degree}); 
                    -ms-transform: rotate(${degree}); -webkit-transform: rotate(${degree});"></span>          
              </div>
          </div>
          ` ;
      })}
    </div>           
  `;

} ;

const _renderSeaSwell_old = (hass: HomeAssistant, hours,
                         swell_directions: [string, any][],
                         swell_heights: [string, any][],
                         swell_periods: [string, any][]) => {

  return html`
    <div class="day">
      ${hours.map(hour => {
      let swell_dir_name = swell_directions[hour.toString()][1], 
        well_dir_sensor = hass.states[swell_dir_name] ;
      let swell_height_name = swell_heights[hour.toString()][1],
        swell_height_sensor = hass.states[swell_height_name] ;
      let swell_periods_name = swell_periods[hour.toString()][1],
        swell_periods_sensor = hass.states[swell_periods_name] ;
    
      let degree = parseFloat( well_dir_sensor.state ) + "deg" ; // , cssclass = (degree % 10==0) ? degree : degree-degree%5 +5 ;
      let height = numFormat( swell_height_sensor.state ),
        height_unit = swell_height_sensor.attributes.unit_of_measurement ;
      let period = numFormat( swell_periods_sensor.state, 0),
        period_unit = swell_periods_sensor.attributes.unit_of_measurement ;
    
      return html`
      <div class="highTemp">
          <div class="list-group-content">
            <div class="inline-block">
                ${(new Date(well_dir_sensor.attributes.observation_time)).getHours()}:00 - ${height}${height_unit} / ${period}${period_unit}</div>
            <span class="svg-icon svg-wind-icon svg-wind-icon-dark" style="transform: rotate(${degree}); 
                -ms-transform: rotate(${degree}); -webkit-transform: rotate(${degree});"></span>          
          </div>
      </div>
      ` ;
      })}
    </div>           
  `;
} ;

const _renderSeaSwell = (hass: HomeAssistant, hours,
                         swell_directions: [string, any][],
                         swell_heights: [string, any][],
                         swell_periods: [string, any][],
                         wind_directions: [string, any][],
                         wind_speeds: [string, any][]) => {

  return html`
    <div class="day">
      ${hours.map(hour => {
        let swell_dir_name = swell_directions[hour.toString()][1],
          swell_dir_sensor = hass.states[swell_dir_name] ;
        let swell_height_name = swell_heights[hour.toString()][1],
          swell_height_sensor = hass.states[swell_height_name] ;
        let swell_periods_name = swell_periods[hour.toString()][1],
          swell_periods_sensor = hass.states[swell_periods_name] ;
        let wind_dir_name = wind_directions[hour.toString()][1],
          wind_dir_sensor = hass.states[wind_dir_name] ;
        let wind_speed_name = wind_speeds[hour.toString()][1],
          wind_speed_sensor = hass.states[wind_speed_name] ;
        
        let swell_degree = parseFloat( swell_dir_sensor.state ) + "deg" ; // , cssclass = (degree % 10==0) ? degree : degree-degree%5 +5 ;
        let height = numFormat( swell_height_sensor.state ),
          height_unit = swell_height_sensor.attributes.unit_of_measurement ;
        let period = numFormat( swell_periods_sensor.state, 0),
          period_unit = swell_periods_sensor.attributes.unit_of_measurement ;
        let wind_degree = parseFloat( wind_dir_sensor.state ) + "deg"; // , cssclass = (degree % 10==0) ? degree : degree-degree%5 +5 ;
        let wind_speed = numFormat( wind_speed_sensor.state, 0),
          wind_speed_unit = wind_speed_sensor.attributes.unit_of_measurement ;

        return html`
          <div class="highTemp">
              <div class="list-group-content">
                <div class="inline-block">
                    ${(new Date(swell_dir_sensor.attributes.observation_time)).getHours()}:00
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    ${height}${height_unit} / ${period}${period_unit}
                </div>
                <span class="svg-icon svg-swell-icon svg-swell-icon-dark" style="transform: rotate(${swell_degree}); 
                    -ms-transform: rotate(${swell_degree}); -webkit-transform: rotate(${swell_degree});"></span>          
              </div>
                <div class="inline-block">
                    ${wind_speed} ${wind_speed_unit}
                </div>
                <span class="svg-icon svg-wind-icon svg-wind-icon-dark" style="transform: rotate(${wind_degree}); 
                    -ms-transform: rotate(${wind_degree}); -webkit-transform: rotate(${wind_degree});"></span>          
              </div>          
          </div>
          ` ;
      })}
    </div>           
  `;
} ;

// @ts-ignore
export const renderSeaForecast = (hass: HomeAssistant, seaCfg: Sea, iconsConfig: IconsConfig, lang: string, border: boolean) => {

  let swell_directions: [string, any][] = seaCfg.swell_direction
    ? Object.entries(seaCfg.swell_direction) : undefined ;
  let swell_heights: [string, any][] = seaCfg.swell_height
    ? Object.entries(seaCfg.swell_height) : undefined ;
  let swell_periods: [string, any][] = seaCfg.swell_period
    ? Object.entries(seaCfg.swell_period) : undefined ;

  let wind_directions: [string, any][] = seaCfg.wind_direction
    ? Object.entries(seaCfg.wind_direction) : undefined ;
  let wind_speeds: [string, any][] = seaCfg.wind_speed
    ? Object.entries(seaCfg.wind_speed) : undefined ;

  let air_temperatures: [string, any][] = seaCfg.air_temperature
    ? Object.entries(seaCfg.air_temperature) : undefined ;
  let water_temperatures: [string, any][] = seaCfg.water_temperature
    ? Object.entries(seaCfg.water_temperature) : undefined ;

  let maxHours = Math.max(swell_directions ? swell_directions.length : 0,
    swell_heights ? swell_heights.length : 0, swell_periods ? swell_periods.length : 0);

  let startHour = 0;
  let hours = maxHours > 0 ?
    Array(maxHours - startHour).fill(1, 0, maxHours - startHour).map(() => startHour++)
    : Array();

  return html`
    <div class="forecast clear ${border ? "spacer" : ""}">
      <div class="day">
        <div class="highTemp">
            <table class="synoptic">
                <thead>
                    <tr>
                        <th>Time</th><th>Swell</th><th>Wind</th><th>Temperature</th>
                    </tr>
                </thead>
                <tbody>
        ${hours.map(hour => {
          let swell_dir_name = swell_directions[hour.toString()][1],
            swell_dir_sensor = hass.states[swell_dir_name];
          let swell_height_name = swell_heights[hour.toString()][1],
            swell_height_sensor = hass.states[swell_height_name];
          let swell_periods_name = swell_periods[hour.toString()][1],
            swell_periods_sensor = hass.states[swell_periods_name];
          let wind_dir_name = wind_directions[hour.toString()][1],
            wind_dir_sensor = hass.states[wind_dir_name];
          let wind_speed_name = wind_speeds[hour.toString()][1],
            wind_speed_sensor = hass.states[wind_speed_name];
          let air_temperatures_name = air_temperatures[hour.toString()][1],
            air_temperatures_sensor = hass.states[air_temperatures_name] ;
          let water_temperatures_name = water_temperatures[hour.toString()][1],
            water_temperatures_sensor = hass.states[water_temperatures_name] ;
    
          let swell_degree = parseFloat(swell_dir_sensor.state) + "deg"; // , cssclass = (degree % 10==0) ? degree : degree-degree%5 +5 ;
          let height = numFormat(swell_height_sensor.state),
            height_unit = swell_height_sensor.attributes.unit_of_measurement;
          let period = numFormat(swell_periods_sensor.state, 0),
            period_unit = swell_periods_sensor.attributes.unit_of_measurement;
          let wind_degree = parseFloat(wind_dir_sensor.state) + "deg"; // , cssclass = (degree % 10==0) ? degree : degree-degree%5 +5 ;
          let wind_speed = numFormat(wind_speed_sensor.state, 0),
            wind_speed_unit = wind_speed_sensor.attributes.unit_of_measurement;
          let air_temperature = numFormat( air_temperatures_sensor.state, 0 ),
            air_temperature_unit = air_temperatures_sensor.attributes.unit_of_measurement ;
          let water_temperature = numFormat( water_temperatures_sensor.state, 1 ),
            water_temperature_unit = water_temperatures_sensor.attributes.unit_of_measurement ;
          
          return html`
            <tr>
            <td>${pad((new Date(swell_dir_sensor.attributes.observation_time)).getHours(), 2)}:00</td>
            <td>${height}${height_unit} / ${period}${period_unit}
                <span class="svg-icon svg-swell-icon svg-swell-icon-dark" style="transform: rotate(${swell_degree});
                    -ms-transform: rotate(${swell_degree}); -webkit-transform: rotate(${swell_degree});"></span>
            </td>
            <td>${wind_speed} ${wind_speed_unit}
                <span class="svg-icon svg-wind-icon svg-wind-icon-light" style="transform: rotate(${wind_degree});
                    -ms-transform: rotate(${wind_degree}); -webkit-transform: rotate(${wind_degree});"></span>
            </td>
            <td>${water_temperature} - ${air_temperature} ${water_temperature_unit}</td>
            </tr> 
                `;
        })}
                               </tbody>
                    </table>      
                </div>
      </div>           
    </div>
  `;
} ;

