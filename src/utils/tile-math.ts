/**
 * Funzioni pure per il calcolo delle tile "slippy map" (schema XYZ usato da
 * OpenStreetMap e dalla maggior parte dei provider di tile raster), senza
 * dipendenze esterne (niente Leaflet/MapLibre).
 *
 * Riferimento: https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
 */

export const TILE_SIZE = 256;

export interface iTileCoord {
  z: number;
  x: number;
  y: number;
}

export interface iTilePixel {
  tile: iTileCoord;
  /** Offset in pixel (0-255) del punto all'interno della tile che lo contiene. */
  offsetX: number;
  offsetY: number;
}

/**
 * Converte coordinate geografiche in tile XYZ + offset in pixel del punto
 * esatto all'interno di quella tile.
 */
export const latLonToTilePixel = (
  lat: number,
  lon: number,
  zoom: number,
): iTilePixel => {
  const n = 2 ** zoom;
  const fx = ((lon + 180) / 360) * n;

  const latRad = (lat * Math.PI) / 180;
  const fy = ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n;

  const x = Math.floor(fx);
  const y = Math.floor(fy);

  return {
    tile: { z: zoom, x, y },
    offsetX: Math.round((fx - x) * TILE_SIZE),
    offsetY: Math.round((fy - y) * TILE_SIZE),
  };
};

/**
 * Genera la griglia 3x3 di tile centrata sulla tile data, in ordine riga per
 * riga (adatto a un CSS grid 3x3). L'asse orizzontale è "wrappato" sul
 * meridiano 180°/-180°; l'asse verticale non lo è (non esistono tile oltre i
 * poli, quindi eventuali coordinate fuori range vengono lasciate invariate:
 * il browser mostrerà semplicemente un'immagine non disponibile).
 */
export const buildTileGrid3x3 = (center: iTileCoord): iTileCoord[] => {
  const tiles: iTileCoord[] = [];
  const tilesPerAxis = 2 ** center.z;

  for (let dy = -1; dy <= 1; dy += 1) {
    for (let dx = -1; dx <= 1; dx += 1) {
      const x = (((center.x + dx) % tilesPerAxis) + tilesPerAxis) % tilesPerAxis;
      const y = center.y + dy;
      tiles.push({ z: center.z, x, y });
    }
  }

  return tiles;
};

/**
 * Sostituisce i placeholder {s}/{z}/{x}/{y}/{key} di un template di tile URL.
 * {s} viene scelto deterministicamente tra i sub-domini disponibili (default
 * a,b,c; alcuni provider come OSM France ne usano solo due). {key} viene
 * sostituito con l'eventuale API key fornita (stringa vuota se assente).
 */
export const buildTileUrl = (
  template: string,
  tile: iTileCoord,
  options?: { subdomains?: string[]; apiKey?: string },
): string => {
  const subdomains = options?.subdomains ?? ['a', 'b', 'c'];
  const s = subdomains[(tile.x + tile.y) % subdomains.length];

  return template
    .replace('{s}', s)
    .replace('{z}', String(tile.z))
    .replace('{x}', String(tile.x))
    .replace('{y}', String(tile.y))
    .replace('{key}', options?.apiKey ?? '');
};
