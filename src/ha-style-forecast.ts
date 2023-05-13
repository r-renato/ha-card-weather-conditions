import {css} from 'lit-element';

const styleForecast = css`
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
      
  .forecast {
    width: 100%;
    margin: 0 auto;
    display: flex;
  }
  
  .forecast .day:first-child {
    margin-left: 0;
  }
  
  .forecast .day:nth-last-child(1) {
    border-right: none;
    margin-right: 0;
  }  
`;

export default styleForecast;