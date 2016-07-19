'use strict'
const Hapi = require('hapi')
const _ = require('lodash')
const sensorRoutes = require('./routes/sensors')

function newServer (port) {
  const server = new Hapi.Server()

  server.connection({
    port: port,
    host: 'localhost'
  })

  // can take an array,
  // but since there's just one...
  _.forEach(sensorRoutes, route => {
    server.route(route)
  })

  return server
}

module.exports = {
  newServer: newServer
}
