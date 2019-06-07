const AbsHandler = require('./AbsHandler');

class DeleteQuestionHandler extends AbsHandler {
  async _checkParams(params) {
    const { eventCode, questionId } = params;
    if (!eventCode || !questionId) {
      return 'Event code or questionId is invalid';
    }

    return '';
  }

  async _doHandleMessage(socket, params, sendData) {
    if (!socket.user.isAdmin) {
      sendData.setError('Is not Admin role');
      this._sender.send(socket, sendData);
      return;
    }

    if (!socket.roomId) {
      sendData.setError('User not join room yet');
      this._sender.send(socket, sendData);
      return;
    }

    const { eventCode, questionId } = params;

    try {
      const deleted = await this._caching.hdel(this._cachingKeys.QUESTIONS_HKEY + eventCode, questionId);
      if (!deleted) {
        sendData.setError('Question not exist -> can not delete question');
        this._sender.send(socket, sendData);
        return;
      }

      sendData.addParams(params);
      this._sender.broadcastInRoom(socket.roomId, sendData);

    } catch (err) {
      this._logger.error(err.message, err);

      sendData.setError(err.message);
      this._sender.send(socket, sendData);
    }
  }
}

module.exports = DeleteQuestionHandler;
