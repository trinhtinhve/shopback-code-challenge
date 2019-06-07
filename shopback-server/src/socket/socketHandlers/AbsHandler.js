const logger = require('../../utils/Logger');
const sender = require('./../Sender');
const caching = require('./../../services/Caching');
const cachingKeys = require('./../../contansts/CachingKeys');
const SendData = require('./../SendData');

class AbsHandler {
  constructor(cmd) {
    this._cmd = cmd;
    this._sender = sender;
    this._logger = logger;
    this._caching = caching;
    this._cachingKeys = cachingKeys;
  }

  _makeASendDataObject() {
    return new SendData(this._cmd);
  }

  async _checkParams(params) {
    return '';
  }

  async _doHandleMessage(socket, params, sendData) {
    throw new Error('Not implement handle function yet: ' + this._cmd);
  }

  async handleMessage(socket, params) {
    console.log(`handle message: ${this._cmd}`);

    let sendData = this._makeASendDataObject();

    try {
      const err = await this._checkParams(params);

      if (err !== '') {
        sendData.setError(err);
        this._sender.send(socket, sendData);
        return;
      }

      await this._doHandleMessage(socket, params, sendData);

    } catch (err) {
      this._logger.error(err.message, err);

      sendData.setError(err.message);
      this._sender.send(socket, sendData);
    }
  }
}

module.exports = AbsHandler;
