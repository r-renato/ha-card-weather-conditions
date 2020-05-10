import {css} from 'lit-element';

const styleSummary = css`
  .current {
    padding-top: 1.2em;
    margin-bottom: 3.5em;
  }
  
  .icon.bigger {
    width: 10em;
    height: 10em;
    margin-top: -4em;
    position: absolute;
    left: 0em;
  }
  
  .title {
    position: absolute;
    left: calc(140px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
    top: 0.6em;
    font-weight: 300;
    font-size: calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
    color: var(--primary-text-color);
  }
  .moon {
    position: absolute;
    left: calc(115px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
    top: calc(63px - (26 - 14) * ((100vw - 300px) / (1600 - 300)));
    font-weight: 300;
    font-size: calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
    color: var(--primary-text-color);
    line-height:20px;
    display: inline-block;
  }
            
  .temp {
    position: absolute;
    // top: 0.65em;
    font-weight: 300;
    font-size: calc(49px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
    color: var(--primary-text-color);
    right: 1em;
    margin-top: 2px;
  }

  .tempc {
    position: absolute;
    font-weight: 300;
    font-size: calc(12px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
    // font-size: 1.5em;
    vertical-align: super;
    color: var(--primary-text-color);
    right: 1em;
    margin-top: -11px;
    margin-right: 7px;
  }      
     
`;

export default styleSummary;