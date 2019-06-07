const AbsHandler = require('./AbsHandler');

class GetQuestionsHandler extends AbsHandler {
  _checkParams(params) {
    if (params.eventCode === undefined) {
      return 'Event code is not exist!';
    }

    return '';
  }

  async _doHandleMessage(socket, params, sendData) {
    let questions = null;

    try {
      questions = await this._caching.hgetall(this._cachingKeys.QUESTIONS_HKEY + params.eventCode);
    } catch (err) {
      sendData.setError('Something went wrong with get questions from cache!');
      this._sender.send(socket, sendData);

      this._logger.error(err.message, err);
      return;
    }

    let questionsResult = [];
    if (questions) {
      Object.values(questions).forEach((questionString) => {
        let question = JSON.parse(questionString);
        questionsResult.push(question);
      });
    }

    sendData.addParam('questions', questionsResult);
    this._sender.send(socket, sendData);
  }
}

module.exports = GetQuestionsHandler;
