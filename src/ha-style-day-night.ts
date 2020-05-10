import {css, html} from 'lit-element';

const styleNightAndDay = css`
  .nd-container {
    margin: auto;
    padding-top: 1.3em;
    padding-bottom: 1.3em;
    padding-left: 1em;
    padding-right: 1em;
    
    position: relative;
    // background: #5C97FF;
    overflow: hidden;
  }
// .ha-card-night:before {
//   content: ' ';
//   display: block;
//   position: absolute;
//   left: 0;
//   top: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 0;
//   opacity: calc(attr(data-opacity));
//   background-image: url('https://raw.githubusercontent.com/tingletech/moon-phase/gh-pages/background.jpg');
//   background-repeat: no-repeat;
//   background-position: 50% 0;
//  
//   -ms-background-size: cover;
//   -o-background-size: cover;
//   -moz-background-size: cover;
//   -webkit-background-size: cover;
//   background-size: cover;
// }
`;

export function getStyleNight(name, background, opacity) {
  return html`
  .${name}:before {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: ${opacity};
    // background-image: url('https://elements-video-cover-images-0.imgix.net/files/f29373bc-9db5-4580-88f6-1c6e301390bc/inline_image_preview.jpg?auto=compress%2Cformat&fit=min&h=394&w=700&s=535eeef8ab1318402b544c81dc2c33f6');
    // background-image: url('https://i.ytimg.com/vi/5nvH95MZEB4/maxresdefault.jpg');
    // background-image: url('https://ak.picdn.net/shutterstock/videos/20286835/thumb/1.jpg');
    // background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTEo6kI0KDA0HHU2CTFpOZs2vE08YOOidS8Nl-OFJ4ZUq12aH4p&usqp=CAU');
    background-image: url('${background}');
    background-repeat: no-repeat;
    background-position: 50% 0;
    -ms-background-size: cover;
    -o-background-size: cover;
    -moz-background-size: cover;
    -webkit-background-size: cover;
    background-size: cover;
  }
  `;
}

// const styleNight = css`
//   .ha-card-night:before {
//     content: ' ';
//     display: block;
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 100%;
//     height: 100%;
//     z-index: 0;
//     opacity: attr(data-opacity);
//     background-image: url('https://raw.githubusercontent.com/tingletech/moon-phase/gh-pages/background.jpg');
//     background-repeat: no-repeat;
//     background-position: 50% 0;
//     -ms-background-size: cover;
//     -o-background-size: cover;
//     -moz-background-size: cover;
//     -webkit-background-size: cover;
//     background-size: cover;
//   }
// `;


export default styleNightAndDay;