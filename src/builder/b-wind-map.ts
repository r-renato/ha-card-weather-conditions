import { HomeAssistant } from 'custom-card-helpers/dist';
import { computeDarkMode } from '../base/lovelace-base';
import { logo } from '../utils/const';
import { iPresentData, iWindMap, WindMapTileStyle } from '../utils/config-schema';
import {
  getEntityNumericValue,
  getEntityRawValue,
  getEntityUnit,
  getWindDirections,
} from '../utils/entity';
import { buildTileGrid3x3, buildTileUrl, latLonToTilePixel } from '../utils/tile-math';
import renderWindMap, { iWindMapData } from '../templates/t-wind-map';

interface iTileStyleDefinition {
  urlTemplate: string;
  attribution: string;
  subdomains?: string[];
  requiresApiKey?: boolean;
}

/**
 * Layer raster derivati da OpenStreetMap, stessi proposti dal selettore
 * "livelli mappa" di openstreetmap.org. 'cycle', 'transport' e 'topo' sono
 * serviti da provider terzi (Thunderforest, Tracestrack) che richiedono una
 * API key personale: openstreetmap.org usa una propria key privata non
 * redistribuibile, quindi qui vanno passate tramite tile_api_key.
 * 'Shortbread' e 'MapTiler OMT' (vector tile, non raster) non sono
 * supportabili da questo approccio senza una libreria di rendering
 * vettoriale (es. MapLibre GL), fuori scope per design "zero dipendenze".
 */
const TILE_STYLES: Record<WindMapTileStyle, iTileStyleDefinition> = {
  standard: {
    urlTemplate: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors',
  },
  cyclosm: {
    urlTemplate: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors. Tiles style by CyclOSM hosted by OpenStreetMap France',
  },
  humanitarian: {
    urlTemplate: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors. Tiles style by Humanitarian OpenStreetMap team hosted by OpenStreetMap France',
    subdomains: ['a', 'b'],
  },
  cycle: {
    urlTemplate: 'https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey={key}',
    attribution: '© OpenStreetMap contributors. Tiles courtesy of Andy Allan (Thunderforest)',
    requiresApiKey: true,
  },
  transport: {
    urlTemplate: 'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey={key}',
    attribution: '© OpenStreetMap contributors. Tiles courtesy of Andy Allan (Thunderforest)',
    requiresApiKey: true,
  },
  topo: {
    urlTemplate: 'https://tile.tracestrack.com/topo__/{z}/{x}/{y}@1x.png?key={key}',
    attribution: '© OpenStreetMap contributors. Tiles by Tracestrack',
    requiresApiKey: true,
  },
};

const DEFAULT_ZOOM = 12;

const resolveTileStyle = (windMapConfig: iWindMap): iTileStyleDefinition => {
  const styleId = windMapConfig.tile_style ?? 'standard';
  const styleDef = TILE_STYLES[styleId] ?? TILE_STYLES.standard;

  if (styleDef.requiresApiKey && !windMapConfig.tile_api_key) {
    console.warn(`${logo} - wind_map: tile_style "${styleId}" richiede tile_api_key, fallback su "standard".`);
    return TILE_STYLES.standard;
  }

  return styleDef;
};

/**
 * Calcola il filtro CSS applicato al mosaico di tile. tile_filter, se
 * presente, ha sempre priorità assoluta (controllo completo per l'utente).
 * Altrimenti si compone da tile_dark (per un tema scuro "vero" via
 * invert+hue-rotate, utile su layer chiari come Standard) e da brightness
 * (di default 0.65 con tema HA scuro/1 con tema chiaro, 1 se tile_dark è
 * attivo, salvo override esplicito).
 */
const resolveDefaultBrightness = (windMapConfig: iWindMap, hass: HomeAssistant): number => {
  if (windMapConfig.tile_dark) return 1;
  return computeDarkMode(hass) ? 0.65 : 1;
};

const buildTileFilter = (windMapConfig: iWindMap, hass: HomeAssistant): string => {
  if (windMapConfig.tile_filter) return windMapConfig.tile_filter;

  const brightness = windMapConfig.brightness ?? resolveDefaultBrightness(windMapConfig, hass);

  return windMapConfig.tile_dark
    ? `invert(90%) hue-rotate(180deg) brightness(${brightness})`
    : `brightness(${brightness})`;
};

const buildWindMap = (
  hass: HomeAssistant,
  cwcLocWindDirections: Record<string, string>,
  windMapConfig?: iWindMap,
  presentData?: iPresentData,
  wordDict: Record<string, string> = {},
): ReturnType<typeof renderWindMap> => {
  if (!windMapConfig?.enabled) return renderWindMap(null, wordDict);

  const latitude = windMapConfig.latitude ?? hass.config.latitude;
  const longitude = windMapConfig.longitude ?? hass.config.longitude;
  if (latitude === undefined || longitude === undefined) return renderWindMap(null, wordDict);

  const zoom = windMapConfig.zoom ?? DEFAULT_ZOOM;

  const windBearingEntity = windMapConfig.wind_bearing || presentData?.wind_bearing;
  const windSpeedEntity = windMapConfig.wind_speed || presentData?.wind_speed;

  const windBearingRaw = getEntityRawValue(hass, windBearingEntity);
  const windBearingDeg = windBearingRaw !== undefined ? parseFloat(windBearingRaw) : undefined;
  const windBearingLabel = getWindDirections(windBearingRaw, cwcLocWindDirections);

  const windSpeedValue = getEntityNumericValue({ entityId: windSpeedEntity, hass, decimals: 0 });
  const windSpeedUnit = getEntityUnit(hass, windSpeedEntity);

  const styleDef = resolveTileStyle(windMapConfig);
  const tileTemplate = windMapConfig.tile_url ?? styleDef.urlTemplate;
  const attribution = windMapConfig.tile_attribution ?? styleDef.attribution;

  const { tile: centerTile, offsetX, offsetY } = latLonToTilePixel(latitude, longitude, zoom);
  const tiles = buildTileGrid3x3(centerTile).map((tile) => buildTileUrl(tileTemplate, tile, {
    subdomains: styleDef.subdomains,
    apiKey: windMapConfig.tile_api_key,
  }));

  // Niente provider "scuro" separato (si usa sempre OSM): l'adattamento al tema
  // HA passa da un filtro CSS (brightness/tile_dark/tile_filter).
  const filter = buildTileFilter(windMapConfig, hass);

  const windMapData: iWindMapData = {
    tiles,
    // Posizione del punto esatto dentro il mosaico 3x3 (768x768): tile centrale (256,256) + offset sub-pixel.
    markerX: 256 + offsetX,
    markerY: 256 + offsetY,
    filter,
    windBearingDeg: Number.isNaN(windBearingDeg as number) ? undefined : windBearingDeg,
    windBearingLabel,
    windSpeedValue,
    windSpeedUnit,
    attribution,
  };

  return renderWindMap(windMapData, wordDict);
};

export default buildWindMap;
