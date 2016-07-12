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
      expect(response.statusCode).toBe(200)
      expect(_.has(response.payload, "sensors")).toBeTruthy
      // expect # of ob in pay load to be # of ob in db
      expect(response.payload.sensors)
             .toEqual(Sensors.find())
      console.log(`payload: ${response.payload}`)
      done()
    })
  })
})
