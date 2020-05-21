
export let cwcLocale = {en: 0, it: 1, nl: 2, es: 3};

export let cwcLocWindDirections = {
  'N': ['N', 'N', 'N', 'N'],
  'NNE': ['NNE', 'NNE', 'NNO', 'NNE'],
  'NE': ['NE', 'NE', 'NO', 'NE'],
  'ENE': ['ENE', 'ENE', 'ONO', 'ENE'],
  'E': ['E', 'E', 'O', 'E'],
  'ESE': ['ESE', 'ESE', 'OZO', 'ESE'],
  'SE': ['SE', 'SE', 'ZO', 'SE'],
  'SSE': ['SSE', 'SSE', 'ZZO', 'SSE'],
  'S': ['S', 'S', 'Z', 'S'],
  'SSW': ['SSW', 'SSO', 'ZZW', 'SSO'],
  'SW': ['SW', 'SO', 'ZW', 'SO'],
  'WSW': ['WSW', 'OSO', 'WZW', 'OSO'],
  'W': ['W', 'O', 'W', 'O'],
  'WNW': ['WNW', 'ONO', 'WNW', 'ONO'],
  'NW': ['NW', 'NO', 'NW', 'NO'],
  'NNW': ['NNW', 'NNO', 'NNW', 'NNO'],
};

export let cwcTerms = {
  'Feels Like' : ['Feels Like', 'Percepita', 'Voelt Als', 'Parece que'],
  'new_moon': [ 'New moon', 'Novilunio', 'Nieuwe maan', 'Luna nueva'],
  'new': [ 'New moon', 'Novilunio', 'Nieuwe maan', 'Luna nueva'],
  'waxing_crescent': ['Waxing crescent', 'Luna crescente', 'Wassende sikkel', 'Media luna de cera'],
  'first_quarter': ['First quarter', 'Primo Quarto', 'Eerste kwartaal', 'Primer trimestre'],
  'waxing_gibbous': ['Waxing Gibbous', 'Gibbosa crescente', 'Wassen Gibbous', 'Encerado Gibbous'],
  'full': ['Full', 'Luna piena', 'Volledig', 'Completo'],
  'waning_gibbous': ['Waning Gibbous', 'Gibbosa calante', 'Zwemmende Gibbous', 'Waning Gibbous'],
  'third_quarter': ['Third Quarter', 'Ultimo quarto', 'Derde Kwartier', 'Tercer cuarto'],
  'last_quarter': ['Last Quarter', 'Ultimo quarto', 'Laatste Kwartier', 'Último cuarto'],
  'waning_crescent': ['Waning Crescent', 'Luna calante', 'Zwemmende sikkel', 'Waning Crescent'],
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