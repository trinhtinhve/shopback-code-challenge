const redis = require('redis');
const handleError = require('hapi-error').handleError;
const SocketIO = require('socket.io');
const logger = require('../utils/Logger');

const { port, host } = require('../config/index').cachingConfig;

const registerHandlers = require('./registerHandlers');
const sender = require('./Sender');
const UserModel = require('./models/UserModel');

class WebSocket {
  constructor() {
    this.pub = null;
    this.sub = null;
    this.io = null;
  }

  _onConnection(socket) {
    console.log(`socket ${socket.id} connected!`);

    socket.user = new UserModel();
    registerHandlers(socket);

    socket.on('disconnect', function () {
      console.log(`socket ${socket.id} disconnected!`);
    });

    socket.on('error', function (error) {
      handleError(error, error.stack);
    });
  }

  initWithPubSub(listener, initSuccess) {
    this.pub = redis.createClient(port, host);
    this.sub = redis.createClient(port, host);

    const self = this;

    self.pub.on('ready', () => {
      self.sub.on('ready', () => {
        logger.info('PUB - SUB Ready');

        self.sub.subscribe('pubsub');

        self.io = SocketIO.listen(listener);
        sender.setIO(self.io);

        self.io.on('connection', self._onConnection.bind(self));

        self.sub.on('message', function (channel, msg) {
          self.io.send(JSON.parse(msg));
        });

        return setTimeout(() => {
          logger.info('WebSocket ready');
          return initSuccess();
        }, 300);
      });
    });
  }

  init(listener, initSuccess) {
    this.io = SocketIO.listen(listener);
    sender.setIO(this.io);

    this.io.on('connection', this._onConnection);

    return setTimeout(() => {
      logger.info('WebSocket ready');
      return initSuccess();
    }, 300);
  }

  publish(msg) {
    this.pub.publish('pubsub', JSON.stringify(msg));
  }

}

module.exports = new WebSocket();
