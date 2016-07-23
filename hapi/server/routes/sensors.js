'use strict'
const Joi = require('joi')
const Boom = require('boom')
const Sensors = require('../collections/sensors')
const schema = require('../collections/sensor_schema')

let getAllSensors = {
  path: '/sensor/all',
  method: 'GET',
  handler: function (request, reply) {
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
    })
  }
}

let getOneSensor = {
  path: '/sensor/{id}',
  method: 'GET',
  handler: function (request, reply) {
    const id = encodeURIComponent(request.params.id)
    Sensors.findOneSensor(id, (mongoResult) => {
      // let resultArray = mongoResult.map(doc => {
      //   return {
      //     id: doc._id,
      //     temp: doc.temp,
      //     type: doc.type,
      //     description: doc.description
      //   }
      // })
      reply({
        sensor: mongoResult
      })
      // console.log(mongoResult)
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

    Joi.validate(sensorData, schema, function (err, success) {
      if (err) {
        reply(Boom.badRequest(`bad request: ${err}`))
      } else {
        Sensors.insert(sensorData, function (mongoResult) {
          reply({partyOn: true})
        })
      }
    })
  }
}

// TODO: Normalize routes
let deleteSensor = {
  path: '/sensor/{id}',
  method: 'DELETE',
  handler: function (request, reply) {
    const id = encodeURIComponent(request.params.id)
    Sensors.delete(id, function (mongoResult) {
      reply({sensorDeleted: `${mongoResult}`})
    })
  }
}

module.exports = {
  getAllSensors: getAllSensors,
  getOneSensor: getOneSensor,
  addSensor: addSensor,
  deleteSensor: deleteSensor
}
