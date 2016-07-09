// imports/api/sensors/sensors.js

// Specification of Sensor API

import { Mongo } from 'meteor/mongo'

const Sensors = new Mongo.Collection('sensors')

// const sensorSchema = new SimpleSchema({
// })

export default Sensors
