const server   = require('../server/server.js').newServer(1337)
const Boom     = require('boom')
const Joi      = require('joi')
// const Sensors = require('../server/collections/sensors')
const fixtures = require('./fixtures/sensor')                 // array
const schema   = require('../server/collections/sensor_schema')
const _        = require('lodash')


// When a sensor pushes data to the server, it should have a unique ID
// If there's no ID present, we generate one

// Alternatively, the sensor could have an 'isTrusted' field

// A sensor should have a SystemID

// PUT /systemId?name={name}&value={value}
//   - does name exist?
//   - is value within range?
//     - if not, throw error
//
// name
// measurement
// SystemID
//
// System Document
//   Name
//   Sensors
//     - type
//     - id
//     - high
//     - low
//     - description


describe('sensors', function () {
  it('should have a SystemID', function (done) {

    const validate = Joi.validate(fixtures[0], schema, function (err, success) {
      if (err) {
        throw (Boom.badRequest(`bad request: ${err}`))
      }
    })

    expect(validate).toBeNull()
    done()
  })

  // it('systemId should match a known System', function (done) {
  //
  // })
  //
  // it('name should exist in System.Sensors sub-doc', function (done) {
  //
  // })
  //
  // it('payload should throw warning if over/under range', function (done) {
  //
  // })
})
