const Hapi = require('hapi')
// const Joi = require('joi')
// import Hapi from 'hapi'
// import SensorsCollection from '/imports/api/sensors/sensors'

const Sensors = require('./collections/sensors')

const server = new Hapi.Server()

server.connection({
  port: 1337,
  host: 'localhost'
})

server.route({
  path: '/sensor/all',
  method: 'GET',
  handler: function (request, reply) {
    Sensors.find((mongoResult) => {
      let resultArray = mongoResult.map(doc => {
        return {
          id: doc._id,
          temp: doc.temp,
          type: doc.type,
          description: doc.description
        }
      })
      reply({
        sensors: resultArray
      })
      console.log(resultArray)
    })
  }
})

// TODO: add/check against schema
server.route({
  path: '/sensor/add',
  method: 'PUT',
  handler: function (request, reply) {
    let sensorData = {
      type: request.payload.type,
      description: request.payload.description
    }
    // try/catch
    Sensors.insert(sensorData, function (mongoResult) {
      reply({partyOn: true})
    })
  }
})

server.start(function (err) {
  if (err) {
    throw err
  }

  console.log('Server running at: ' + server.info.uri)
  console.log(`Node version in use:  ${process.version}`)
})
