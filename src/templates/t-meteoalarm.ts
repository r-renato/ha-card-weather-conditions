import { html, nothing } from 'lit';
import { renderSectionHeader } from '../utils/render-section';
import { translate } from '../utils/locale';

export interface iWeatherMeteoDPCAlarmDataInterface {
  event?: string,
  severity?: string,
  icon?: string,
  icon_color?: string,
  datetime?: string,
}

/**
 * Mappa il valore icon_color prodotto dal builder alla classe CSS
 * modificatrice del banner. I valori possibili sono quelli definiti
 * in b-meteoalarm.ts: 'green', '#ffa600', 'orange', 'red', 'gray'/'grey'.
 */
const colorToModifier = (color: string): string => {
  const map: Record<string, string> = {
    green:    'alarm--green',
    '#ffa600': 'alarm--yellow',
    orange:   'alarm--orange',
    red:      'alarm--red',
    gray:     'alarm--gray',
    grey:     'alarm--gray',
  };
  return map[color?.toLowerCase()] ?? 'alarm--gray';
};

const renderMeteoDPCalarm = (
  meteoDPCalarmData: Record<string, iWeatherMeteoDPCAlarmDataInterface> | null,
  wordDict: Record<string, string> = {},
) => {
  if (!meteoDPCalarmData || Object.keys(meteoDPCalarmData).length === 0) return html``;

  const banners = Object.entries(meteoDPCalarmData).map(([, data]) => {
    const modifier = colorToModifier(data.icon_color ?? '');
    const hasSeverity = data.severity !== undefined && data.severity !== '';

    return html`
      <div class="alarm-banner ${modifier}">
        <ha-icon class="alarm-banner__icon" icon="${data.icon}"></ha-icon>
        <div class="alarm-banner__body">
          <div class="alarm-banner__event">${data.event}</div>
          ${data.datetime ? html`
            <div class="alarm-banner__when">${data.datetime}</div>
          ` : nothing}
        </div>
        ${hasSeverity ? html`
          <span
            class="alarm-banner__badge ${modifier}__badge"
            title="${translate('Severity level', wordDict)}"
          >${data.severity}</span>
        ` : nothing}
      </div>
    `;
  });

  return html`
    <div class="cwc-section">
      ${renderSectionHeader(translate('Alerts', wordDict))}
      ${banners}
    </div>
  `;
};

export default renderMeteoDPCalarm;
