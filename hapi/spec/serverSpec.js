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

describe('getAllSensors', () => {
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
      // Get a comparison sensor straight from db
      collection.findOne({}, (err, testSensor) => {
        if (err) {
          throw err
        }
        const testId = testSensor._id.toString()
        let options = {
          method: 'GET',
          url: `/sensor/${testId}`
        }
        // Send request to test if we get the same sensor
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

describe('addSensor', () => {
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

describe('deleteSensor', () => {
  it('deletes the specified sensor', done => {
    Sensors.connect((db) => {
      let collection = db.collection('sensors')
      // Get a comparison sensor straight from db
      collection.findOne({type:'Test Sensor'}, (err, testSensor) => {
        if (err) {
          throw err
        }
        const testId = testSensor._id.toString()
        const options = {
          method: 'DELETE',
          url: `/sensor/${testId}`,
        }
        Sensors.find((sensorsBeforeDeletion) => {
          // Number of sensors before deletion
          const sensorCountBefore = sensorsBeforeDeletion.length
          server.inject(options, (response) => {
            Sensors.find((sensorsAfterDeletion) => {
              // Number of sensors after deletion
              const sensorCountAfter = sensorsAfterDeletion.length
              const reply = response.result
            
              expect(sensorCountAfter).toEqual(sensorCountBefore - 1)
              expect(_.has(reply, 'sensorDeleted')).toBeTruthy
              done()
            })
          })
        })
      })
    })
  })
})

describe('updateSensor', () => {
  it('updates the sensor of a given id', done => {
    Sensors.connect((db) => {
      let collection = db.collection('sensors')
      // Get a comparison sensor straight from db
      collection.findOne({type:'Test Sensor'}, (err, testSensor) => {
        if (err) {
          throw err
        }
        const testId = testSensor._id.toString()
        const updateValues = {
          description: 'this is the new description'
        }
        const options = {
          method: 'PUT',
          url: `/sensor/${testId}`,
          payload: updateValues
        }
        
        server.inject(options, response => {
          const reply = response.result
          const updatedSensor = reply['updatedSensor']

          expect(updatedSensor).toBeDefined()
          expect(updatedSensor).not.toEqual(testSensor)
          // expect payload criteria to be the difference
          for (key in options.payload) {
            expect(updatedSensor[key]).toBeDefined()
            expect(updatedSensor[key]).not.toEqual(testSensor[key])
          }
          done()
        })
      })
    })
  })
})