const AbsHandler = require('./AbsHandler');
const jwt = require('jsonwebtoken');

const adminHelper = require('./../../helpers/AdministratorHelper');
const { jwtKey } = require('./../../config');

class JoinRoomWithAdminRoleHandler extends AbsHandler {
  async _checkParams(params) {
    const { token, eventCode } = params;
    if (!token || !eventCode) {
      return 'Params invalid';
    }

    const decoded = jwt.verify(token, jwtKey);
    const email = decoded.name;

    try {
      const adminModel = await adminHelper.getAdminModelFromCacheByAdminName(email);
      if (!adminModel || adminModel.token !== token) {
        return 'This Admin not login yet or token invalid';
      }

      const eventModel = await this._caching.hget(this._cachingKeys.EVENTS_HKEY, eventCode);
      if (!eventModel) {
        return 'Event not exist!';
      }
    } catch (err) {
      this._logger.error(err.message, err);
      return err.message;
    }

    return '';
  }

  async _doHandleMessage(socket, params, sendData) {
    if (socket.roomId) socket.leave(socket.roomId);

    socket.roomId = params.eventCode;
    socket.user.isAdmin = true;
    socket.join(socket.roomId);

    this._sender.send(socket, sendData);
  }
}

module.exports = JoinRoomWithAdminRoleHandler;
