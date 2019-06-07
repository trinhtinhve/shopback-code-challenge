const Joi = require('joi');

module.exports = {
  create: (eventCode) => {
    return {
      eventCode,
      eventName: '',
      createdBy: '',
      updatedBy: 'none',
      startTime: null,
      endTime: null,
      highlightCount: 0,
      serverConnectionString: 'none'
    };
  },

  getModel: () => {
    return Joi.object({
      eventCode: Joi.string().description('Unique Event code'),
      eventName: Joi.string().description('Event name'),
      createdBy: Joi.string().description('Admin name created event'),
      updatedBy: Joi.string().description('Admin name updated event'),
      startTime: Joi.number().integer().description('Timestamp start time'),
      endTime: Joi.number().integer().description('Timestamp end time'),
      highlightCount: Joi.number().integer().description('Highlight of question count'),
      serverConnectionString: Joi.string().description('ConnectionString to socket server'),
    });
  },
};
