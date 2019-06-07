import openSocket from 'socket.io-client';
import SendData from './SendData';

class SocketService {
  constructor() {
    this._connectionString = '';
    this._socket = null;
  }

  init(connectionString, initSuccess) {
    this._connectionString = connectionString;
    this._socket = openSocket(this._connectionString);

    this._socket.on('connect', () => {
      console.log('connected');
      initSuccess();
    });
  }

  registerHandler(cmd, callback) {
    this._socket.on(cmd, callback);
  }

  makeSendData(cmd) {
    return new SendData(cmd);
  }

  send(sendData) {
    this._socket.emit(sendData.getCmd(), sendData.getParams());
  }

  destroy() {
    if (this._socket) {
      this._socket.disconnect();
      this._socket.close();
      this._socket = null;

      this._connectionString = '';
    }
  }

}

const socketService = new SocketService();
export default socketService;
