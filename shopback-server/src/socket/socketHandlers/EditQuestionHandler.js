const AbsHandler = require('./AbsHandler');

class EditQuestionHandler extends AbsHandler {
  async _checkParams(params) {
    const { eventCode, questionId, question } = params;
    if (!eventCode || !questionId || !question) {
      return 'Event code or questionId or question is invalid';
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

    const { eventCode, questionId, question } = params;

    try {
      const questionModelString = await this._caching.hget(this._cachingKeys.QUESTIONS_HKEY + eventCode, questionId);
      if (!questionModelString) {
        sendData.setError('Question not exist -> can not edit question');
        this._sender.send(socket, sendData);
        return;
      }

      let questionModel = JSON.parse(questionModelString);
      questionModel.question = question;
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

module.exports = EditQuestionHandler;
