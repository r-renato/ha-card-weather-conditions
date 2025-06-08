import { html } from 'lit';

const renderCamera = (
  handlePopup: (e: Event, entityId: string) => void,
  cameraId: string,
  cameraPicture: string,
  friendlyName: string,
) => {
  if (!cameraPicture) return html``;

  return html`
    <div 
      class="camera-container"
      @click=${(e: Event) => handlePopup(e, cameraId)}
    >
      <div class="camera-image">
        <img 
          src="${cameraPicture}" 
          alt="${friendlyName}"
          loading="lazy"
        />
      </div>
    </div>
  `;
};

export default renderCamera;
