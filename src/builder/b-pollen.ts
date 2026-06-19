import { HomeAssistant } from 'custom-card-helpers/dist';
import { iPollen } from '../utils/config-schema';
import { getEntityRawValue } from '../utils/entity';
import { iPollenData, renderPollen } from '../templates/t-pollen';
import { iTerms } from '../base/lovelace-base';

const buildPollen = (hass: HomeAssistant, pollen: iPollen, terms: iTerms) => {
  const allItems: iPollenData[] = [];
  if (Array.isArray(pollen.entities) && pollen.entities.length > 0) {
    pollen.entities.forEach((item) => {
      const rawvalue = getEntityRawValue(hass, item.entity);
      if (rawvalue) {
        const value = parseFloat(rawvalue);
        if (!Number.isNaN(value) && value >= pollen.min && value <= pollen.max) {
          allItems.push({ name: item.name, value });
        }
      }
    });
  }

  return renderPollen(allItems, pollen.min, pollen.max, terms.words);
};

export default buildPollen;
