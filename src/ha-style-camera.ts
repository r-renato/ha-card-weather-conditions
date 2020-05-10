import {css} from 'lit-element';

const styleCamera = css`
      .camera-container {
        margin-top: 10px;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: stretch;
        // position: absolute;
        // background: #000;
      } 
      .camera-image {
        flex: 3;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .camera-image > img {
        display: inline-block;
        max-width: 100%;
        max-height: 100%;
      }
`;

export default styleCamera;