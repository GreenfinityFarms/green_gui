'use strict'

const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
// const Sensors = new Mongo.Collection(CollectionKey)
// const ObjectId = require('mongodb').ObjectID

const CollectionKey = 'sensors'

let url = 'mongodb://localhost:27017/' + CollectionKey

if (process.env.MONGODB_URI) {
  url = process.env.MONGODB_URI
}

const connect = (callback) => {
  MongoClient.connect(url, (err, db) => {
    if (err) {
      throw err
    }
    callback(db)
  })
}

// Add a document
// PUT @collection | Object
let addSensorData = function (sensor, callback) {
  connect(function (db) {
    let coll = db.collection(CollectionKey)

    coll.insert(sensor, function (err, result) {
      if (err) {
        throw err
      }
      db.close()
      callback(result)
    })
  })
}

// TODO: let updateSensorData = function (id, callback) {

// }

// Find a single doc
let getOneSensorData = function (id, callback) {
  let _id = new ObjectID(id)
  connect((db) => {
    let coll = db.collection(CollectionKey)

    coll.find({ '_id': _id }).toArray((err, sensor) => {
      if (err) {
        throw err
      }
      console.log(`got: ${sensor}`)
      db.close()
      callback(sensor)
    })
  })
}

// Find all documents in @collection
let getAllSensorData = function (callback) {
  connect((db) => {
    let coll = db.collection(CollectionKey)

    coll.find({}).toArray((err, sensors) => {
      if (err) {
        throw err
      }
      // TODO: Add actually logging <probably w/ Good, Good-Console>
      console.log(`got: ${sensors}`)
      db.close()
      callback(sensors)
    })
  })
}

module.exports = {
  insert: addSensorData,
  // findOne: getOneSensorData,
  find: getAllSensorData
}
