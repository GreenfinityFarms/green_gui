"use strict"
const Hapi = require('hapi')

function newServer (port) {
  const Sensors = require('./collections/sensors')

  const server = new Hapi.Server()

  server.connection({
    port: port,
    host: 'localhost'
  })

  let getAllSensors = {
    path: '/sensor/all',
    method: 'GET',
    handler:  function (request, reply) {
      Sensors.find((mongoResult) => {
        // let resultArray = mongoResult.map(doc => {
        //   return {
        //     id: doc._id,
        //     temp: doc.temp,
        //     type: doc.type,
        //     description: doc.description
        //   }
        // })
        reply({
          sensors: mongoResult
        })
        console.log(mongoResult)
      })
    }
  }

  // TODO: add/check against schema
  let addSensor = {
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
  }

  server.route([
    getAllSensors,
    addSensor
  ])

  return server
}
// // This has been moved to index.js
// server.start(function (err) {
//   if (err) {
//     throw err
//   }
//
//   console.log('Server running at: ' + server.info.uri)
//   console.log(`Node version in use:  ${process.version}`)
// })

module.exports = {
  newServer: newServer
}
