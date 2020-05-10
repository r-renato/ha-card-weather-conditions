
export let cwcLocale = {en: 0, it: 1, nl: 2};

export let cwcLocWindDirections = {
  'N': ['N', 'N', 'N'],
  'NNE': ['NNE', 'NNE', 'NNO'],
  'NE': ['NE', 'NE', 'NO'],
  'ENE': ['ENE', 'ENE', 'ONO'],
  'E': ['E', 'E', 'O'],
  'ESE': ['ESE', 'ESE', 'OZO'],
  'SE': ['SE', 'SE', 'ZO'],
  'SSE': ['SSE', 'SSE', 'ZZO'],
  'S': ['S', 'S', 'Z'],
  'SSW': ['SSW', 'SSO', 'ZZW'],
  'SW': ['SW', 'SO', 'ZW'],
  'WSW': ['WSW', 'OSO', 'WZW'],
  'W': ['W', 'O', 'W'],
  'WNW': ['WNW', 'ONO', 'WNW'],
  'NW': ['NW', 'NO', 'NW'],
  'NNW': ['NNW', 'NNO', 'NNW'],
};

export let cwcTerms = {
  'Feels Like' : ['Feels Like', 'Percepita', 'Voelt Als'],
  'new_moon': [ 'New moon', 'Novilunio', ''],
  'waxing_crescent': ['Waxing crescent', 'Luna crescente', ''],
  'first_quarter': ['First quarter', 'Primo Quarto', ''],
  'waxing_gibbous': ['Waxing Gibbous', 'Gibbosa crescente', ''],
  'full': ['Full', 'Luna piena', ''],
  'waning_gibbous': ['Waning Gibbous', 'Gibbosa calante', ''],
  'third_quarter': ['Third Quarter', 'Ultimo quarto', ''],
  'waning_crescent': ['Waning Crescent', 'Luna calante', ''],
} ;

// 🌑 🌒 🌓 🌔 🌕 🌖 🌗 🌘 🌑
export let cwcMoonPhaseIcons = {
  new_moon : "🌑",
  waxing_crescent: "🌒",
  first_quarter: "🌓",
  waxing_gibbous: "🌔",
  full: "🌕",
  waning_gibbous: "🌖",
  third_quarter: "🌗",
  waning_crescent: "🌘"
} ;