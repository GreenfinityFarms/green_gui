const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

// Object.keys ?
module.exports = Joi.object().keys({
  _id: Joi.objectId().optional(),
  type: Joi.string().required(),
  description: Joi.any().optional()
})
