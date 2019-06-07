const Boom = require('boom');

const helper = require('./../helpers/EventHelper');
const model = require('./../models/EventModel');

const logger = require('./../utils/Logger');
const errorCodes = require('./../contansts/ErrorCodes');

module.exports = {
  getServerConnectionStringByEventCode: async (request, reply) => {
    const { eventCode } = request.query;

    try {
      let eventModel = await helper.getEventModelFromCache(eventCode);
      if (!eventModel) {
        return reply({
          ...errorCodes.EVENT.CODE_INVALID
        });
      }

      if (!eventModel.serverConnectionString || eventModel.serverConnectionString === 'none') {
        eventModel.serverConnectionString = helper.getConnectionStringByFreeServer();
        await helper.setEventModelToCache(eventModel);
      }

      reply({
        ...errorCodes.SUCCESS,
        serverConnectionString: eventModel.serverConnectionString,
      });

    } catch (err) {
      logger.error(err.message, err);
      return reply(Boom.badImplementation());
    }
  },

  getEvents: async (request, reply) => {
    try {
      let events = [];

      let eventModels = await helper.getEventModelsFromCache();
      if (eventModels) {
        Object.values(eventModels).forEach((eventModel) => {
          let event = JSON.parse(eventModel);
          events.push(event);
        });
      }

      reply({
        ...errorCodes.SUCCESS,
        events
      });

    } catch (err) {
      logger.error(err.message, err);
      return reply(Boom.badImplementation());
    }
  },

  createEvent: async (request, reply) => {
    const { eventName, startTime, endTime, eventCode } = request.payload;
    const { name: email } = request.auth.credentials;

    try {
      if (startTime - endTime >= 0) {
        return reply({
          ...errorCodes.EVENT.PERIOD_TIME_INVALID
        });
      }

      let eventModel = await helper.getEventModelFromCache(eventCode);
      if (eventModel) {
        return reply ({
          ...errorCodes.EVENT.CODE_EXIST
        });
      }

      eventModel = model.create(eventCode);
      eventModel.eventName = eventName;
      eventModel.createdBy = email;
      eventModel.startTime = startTime;
      eventModel.endTime = endTime;

      await helper.setEventModelToCache(eventModel);

      reply ({
        ...errorCodes.SUCCESS,
        event: eventModel
      });

    } catch (err) {
      logger.error(err.message, err);
      return reply(Boom.badImplementation());
    }
  },

  editEvent: async (request, reply) => {
    const { eventName, startTime, endTime, eventCode, oldEventCode } = request.payload;
    const { name: email } = request.auth.credentials;

    try {
      if (startTime - endTime >= 0) {
        return reply({
          ...errorCodes.EVENT.PERIOD_TIME_INVALID
        });
      }

      let eventModel = await helper.getEventModelFromCache(oldEventCode);
      if (!eventModel) {
        return reply ({
          ...errorCodes.EVENT.NOT_EXIST
        });
      }

      eventModel.eventCode = eventCode;
      eventModel.eventName = eventName;
      eventModel.updatedBy = email;
      eventModel.startTime = startTime;
      eventModel.endTime = endTime;

      if (eventCode !== oldEventCode) {
        await helper.delEventModelFromCacheByEventCode(oldEventCode);
      }
      await helper.setEventModelToCache(eventModel);

      reply ({
        ...errorCodes.SUCCESS,
        oldEventCode: oldEventCode,
        event: eventModel
      });

    } catch (err) {
      logger.error(err.message, err);
      return reply(Boom.badImplementation());
    }
  },

  deleteEvent: async (request, reply) => {
    const { eventCode } = request.payload;

    try {
      await helper.delEventModelFromCacheByEventCode(eventCode);

      reply ({
        ...errorCodes.SUCCESS,
        eventCode
      });

    } catch (err) {
      logger.error(err.message, err);
      return reply(Boom.badImplementation());
    }
  }

};
