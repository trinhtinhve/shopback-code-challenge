const AbsHandler = require('./AbsHandler');

class JoinRoomHandler extends AbsHandler {
  async _checkParams(params) {
    try {
      const eventModelString = await this._caching.hget(this._cachingKeys.EVENTS_HKEY, params.eventCode);
      if (!eventModelString) {
        return 'Event not exist!';
      }

      const eventModel = JSON.parse(eventModelString);

      const now = Date.now();
      if (eventModel.startTime > now) return 'Event not start yet';
      if (eventModel.endTime < now) return 'Event ended';

    } catch (err) {
      this._logger.error(err.message, err);
      return err.message;
    }

    return '';
  }

  _doHandleMessage(socket, params, sendData) {
    if (socket.roomId) socket.leave(socket.roomId);

    socket.roomId = params.eventCode;
    socket.join(socket.roomId);

    this._sender.send(socket, sendData);
  }
}

module.exports = JoinRoomHandler;
