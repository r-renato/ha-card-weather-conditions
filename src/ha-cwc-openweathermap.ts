
export const cwcOpenWeatherMapDayIcons: { [key: string]: string; } = {
  "clear sky": "day",
  "few clouds": "cloudy-day-1",
  "scattered clouds": "cloudy-day-2",
  "broken clouds": "cloudy-day-3",
  "shower rain": "rainy-3",
  "rain": "rainy-2",
  "thunderstorm": "tropical-storm",
  "snow": "snowy-2",
  "mist": "fog",
};

export const cwcOpenWeatherMapNightIcons: { [key: string]: string; } = {
  ...cwcOpenWeatherMapDayIcons,
  "clear sky": "day-night",
  "few clouds": "cloudy-night-1",
  "scattered clouds": "cloudy-night-2",
  "broken clouds": "cloudy-night-3",
};