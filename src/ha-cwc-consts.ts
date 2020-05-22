
export let cwcLocale = {en: 0, it: 1, nl: 2, es: 3, de: 4, fr: 5};

export let cwcLocWindDirections = {
  'N': ['N', 'N', 'N', 'N', 'N', 'N'],
  'NNE': ['NNE', 'NNE', 'NNO', 'NNE', 'NNO', 'NNE'],
  'NE': ['NE', 'NE', 'NO', 'NE', 'NO', 'NE'],
  'ENE': ['ENE', 'ENE', 'ONO', 'ENE', 'ONO', 'ENE'],
  'E': ['E', 'E', 'O', 'E', 'O', 'E'],
  'ESE': ['ESE', 'ESE', 'OZO', 'ESE', 'OSO', 'ESE'],
  'SE': ['SE', 'SE', 'ZO', 'SE', 'SO', 'SE'],
  'SSE': ['SSE', 'SSE', 'ZZO', 'SSE', 'SSO', 'SSE'],
  'S': ['S', 'S', 'Z', 'S', 'S', 'S'],
  'SSW': ['SSW', 'SSO', 'ZZW', 'SSO', 'SSW', 'SSO'],
  'SW': ['SW', 'SO', 'ZW', 'SO', 'SW', 'SO'],
  'WSW': ['WSW', 'OSO', 'WZW', 'OSO', 'WSW', 'OSO'],
  'W': ['W', 'O', 'W', 'O', 'W', 'O'],
  'WNW': ['WNW', 'ONO', 'WNW', 'ONO', 'WNW', 'ONO'],
  'NW': ['NW', 'NO', 'NW', 'NO', 'NW', 'NO'],
  'NNW': ['NNW', 'NNO', 'NNW', 'NNO', 'NNW', 'NNO'],
};

export let cwcTerms = {
  'Feels Like' : ['Feels Like', 'Percepita', 'Voelt Als', 'Parece que', 'Gef&uuml;hlt', 'Ressentie'],
  'new_moon': [ 'New moon', 'Novilunio', 'Nieuwe maan', 'Luna nueva', 'Neumond', 'Nouvelle lune'],
  'new': [ 'New moon', 'Novilunio', 'Nieuwe maan', 'Luna nueva', 'Neumond', 'Nouvelle lune'],
  'waxing_crescent': ['Waxing crescent', 'Luna crescente', 'Wassende sikkel', 'Media luna de cera', 'Zunehmende Sichel', 'Premier croissant'],
  'first_quarter': ['First quarter', 'Primo Quarto', 'Eerste kwartaal', 'Primer trimestre', 'Erstes Viertel', 'Premier quartier'],
  'waxing_gibbous': ['Waxing Gibbous', 'Gibbosa crescente', 'Wassen Gibbous', 'Encerado Gibbous', 'Zunehmender Halbmond', 'Gibbeuse croissante'],
  'full': ['Full', 'Luna piena', 'Volledig', 'Completo', 'Vollmond', 'Pleine lune'],
  'waning_gibbous': ['Waning Gibbous', 'Gibbosa calante', 'Zwemmende Gibbous', 'Waning Gibbous', 'Abnehmender Halbmond', 'Gibbeuse décroissante'],
  'third_quarter': ['Third Quarter', 'Ultimo quarto', 'Derde Kwartier', 'Tercer cuarto', 'Drittes Viertel', 'Dernier quartier'],
  'last_quarter': ['Last Quarter', 'Ultimo quarto', 'Laatste Kwartier', 'Último cuarto', 'Letztes Viertel', 'Dernier quartier'],
  'waning_crescent': ['Waning Crescent', 'Luna calante', 'Zwemmende sikkel', 'Waning Crescent', 'Abnehmende Sichel', 'Lune décroissante'],
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