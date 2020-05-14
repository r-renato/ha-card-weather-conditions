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

export interface IconsConfig {
  path: string ;
  iconType: string ;
  icons_model: string ;
  iconsDay: { [key: string]: string; } ;
  iconsNight: { [key: string]: string; } ;

}