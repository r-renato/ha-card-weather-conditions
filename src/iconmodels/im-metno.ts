// MET Norway (met.no) Weather Icons - symbol_code
// https://api.met.no/weatherapi/weathericon/2.0/legends
// clearsky_day, clearsky_night, clearsky_polartwilight, fair_day, fair_night, fair_polartwilight
// partlycloudy_day, partlycloudy_night, partlycloudy_polartwilight, cloudy
// rainshowers_day, rainshowers_night, rainshowers_polartwilight
// rainshowersandthunder_day, rainshowersandthunder_night, rainshowersandthunder_polartwilight
// sleetshowers_day, sleetshowers_night, sleetshowers_polartwilight
// snowshowers_day, snowshowers_night, snowshowers_polartwilight
// rain, heavyrain, heavyrainandthunder, sleet, snow, snowandthunder, fog
// sleetshowersandthunder_day, sleetshowersandthunder_night, sleetshowersandthunder_polartwilight
// snowshowersandthunder_day, snowshowersandthunder_night, snowshowersandthunder_polartwilight
// rainandthunder, sleetandthunder, lightrainshowersandthunder_day, lightrainshowersandthunder_night
// lightrainshowersandthunder_polartwilight, heavyrainshowersandthunder_day, heavyrainshowersandthunder_night
// heavyrainshowersandthunder_polartwilight, lightssleetshowersandthunder_day, lightssleetshowersandthunder_night
// lightssleetshowersandthunder_polartwilight, heavysleetshowersandthunder_day, heavysleetshowersandthunder_night
// heavysleetshowersandthunder_polartwilight, lightssnowshowersandthunder_day, lightssnowshowersandthunder_night
// lightssnowshowersandthunder_polartwilight, heavysnowshowersandthunder_day, heavysnowshowersandthunder_night
// heavysnowshowersandthunder_polartwilight, lightrain, lightrainshowers_day, lightrainshowers_night
// lightrainshowers_polartwilight, heavyrainshowers_day, heavyrainshowers_night, heavyrainshowers_polartwilight
// lightsleet, lightsleetshowers_day, lightsleetshowers_night, lightsleetshowers_polartwilight
// heavysleetshowers_day, heavysleetshowers_night, heavysleetshowers_polartwilight, lightsnow
// lightsnowshowers_day, lightsnowshowers_night, lightsnowshowers_polartwilight, heavysnowshowers_day
// heavysnowshowers_night, heavysnowshowers_polartwilight, lightssleetshowers, heavysleetshowers
// lightssnowshowers, heavysnowshowers

export const cwcMetnoDayIcons: { [key: string]: string; } = {
  // Cloud-free / fair
  clearsky_day: 'day',
  clearsky_polartwilight: 'day',
  fair_day: 'cloudy-day-1',
  fair_polartwilight: 'cloudy-day-1',
  partlycloudy_day: 'cloudy-day-2',
  partlycloudy_polartwilight: 'cloudy-day-2',
  cloudy: 'cloudy-day-3',

  // Fog
  fog: 'fog',

  // Rain showers
  lightrainshowers_day: 'rainy-1',
  lightrainshowers_polartwilight: 'rainy-1',
  rainshowers_day: 'rainy-2',
  rainshowers_polartwilight: 'rainy-2',
  heavyrainshowers_day: 'rainy-3',
  heavyrainshowers_polartwilight: 'rainy-3',

  // Rain (steady)
  lightrain: 'rainy-1',
  rain: 'rainy-2',
  heavyrain: 'rainy-3',

  // Sleet showers
  lightsleetshowers_day: 'rain-and-sleet-mix',
  lightsleetshowers_polartwilight: 'rain-and-sleet-mix',
  sleetshowers_day: 'rain-and-sleet-mix',
  sleetshowers_polartwilight: 'rain-and-sleet-mix',
  heavysleetshowers_day: 'rain-and-sleet-mix',
  heavysleetshowers_polartwilight: 'rain-and-sleet-mix',
  lightssleetshowers: 'rain-and-sleet-mix',
  heavysleetshowers: 'rain-and-sleet-mix',

  // Sleet (steady)
  lightsleet: 'rain-and-sleet-mix',
  sleet: 'rain-and-sleet-mix',

  // Snow showers
  lightsnowshowers_day: 'snowy-1',
  lightsnowshowers_polartwilight: 'snowy-1',
  snowshowers_day: 'snowy-2',
  snowshowers_polartwilight: 'snowy-2',
  heavysnowshowers_day: 'snowy-3',
  heavysnowshowers_polartwilight: 'snowy-3',
  lightssnowshowers: 'snowy-1',
  heavysnowshowers: 'snowy-3',

  // Snow (steady)
  lightsnow: 'snowy-1',
  snow: 'snowy-2',

  // Thunder (steady)
  rainandthunder: 'tropical-storm',
  heavyrainandthunder: 'tropical-storm',
  sleetandthunder: 'tropical-storm',
  snowandthunder: 'tropical-storm',

  // Rain showers + thunder
  lightrainshowersandthunder_day: 'tropical-storm',
  lightrainshowersandthunder_polartwilight: 'tropical-storm',
  rainshowersandthunder_day: 'tropical-storm',
  rainshowersandthunder_polartwilight: 'tropical-storm',
  heavyrainshowersandthunder_day: 'tropical-storm',
  heavyrainshowersandthunder_polartwilight: 'tropical-storm',

  // Sleet showers + thunder
  lightssleetshowersandthunder_day: 'tropical-storm',
  lightssleetshowersandthunder_polartwilight: 'tropical-storm',
  sleetshowersandthunder_day: 'tropical-storm',
  sleetshowersandthunder_polartwilight: 'tropical-storm',
  heavysleetshowersandthunder_day: 'tropical-storm',
  heavysleetshowersandthunder_polartwilight: 'tropical-storm',

  // Snow showers + thunder
  lightssnowshowersandthunder_day: 'tropical-storm',
  lightssnowshowersandthunder_polartwilight: 'tropical-storm',
  snowshowersandthunder_day: 'tropical-storm',
  snowshowersandthunder_polartwilight: 'tropical-storm',
  heavysnowshowersandthunder_day: 'tropical-storm',
  heavysnowshowersandthunder_polartwilight: 'tropical-storm',
};

export const cwcMetnoNightIcons: { [key: string]: string; } = {
  ...cwcMetnoDayIcons,

  clearsky_night: 'night',
  fair_night: 'cloudy-night-1',
  partlycloudy_night: 'cloudy-night-2',

  lightrainshowers_night: 'rainy-4',
  rainshowers_night: 'rainy-5',
  heavyrainshowers_night: 'rainy-6',

  lightsleetshowers_night: 'rain-and-sleet-mix',
  sleetshowers_night: 'rain-and-sleet-mix',
  heavysleetshowers_night: 'rain-and-sleet-mix',

  lightsnowshowers_night: 'snowy-4',
  snowshowers_night: 'snowy-5',
  heavysnowshowers_night: 'snowy-6',

  lightrainshowersandthunder_night: 'tropical-storm',
  rainshowersandthunder_night: 'tropical-storm',
  heavyrainshowersandthunder_night: 'tropical-storm',

  lightssleetshowersandthunder_night: 'tropical-storm',
  sleetshowersandthunder_night: 'tropical-storm',
  heavysleetshowersandthunder_night: 'tropical-storm',

  lightssnowshowersandthunder_night: 'tropical-storm',
  snowshowersandthunder_night: 'tropical-storm',
  heavysnowshowersandthunder_night: 'tropical-storm',
};
