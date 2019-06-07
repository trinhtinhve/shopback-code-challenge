const Joi = require('joi');

module.exports = {
  statusCode: Joi.number().integer().description('Error Code'),
  message: Joi.string().description('Error Message'),
};
