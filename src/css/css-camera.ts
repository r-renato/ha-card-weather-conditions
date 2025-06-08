import { css } from 'lit';

const cameraStyle = css`
  .camera-container {
    margin-top: 10px;
    width: 100%;
    display: flex;
    align-items: stretch;
  }

  .camera-image {
    aspect-ratio: 16 / 9;
    width: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .camera-image > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default cameraStyle;
