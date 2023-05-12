import {css} from 'lit-element';

const style = css`
  ha-card {
    cursor: pointer;
    position: relative;
  }
            
.spacer {
  padding-top: 1em;
  border-top: solid 1px var(--primary-text-color);
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
  // border-top: solid 1px var(--primary-text-color);
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
      
`;

export default style;