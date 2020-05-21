
export let cwcLocale = {en: 0, it: 1, nl: 2, es: 3, de: 4};

export let cwcLocWindDirections = {
  'N': ['N', 'N', 'N', 'N', 'N'],
  'NNE': ['NNE', 'NNE', 'NNO', 'NNE', 'NNO'],
  'NE': ['NE', 'NE', 'NO', 'NE', 'NO'],
  'ENE': ['ENE', 'ENE', 'ONO', 'ENE', 'ONO'],
  'E': ['E', 'E', 'O', 'E', 'O'],
  'ESE': ['ESE', 'ESE', 'OZO', 'ESE', 'OSO'],
  'SE': ['SE', 'SE', 'ZO', 'SE', 'SO'],
  'SSE': ['SSE', 'SSE', 'ZZO', 'SSE', 'SSO'],
  'S': ['S', 'S', 'Z', 'S', 'S'],
  'SSW': ['SSW', 'SSO', 'ZZW', 'SSO', 'SSW'],
  'SW': ['SW', 'SO', 'ZW', 'SO', 'SW'],
  'WSW': ['WSW', 'OSO', 'WZW', 'OSO', 'WSW'],
  'W': ['W', 'O', 'W', 'O', 'W'],
  'WNW': ['WNW', 'ONO', 'WNW', 'ONO', 'WNW'],
  'NW': ['NW', 'NO', 'NW', 'NO', 'NW'],
  'NNW': ['NNW', 'NNO', 'NNW', 'NNO', 'NNW'],
};

export let cwcTerms = {
  'Feels Like' : ['Feels Like', 'Percepita', 'Voelt Als', 'Parece que', 'Gef&uuml;hlt'],
  'new_moon': [ 'New moon', 'Novilunio', 'Nieuwe maan', 'Luna nueva', 'Neumond'],
  'new': [ 'New moon', 'Novilunio', 'Nieuwe maan', 'Luna nueva', 'Neumond'],
  'waxing_crescent': ['Waxing crescent', 'Luna crescente', 'Wassende sikkel', 'Media luna de cera', 'Zunehmende Sichel'],
  'first_quarter': ['First quarter', 'Primo Quarto', 'Eerste kwartaal', 'Primer trimestre', 'Erstes Viertel'],
  'waxing_gibbous': ['Waxing Gibbous', 'Gibbosa crescente', 'Wassen Gibbous', 'Encerado Gibbous', 'Zunehmender Halbmond'],
  'full': ['Full', 'Luna piena', 'Volledig', 'Completo', 'Vollmond'],
  'waning_gibbous': ['Waning Gibbous', 'Gibbosa calante', 'Zwemmende Gibbous', 'Waning Gibbous', 'Abnehmender Halbmond'],
  'third_quarter': ['Third Quarter', 'Ultimo quarto', 'Derde Kwartier', 'Tercer cuarto', 'Drittes Viertel'],
  'last_quarter': ['Last Quarter', 'Ultimo quarto', 'Laatste Kwartier', 'Último cuarto', 'Letztes Viertel'],
  'waning_crescent': ['Waning Crescent', 'Luna calante', 'Zwemmende sikkel', 'Waning Crescent', 'Abnehmende Sichel'],
} ;

// 🌑 🌒 🌓 🌔 🌕 🌖 🌗 🌘 🌑
export let cwcMoonPhaseIcons = {
  new_moon : "🌑",
  new : "🌑",
  waxing_crescent: "🌒",
  first_quarter: "🌓",
  waxing_gibbous: "🌔",
  full: "🌕",
  waning_gibbous: "🌖",
  third_quarter: "🌗",
  last_quarter: "🌗",
  waning_crescent: "🌘"
} ;
