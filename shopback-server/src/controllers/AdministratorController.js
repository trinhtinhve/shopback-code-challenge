const Boom = require('boom');
const bcrypt = require('bcryptjs');

const helper = require('./../helpers/AdministratorHelper');
const model = require('./../models/AdministratorModel');

const utils = require('./../utils/Utils');
const logger = require('./../utils/Logger');
const errorCodes = require('./../contansts/ErrorCodes');

const { generateToken } = require('../utils/JwtAuth');

module.exports = {
  signUp: async (request, reply) => {
    const { email, password, firstName, lastName } = request.payload;

    try {
      let adminModel = await helper.getAdminModelFromCacheByAdminName(email);
      if (adminModel) {
        return reply({
          ...errorCodes.SIGN_UP_LOCAL.ADMIN_EXIST
        });
      }

      const passwordHashed = await utils.hash(password);

      adminModel = model.create(email, passwordHashed, firstName, lastName);
      adminModel.token = await generateToken(adminModel.email);

      await helper.setAdminModelToCache(adminModel);

      return reply({
        ...errorCodes.SUCCESS,
        token: adminModel.token
      });

    } catch (err) {
      logger.error(err.message, err);
      return reply(Boom.badImplementation());
    }
  },

  login: async (request, reply) => {
    const { email, password } = request.payload;

    try {
      let adminModel = await helper.getAdminModelFromCacheByAdminName(email);

      if (!adminModel) {
        return reply({
          ...errorCodes.LOGIN_LOCAL.ADMIN_NAME_INVALID
        });
      }

      const passCompare = await bcrypt.compare(password, adminModel.password);
      if (!passCompare) {
        return reply({
          ...errorCodes.LOGIN_LOCAL.ADMIN_PASS_INVALID
        });
      }

      adminModel.token = generateToken(adminModel.email);
      await helper.setAdminModelToCache(adminModel);

      return reply({
        ...errorCodes.SUCCESS,
        token: adminModel.token
      });

    } catch (err) {
      logger.error(err.message, err);
      return reply(Boom.badImplementation());
    }
  },

  logout: async (request, reply) => {
    const { name: email } = request.auth.credentials;

    try {
      await helper.delAdminModelFromCacheByAdminName(email);

      reply({
        ...errorCodes.SUCCESS
      });

    } catch (err) {
      logger.error(err.message, err);
      return reply(Boom.badImplementation());
    }
  },

};
