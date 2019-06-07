const Joi = require('joi');

module.exports = {
  create: (email, password, firstName, lastName) => {
    return {
      email,
      password,
      firstName,
      lastName,
      token: ''
    };
  },

  getModel: () => {
    return Joi.object({
      email: Joi.string().description('Admin name'),
      isActive: Joi.boolean().description('Is active'),
      token: Joi.string().description('Access Token is use to the other actions'),
    }).label('AdminModel');
  }
};
