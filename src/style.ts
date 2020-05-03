import {css} from 'lit-element';

const style = css`
      ha-card {
        cursor: pointer;
        margin: auto;
        padding-top: 1.3em;
        padding-bottom: 1.3em;
        padding-left: 1em;
        padding-right: 1em;
        position: relative;
      }

      .current {
        padding-top: 1.2em;
        margin-bottom: 3.5em;
      }
            
      .spacer {
        padding-top: 1em;
      }
      
      .icon.bigger {
        width: 10em;
        height: 10em;
        margin-top: -4em;
        position: absolute;
        left: 0em;
      }
      
      .icon {
        width: 50px;
        height: 50px;
        margin-right: 5px;
        display: inline-block;
        vertical-align: middle;
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        text-indent: -9999px;
      }    
      
      .temp {
        font-weight: 300;
        font-size: calc(56px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
        color: var(--primary-text-color);
        position: absolute;
        right: 1em;
        top: 0.3em;
      }

      .tempc {
        font-weight: 300;
        font-size: 1.5em;
        vertical-align: super;
        color: var(--primary-text-color);
        position: absolute;
        right: 1em;
        margin-top: -14px;
        margin-right: 7px;
      }      
      
      .title {
        position: absolute;
        left: calc(140px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
        top: 0.6em;
        font-weight: 300;
        font-size: calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
        color: var(--primary-text-color);
      }
      
      .variations {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        font-weight: 300;
        color: var(--primary-text-color);
        list-style: none;
        padding: 3px 1em;
        margin: 0;
        
        border-top: solid 1px var(--primary-text-color);
      }

      .variations ha-icon {
        height: 22px;
        margin-right: 5px;
        color: var(--paper-item-icon-color);
      }
      
      .variations svg {
        height: 15px;
        margin-right: 5px;
        fill: var(--paper-item-icon-color);
      }
      
      .variations li {
        flex-basis: auto;
        width: 50%;
      }

      .variations li:nth-child(2n) {
        text-align: right;
      }

      .variations li:nth-child(2n) ha-icon {
        margin-right: 0;
        margin-left: 8px;
        float: right;
      }    
      
      .variations li:nth-child(2n) svg {
        margin-right: 0;
        margin-left: 8px;
        float: right;
      }    
      
      .forecast {
        width: 100%;
        margin: 0 auto;
        display: flex;
      }

      .day {
        flex: 1;
        display: block;
        text-align: center;
        color: var(--primary-text-color);
        border-right: 0.1em solid #d9d9d9;
        line-height: 2;
        box-sizing: border-box;
      }

      .dayname {
        text-transform: uppercase;
      }

      .forecast .day:first-child {
        margin-left: 0;
      }

      .forecast .day:nth-last-child(1) {
        border-right: none;
        margin-right: 0;
      }      
      .container {
        margin-top: 10px;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: stretch;
        // position: absolute;
        // background: #000;
      } 
      .mainImage {
        flex: 3;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .mainImage > img {
        display: inline-block;
        max-width: 100%;
        max-height: 100%;
      }

      .meter {
        background: #efefef; /* Grigio */
        border-radius: 8px;
        border: 1px solid transparent; /* 2 */
        box-shadow:
          0 1px 3px 1px rgba(0,0,0,0.15) inset,
          0 0 0 1px #333; /* 1 */
        height: .75em;
        max-width: 10em;
        overflow: hidden;
        width: 100%;
      }

      /* WebKit */
      .meter::-webkit-meter-bar {
        background: #efefef; /* Grigio */
        border: 1px solid transparent; /* 2 */
        border-radius: 8px;
      }

      .meter::-webkit-meter-optimum-value,
      .meter::-webkit-meter-suboptimum-value,
      .meter::-webkit-meter-even-less-good-value {
        border-radius: 8px;
      }

      .meter::-webkit-meter-optimum-value {
        background: #85cc00; /* verde #3C5C00; */
      }
      
      .meter::-webkit-meter-suboptimum-value {
        background: #F5D000;
      }
      
      .meter::-webkit-meter-even-less-good-value  {
        background: #e65000 ; /* Rosso #D14900; */
      }

      // .meter::-webkit-meter-optimum-value {
      //     background: #87C7DE;
      //     background: -moz-linear-gradient(top, #a1d4e6 0%, #6bb4d1 100%);
      //     background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #a1d4e6), color-stop(100%, #6bb4d1));
      //     background: -webkit-linear-gradient(top, #a1d4e6 0%, #6bb4d1 100%);
      //     background: -o-linear-gradient(top, #a1d4e6 0%, #6bb4d1 100%);
      //     background: -ms-linear-gradient(top, #a1d4e6 0%, #6bb4d1 100%);
      //     background: linear-gradient(to bottom, #a1d4e6 0%, #6bb4d1 100%);
      //     filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#a1d4e6', endColorstr='#6bb4d1',GradientType=0);
      // }

/* Firefox */
.meter::-moz-meter-bar {
  border-radius: 8px;
}

.meter:-moz-meter-optimum::-moz-meter-bar {
  background: #3C5C00;
}

.meter:-moz-meter-sub-optimum::-moz-meter-bar {
  background: #F5D000;
}

.meter:-moz-meter-sub-sub-optimum::-moz-meter-bar {
  background: #D14900;
}



`;

export default style;