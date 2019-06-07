const AbsHandler = require('./AbsHandler');

const highlightCountMax = 3; // todo: move this var to config file.

class HighlightQuestionHandler extends AbsHandler {
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
      const questionModelString = await this._caching.hget(this._cachingKeys.QUESTIONS_HKEY + eventCode, questionId);
      if (!questionModelString) {
        sendData.setError('Question not exist -> can not highlight question');
        this._sender.send(socket, sendData);
        return;
      }

      const eventModelString = await this._caching.hget(this._cachingKeys.EVENTS_HKEY, eventCode);
      if (!eventModelString) {
        sendData.setError('Event not exist -> can not highlight question');
        this._sender.send(socket, sendData);
        return;
      }

      let questionModel = JSON.parse(questionModelString);
      let eventModel = JSON.parse(eventModelString);

      if (questionModel.isHighlight) {
        eventModel.highlightCount--; if (eventModel.highlightCount < 0) eventModel.highlightCount = 0;
      } else {
        eventModel.highlightCount++;

        if (eventModel.highlightCount > highlightCountMax) {
          sendData.setError('HighlightCount is max');
          this._sender.send(socket, sendData);
          return;
        }
      }

      questionModel.isHighlight = !questionModel.isHighlight;

      await this._caching.hset(this._cachingKeys.QUESTIONS_HKEY + eventCode, questionModel.id, JSON.stringify(questionModel));
      await this._caching.hset(this._cachingKeys.EVENTS_HKEY, eventCode, JSON.stringify(eventModel));

      sendData.addParam('question', questionModel).addParam('event', eventModel);

      this._sender.broadcastInRoom(socket.roomId, sendData);

    } catch (err) {
      this._logger.error(err.message, err);

      sendData.setError(err.message);
      this._sender.send(socket, sendData);
    }
  }
}

module.exports = HighlightQuestionHandler;
