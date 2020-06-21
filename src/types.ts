export interface CardConfig {
  type: string ;
  name?: string ;
  language?: string ;
  animation?: boolean ;
  display: string[]
  uv?: Uv ;
  air_quality?: AirQuality ;
  pollen?: Pollen ;
  weather: Weather ;
  camera?: string ;
  alert: Alert ;
  sea: Sea ;
}

export interface Sea {
  swell_direction?: Hours ;
  swell_height?: Hours ;
  swell_period?: Hours ;
  wind_direction: Hours ;
  wind_speed: Hours ;
  air_temperature: Hours ;
  water_temperature: Hours ;
}

export interface Alert {
  fire_risk?: AlertItem ;
  thunderstorms_risk?: AlertItem ;
  hydraulic_risk?: AlertItem ;
  hydrogeological_risk?: AlertItem ;
}
export interface AlertItem {
  entity: string
  icon?: string ;
  min?: number ;
  max?: number ;
  show_if_on?: boolean ;
  show_if_ge?: number ;
}

export interface Pollen {
  tree?: PollenItem ;
  weed?: PollenItem ;
  grass?: PollenItem ;
}

export interface PollenItem {
  entity: string ;
  min: number ;
  max: number ;
  low?: number ;
  high?: number ;
}

export interface AirQuality {
  pm25?: string ;
  pm10?: string ;
  o3?: string ;
  no2?: string ;
  co?: string ;
  so2?: string ;
  epa_aqi?: string ;
  epa_primary_pollutant?: string ;
  epa_health_concern?: string ;
}

export interface Uv {
  protection_window?: string ;
  ozone_level?: string ;
  uv_index?: string ;
  uv_level?: string ;
  max_uv_index?: string ;
  set_skin_type_1?: string ;
  set_skin_type_2?: string ;
  set_skin_type_3?: string ;
  set_skin_type_4?: string ;
  set_skin_type_5?: string ;
  set_skin_type_6?: string ;
}
export interface Weather {
  icons_model: string ;
  current: Current ;
  forecast?: Forecast ;
}

export interface Current {
  sun?: string ;
  moon_phase?: string ;
  // daily_summary?: string ;
  current_conditions?: string
  humidity?: string ;
  pressure?: string ;
  temperature?: string ;
  feels_like?: string ;
  visibility?: string ;
  wind_bearing?: string ;
  wind_speed?: string ;
  precipitation?: string ;
  forecast?: boolean ;
}
export interface Forecast {
  meteogram?: string ;
  temperature_high?: Days ;
  temperature_low?: Days ;
  summary?: Days ;
  icons?: Days ;
  precipitation_probability?: Days ;
  precipitation_intensity?: Days ;
}

export interface Days {
  day_1: string ;
  day_2: string ;
  day_3: string ;
  day_4: string ;
  day_5: string ;
  day_6: string ;
}

export interface Hours {
  hour_1: string ;
  hour_2: string ;
  hour_3: string ;
  hour_4: string ;
  hour_5: string ;
  hour_6: string ;
}

export interface IconsConfig {
  path: string ;
  iconType: string ;
  icons_model: string ;
  iconsDay: { [key: string]: string; } ;
  iconsNight: { [key: string]: string; } ;
}

export interface ITerms {
   windDirections;
   words;
}