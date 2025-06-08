import { html } from 'lit';

export interface iWeatherMeteoDPCAlarmDataInterface {
  event?: string,
  severity?: string,
  icon?: string,
  icon_color?: string,
  datetime?: string,
}

const renderMeteoDPCalarm = (
  meteoDPCalarmData: Record<string, iWeatherMeteoDPCAlarmDataInterface> | null,
) => {
  if (!meteoDPCalarmData || Object.keys(meteoDPCalarmData).length === 0) return html``;

  return html`
  <div class="meteodcpalarm-grid-container">
    ${Object.entries(meteoDPCalarmData).map(([key, data]) => html`
      <div class="meteodcpalarm-group">
        <ha-icon icon="${data.icon}" style="color: ${data.icon_color};"></ha-icon>
        <div class="meteodcpalarm-label">${data.datetime}</div>
        <div class="meteodcpalarm-label">${data.event}</div>
      </div>
    `)}
  </div>
  `;
};

export default renderMeteoDPCalarm;
