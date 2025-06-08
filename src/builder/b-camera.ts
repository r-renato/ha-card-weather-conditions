import { HomeAssistant } from 'custom-card-helpers/dist';
import { iTerms } from '../base/lovelace-base';
import renderCamera from '../templates/t-camera';

const buildCamera = (
  hass: HomeAssistant,
  lang: string,
  terms: iTerms,
  handlePopup: (e: Event, entityId: string) => void,
  cameraId: string,
) => {
  const camera = cameraId && hass.states[cameraId];

  const entityPicture = camera?.attributes?.entity_picture;
  const friendlyName = camera?.attributes?.friendly_name ?? cameraId;

  return renderCamera(handlePopup, cameraId, entityPicture, friendlyName);
};

export default buildCamera;
