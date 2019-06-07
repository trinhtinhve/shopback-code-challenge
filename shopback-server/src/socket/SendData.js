class SendData {
  constructor(command) {
    this._cmd = command;
    this._params = {
      error: '',
    };
  }

  getCmd() {
    return this._cmd;
  }

  setCmd(cmd) {
    this._cmd = cmd;
  }

  getParams() {
    return this._params;
  }

  setError(error) {
    this._params.error = error;
  }

  addParam(key, value) {
    this._params[key] = value;
    return this;
  }

  addParams(params) {
    this._params = { ...this._params, ...params };
  }

  // getSendDataObject() {
  //   return {
  //     cmd: this._cmd,
  //     params: this._params
  //   };
  // }
}

module.exports = SendData;
