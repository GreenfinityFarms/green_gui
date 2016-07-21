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

describe('getAllSensorsata', () => {
  it('responds with object of all sensors', (done) => {
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
