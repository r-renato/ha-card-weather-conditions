# Weather Conditions Card
ha-card-weather-conditions is a powerful and flexible Lovelace card for Home Assistant. It integrates a variety of weather-related data sources to present a comprehensive summary and forecast.<br>

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/hacs/integration)

[![License][license-shield]](LICENSE)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/r-renato/ha-card-weather-conditions.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/r-renato/ha-card-weather-conditions/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/r-renato/ha-card-weather-conditions.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/r-renato/ha-card-weather-conditions/context:javascript)

[![BuyMeCoffee][buymecoffeebadge]][buymecoffee]

## Features

* Current and forecast weather conditions
* Marine forecast (swell, wave, wind)
* Ultraviolet radiation index and protection advice
* Pollen level display (tree, weed, grass)
* Air quality index with multiple pollutant types
* Weather alerts (fire, storm, hydrogeological, hydraulic)
* Meteogram and camera integration
* Multilingual support
* Display MeteoAlarm (Early Warnings for Europe) and Dipartimento Protezione Civile (Italy only) Alert

<p float="left">
<img src="https://github.com/r-renato/ha-card-weather-conditions/raw/master/md.images/ha-card-weather-condition-overview.png" width="100%" height="auto" alt="Home Assistant lovelace card">
</p>

<!-- <p float="left">
<img src="https://github.com/r-renato/ha-card-weather-conditions/raw/master/md.images/ha-card-weather-condition-full.png" width="40%" height="auto" alt="Home Assistant lovelace card">
<img src="https://github.com/r-renato/ha-card-weather-conditions/raw/master/md.images/ha-card-weather-condition-1.png" width="40%" height="auto" alt="Home Assistant lovelace card">
</p>
<p float="left">
<img src="https://github.com/r-renato/ha-card-weather-conditions/raw/master/md.images/ha-card-weather-condition-2.png" width="40%" height="auto" alt="Home Assistant lovelace card">
</p>     -->

## **Card Configuration**

To use the ```ha-card-weather-conditions``` card, add the following configuration to your ```lovelace``` dashboard:

```yaml
resources:
  # Required: Load the card if installed via HACS
  - url: /hacsfiles/ha-card-weather-conditions/ha-card-weather-conditions.js
    type: module
  # Optional: Load Card Mod to enable advanced styling/customization
  - url: /hacsfiles/lovelace-card-mod/card-mod.js
    type: module
  # ...
```

## **Card Schema Summary**

| **Parameter** | **Type**  | **Required** | **Default** | **Description**                                                                                            |
| ------------- | --------- | ------------ | ----------- | ---------------------------------------------------------------------------------------------------------- |
| `type`        | `string`  | Yes          | —           | Must be set to `custom:ha-card-weather-conditions`.                                                        |
| `language`    | `string`  | No           | `en`        | Language for labels. Supported values: `en`, `it`, `nl`, `es`, `de`, `fr`, `sr-latn`, `pt`, `da`, `no-NO`, `cs`, `ru`. |
| `weather`     | `object`  | No           | —           | Configuration for main weather source. See dedicated section.                                              |
| `ultraviolet` | `object`  | No           | —           | Configuration for UV index display. See dedicated section for details.                                     |
| `pollen`      | `object`  | No           | —           | Configuration for pollen levels. See dedicated section.                                                    |
| `airquality`  | `object`  | No           | —           | Configuration for air quality index. See dedicated section.                                                |
| `camera`      | `string`  | No           | —           | Entity ID of the camera to display.                                                                        |

## **1 `weather` Object Schema**
The following parameters configure the weather object to display current conditions, short-term and long-term forecasts, as well as related alerts.
This card has been tested with weather data provided by `pirateweather`, `climacell`, `darksky` and `openweathermap` integrations.
| **Name**                  | **Type**  | **Required** | **Default**     | **Description**                                                                                                            |
| ------------------------- | --------- | ------------ | --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `name`                    | `string`  | No           | —               | Name of the location displayed in the summary section.                                                                     |
| `sun`                     | `string`  | No           | —               | Entity ID for the sun sensor (used to adjust visuals for daylight, sunrise, and sunset).                                   |
| `moonphase`               | `string`  | No           | —               | Entity ID for the moon phase sensor.                                                                                       |
| `icons_model`             | `string`  | **Yes**      | `pirateweather` | Icon set to use. Supported values: `pirateweather`, `climacell`, `darksky`, `openweathermap`, `buienradar`, `defaulthass`. |
| `animation`               | `boolean` | No           | `false`         | Enables visual effects like moving clouds, rain, or waves based on weather conditions.                                     |
| `present`                 | `object`  | No           | —               | Object containing current weather data (e.g., temperature, humidity, pressure).                                            |
| `daily_forecasts`         | `object`  | No           | —               | Object containing multi-day weather forecast data.                                                                         |
| `hourly_forecasts`        | `object`  | No           | —               | Object containing hourly weather forecast data.                                                                            |
| `marine_daily_forecasts`  | `object`  | No           | —               | Object with daily marine forecast data (e.g., wave height, wind, tides).                                                   |
| `marine_hourly_forecasts` | `object`  | No           | —               | Object with hourly marine forecast data.                                                                                   |
| `meteoalarm`              | `string`  | No           | —               | Entity ID from [Meteoalarm](https://meteoalarm.org/) integration for regional weather warnings.                            |
| `dpcalarm`                | `object`  | No           | —               | Object providing DPC (Protezione Civile) alerts such as thunderstorm or flood risks.                                       |

### **1.1 `present` Object Schema**
The present object defines the entities used to display the current weather conditions in the summary section of the card. Each property corresponds to a specific sensor or attribute providing real-time environmental data.
| **Name**                    |  **Type**  | **Required** | **Default** | **Description**                                                               |
| --------------------------- | ---------- | ------------ | ----------- | ----------------------------------------------------------------------------- |
| `condition`                 | `string`   | No           | —           | Entity ID providing the current weather condition (e.g. sunny, cloudy, rain). |
| `temperature`               | `string`   | No           | —           | Entity ID providing the current temperature.                                  |
| `temperature_feelslike`     | `string`   | No           | —           | Entity ID providing the perceived (feels-like) temperature.                   |
| `temperature_min`           | `string`   | No           | —           | Entity ID providing the minimum temperature of the day.                       |
| `temperature_max`           | `string`   | No           | —           | Entity ID providing the maximum temperature of the day.                       |
| `humidity`                  | `string`   | No           | —           | Entity ID providing the current humidity level (%).                           |
| `pressure`                  | `string`   | No           | —           | Entity ID providing the current atmospheric pressure.                         |
| `visibility`                | `string`   | No           | —           | Entity ID providing the current visibility level.                             |
| `wind_bearing`              | `string`   | No           | —           | Entity ID providing the wind direction in degrees.                            |
| `wind_speed`                | `string`   | No           | —           | Entity ID providing the wind speed.                                           |
| `precipitation_intensity`   | `string`   | No           | —           | Entity ID providing the precipitation rate (e.g. mm/h).                       |
| `precipitation_probability` | `string`   | No           | —           | Entity ID providing the probability of precipitation (%).                     |

### **1.2 `daily_forecasts` Object Schema**
This object defines the structure for multi-day forecast data, where each property can include multiple time slots (e.g. `day_1`, `day_2`, `day_3`…).
Each forecast element (such as `temperature`, `condition`, `precipitation probability`, etc.) must be represented as a Home Assistant entity (e.g., sensor) that includes the following attributes:

- `datetime`: the timestamp indicating the forecast reference time, in ISO 8601 format, for example: <code>2025-06-12T22:00:00+00:00</code>

- `unit_of_measurement`: the unit of measure for the forecasted value (e.g., "`°C`", "`mm`", "`%`"), which must be exposed as an attribute of the sensor.

These attributes are essential to ensure accurate time alignment and proper rendering of the forecast data.

| **Name**                    | **Type**     | **Required** | **Default** | **Description**                                                            |
| --------------------------- | ------------ | ------------ | ----------- | -------------------------------------------------------------------------- |
| `condition`                 | `iTimeSlots` | No           | —           | Object containing the weather condition icons or states for each day slot. |
| `temperature_high`          | `iTimeSlots` | No           | —           | Object containing the daily high temperature values per slot.              |
| `temperature_low`           | `iTimeSlots` | No           | —           | Object containing the daily low temperature values per slot.               |
| `precipitation_intensity`   | `iTimeSlots` | No           | —           | Object with the forecasted precipitation amount for each slot.             |
| `precipitation_probability` | `iTimeSlots` | No           | —           | Object with the probability of precipitation (%) per slot.                 |

### **1.3 `hourly_forecasts` Object Schema**
This object defines the structure for hourly weather forecast data. All fields are optional and do not have default values.
Each forecast element (such as `temperature`, `condition`, `precipitation probability`, etc.) must be represented as a Home Assistant entity (e.g., sensor) that includes the following attributes:

- `datetime`: the timestamp indicating the forecast reference time, in ISO 8601 format, for example: <code>2025-06-12T22:00:00+00:00</code>

- `unit_of_measurement`: the unit of measure for the forecasted value (e.g., "`°C`", "`mm`", "`%`"), which must be exposed as an attribute of the sensor.

These attributes are essential to ensure accurate time alignment and proper rendering of the forecast data.

| **Name**                    | **Type**     | **Required** | **Default** | **Description**                                                               |
| --------------------------- | ------------ | ------------ | ----------- | ----------------------------------------------------------------------------- |
| `condition`                 | `iTimeSlots` | No           | —           | Object containing the weather condition icons or states for each hourly slot. |
| `temperature`               | `iTimeSlots` | No           | —           | Object containing the perceived ambient temperature for each hour.            |
| `temperature_feelslike`     | `iTimeSlots` | No           | —           | Object containing the "feels like" temperature values for each hour.          |
| `precipitation_intensity`   | `iTimeSlots` | No           | —           | Object with forecasted precipitation amount per hour.                         |
| `precipitation_probability` | `iTimeSlots` | No           | —           | Object with probability of precipitation (%) per hour.                        |
| `wind_bearing`              | `iTimeSlots` | No           | —           | Object with wind direction (in degrees or cardinal direction) per hour.       |
| `wind_speed`                | `iTimeSlots` | No           | —           | Object with wind speed values per hour.                                       |

### **1.3.1 `iTimeSlots` Object Schema**
This object represents a set of six time slots used to store sequential forecast data (e.g., hourly, daily, etc.).
| **Name** | **Type** | **Required** | **Description**                                              |
| -------- | -------- | ------------ | ------------------------------------------------------------ |
| `slot1`  | `string` | No           | Value for the first time slot (e.g., current or first hour). |
| `slot2`  | `string` | No           | Value for the second time slot.                              |
| `slot3`  | `string` | No           | Value for the third time slot.                               |
| `slot4`  | `string` | No           | Value for the fourth time slot.                              |
| `slot5`  | `string` | No           | Value for the fifth time slot.                               |
| `slot6`  | `string` | No           | Value for the sixth time slot.                               |

### **1.4 `dpcalarm` Object Schema**
The `dpcalarm` object is used to configure weather-related alerts provided by the Italian Civil Protection Department (DPC), including thunderstorms, hydraulic, and hydrogeological risks. Each property should reference a specific sensor entity ID.
| **Name**          | **Type** | **Required** | **Description**                                                              |
| ----------------- | -------- | ------------ | ---------------------------------------------------------------------------- |
| `thunderstorms`   | `string`   | No           | Entity ID providing thunderstorm alert information from DPC.                 |
| `hydraulic`       | `string`   | No           | Entity ID providing hydraulic (river/stream flooding) alert information.     |
| `hydrogeological` | `string`   | No           | Entity ID providing hydrogeological (landslide/soil instability) alert data. |

## **2 `ultraviolet` Object Schema**
The ultraviolet object allows you to display UV-related data such as the current index, ozone level, protection window, and safe exposure times for different skin types (I–VI).
| **Name**            | **Type** | **Required** | **Description**                                                                 |
| ------------------- | -------- | ------------ | ------------------------------------------------------------------------------- |
| `protection_window` | `string` | No           | Entity ID providing the time window during which sun protection is recommended. |
| `ozone_level`       | `string` | No           | Entity ID providing the current atmospheric ozone level.                        |
| `uv_index`          | `string` | No           | Entity ID providing the current UV index value.                                 |
| `uv_level`          | `string` | No           | Entity ID describing the UV risk level (e.g. low, moderate, high).              |
| `max_uv_index`      | `string` | No           | Entity ID providing the maximum forecasted UV index for the day.                |
| `set_skin_type_1`   | `string` | No           | Entity ID providing sun exposure time recommendation for skin type I.           |
| `set_skin_type_2`   | `string` | No           | Entity ID providing sun exposure time recommendation for skin type II.          |
| `set_skin_type_3`   | `string` | No           | Entity ID providing sun exposure time recommendation for skin type III.         |
| `set_skin_type_4`   | `string` | No           | Entity ID providing sun exposure time recommendation for skin type IV.          |
| `set_skin_type_5`   | `string` | No           | Entity ID providing sun exposure time recommendation for skin type V.           |
| `set_skin_type_6`   | `string` | No           | Entity ID providing sun exposure time recommendation for skin type VI.          |

## **3 `pollen` Object Schema**
The pollen object provides information about airborne allergens. It defines the range of measured values (`min` and `max`) and includes a list of `entities` describing each pollen type.
| **Name**   | **Type**        | **Required** | **Description**                                                         |
| ---------- | --------------- | ------------ | ----------------------------------------------------------------------- |
| `entities` | `iPollenItem[]` | Yes          | Array of pollen data objects, each representing a specific pollen type. |
| `min`      | `number`        | Yes          | Minimum expected pollen concentration (used for scaling).               |
| `max`      | `number`        | Yes          | Maximum expected pollen concentration (used for scaling).               |

## **3.1 `iPollenItem` Object Schema**
Each `iPollenItem` defines a specific pollen type to be tracked, including a name for display and the corresponding entity ID in Home Assistant.
| **Name** | **Type** | **Required** | **Description**                                                   |
| -------- | -------- | ------------ | ----------------------------------------------------------------- |
| `name`   | `string`   | Yes        | Display name of the pollen type (e.g., “Grass”, “Birch”).         |
| `entity` | `string`   | Yes        | Home Assistant entity ID providing the pollen concentration data. |

## **4 `airquality` Object Schema**
The `airquality` object defines the Home Assistant entity IDs used to monitor various air pollution metrics and EPA health indicators. Each field corresponds to a specific air quality parameter.
| **Name**                | **Type** | **Required** | **Description**                                                              |
| ----------------------- | -------- | ------------ | ---------------------------------------------------------------------------- |
| `pm25`                  | `string` | No           | Entity ID providing PM2.5 (fine particulate matter) concentration.           |
| `pm10`                  | `string` | No           | Entity ID providing PM10 (coarse particulate matter) concentration.          |
| `o3`                    | `string` | No           | Entity ID providing Ozone (O₃) concentration.                                |
| `no2`                   | `string` | No           | Entity ID providing Nitrogen Dioxide (NO₂) concentration.                    |
| `co`                    | `string` | No           | Entity ID providing Carbon Monoxide (CO) concentration.                      |
| `so2`                   | `string` | No           | Entity ID providing Sulfur Dioxide (SO₂) concentration.                      |
| `epa_aqi`               | `string` | No           | Entity ID providing the EPA-computed Air Quality Index.                      |
| `epa_primary_pollutant` | `string` | No           | Entity ID providing the EPA-designated primary pollutant.                    |
| `epa_health_concern`    | `string` | No           | Entity ID describing the EPA-assigned health concern level (e.g., moderate). |

## **Card Layers Sample**
This section showcases a complete example of the different visual layers supported by the `ha-card-weather-conditions` card.
Each layer such as summary, weather conditions, air quality, UV index, and alerts—can be configured independently, allowing full control over how and where data appears.

Use this reference as a guide when designing your Lovelace configuration to build a fully personalized weather dashboard.

### **Summary Layer**
The summary layers present a concise visual overview of current weather conditions.

<img src="https://github.com/r-renato/ha-card-weather-conditions/raw/master/md.images/ha-card-weather-condition-summary.png" width="40%" height="auto" alt="Home Assistant lovelace card">

#### **YAML example**
```yaml
type: custom:ha-card-weather-conditions
language: it 
weather:
  name: "Acquafredda" 
  icons_model: pirateweather
  moonphase: sensor.moon_phase
  present:
    condition: sensor.home_condition
    temperature: sensor.home_temperature
    temperature_feelslike: sensor.home_apparent_temperature
```

### **Present Layer**
This layer displays the current weather conditions using entity data such as temperature, humidity, wind, and more.

<p float="left">
<img src="https://github.com/r-renato/ha-card-weather-conditions/raw/master/md.images/ha-card-weather-condition-present.png" width="40%" height="auto" alt="Home Assistant lovelace card">
</p>

#### **YAML example**
```yaml
type: custom:ha-card-weather-conditions
language: it 
weather:
  icons_model: pirateweather
  sun: sun.sun
  present:
    temperature_min: sensor.home_temperature_min
    temperature_max: sensor.home_temperature_max
    humidity: sensor.home_relative_humidity
    pressure: sensor.home_pressure
    wind_bearing: sensor.home_wind_bearing
    wind_speed: sensor.home_wind_speed
    precipitation_intensity: sensor.home_precipitation
    precipitation_probability: sensor.home_precipitation_probability
```
### **Daily Forecast Layer**
This layer provides a multi-day weather overview, including expected temperature highs and lows, precipitation probability, and general conditions.

<p float="left">
<img src="https://github.com/r-renato/ha-card-weather-conditions/raw/master/md.images/ha-card-weather-condition-daily-forecast.png" width="40%" height="auto" alt="Home Assistant lovelace card">
</p>

#### **YAML example**
```yaml
type: custom:ha-card-weather-conditions
language: it 
weather:
  icons_model: pirateweather
  daily_forecasts:
    condition:
      slot1: sensor.home_daily_forecast_condition_d1
      slot2: sensor.home_daily_forecast_condition_d2
      slot3: sensor.home_daily_forecast_condition_d3
      slot4: sensor.home_daily_forecast_condition_d4                         
    temperature_high:
      slot1: sensor.home_daily_forecast_temperature_max_d1
      slot2: sensor.home_daily_forecast_temperature_max_d2
      slot3: sensor.home_daily_forecast_temperature_max_d3
      slot4: sensor.home_daily_forecast_temperature_max_d4
    temperature_low:
      slot1: sensor.home_daily_forecast_temperature_min_d1
      slot2: sensor.home_daily_forecast_temperature_min_d2
      slot3: sensor.home_daily_forecast_temperature_min_d3
      slot4: sensor.home_daily_forecast_temperature_min_d4
    precipitation_probability:
      slot1: sensor.home_daily_forecast_precipitation_probability_d1
      slot2: sensor.home_daily_forecast_precipitation_probability_d2
      slot3: sensor.home_daily_forecast_precipitation_probability_d3
      slot4: sensor.home_daily_forecast_precipitation_probability_d4
    precipitation_intensity:
      slot1: sensor.home_daily_forecast_precipitation_d1
      slot2: sensor.home_daily_forecast_precipitation_d2
      slot3: sensor.home_daily_forecast_precipitation_d3
      slot4: sensor.home_daily_forecast_precipitation_d4
```

### **Hourly Forecast Layer**
This layer displays detailed weather data for the next several hours, including temperature, precipitation, and wind conditions.

<p float="left">
<img src="https://github.com/r-renato/ha-card-weather-conditions/raw/master/md.images/ha-card-weather-condition-hourly-forecast.png" width="40%" height="auto" alt="Home Assistant lovelace card">
</p>

#### **YAML example**
```yaml
type: custom:ha-card-weather-conditions
language: it 
weather:
  icons_model: pirateweather
  hourly_forecasts:
    condition:
      slot1: sensor.home_hourly_forecast_condition_h1
      slot2: sensor.home_hourly_forecast_condition_h2
      slot3: sensor.home_hourly_forecast_condition_h3
      slot4: sensor.home_hourly_forecast_condition_h4
    temperature:
      slot1: sensor.home_hourly_forecast_temperature_h1
      slot2: sensor.home_hourly_forecast_temperature_h2
      slot3: sensor.home_hourly_forecast_temperature_h3
      slot4: sensor.home_hourly_forecast_temperature_h4
    temperature_feelslike:
      slot1: sensor.home_hourly_forecast_apparent_temperature_h1
      slot2: sensor.home_hourly_forecast_apparent_temperature_h2
      slot3: sensor.home_hourly_forecast_apparent_temperature_h3
      slot4: sensor.home_hourly_forecast_apparent_temperature_h4
    precipitation_intensity:
      slot1: sensor.home_hourly_forecast_precipitation_h1
      slot2: sensor.home_hourly_forecast_precipitation_h2
      slot3: sensor.home_hourly_forecast_precipitation_h3
      slot4: sensor.home_hourly_forecast_precipitation_h4
    precipitation_probability:
      slot1: sensor.home_hourly_forecast_precipitation_probability_h1
      slot2: sensor.home_hourly_forecast_precipitation_probability_h2
      slot3: sensor.home_hourly_forecast_precipitation_probability_h3
      slot4: sensor.home_hourly_forecast_precipitation_probability_h4
    wind_bearing:
      slot1: sensor.home_hourly_forecast_wind_bearing_h1
      slot2: sensor.home_hourly_forecast_wind_bearing_h2
      slot3: sensor.home_hourly_forecast_wind_bearing_h3
      slot4: sensor.home_hourly_forecast_wind_bearing_h4
    wind_speed:
      slot1: sensor.home_hourly_forecast_wind_speed_h1
      slot2: sensor.home_hourly_forecast_wind_speed_h2
      slot3: sensor.home_hourly_forecast_wind_speed_h3
      slot4: sensor.home_hourly_forecast_wind_speed_h4
```
### **Marine Daily Forecast Layer**
This layer provides daily marine weather forecasts, including information such as wave height, wind speed, and sea conditions.

<p float="left">
<img src="https://github.com/r-renato/ha-card-weather-conditions/raw/master/md.images/ha-card-weather-condition-marine-daily-forecast.png" width="40%" height="auto" alt="Home Assistant lovelace card">
</p>

#### **YAML example**
```yaml
type: custom:ha-card-weather-conditions
language: it 
weather:
  icons_model: pirateweather
  marine_daily_forecasts:
    wave_height_max:
      slot1: sensor.marine_wave_height_max_day_0
      slot2: sensor.marine_wave_height_max_day_1
      slot3: sensor.marine_wave_height_max_day_2
      slot4: sensor.marine_wave_height_max_day_3
    wave_direction:
      slot1: sensor.marine_wave_direction_dominant_day_0
      slot2: sensor.marine_wave_direction_dominant_day_1
      slot3: sensor.marine_wave_direction_dominant_day_2
      slot4: sensor.marine_wave_direction_dominant_day_3                            
    swell_wave_height_max:
      slot1: sensor.amarine_swell_wave_height_max_day_0
      slot2: sensor.marine_swell_wave_height_max_day_1
      slot3: sensor.marine_swell_wave_height_max_day_2
      slot4: sensor.marine_swell_wave_height_max_day_3                              
    wind_wave_height_max:
      slot1: sensor.marine_wind_wave_height_max_day_0
      slot2: sensor.marine_wind_wave_height_max_day_1
      slot3: sensor.marine_wind_wave_height_max_day_2
      slot4: sensor.marine_wind_wave_height_max_day_3 
```
### **Alarms Layer**
This layer displays weather alerts and warnings from official sources such as Meteoalarm and the Italian Civil Protection Department (DPC). 

<p float="left">
<img src="https://github.com/r-renato/ha-card-weather-conditions/raw/master/md.images/ha-card-weather-condition-alarms.png" width="40%" height="auto" alt="Home Assistant lovelace card">
</p>

#### **YAML example**
```yaml
type: custom:ha-card-weather-conditions
language: it 
weather:
  icons_model: pirateweather
  meteoalarm: binary_sensor.italy_basilicata_meteo_alarm
  dpcalarm:
    thunderstorms: binary_sensor.dpc_basilicata_temporali_oggi
    hydraulic: binary_sensor.dpc_basilicata_idraulico_oggi
    hydrogeological: binary_sensor.dpc_basilicata_idrogeologico_oggi
```
### **Ultraviolet Layer**
This layer presents real-time ultraviolet (UV) radiation data, including UV index levels, ozone concentration, and skin protection recommendations.
<p float="left">
<img src="https://github.com/r-renato/ha-card-weather-conditions/raw/master/md.images/ha-card-weather-condition-ultraviolet.png" width="40%" height="auto" alt="Home Assistant lovelace card">
</p>

#### **YAML example**
```yaml
type: custom:ha-card-weather-conditions
language: it 
ultraviolet:
  protection_window: binary_sensor.openuv_protection_window
  ozone_level: sensor.openuv_current_ozone_level
  uv_index: sensor.openuv_current_uv_index
  uv_level: sensor.openuv_current_uv_level
  max_uv_index: sensor.openuv_max_uv_index

  set_skin_type_1: sensor.openuv_skin_type_1_safe_exposure_time
  set_skin_type_2: sensor.openuv_skin_type_2_safe_exposure_time
  set_skin_type_3: sensor.openuv_skin_type_3_safe_exposure_time
  set_skin_type_4: sensor.openuv_skin_type_4_safe_exposure_time
  set_skin_type_5: sensor.openuv_skin_type_5_safe_exposure_time
  set_skin_type_6: sensor.openuv_skin_type_6_safe_exposure_time
```
### **Pollen Layer**
This layer displays information about airborne pollen levels, helping users monitor potential allergen exposure.
<p float="left">
<img src="https://github.com/r-renato/ha-card-weather-conditions/raw/master/md.images/ha-card-weather-condition-pollen.png" width="40%" height="auto" alt="Home Assistant lovelace card">
</p>

#### **YAML example**
```yaml
type: custom:ha-card-weather-conditions
language: it 
pollen:
  min: 1
  max: 4
  entities:
    - name: Alder
      entity: sensor.openmeteo_pollen_alder_level 
    - name: Birch
      entity: sensor.openmeteo_pollen_birch_level
    - name: Grass
      entity: sensor.openmeteo_pollen_grass_level
    - name: Mugwort
      entity: sensor.openmeteo_pollen_mugwort_level
    - name: Olive
      entity: sensor.openmeteo_pollen_olive_level 
    - name: Ragweed
      entity: sensor.openmeteo_pollen_ragweed_level  
```
### **Air Quality Layer**
This layer presents real-time data on key air quality indicators such as PM2.5, PM10, ozone, and nitrogen dioxide levels.
<p float="left">
<img src="https://github.com/r-renato/ha-card-weather-conditions/raw/master/md.images/ha-card-weather-condition-air-quality.png" width="40%" height="auto" alt="Home Assistant lovelace card">
</p>

#### **YAML example**
```yaml
type: custom:ha-card-weather-conditions
language: it 
airquality:
  pm25: sensor.lazio_italy_pm2_5
  pm10: sensor.lazio_italy_pm10
  o3: sensor.roma_lazio_italy_ozone
  co: sensor.roma_lazio_italy_carbon_monoxide
  epa_aqi: sensor.lazio_italy_air_quality_index
  epa_primary_pollutant: sensor.lazio_italy_dominant_pollutant
```

[license-shield]:https://img.shields.io/github/license/r-renato/ha-card-weather-conditions
[buymecoffee]: https://www.buymeacoffee.com/0D3WbkKrn
[buymecoffeebadge]: https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow?style=for-the-badge
