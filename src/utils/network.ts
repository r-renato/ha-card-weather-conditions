import { hacsImagePath, logo, manImagePath } from './const';

export function logInfo(message: string, ...styles: unknown[]): void {
  console.info(message, ...(styles.length ? styles : []));
}

export function imageExist(imageSrc: string, timeout = 5000): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  return fetch(imageSrc, { method: 'HEAD', signal: controller.signal })
    .then((r) => r.ok)
    .catch(() => false)
    .finally(() => clearTimeout(timer));
}

export async function loadJSON(fullPathFile: string): Promise<string> {
  const response = await fetch(fullPathFile);
  if (!response.ok) {
    const err = `ERROR retrieving JSON: '${fullPathFile}' - ${response.status} ${response.statusText}`;
    console.error(err);
    throw new Error(err);
  }
  console.info(`Locale '${fullPathFile}' loaded`);
  return response.text();
}

async function doPreload(): Promise<{ translations: string[]; imagePath: string | null }> {
  const [hacsResult, manResult] = await Promise.all([
    imageExist(`${hacsImagePath}/static/cloudy.svg`),
    imageExist(`${manImagePath}/static/cloudy.svg`),
  ]);

  let imagePath: string | null = null;
  if (hacsResult) {
    imagePath = hacsImagePath;
  } else if (manResult) {
    imagePath = manImagePath;
  }

  if (!imagePath) {
    console.warn(`${logo} - Impossibile determinare il path immagini.`);
    return { translations: [], imagePath: null };
  }

  const langs = ['en', 'it', 'nl', 'es', 'de', 'fr', 'sr-latn', 'pt', 'da', 'no-NO', 'cs', 'ru', 'is'];
  const translPath = `${imagePath}/../transl/`;
  const translations = await Promise.all(
    langs.map((lang) => loadJSON(`${translPath}${lang}.json`)),
  );

  return { translations, imagePath };
}

let cache: Promise<{ translations: string[]; imagePath: string | null }> | null = null;

export function preloadResources(): Promise<{ translations: string[]; imagePath: string | null }> {
  if (!cache) cache = doPreload();
  return cache;
}
