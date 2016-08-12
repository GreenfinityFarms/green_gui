const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

// Object.keys ?
module.exports = Joi.object().keys({
  id: Joi.objectId().optional(),
  type: Joi.string().optional(),
  high: Joi.number().optional(),
  low: Joi.number().optional(),
  description: Joi.string().optional()
})
