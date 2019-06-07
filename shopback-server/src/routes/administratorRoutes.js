const Joi = require('joi');
const controller = require('./../controllers/AdministratorController');
const adminModel = require('./../models/AdministratorModel');

const errorCodeModel = require('./../models/ErrorCodeModel');
const pluginResponsesDef = require('./../models/PluginResponseModel');

const routes = [
  {
    method: 'POST',
    path: '/admin/sign-up',
    config: {
      tags: ['api', 'administrator'],
      description: 'Admin sign up - Just only for test',
      auth: false,
      handler: controller.signUp,
      validate: {
        payload: {
          email: Joi.string().email().description('Email'),
          password: Joi.string().required().min(1).max(255).description('Password'),
          firstName: Joi.string().required().min(1).max(255).description('First name'),
          lastName: Joi.string().required().min(1).max(255).description('Last name'),
        }
      },
      response: {
        schema: Joi.object({
          ...errorCodeModel,
          token: Joi.string().description('Generated token')
        }).label('AdminSignUpResult'),
      },
      plugins: pluginResponsesDef
    }
  },

  {
    method: 'POST',
    path: '/admin/login',
    config: {
      tags: ['api', 'administrator'],
      description: 'Admin login',
      auth: false,
      handler: controller.login,
      validate: {
        payload: {
          email: Joi.string().required().min(3).max(50).description('Email'),
          password: Joi.string().required().min(1).max(255).description('Password'),
        }
      },
      response: {
        schema: Joi.object({
          ...errorCodeModel,
          token: Joi.string().description('Generated token')
        }).label('AdminLoginResult'),
      },
      plugins: pluginResponsesDef
    }
  },

  {
    method: 'POST',
    path: '/admin/logout',
    config: {
      tags: ['api', 'administrator'],
      description: 'Admin logout',
      handler: controller.logout,
      response: {
        schema: Joi.object({
          ...errorCodeModel
        }).label('AdminLogoutResult'),
      },
      plugins: pluginResponsesDef
    }
  },

];

module.exports = routes;
