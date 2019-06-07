const AbsHandler = require('./AbsHandler');
const QuestionModel = require('./../models/QuestionModel');
const commands = require('./../CommandTypes');

let questionIdCounter = 1;

class MakeQuestionHandler extends AbsHandler {
  _checkParams(params) {
    if (params.username === undefined) {
      return 'Username not exist';
    }

    if (!params.question) {
      return 'Question not exit';
    }

    if (params.username === '') {
      params.username = 'Anonymous';
    }

    return '';
  }

  async _doHandleMessage(socket, params, sendData) {
    if (!socket.roomId) {
      sendData.setError('User not join room yet');
      this._sender.send(socket, sendData);
      return;
    }

    const eventCode = socket.roomId;

    let questionModel = new QuestionModel();
    questionModel.id = questionIdCounter++;
    questionModel.username = params.username;
    questionModel.question = params.question;

    try {
      await this._caching.hset(this._cachingKeys.QUESTIONS_HKEY + eventCode, questionModel.id, JSON.stringify(questionModel.toJsonObject()));

      sendData.setCmd(commands.getQuestion);
      sendData.addParam('question', questionModel.toJsonObject());
      this._sender.broadcastInRoom(socket.roomId, sendData);

    } catch (err) {
      sendData.setError('Something went wrong with set questions to cache!');
      this._sender.send(socket, sendData);

      this._logger.error(err.message, err);
    }
  }
}

module.exports = MakeQuestionHandler;
