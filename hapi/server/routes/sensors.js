const Sensors = require('../collections/sensors')

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

let getOneSensor = {
  path: '/sensor/{id}',
  method: 'GET',
  handler:  function (request, reply) {
    Sensors.findOne(request.payload.id, mongoResult => {
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

module.exports = {
  getAllSensors: getAllSensors,
  getOneSensor: getOneSensor,
  addSensor: addSensor
}
