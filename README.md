# Weather Conditions Card
### ... is a Lovelace card for Home Assistant.<br>

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/custom-components/hacs)

[![License][license-shield]](LICENSE.md)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/r-renato/ha-card-weather-conditions.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/r-renato/ha-card-weather-conditions/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/r-renato/ha-card-weather-conditions.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/r-renato/ha-card-weather-conditions/context:javascript)

[![BuyMeCoffee][buymecoffeebadge]][buymecoffee]

## Features

* Display summary weather information
* Display current detailed weather data
* Display Air Quality data
* Display Pollen data
* Display camera meteogram
* Display preferred camera

## Card Configuration

Import the card using:

```yaml
resources:
  - url: /hacsfiles/ha-card-weather-conditions/ha-card-weather-conditions.js
    type: module
```

## **Card variables**

| **Name**     | **Type**      | **Requirement** | **Default**                       | **Description**                                                                               |
|--------------|---------------|-----------------|-----------------------------------|-----------------------------------------------------------------------------------------------|
| type         | string        | **Required**    |                                   | Card type must be `custom:ha-card-weather-conditions`                                         |                                                              |
| name         | string        | Optional        |                                   | Card name shown on summary layer                                                              |
| language     | string        | Optional        | `en`                              | Can take the values: `en`/`it`                                                           |
| animation    | boolean       | Optional        | `false`                           | Can take the values: `true`/`false`                                                      |
| camera       | string        | Optional        |                                   | It is the camera id                                                        |
| pollen       | object        | Optional        |                                   | It's the pollen object, see the specific session.                                                        |
| air_quality  | object        | Optional        |                                   | It's the Air Quality object, see the specific session.                                                       |
| weather      | object        | Optional        |                                   | It's the Weather object, see the specific session.                                                    |

### **Pollen object**    
| **Name** |  **Type**   | **Requirement** | **Description**         |
|----------|-------------|-----------------|-------------------------|
| tree     | object list | Optional        | Pollen tree             |
| weed     | object list | Optional        | Pollen weed             |
| grass    | object list | Optional        | Pollen grass            |

#### *Pollen object list*
This objects list is applicable to all of them `tree` and `weed` and `grass`.

| **Name** |  **Type**   | **Requirement** | **Description**                            |
|----------|-------------|-----------------|--------------------------------------------|
| entity   | string      | **Required**    | It is the sensor id                        |
| min      | number      | **Required**    | Min sensor value                           |
| max      | number      | **Required**    | Max sensor value                           |
| low      | number      | Optional        | Low Pollen value (min < low < high < max)  |
| high     | number      | Optional        | High Pollen value (min < low < high < max) |

### **Air Quality object**    
|       **Name**        |  **Type**   | **Requirement** | **Description**         |
|-----------------------|-------------|-----------------|-------------------------|
| pm25                  | string      | Optional        | It is the sensor id     |
| pm10                  | string      | Optional        | It is the sensor id     |
| o3                    | string      | Optional        | It is the sensor id     |
| no2                   | string      | Optional        | It is the sensor id     |
| co                    | string      | Optional        | It is the sensor id     |
| so2                   | string      | Optional        | It is the sensor id     |
| epa_aqi               | string      | Optional        | It is the sensor id     |
| epa_health_concern    | string      | Optional        | It is the sensor id     |

### **Weather object**    
|       **Name**        |  **Type**   | **Requirement** | **Default** | **Description**                                                                                          |
|-----------------------|-------------|-----------------|-------------|----------------------------------------------------------------------------------------------------------|
| icons_model           | string      | Optional        | `climacell` | This is the icon model you want to use. It can take the values: `climacell`, `darksky`, `openweathermap` |
| current               | object list | Optional        |             | It is for the current weather data                                                                       |
| forecast              | object list | Optional        |             | It is for the forecast weather data                                                                      |

#### *Weather **current** object list*
|       **Name**        |  **Type**   | **Requirement** | **Default** | **Description**     |
|-----------------------|-------------|-----------------|-------------|---------------------|
| sun                   | string      | Optional        |             | It is the sensor id |
| current_conditions    | string      | Optional        |             | It is the sensor id |
| humidity              | string      | Optional        |             | It is the sensor id |
| pressure              | string      | Optional        |             | It is the sensor id |
| temperature           | string      | Optional        |             | It is the sensor id |
| visibility            | string      | Optional        |             | It is the sensor id |
| wind_bearing          | string      | Optional        |             | It is the sensor id |
| wind_speed            | string      | Optional        |             | It is the sensor id |
| precipitation         | string      | Optional        |             | It is the sensor id |
| forecast              | boolean     | Optional        | `false`     | It can take the values: `true` or `true`. If `true` then the summary layer will also show the daily forecast for temperature and precipitation (day_1). |

#### *Weather **forecast** object list*
|       **Name**            |  **Type**   | **Requirement** | **Description**     |
|---------------------------|-------------|-----------------|---------------------|
| meteogram                 | string      | Optional        | It is the camera id |
| icons                     | object list | Optional        | It is the sensor id |
| temperature_high          | object list | Optional        | It is the sensor id |
| temperature_low           | object list | Optional        | It is the sensor id |
| precipitation_probability | object list | Optional        | It is the sensor id |
| precipitation_intensity   | object list | Optional        | It is the sensor id |

##### *Weather **forecast:** object list*
| **Name** |  **Type**   | **Requirement** | **Description**                                                         |
|----------|-------------|-----------------|-------------------------------------------------------------------------|
| day_1    | string      | Optional        | It is the sensor id. The day_1 sensor is for the current day forecast.  |
| day_2    | string      | Optional        | It is the sensor id                                                     |
| day_3    | string      | Optional        | It is the sensor id                                                     |
| day_4    | string      | Optional        | It is the sensor id                                                     |
| day_5    | string      | Optional        | It is the sensor id                                                     |


## **Examples**
### - **Climacell data provider** -
```yaml
  type: custom:ha-card-weather-conditions
  name: "cc_test"
  language: it
  animation: true
  display:
    - top
    - current
    - forecast
  camera: camera.cc_test_c1
  pollen:
    tree:
      entity: sensor.cc_test_pollen_tree
      min: 0
      max: 5
      low: 1
      high: 3
    weed:
      entity: sensor.cc_test_pollen_weed
      min: 0
      max: 5
      low: 1
      high: 3
    grass:
      entity: sensor.cc_test_pollen_grass
      min: 0
      max: 5
      low: 1
      high: 3
  air_quality:
    pm25: sensor.cc_test_pm25
    pm10: sensor.cc_test_pm10
    o3: sensor.cc_test_o3
    no2: sensor.cc_test_no2
    co: sensor.cc_test_co
    so2: sensor.cc_test_so2
    epa_aqi: sensor.cc_test_epa_aqi
    epa_health_concern: sensor.cc_test_epa_health_concern
  weather:
    icons_model: climacell
    current:
      sun: sun.sun
      current_conditions: sensor.cc_test_weather_condition
      humidity: sensor.cc_test_humidity_percentage
      pressure: sensor.cc_test_barometric_pressure
      temperature: sensor.cc_test_temperature
      visibility: sensor.cc_test_visibility
      wind_bearing: sensor.cc_test_wind_direction
      wind_speed: sensor.cc_test_wind_speed
      precipitation: sensor.cc_test_precipitation
      forecast: true
    forecast:
      meteogram: camera.cc_test_c2
      icons:
        day_1: sensor.cc_test_weather_condition_0d
        day_2: sensor.cc_test_weather_condition_1d
        day_3: sensor.cc_test_weather_condition_2d
        day_4: sensor.cc_test_weather_condition_3d
        day_5: sensor.cc_test_weather_condition_4d
      temperature_high:
        day_1: sensor.cc_test_max_temperature_0d
        day_2: sensor.cc_test_max_temperature_1d
        day_3: sensor.cc_test_max_temperature_2d
        day_4: sensor.cc_test_max_temperature_3d
        day_5: sensor.cc_test_max_temperature_4d
      temperature_low:
        day_1: sensor.cc_test_min_temperature_0d
        day_2: sensor.cc_test_min_temperature_1d
        day_3: sensor.cc_test_min_temperature_2d
        day_4: sensor.cc_test_min_temperature_3d
        day_5: sensor.cc_test_min_temperature_4d
      precipitation_probability:
        day_1: sensor.cc_test_precipitation_probability_0d
        day_2: sensor.cc_test_precipitation_probability_1d
        day_3: sensor.cc_test_precipitation_probability_2d
        day_4: sensor.cc_test_precipitation_probability_3d
        day_5: sensor.cc_test_precipitation_probability_4d
      precipitation_intensity:
        day_1: sensor.cc_test_max_precipitation_0d
        day_2: sensor.cc_test_max_precipitation_1d
        day_3: sensor.cc_test_max_precipitation_2d
        day_4: sensor.cc_test_max_precipitation_3d
        day_5: sensor.cc_test_max_precipitation_4d
```

<img src="https://raw.githubusercontent.com/r-renato/ha-card-weather-conditions/master/md.images/ha-card-weather-condition-full.png"  width="40%" height="40%" alt="Home Assistant lovelace card">

[license-shield]:https://img.shields.io/github/license/r-renato/ha-card-weather-conditions
[buymecoffee]: https://www.buymeacoffee.com/0D3WbkKrn
[buymecoffeebadge]: https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow?style=for-the-badge
