// const data = require("../spec/fixtures/data")
const _ = require('lodash')
const server = require("../server/server.js").newServer(1337)
const Sensors = require('../server/collections/sensors')

describe("getAllSensors", () => {
  it("responds with object of all sensors", done => {
    let options = {
      method: 'GET',
      url: '/sensor/all'
    }

    server.inject(options, function(response) {
      let result = response.result
      // Expect to have a successful response
      expect(response.statusCode).toBe(200)
      // Expect to be returning sensor data
      expect(_.has(result, "sensors")).toBeTruthy

      // Expect objects returned to be same objects as in database
      Sensors.find((mongoResult) => {
        expect(mongoResult).toEqual(result.sensors)
        done()
      })
    })
  })
})
