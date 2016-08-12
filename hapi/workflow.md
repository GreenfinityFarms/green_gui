#### Workflows

> **HAPI server features**

1. Receive Data from sensor (JSON payload)
2. If (!id)
  - Alert user that a new sensor is trying to be registered
  - Wait for response, add Sensor to System collection
3. Respond to MC if range is extreme
4. Update TimeSeries

HTTP (HAPI) ENDPOINT DOES:

  - Authentication
  - Data persistence
  - API routing

```
  System (ID) [like a User]
    - # Sensors (ID) [supplied]
      - / type&number
      - Sensor registers with System

  ex: PUT /system{}/sensor{}
```

> **NODE APP RUNNING ON MICROCONTROLLER**

- - - - - - - -

  ADD A SENSOR / EMITTERS

- - - - - - - -
...describe
- - - - - - - -

  Type
  Name
  Usage
  Range (hi/low)

- - - - - - - -
...push
- - - - - - - -

  Reading file . . pushing data

- - - - - - - -
...
- - - - - - - -

  Two-way
  Adjust sensors

- - - - - - - -
...
- - - - - - - -



> **Front-facing monitoring APP**

- - - - - - - -

  Display all the datum (or most recent depending on time range request)
  Download all data if wanted

- - - - - - - -





- - - - - - - - - - - - - - - -

Feature
- Based on description of sensor, create new Johnny Five instance
- run
