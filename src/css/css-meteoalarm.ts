import { css } from 'lit';

const meteodcpalarmStyle = css`
.meteodcpalarm-grid-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  padding: 12px;
}

.meteodcpalarm-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 72px;     /* 👈 cresce, ma non scende sotto i 72px */
  max-width: 220px;   /* 👈 opzionale: previene allargamento eccessivo */
  text-align: center;
}

.meteodcpalarm-group ha-icon {
  --mdc-icon-size: 36px;
}

.meteodcpalarm-label {
  margin-top: 6px;
  font-size: 0.85em;
  color: var(--primary-text-color);
}


`;

export default meteodcpalarmStyle;
