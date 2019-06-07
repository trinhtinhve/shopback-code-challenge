const jwt = require('jsonwebtoken');
const { jwtKey, jwtExpiresIn } = require('./../config');
const adminHelper = require('./../helpers/AdministratorHelper');

const validateToken = async (tokenDecoded, request, callback) => {
  const { authorization: token } = request.headers;

  const model = await adminHelper.getAdminModelFromCacheByAdminName(tokenDecoded.name);

  if (!model || model.token !== token) {
    return callback(null, false);
  }

  return callback(null, true, tokenDecoded);
};

module.exports = {
  apply: (server) => {
    server.auth.strategy('jwt', 'jwt', {
      key: jwtKey,
      validateFunc: validateToken,
      verifyOptions: { algorithms: ['HS256'] }
    });

    server.auth.default('jwt');
  },

  generateToken: (name) => {
    return jwt.sign({ name }, jwtKey, { algorithm: 'HS256', expiresIn: jwtExpiresIn });
  }
};
