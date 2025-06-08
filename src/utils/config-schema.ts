export interface iLovelaceCardConfig {
  index?: number; // Indice della card all'interno della vista (opzionale).
  view_index?: number; // Indice della vista in cui si trova la card (opzionale).
  view_layout?: unknown; // Informazioni di layout (griglia, posizione, ecc.) per l'editor UI.
  type: string; // Obbligatorio. Indica il tipo di card
  [key: string]: unknown; // Permette di aggiungere parametri arbitrari, cioè supporta proprietà dinamiche definite dall’utente.
}

export interface iPresentData {
  // sun?: string;
  // moonphase?: string;
  condition?: string;
  temperature?: string;
  temperature_feelslike?: string;

  temperature_min?: string;
  temperature_max?: string;

  humidity?: string;
  pressure?: string;
  visibility?: string;
  wind_bearing?: string;
  wind_speed?: string;
  precipitation_intensity?: string;
  precipitation_probability?: string;
}

export interface iTimeSlots {
  slot1: string;
  slot2: string;
  slot3: string;
  slot4: string;
  slot5: string;
  slot6: string;
}

export interface iDailyForecast {
  condition?: iTimeSlots;
  temperature_high?: iTimeSlots;
  temperature_low?: iTimeSlots;
  precipitation_intensity?: iTimeSlots;
  precipitation_probability?: iTimeSlots;

  meteogram?: string ;
}

export interface iHourlyForecast {
  condition?: iTimeSlots;
  temperature?: iTimeSlots;
  temperature_feelslike?: iTimeSlots;
  precipitation_intensity?: iTimeSlots;
  precipitation_probability?: iTimeSlots;
  wind_bearing?: iTimeSlots;
  wind_speed?: iTimeSlots;
}

export interface iMarineHourlyForecast {
  swell_direction?: iTimeSlots ;
  swell_height?: iTimeSlots ;
  swell_period?: iTimeSlots ;
  wind_direction: iTimeSlots ;
  wind_speed: iTimeSlots ;
  air_temperature: iTimeSlots ;
  water_temperature: iTimeSlots ;
}

export interface iMarineDailyForecast {
  wave_height_max?: iTimeSlots ;
  wave_direction?: iTimeSlots ;
  swell_wave_height_max?: iTimeSlots ;
  wind_wave_height_max?: iTimeSlots ;
}

export interface iDPCAlert {
  thunderstorms?: string;
  hydraulic?: string;
  hydrogeological?: string;
}

export interface iWeather {
  name?: string; // location name, in summary
  sun?: string;
  moonphase?: string;
  icons_model: string;
  animation?: boolean;
  present?: iPresentData ;
  daily_forecasts?: iDailyForecast;
  hourly_forecasts?: iHourlyForecast;
  marine_daily_forecasts?: iMarineDailyForecast;
  marine_hourly_forecasts?: iMarineHourlyForecast;
  meteoalarm?: string; // Meteoalarm alert
  dpcalarm?: iDPCAlert; // DPC alert
}

export interface iUltraviolet {
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

export interface iPollenItem {
  name: string;
  entity: string;
}

export interface iPollen {
  entities: iPollenItem[];
  min: number;
  max: number;
}

export interface iAirQuality {
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

export interface iCardConfig {
  type: string; // ha-card-weather-conditions
  language?: string ; // Card language

  weather: iWeather;
  ultraviolet?: iUltraviolet;

  pollen?: iPollen;
  airquality?: iAirQuality ;

  camera?: string;

  // display: string[]

  // alert: Alert ;
  // sea: Sea ;
}
