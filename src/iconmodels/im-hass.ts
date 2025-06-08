export const cwcDefaultHassDayIcons: { [key: string]: string } = {
  cloudy: 'cloudy-day-3',
  exceptional: 'severe-thunderstorm',
  fog: 'fog',
  hail: 'snow-and-sleet-mix',
  lightning: 'severe-thunderstorm',
  'lightning-rainy': 'scattered-thunderstorms',
  partlycloudy: 'cloudy-day-3',
  pouring: 'rainy-6',
  rainy: 'rainy-5',
  snowy: 'snowy-6',
  'snowy-rainy': 'snow-and-sleet-mix',
  sunny: 'clear-day',
  windy: 'wind',
  'windy-variant': 'wind',
};

export const cwcDefaultHassNightIcons: { [key: string]: string } = {
  ...cwcDefaultHassDayIcons,
  'clear-night': 'clear-night',
};
