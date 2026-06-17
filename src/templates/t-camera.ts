import { html } from 'lit';
import { renderSectionHeader } from '../utils/render-section';

const renderCamera = (
  handlePopup: (e: Event, entityId: string) => void,
  cameraId: string,
  cameraPicture: string,
  friendlyName: string,
) => {
  if (!cameraPicture) return html``;

  return html`
    <div class="cwc-section">
      <div class="camera-section-header">
        <ha-icon class="camera-header-icon" icon="mdi:camera"></ha-icon>
        ${renderSectionHeader(friendlyName)}
      </div>
      <div
        class="camera-container"
        @click=${(e: Event) => handlePopup(e, cameraId)}
      >
        <img
          class="camera-image"
          src="${cameraPicture}"
          alt="${friendlyName}"
          loading="lazy"
        />
      </div>
    </div>
  `;
};

export default renderCamera;
