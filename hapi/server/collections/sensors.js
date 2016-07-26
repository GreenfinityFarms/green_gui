'use strict'

const CollectionKey = 'sensors'
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

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

let updateSensorData = function (id, query, callback) {
  let _id = new ObjectID(id)
  connect(function (db) {
    let coll = db.collection(CollectionKey)
    // update the db like normal
    coll.update({'_id': _id}, {$set: query}, (err, result) => { // returns a WriteResult, not sensor
      if (err) {
        throw err
      }
    })
    coll.findOne({'_id': _id}, (err, sensor) => {
      if (err) {
        throw err
      }
      db.close()
      callback(sensor)
    })
  })
}

// Find a single doc
let getOneSensorData = function (id, callback) {
  let _id = new ObjectID(id)
  connect((db) => {
    let coll = db.collection(CollectionKey)

    // REMOVED, no need to call toArray
    // coll.find({ '_id': _id }).toArray((err, sensor) => {
    //   if (err) {
    //     throw err
    //   }
    //   console.log(`got: ${sensor}`)
    //   db.close()
    //   callback(sensor)
    // })

    coll.findOne({ '_id': _id }, (err, sensor) => {
      if (err) {
        throw err
      }
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
      db.close()
      callback(sensors)
    })
  })
}

// Deletes a sensor from the db
let deleteSensorData = function (id, callback) {
  let _id = new ObjectID(id)
  connect((db) => {
    let coll = db.collection(CollectionKey)

    coll.findOneAndDelete({'_id': _id}, function (err, sensor) {
      if (err) {
        throw err
      }
      db.close()
      callback(sensor)
    })
  })
}

module.exports = {
  insert: addSensorData,
  findOneSensor: getOneSensorData,
  find: getAllSensorData,
  delete: deleteSensorData,
  connect: connect,
  update: updateSensorData
}
