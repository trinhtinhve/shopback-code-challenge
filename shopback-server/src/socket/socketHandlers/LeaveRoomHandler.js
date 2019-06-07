const AbsHandler = require('./AbsHandler');

class LeaveRoomHandler extends AbsHandler {
  async _doHandleMessage(socket, params, sendData) {
    if (socket.roomId) socket.leave(socket.roomId);
    this._sender.send(socket, sendData);
  }
}

module.exports = LeaveRoomHandler;
