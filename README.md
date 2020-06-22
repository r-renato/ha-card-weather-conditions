# Weather Conditions Card
### ... is a Lovelace card for Home Assistant.<br>

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/custom-components/hacs)

[![License][license-shield]](LICENSE.md)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/r-renato/ha-card-weather-conditions.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/r-renato/ha-card-weather-conditions/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/r-renato/ha-card-weather-conditions.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/r-renato/ha-card-weather-conditions/context:javascript)

[![BuyMeCoffee][buymecoffeebadge]][buymecoffee]

## Features

* Display summary weather information
* Display detailed current weather data
* Display detailed forecast weather data
* Display detailed forecast sea weather data
* Display Ultraviolet Radiation
* Display Air Quality data
* Display Pollen data
* Display Alert
* Display camera meteogram
* Display preferred camera

<p float="left">
<img src="https://github.com/r-renato/ha-card-weather-conditions/raw/master/md.images/ha-card-weather-condition-full.png" width="40%" height="auto" alt="Home Assistant lovelace card">
<img src="https://github.com/r-renato/ha-card-weather-conditions/raw/master/md.images/ha-card-weather-condition-1.png" width="40%" height="auto" alt="Home Assistant lovelace card">
</p>
<p float="left">
<img src="https://github.com/r-renato/ha-card-weather-conditions/raw/master/md.images/ha-card-weather-condition-2.png" width="40%" height="auto" alt="Home Assistant lovelace card">
</p>    

## **&#8212; Card Configuration &#8212;**

To use the ```ha-card-weather-conditionse``` card add the following to your ```lovelace``` configuration:

```yaml
resources:
  # if you have installed the card through the HACS integration
  - url: /hacsfiles/ha-card-weather-conditions/ha-card-weather-conditions.js
    type: module
  #
  # Optional:
  # adding the card-mod plugin enable an advanced card look configuration
  - url: /hacsfiles/lovelace-card-mod/card-mod.js
    type: module
  # ...
```

## **&#8212; Card Parameters Summary &#8212;**

| **Name**     | **Type**      | **Requirement** | **Default**                       | **Description**                                                                               |
|--------------|---------------|-----------------|-----------------------------------|-----------------------------------------------------------------------------------------------|
| type         | string        | **Required**    |                                   | Card type must be `custom:ha-card-weather-conditions`                                         |                                                              |
| name         | string        | Optional        |                                   | Card name shown on summary layer                                                              |
| language     | string        | Optional        | `en`                              | Can take the values: `en`/`it`/`nl`/`es`/`de`/`fr`/`sr-latn`/`pt`                                              |
| animation    | boolean       | Optional        | `false`                           | Can take the values: `true`/`false`                                                           |
| camera       | string        | Optional        |                                   | It is the camera id                                                                           |
| uv           | object        | Optional        |                                   | It's the ultraviolet object, see the specific session.                                        |
| pollen       | object        | Optional        |                                   | It's the pollen object, see the specific session.                                             |
| air_quality  | object        | Optional        |                                   | It's the Air Quality object, see the specific session.                                        |
| alert        | object        | Optional        |                                   | It's the Alert object, see the specific session.                                        |
| weather      | object        | Optional        |                                   | It's the Weather object, see the specific session.                                            |

## **&#8212; Weather Card Parameters &#8212;**

The following parameters and card configurations are used to display the current and forecast weather data.
The card has been tested with the sensors provided by `climacell`, `darksky` and `openweathermap` integrations. 

#### **Parameters for the object: *weather*** 
|       **Name**        |  **Type**   | **Requirement** | **Default** | **Description**                                                                                          |
|-----------------------|-------------|-----------------|-------------|----------------------------------------------------------------------------------------------------------|
| icons_model           | string      | Optional        | `climacell` | Icons template you want to use. Valid values are: `climacell`, `darksky`, `openweathermap` |
| current               | object list | Optional        |             | It is for the current weather data                                                                       |
| forecast              | object list | Optional        |             | It is for the forecast weather data                                                                      |

### **&#187; Current Weather Data**

#### **Parameters for the object list: *current*** 

|       **Name**        |  **Type**   | **Requirement** | **Default** | **Description**     |
|-----------------------|-------------|-----------------|-------------|---------------------|
| sun                   | string      | Optional        |             | It is the sensor id |
| moon_phase            | string      | Optional        |             | It is the sensor id |
| current_conditions    | string      | Optional        |             | It is the sensor id |
| humidity              | string      | Optional        |             | It is the sensor id |
| pressure              | string      | Optional        |             | It is the sensor id |
| temperature           | string      | Optional        |             | It is the sensor id |
| feels_like            | string      | Optional        |             | It is the sensor id |
| visibility            | string      | Optional        |             | It is the sensor id |
| wind_bearing          | string      | Optional        |             | It is the sensor id |
| wind_speed            | string      | Optional        |             | It is the sensor id |
| precipitation         | string      | Optional        |             | It is the sensor id |
| forecast              | boolean     | Optional        | `false`     | It can take the values: `true` or `true`. If `true` then the summary layer will also show the daily forecast for temperature and precipitation (day_1). |

#### **Display the *Summary Layer*** 

<img src="https://github.com/r-renato/ha-card-weather-conditions/raw/master/md.images/ha-card-weather-condition-summary.png" width="40%" height="auto" alt="Home Assistant lovelace card">

##### *Summary Layer*, example of card setup
```yaml
  type: custom:ha-card-weather-conditions
  name: "cc_test"
  language: it
  animation: true
  weather:
    icons_model: climacell
    current:
      sun: sun.sun
      moon_phase: sensor.cc_test_moon_phase
      current_conditions: sensor.cc_test_weather_condition
      temperature: sensor.cc_test_temperature
      feels_like: sensor.cc_test_feels_like
```

#### **Display the *Current Layer*** 

<p float="left">
<img src="https://github.com/r-renato/ha-card-weather-conditions/raw/master/md.images/ha-card-weather-condition-current.png" width="40%" height="auto" alt="Home Assistant lovelace card">
<img src="https://github.com/r-renato/ha-card-weather-conditions/raw/master/md.images/ha-card-weather-condition-current-ext.png" width="40%" height="auto" alt="Home Assistant lovelace card">
</p>

##### *Current Layer*, example of card setup
```yaml
  type: custom:ha-card-weather-conditions
  name: "cc_test"
  weather:
    icons_model: climacell
    current:
      sun: sun.sun
      humidity: sensor.cc_test_humidity_percentage
      pressure: sensor.cc_test_barometric_pressure
      visibility: sensor.cc_test_visibility
      wind_bearing: sensor.cc_test_wind_direction
      wind_speed: sensor.cc_test_wind_speed
      precipitation: sensor.cc_test_precipitation
  #
  # Optional:
  # add to display current day forecast weather
      forecast: true
    forecast:
      temperature_high:
        day_1: sensor.cc_test_max_temperature_0d
      temperature_low:
        day_1: sensor.cc_test_min_temperature_0d
      precipitation_probability:
        day_1: sensor.cc_test_precipitation_probability_0d
      precipitation_intensity:
        day_1: sensor.cc_test_max_precipitation_0d
```

#### **Display the *Summary & Current Layer*** 

<img src="https://github.com/r-renato/ha-card-weather-conditions/raw/master/md.images/ha-card-weather-condition-summary+current.png" width="40%" height="auto" alt="Home Assistant lovelace card">

##### *Summary & Current Layer*, example of card setup

```yaml
  type: custom:ha-card-weather-conditions
  name: "cc_test"
  weather:
    icons_model: climacell
    current:
      sun: sun.sun
      moon_phase: sensor.cc_test_moon_phase
      current_conditions: sensor.cc_test_weather_condition
      temperature: sensor.cc_test_temperature
      feels_like: sensor.cc_test_feels_like
      humidity: sensor.cc_test_humidity_percentage
      pressure: sensor.cc_test_barometric_pressure
      visibility: sensor.cc_test_visibility
      wind_bearing: sensor.cc_test_wind_direction
      wind_speed: sensor.cc_test_wind_speed
      precipitation: sensor.cc_test_precipitation
  #
  # Optional:
  # add to display current day forecast weather
      forecast: true
    forecast:
      temperature_high:
        day_1: sensor.cc_test_max_temperature_0d
      temperature_low:
        day_1: sensor.cc_test_min_temperature_0d
      precipitation_probability:
        day_1: sensor.cc_test_precipitation_probability_0d
      precipitation_intensity:
        day_1: sensor.cc_test_max_precipitation_0d
```
### **&#187; Forecast Weather Data**

#### **Parameters for the object list: *forecast*** 
|       **Name**            |  **Type**   | **Requirement** | **Description**     |
|---------------------------|-------------|-----------------|---------------------|
| meteogram                 | string      | Optional        | It is the camera id |
| icons                     | object list | Optional        | It is the sensor id |
| temperature_high          | object list | Optional        | It is the sensor id |
| temperature_low           | object list | Optional        | It is the sensor id |
| precipitation_probability | object list | Optional        | It is the sensor id |
| precipitation_intensity   | object list | Optional        | It is the sensor id |

#### **Parameters for the object list: *icons, temperature_high, temperature_low, precipitation_probability, precipitation_intensity*** 

| **Name** |  **Type**   | **Requirement** | **Description**                                                         |
|----------|-------------|-----------------|-------------------------------------------------------------------------|
| day_1    | string      | Optional        | It is the sensor id. The day_1 sensor is for the current day forecast.  |
| day_2    | string      | Optional        | It is the sensor id                                                     |
| day_3    | string      | Optional        | It is the sensor id                                                     |
| day_4    | string      | Optional        | It is the sensor id                                                     |
| day_5    | string      | Optional        | It is the sensor id                                                     |

#### **Display the *Forecast Layer*** 

<img src="https://github.com/r-renato/ha-card-weather-conditions/raw/master/md.images/ha-card-weather-condition-forecast.png" width="40%" height="auto" alt="Home Assistant lovelace card">

##### *Forecast Layer*, example of card setup

```yaml
  type: custom:ha-card-weather-conditions
  name: "cc_test"
  language: it
  animation: true
  weather:
    icons_model: climacell
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

##### *Forecast Layer*, advanced examples of card setup

To capitalize the name of the days of the week use `style` directive:
```yaml
  type: custom:ha-card-weather-conditions
  style: |
    .dayname {
      text-transform: capitalize;
  }
```
### **&#187; Sea Forecast Weather Data**

#### **Parameters for the object list: *sea*** 
|       **Name**    |  **Type**   | **Requirement** | **Description**     |
|-------------------|-------------|-----------------|---------------------|
| swell_direction   | object list | Optional        | It is the camera id |
| swell_height      | object list | Optional        | It is the sensor id |
| swell_period      | object list | Optional        | It is the sensor id |
| wind_direction    | object list | Optional        | It is the sensor id |
| wind_speed        | object list | Optional        | It is the sensor id |
| air_temperature   | object list | Optional        | It is the sensor id |
| water_temperature | object list | Optional        | It is the sensor id |

#### **Parameters for the object list: *swell_direction, swell_height, swell_period, wind_direction, wind_speed, air_temperature, water_temperature*** 

| **Name** |  **Type**   | **Requirement** | **Description**                                                         |
|----------|-------------|-----------------|-------------------------------------------------------------------------|
| hour_1   | string      | Optional        | It is the sensor id                                                     |
| hour_2   | string      | Optional        | It is the sensor id                                                     |
| hour_3   | string      | Optional        | It is the sensor id                                                     |
| hour_4   | string      | Optional        | It is the sensor id                                                     |
| hour_5   | string      | Optional        | It is the sensor id                                                     |
| hour_6   | string      | Optional        | It is the sensor id                                                     |
| hour_7   | string      | Optional        | It is the sensor id                                                     |

#### **Display the *Sea Forecast Layer*** 

<img src="https://github.com/r-renato/ha-card-weather-conditions/raw/master/md.images/ha-card-weather-condition-sea.png" width="40%" height="auto" alt="Home Assistant lovelace card">

##### *Sea Forecast Layer*, example of card setup

```yaml
  type: custom:ha-card-weather-conditions
  name: "cc_test"
  language: it
  sea:
    swell_direction:
      hour_1: sensor.sg_piscinas_swell_direction_1h
      hour_2: sensor.sg_piscinas_swell_direction_2h
      hour_3: sensor.sg_piscinas_swell_direction_3h
      hour_4: sensor.sg_piscinas_swell_direction_4h
      hour_5: sensor.sg_piscinas_swell_direction_5h
      hour_6: sensor.sg_piscinas_swell_direction_6h
      hour_7: sensor.sg_piscinas_swell_direction_7h
    swell_height:
      hour_1: sensor.sg_piscinas_swell_height_1h
      hour_2: sensor.sg_piscinas_swell_height_2h
      hour_3: sensor.sg_piscinas_swell_height_3h
      hour_4: sensor.sg_piscinas_swell_height_4h
      hour_5: sensor.sg_piscinas_swell_height_5h
      hour_6: sensor.sg_piscinas_swell_height_6h
      hour_7: sensor.sg_piscinas_swell_height_7h
    swell_period:
      hour_1: sensor.sg_piscinas_swell_period_1h
      hour_2: sensor.sg_piscinas_swell_period_2h
      hour_3: sensor.sg_piscinas_swell_period_3h
      hour_4: sensor.sg_piscinas_swell_period_4h
      hour_5: sensor.sg_piscinas_swell_period_5h
      hour_6: sensor.sg_piscinas_swell_period_6h
      hour_7: sensor.sg_piscinas_swell_period_7h
    wind_direction:
      hour_1: sensor.sg_piscinas_wind_direction_1h
      hour_2: sensor.sg_piscinas_wind_direction_2h
      hour_3: sensor.sg_piscinas_wind_direction_3h
      hour_4: sensor.sg_piscinas_wind_direction_4h
      hour_5: sensor.sg_piscinas_wind_direction_5h
      hour_6: sensor.sg_piscinas_wind_direction_6h
      hour_7: sensor.sg_piscinas_wind_direction_7h
    wind_speed:
      hour_1: sensor.sg_piscinas_wind_speed_1h
      hour_2: sensor.sg_piscinas_wind_speed_2h
      hour_3: sensor.sg_piscinas_wind_speed_3h
      hour_4: sensor.sg_piscinas_wind_speed_4h
      hour_5: sensor.sg_piscinas_wind_speed_5h
      hour_6: sensor.sg_piscinas_wind_speed_6h
      hour_7: sensor.sg_piscinas_wind_speed_7h
    air_temperature:
      hour_1: sensor.sg_piscinas_air_temperature_1h
      hour_2: sensor.sg_piscinas_air_temperature_2h
      hour_3: sensor.sg_piscinas_air_temperature_3h
      hour_4: sensor.sg_piscinas_air_temperature_4h
      hour_5: sensor.sg_piscinas_air_temperature_5h
      hour_6: sensor.sg_piscinas_air_temperature_6h
      hour_7: sensor.sg_piscinas_air_temperature_7h
    water_temperature:
      hour_1: sensor.sg_piscinas_water_temperature_1h
      hour_2: sensor.sg_piscinas_water_temperature_2h
      hour_3: sensor.sg_piscinas_water_temperature_3h
      hour_4: sensor.sg_piscinas_water_temperature_4h
      hour_5: sensor.sg_piscinas_water_temperature_5h
      hour_6: sensor.sg_piscinas_water_temperature_6h
      hour_7: sensor.sg_piscinas_water_temperature_7h
```

## **&#8212; Ultraviolet Radiation Parameters &#8212;**

The card has been tested with the sensors provided by `openuv` integrations. 

#### **Parameters for the object: *uv*** 
   
| **Name**          | **Type** | **Requirement** | **Description**                                            |
|-------------------|----------|-----------------|------------------------------------------------------------|
| protection_window | string   | Optional        | Binary Sensor                                              |
| ozone_level       | string   | Optional        | Ozone level in du (Dobson Units) from OMI data sensor      |
| uv_index          | string   | Optional        | UV Index sensor                                            |
| uv_level          | string   | Optional        | UV level sensor                                            |
| max_uv_index      | string   | Optional        | max UV Index for the day (at solar noon) sensor            |
| set_skin_type_1   | string   | Optional        | Safe exposure time (mins) till burn for Skin Type 1 sensor |
| set_skin_type_2   | string   | Optional        | Safe exposure time (mins) till burn for Skin Type 2 sensor |
| set_skin_type_3   | string   | Optional        | Safe exposure time (mins) till burn for Skin Type 3 sensor |
| set_skin_type_4   | string   | Optional        | Safe exposure time (mins) till burn for Skin Type 4 sensor |
| set_skin_type_5   | string   | Optional        | Safe exposure time (mins) till burn for Skin Type 5 sensor |
| set_skin_type_6   | string   | Optional        | Safe exposure time (mins) till burn for Skin Type 6 sensor |

#### **Display the *Ultraviolet Radiation Layer*** 

<img src="https://github.com/r-renato/ha-card-weather-conditions/raw/master/md.images/ha-card-weather-condition-uv.png" width="40%" height="auto" alt="Home Assistant lovelace card">

##### *Ultraviolet Radiation Layer*, example of card setup
```yaml
  type: custom:ha-card-weather-conditions
  uv:
    protection_window: binary_sensor.protection_window
    ozone_level: sensor.current_ozone_level
    uv_index: sensor.current_uv_index
    uv_level: sensor.current_uv_level
    max_uv_index: sensor.max_uv_index
    set_skin_type_1: sensor.skin_type_1_safe_exposure_time
    set_skin_type_2: sensor.skin_type_2_safe_exposure_time
    set_skin_type_3: sensor.skin_type_3_safe_exposure_time
    set_skin_type_4: sensor.skin_type_4_safe_exposure_time
    set_skin_type_5: sensor.skin_type_5_safe_exposure_time
    set_skin_type_6: sensor.skin_type_6_safe_exposure_time
```

## **&#8212; Pollen Parameters &#8212;**

The card has been tested with the sensors provided by `climacell` integrations. 

#### **Parameters for the object: *pollen*** 
 
| **Name** |  **Type**   | **Requirement** | **Description**         |
|----------|-------------|-----------------|-------------------------|
| tree     | object list | Optional        | Pollen tree             |
| weed     | object list | Optional        | Pollen weed             |
| grass    | object list | Optional        | Pollen grass            |

#### **Parameters for the object list: *tree, weed, grass*** 

| **Name** |  **Type**   | **Requirement** | **Description**                            |
|----------|-------------|-----------------|--------------------------------------------|
| entity   | string      | **Required**    | It is the sensor id                        |
| icon     | string      | Optional        | Icon override for the sensor               |
| min      | number      | **Required**    | Min sensor value                           |
| max      | number      | **Required**    | Max sensor value                           |
| low      | number      | Optional        | Low Pollen value (min < low < high < max)  |
| high     | number      | Optional        | High Pollen value (min < low < high < max) |

#### **Display the *Pollen Layer*** 

<img src="https://github.com/r-renato/ha-card-weather-conditions/raw/master/md.images/ha-card-weather-condition-pollen.png" width="40%" height="auto" alt="Home Assistant lovelace card">

##### *Pollen Layer*, example of card setup

```yaml
  type: custom:ha-card-weather-conditions
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
```

## **&#8212; Air Quality Parameters &#8212;**

#### **Parameters for the object: *air_quality*** 

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

#### **Display the *Air Quality Layer*** 

<img src="https://github.com/r-renato/ha-card-weather-conditions/raw/master/md.images/ha-card-weather-condition-air-quality.png" width="40%" height="auto" alt="Home Assistant lovelace card">

##### *Air Quality Layer*, example of card setup

```yaml
  type: custom:ha-card-weather-conditions
  air_quality:
    pm25: sensor.cc_test_pm25
    pm10: sensor.cc_test_pm10
    o3: sensor.cc_test_o3
    no2: sensor.cc_test_no2
    co: sensor.cc_test_co
    so2: sensor.cc_test_so2
    epa_aqi: sensor.cc_test_epa_aqi
    epa_health_concern: sensor.cc_test_epa_health_concern
```

## **&#8212; Alert Parameters &#8212;**

#### **Parameters for the object: *alert*** 

|       **Name**        |  **Type**   | **Requirement** | **Description**         |
|-----------------------|-------------|-----------------|-------------------------|
| fire_risk             | object list | Optional        | Fire object             |
| thunderstorms_risk    | object list | Optional        | thunderstorms           |
| hydraulic_risk        | object list | Optional        | hydraulic id            |
| hydrogeological_risk  | object list | Optional        | hydrogeological         |

#### **Parameters for the object list: *fire_risk*** 

| **Name**   |  **Type**   | **Requirement** | **Description**                                        |
|------------|-------------|-----------------|--------------------------------------------------------|
| entity     | string      | **Required**    | It is the sensor id                                    |
| icon       | number      | Optional        | Name of the icon to be used instead of the sensor icon |
| min        | number      | **Required**    | Min sensor value                                       |
| max        | number      | **Required**    | Max sensor value                                       |
| show_if_ge | number      | Optional        | Show alert if the value is greater or equals to ...    |

#### **Parameters for the object list: *thunderstorms_risk, hydraulic_risk, hydrogeological_risk*** 

| **Name**   |  **Type**   | **Requirement** | **Description**                                        |
|------------|-------------|-----------------|--------------------------------------------------------|
| entity     | string      | **Required**    | It is the binary sensor id                             |
| icon       | number      | Optional        | Name of the icon to be used instead of the sensor icon |
| show_if_on | number      | Optional        | MShow alert if the value is `on`                       |

#### **Display the *Alert Layer*** 

<img src="https://github.com/r-renato/ha-card-weather-conditions/raw/master/md.images/ha-card-weather-condition-alert.png" width="40%" height="auto" alt="Home Assistant lovelace card">

##### *Alert Layer*, example of card setup

```yaml
  type: custom:ha-card-weather-conditions
  name: "cc_test"
  language: it
  alert:
    fire_risk:
      entity: sensor.cc_test_fire_index
      icon: mdi:campfire
      min: 1
      max: 100
      show_if_ge: 15
    thunderstorms_risk:
      entity: binary_sensor.dpc_acquafredda_temporali_oggi
      show_if_on: true
    hydraulic_risk:
      entity: binary_sensor.dpc_acquafredda_idraulico_oggi
    hydrogeological_risk:
      entity: binary_sensor.dpc_acquafredda_idrogeologico_oggi
```

## **&#8212; Other examples &#8212;**

### **Climacell full card**

```yaml
  type: custom:ha-card-weather-conditions
  name: "cc_test"
  language: it
  animation: true
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

[license-shield]:https://img.shields.io/github/license/r-renato/ha-card-weather-conditions
[buymecoffee]: https://www.buymeacoffee.com/0D3WbkKrn
[buymecoffeebadge]: https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow?style=for-the-badge
