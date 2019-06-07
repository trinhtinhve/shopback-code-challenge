const caching = require('./../services/Caching');
const cachingKeys = require('./../contansts/CachingKeys');

module.exports = {
  getAdminModelFromCacheByAdminName: async (adminName) => {
    try {
      const adminModel = await caching.hget(cachingKeys.ADMINS_HKEY, adminName);
      if (adminModel) {
        return JSON.parse(adminModel);
      } else {
        return null;
      }
    } catch(err) {
      throw err;
    }
  },

  setAdminModelToCache: async (adminModel) => {
    try {
      return await caching.hset(cachingKeys.ADMINS_HKEY, adminModel.email, JSON.stringify(adminModel));
    } catch(err) {
      throw err;
    }
  },

  delAdminModelFromCacheByAdminName: async (adminName) => {
    try {
      return await caching.hdel(cachingKeys.ADMINS_HKEY, adminName);
    } catch(err) {
      throw err;
    }
  },

};
