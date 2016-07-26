// const data = require("../spec/fixtures/data")
const _ = require('lodash')
// TODO: pass in `env.port` to newServer()
const server = require('../server/server.js').newServer(1337)
const Sensors = require('../server/collections/sensors')

/**
 * Methods attached to the Sensors global
 * @method {callback} insert   - method of <Sensors> - wrapper around MongoDB call, returns result passed to callback
 * @method {callback} findOne  - method of <Sensors> - wrapper around MongoDB call, returns result passed to callback
 * @method {callback} find    - method of <Sensors> - wrapper around MongoDB call, returns result passed to callback
 *
*/

describe('getAllSensorData', () => {
  it('responds with object of all sensors', done => {
    let options = {
      method: 'GET',
      url: '/sensor/all'
    }

    server.inject(options, function (response) {
      let result = response.result
      // Expect to have a successful response
      expect(response.statusCode).toBe(200)
      // Expect to be returning sensor data
      expect(_.has(result, 'sensors')).toBeTruthy

      // Expect objects returned to be same objects as in database
      Sensors.find((mongoResult) => {
        expect(mongoResult).toEqual(result.sensors)
        done()
      })
    })
  })
})

describe('getOneSensor', () => {
  it('responds with object containing one sensor', done => {
    Sensors.connect((db) => {
      let collection = db.collection('sensors')
      collection.findOne({}, (err, testSensor) => {
        if (err) {
          throw err
        }
        const testId = testSensor._id.toString()
        let options = {
          method: 'GET',
          url: `/sensor/${testId}`
        }
        server.inject(options, function (response) {
          let result = response.result
          expect(_.has(result, 'sensor')).toBeTruthy
          expect(result.sensor).toEqual(testSensor)
          done()
        })
      })
    })
  })
})

describe('addSensorData', () => {
  it('adds a valid object to the database', done => {
    const newSensor = {
      type: 'Test Sensor',
      description: 'This is a sensor created for test purposes'
    }
    const options = {
      method: 'PUT',
      url: '/sensor/add',
      payload: newSensor
    }
    Sensors.find((mongoBeforeResult) => {
      // Number of sensors in db before insert
      const sensorCountBefore = mongoBeforeResult.length
      server.inject(options, function(response) {
        Sensors.find((mongoAfterResult) => {
          // Number of sensors in db after insert
          const sensorCountAfter = mongoAfterResult.length
          expect(sensorCountAfter).toEqual(sensorCountBefore + 1)
          done()
        })
      })
    })
  })

  it('does not add an invalid object', done => {
    const badSensor = {
      noType: 'this should not be added'
    }
    const options = {
      method: 'PUT',
      url: '/sensor/add',
      payload: badSensor
    }
    Sensors.find((mongoBeforeResult) => {
      // Number of sensors in db before insert
      const sensorCountBefore = mongoBeforeResult.length
      server.inject(options, function(response) {
        Sensors.find((mongoAfterResult) => {
          // Number of sensors in db after insert
          const sensorCountAfter = mongoAfterResult.length
          // Expect no change
          expect(sensorCountAfter).toEqual(sensorCountBefore)
          done()
        })
      })
    })
  })
})
