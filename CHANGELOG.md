# HA (Lovelace) Card Weather Conditions

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [3.0.1] 2026-06-19
### Fixed
- Minor bug fixing

## [3.0.0] 2026-06-19
### Breaking
- Sun bar (sunrise/sunset) now defaults to `hh:mm` instead of `hh:mm:ss`; use `weather.sun_time_format: hh_mm_ss` to restore seconds

### Added
- `weather.sun_time_format` option to choose sunrise/sunset time format (`hh_mm` or `hh_mm_ss`, default `hh_mm`)
- `module_order` config option to choose which card modules are shown and in what order
- Full English-key translation system for previously hardcoded Italian UI strings (section titles, present-conditions labels, air quality levels, alert day labels, marine forecast tooltips and legend); translated across all 13 supported languages

### Changed
- Complete UI restyling
- Renamed marine forecast label "Mare vento" / "Wind wave" wording for clarity
- Marine daily forecast Y axis now scales dynamically down to 0.5 m instead of a fixed 1.0 m minimum, improving readability when wave heights are small
- Marine daily forecast legend split into two rows: sea state (Calm/Rough/Stormy) on the first row, chart series (Max wave/Swell/Wind wave) on the second
- Removed compass direction icon from marine forecast cards, keeping only the text label
- Hidden the decorative section-line and top border for the first visible module in the card

### Fixed
- `formatterLocale` resolution now derives the numeric formatting locale from the resolved language locale when it already matches the requested `number_format`

## [2.1.0] 2026-05-15
### Fixed
- Minor bug fixing
- Weather icon animations not rendering correctly on weather card

### Added
- Lightning strike visualization with animated SVG zigzag bolts on weather card
- Lightning strike data parsing and display (strike count, distance, azimuth)
- Precipitation accumulation data reading and display on weather card
- Locale detection for automatic date/unit formatting (`is` locale support)

### Changed
- README: documented required sensor attributes for lightning and precipitation accumulation data

## [2.0.1] 2025-06-08
### Added
- ru locale

### Changed
- nl locale

## [2.0.0] 2025-06-08
### Changed
- Readme and PNG image
- Fully reengineered the card
- Czech locale

### Changed
- Update Spanish locale

## [1.9.12] 2021-01-29
### Fixed
- Minor bug fixing

## [1.9.11] 2021-01-29
### Fixed
- Minor bug fixing

## [1.9.10] 2021-01-24
### Changed
Update ClimaCel icons map

## [1.9.9] 2021-01-11
### Added
- Norwegian locale

## [1.9.8] 2021-01-07
### Added
- Danish locale

## [1.9.7] 2020-12-06
### Fixed
- Fixed the snow icon name for the night time (climacell, darksky, openweathermap)

## [1.9.6] 2020-08-17
### Fixed
- German locale, fix for "Feels Like" word

## [1.9.6] 2020-08-08
### Added
- Icon model for: buienradar, defaulthass

## [1.9.5] 2020-08-08
### Fixed
- Documentation

## [1.9.5] 2020-07-21
### Added
- Errors catch and display while loading translations files

## [1.9.4] 2020-07-19
### Fixed
- Minor bug fixing

## [1.9.3] 2020-07-18
### Changed
- Exposition time change from hours to minutes

## [1.9.2] 2020-07-10
### Fixed
- Minor bug fixing

## [1.9.1] 2020-06-22
### Added
- Added icon override mode for the pollen layer

## [1.9.0] 2020-06-21
### Fixed
- Minor bug fixing

### Added
- Add `sea` Weather Forecast session

## [1.8.1] 2020-06-15
### Fixed
- Minor bug fixing

## [1.8.0] 2020-06-15
### Fixed
- Minor bug fixing

### Changed
- Internationalization model 

### Added
- Add `pt` language
- Add Alert Layer

### Changed
## [1.7.1] 2020-05-24
### Fixed
- Minor bug fixing

## [1.7.0] 2020-05-23
### Fixed
- Minor bug fixing

### Added
- Add `sr-latn` language

## [1.6.0] 2020-05-22
### Added
- Add `fr` language

## [1.5.1] 2020-05-21
### Fixed
- Minor bug fixing

## [1.5.0] 2020-05-14
### Fixed
- Minor bug fixing
### Added
- Add `uv` (ultraviolet) session

## [1.4.0] 2020-05-13
### Added
- Add `es` language

## [1.3.1] 2020-05-13
### Fixed
- Minor bug fixing

## [1.3.0] 2020-05-10
### Added
- Add moon phase

## [1.2.0] 2020-05-08
### Added
- Add NL (Dutch) language

## [1.1.0] 2020-05-07
### Added
- Add feels_like sensor

## [1.0.1] 2020-05-07
### Fixed
- Minor bug fixing

## [1.0.0] 2020-05-03
- Initial stable version