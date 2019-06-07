class Sender {
  constructor() {
    this.io = null;
  }

  setIO(io) {
    this.io = io;
  }

  send(socket, sendData) {
    // socket.send(sendData.getSendDataObject());
    socket.emit(sendData.getCmd(), sendData.getParams());
  }

  broadcastInRoom(roomId, sendData) {
    this.io.in(roomId).emit(sendData.getCmd(), sendData.getParams());
  }
}

module.exports = new Sender();
