import { css } from 'lit';

const cameraStyle = css`

.camera-section-header {
  display: flex;
  align-items: center;
  gap: var(--cwc-space-xs);
}

.camera-header-icon {
  --mdc-icon-size: 14px;
  color: var(--cwc-text-muted);
  flex-shrink: 0;
}

.camera-container {
  width: 100%;
  cursor: pointer;
  border-radius: var(--cwc-radius-md);
  overflow: hidden;
  aspect-ratio: 16 / 9;
}

.camera-container:hover .camera-image {
  transform: scale(1.02);
}

.camera-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}
`;

export default cameraStyle;
