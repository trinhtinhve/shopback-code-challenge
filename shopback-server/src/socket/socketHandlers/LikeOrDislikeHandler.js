const AbsHandler = require('./AbsHandler');

class LikeOrDislikeHandler extends AbsHandler {
  async _checkParams(params, err) {
    const { eventCode, questionId, like } = params;

    if (!eventCode || !questionId || !like) {
      return 'Params invalid';
    }

    return '';
  }

  async _doHandleMessage(socket, params, sendData) {
    const { eventCode, questionId, like } = params;

    try {
      const questionModelString = await this._caching.hget(this._cachingKeys.QUESTIONS_HKEY + eventCode, questionId);
      if (!questionModelString) {
        sendData.setError('Question not exist -> can not edit question');
        this._sender.send(socket, sendData);
        return;
      }

      let questionModel = JSON.parse(questionModelString);
      if (like > 0) questionModel.likeCount++;
      else questionModel.dislikeCount++;

      await this._caching.hset(this._cachingKeys.QUESTIONS_HKEY + eventCode, questionModel.id, JSON.stringify(questionModel));

      sendData.addParam('question', questionModel);
      this._sender.broadcastInRoom(socket.roomId, sendData);

    } catch (err) {
      this._logger.error(err.message, err);

      sendData.setError(err.message);
      this._sender.send(socket, sendData);
    }
  }
}

module.exports = LikeOrDislikeHandler;
