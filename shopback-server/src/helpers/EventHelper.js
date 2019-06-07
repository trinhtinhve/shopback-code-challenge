const caching = require('./../services/Caching');
const cachingKeys = require('./../contansts/CachingKeys');

module.exports = {
  getEventModelFromCache: async (eventCode) => {
    let eventModel = null;

    try {
      eventModel = await caching.hget(cachingKeys.EVENTS_HKEY, eventCode);
    } catch (err) {
      throw err;
    }

    if (eventModel) {
      return JSON.parse(eventModel);
    }

    return null;
  },

  getEventModelsFromCache: async () => {
    try {
      return await caching.hgetall(cachingKeys.EVENTS_HKEY);
    } catch (err) {
      throw err;
    }
  },

  setEventModelToCache: async (eventModel) => {
    try {
      return await caching.hset(cachingKeys.EVENTS_HKEY, eventModel.eventCode, JSON.stringify(eventModel));
    } catch(err) {
      throw err;
    }
  },

  delEventModelFromCacheByEventCode: async (eventCode) => {
    try {
      return await caching.hdel(cachingKeys.EVENTS_HKEY, eventCode);
    } catch(err) {
      throw err;
    }
  },

  getConnectionStringByFreeServer: () => {
    // todo: check and get real socket server that is free.
    return 'http://localhost:6969';
  }

};
