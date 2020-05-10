export const cwcDarkskyDayIcons: { [key: string]: string; } = {
  "clear" :  "day",
  "clear-day": "day",
  "rain": "rainy-2",
  "snow": "nowy-2",
  "sleet": "rain-and-sleet-mix",
  "wind": "cloudy-day-1",
  "fog": "fog",
  "cloudy": "cloudy-original",
  "partly-cloudy-day": "cloudy-day-2",
};

export const cwcDarkskyNightIcons: { [key: string]: string; } = {
  ...cwcDarkskyDayIcons,
  "clear" :  "night",
  "clear-night": "night",
  "wind": "cloudy-night-1",
  "partly-cloudy-day": "cloudy-night-2",
  "partly-cloudy-night": "cloudy-night-2",
};