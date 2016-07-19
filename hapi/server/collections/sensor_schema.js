const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

// Object.keys ?
module.exports = Joi.object({
  _id: Joi.objectId().optional(),
  type: Joi.string(),
  description: Joi.any().optional()
})
