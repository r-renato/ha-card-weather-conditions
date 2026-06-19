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
  precipitation_accumulation?: string;

  lightning_azimuth?: string;
  lightning_distance?: string;
  lightning_strikes?: string; 
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
  swell_wave_period_max?: iTimeSlots ;
  wind_wave_period_max?: iTimeSlots ;
}

export interface iDPCAlert {
  thunderstorms?: string;
  hydraulic?: string;
  hydrogeological?: string;
}

export type WindMapTileStyle = 'standard' | 'cyclosm' | 'humanitarian' | 'cycle' | 'transport' | 'topo';

export interface iWindMap {
  enabled?: boolean; // Opt-in esplicito: la sezione divulga le coordinate al tile provider, di default è disattivata.
  latitude?: number; // Se omessa, fallback a hass.config.latitude (posizione "Home" di HA).
  longitude?: number; // Se omessa, fallback a hass.config.longitude.
  zoom?: number; // Default 12.
  tile_style?: WindMapTileStyle; // Default 'standard'. 'cycle'/'transport'/'topo' richiedono tile_api_key.
  tile_api_key?: string; // API key personale del provider, necessaria solo per 'cycle' | 'transport' | 'topo'.
  tile_url?: string; // Override completo del template tile (ha priorità su tile_style), es. 'https://{s}.example.com/{z}/{x}/{y}.png'.
  tile_attribution?: string; // Testo di attribuzione da mostrare quando si usa tile_url personalizzato.
  brightness?: number; // Componente brightness() del filtro CSS (0-2). Default: 0.65 (tema scuro) / 1 (tema chiaro o tile_dark attivo).
  tile_dark?: boolean; // Applica invert(90%) hue-rotate(180deg) per un tema scuro su tile chiare, combinato con brightness.
  tile_filter?: string; // Override completo del filtro CSS (ha priorità su brightness/tile_dark), es. 'grayscale(0.3) contrast(1.1)'.
  wind_bearing?: string; // Entity id dei gradi vento; se omesso riusa weather.present.wind_bearing.
  wind_speed?: string; // Entity id della velocità vento; se omesso riusa weather.present.wind_speed.
}

export type SunTimeFormat = 'hh_mm' | 'hh_mm_ss';

export interface iWeather {
  name?: string; // location name, in summary
  sun?: string;
  sun_time_format?: SunTimeFormat; // Formato orario alba/tramonto nella sun bar. Default: 'hh_mm'.
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

export type NumberFormat = 'language' | 'comma_decimal' | 'decimal_comma' | 'space_comma' | 'none';

export interface iLocaleOverride {
  language?: string;
  timezone?: string;
  number_format?: NumberFormat;
}

export type CwcModuleName =
  | 'summary'
  | 'present'
  | 'daily_forecasts'
  | 'hourly_forecasts'
  | 'marine_daily'
  | 'marine_hourly'
  | 'meteoalarm'
  | 'pollen'
  | 'ultraviolet'
  | 'airquality'
  | 'camera'
  | 'wind_map';

export interface iCardConfig {
  type: string; // ha-card-weather-conditions
  language?: string ; // Card language (language code ISO 639 'en' or language tag BCP 47 'en-GB')
  timezone?: string;
  number_format?: NumberFormat;
  // locale?: iLocaleOverride ;

  // Ordine e visibilità dei moduli della card. Se presente, SOSTITUISCE
  // l'ordine di default: solo i moduli elencati qui vengono mostrati,
  // nell'ordine indicato. Se assente, si usa l'ordine/visibilità di default
  // basato sulla sola presenza della relativa configurazione (retrocompatibile).
  module_order?: CwcModuleName[];

  weather: iWeather;
  ultraviolet?: iUltraviolet;

  pollen?: iPollen;
  airquality?: iAirQuality ;

  camera?: string;

  wind_map?: iWindMap;

  // alert: Alert ;
  // sea: Sea ;
}
