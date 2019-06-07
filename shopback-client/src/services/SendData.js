class SendData {
  constructor(command) {
    this._cmd = command;
    this._params = {};
  }

  getCmd() {
    return this._cmd;
  }

  getParams() {
    return this._params;
  }

  addParam(key, value) {
    this._params[key] = value;
    return this;
  }

  addParams(params) {
    this._params = { ...this._params, ...params };
  }
}

module.exports = SendData;
