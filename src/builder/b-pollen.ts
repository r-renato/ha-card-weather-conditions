import { HomeAssistant } from 'custom-card-helpers/dist';
import { iPollen } from '../utils/config-schema';
import { getEntityRawValue, string2Number } from '../utils/helper';
import { iPollenData, renderPollen } from '../templates/t-pollen';

const buildPollen = (hass: HomeAssistant, lang: string, pollen: iPollen) => {
  const allItems: iPollenData[] = [];
  if (Array.isArray(pollen.entities) && pollen.entities.length > 0) {
    pollen.entities.forEach((item) => {
      const rawvalue = getEntityRawValue(hass, item.entity);
      if (rawvalue && rawvalue !== 'unknown' && rawvalue !== 'unavailable') {
        let value: number = string2Number(getEntityRawValue(hass, item.entity));

        if (Number.isNaN(value) || value < pollen.min || value > pollen.max) {
          value = 0;
        }

        allItems.push({
          name: item.name,
          value,
        });
      }
      // console.log(`Nome: ${item.name}, Entità: ${item.entity}`);
    });
  }

  return renderPollen(allItems, pollen.min, pollen.max);
};

export default buildPollen;
