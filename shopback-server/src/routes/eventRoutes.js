const Joi = require('joi');
const controller = require('./../controllers/EventController');
const eventModel = require('./../models/EventModel');

const errorCodeModel = require('./../models/ErrorCodeModel');
const pluginResponsesDef = require('./../models/PluginResponseModel');

const routes = [
  {
    method: 'GET',
    path: '/event/getServerConnectionStringByEventCode',
    config: {
      tags: ['api', 'event'],
      description: 'Get connection string when user want to connect to persistance connection',
      auth: false,
      handler: controller.getServerConnectionStringByEventCode,
      validate: {
        query: {
          eventCode: Joi.string().required().description('Event code'),
        }
      },
      response: {
        schema: Joi.object({
          ...errorCodeModel,
          serverConnectionString: Joi.string().description('Connection string of websocket server')
        }).label('ResultOfGetServerConnectionByEventCode')
      },
      plugins: pluginResponsesDef
    }
  },

  {
    method: 'GET',
    path: '/event/get-all',
    config: {
      tags: ['api', 'event'],
      description: 'Get All event',
      handler: controller.getEvents,
      response: {
        schema: Joi.object({
          ...errorCodeModel,
          events: Joi.array().items(eventModel.getModel()).description('Event list')
        }).label('ResultOfGetAllEvent')
      },
      plugins: pluginResponsesDef
    }
  },

  {
    method: 'POST',
    path: '/event/create',
    config: {
      tags: ['api', 'event'],
      description: 'Create event',
      handler: controller.createEvent,
      validate: {
        payload: {
          eventName: Joi.string().required().min(0).max(50).description('Event name'),
          startTime: Joi.number().integer().required().min(0).description('Start time'),
          endTime: Joi.number().integer().required().min(0).description('End time'),
          eventCode: Joi.string().required().min(1).description('Event code'),
        }
      },
      response: {
        schema: Joi.object({
          ...errorCodeModel,
          event: eventModel.getModel()
        }).label('CreateEventResult'),
      },
      plugins: pluginResponsesDef
    }
  },

  {
    method: 'POST',
    path: '/event/edit',
    config: {
      tags: ['api', 'event'],
      description: 'Edit event',
      handler: controller.editEvent,
      validate: {
        payload: {
          eventName: Joi.string().required().min(0).max(50).description('Event name'),
          startTime: Joi.number().integer().required().min(0).description('Start time'),
          endTime: Joi.number().integer().required().min(0).description('End time'),
          eventCode: Joi.string().required().min(1).description('Event code'),
          oldEventCode: Joi.string().required().min(1).description('Event code'),
        }
      },
      response: {
        schema: Joi.object({
          ...errorCodeModel,
          oldEventCode: Joi.string().description('Old Event code'),
          event: eventModel.getModel()
        }).label('CreateEventResult'),
      },
      plugins: pluginResponsesDef
    }
  },

  {
    method: 'POST',
    path: '/event/delete',
    config: {
      tags: ['api', 'event'],
      description: 'Delete event',
      handler: controller.deleteEvent,
      validate: {
        payload: {
          eventCode: Joi.string().required().min(1).description('Event code'),
        }
      },
      response: {
        schema: Joi.object({
          ...errorCodeModel,
          eventCode: Joi.string().description('Event code'),
        }).label('DeleteEventResult'),
      },
      plugins: pluginResponsesDef
    }
  },

];

module.exports = routes;
