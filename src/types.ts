export interface CardConfig {
  type: string ;
  name?: string ;
  language?: string ;
  animation?: boolean ;
  display: string[]
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

export interface Weather {
  icons_model: string ;
  current: Current ;
  forecast?: Forecast ;
}

export interface Current {
  sun?: string ;
  daily_summary?: string ;
  current_conditions?: string
  humidity?: string ;
  pressure?: string ;
  temperature?: string ;
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
  iconsDay: { [key: string]: string; } ;
  iconsNight: { [key: string]: string; } ;

}