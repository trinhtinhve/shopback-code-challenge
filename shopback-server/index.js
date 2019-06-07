const Hapi = require('hapi');
const Blipp = require('blipp');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const HapiAuthJwt2 = require('hapi-auth-jwt2');
const Handlebars = require('handlebars');
const Chalk = require('chalk');
const Good = require('good');

const webSocket = require('./src/socket/WebSocket');

const logger = require('./src/utils/Logger');
const { serverHost, serverPort } = require('./src/config');
const jwtAuth = require('./src/utils/JwtAuth');
const { routes } = require('./src/routes');

let swaggerOptions = {
  info: {
    title: 'SHOPBACK Code Challenge',
    description: 'This is a API document of SHOPBACK Test.',
    version: '0.0.1'
  },
  tags: [{
    name: 'event',
    description: 'APIs for Event Controller'
  }, {
    name: 'administrator',
    description: 'APIs for Administrator Controller'
  }],
  grouping: 'tags',
  jsonEditor: true,
  documentationPage: false,
  swaggerUI: false,
  debug: true,
  validatorUrl: null,
  expanded: 'none',
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  security: [{ jwt: [] }]
};

const goodOptions = {
  ops: {
    interval: 1000
  },
  reporters: {
    myConsoleReporter: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{ log: '*', response: '*' }]
    }, {
      module: 'good-console'
    }, 'stdout']
  }
};

const server = new Hapi.Server();
server.connection(
  {
    host: serverHost,
    port: serverPort,
    routes: { cors: true }
  }
);

const formatLogEvent = function(event) {
  if (event.tags.error) {
    console.log(`[${event.tags}], ${Chalk.red(event.data)}`);
  } else {
    console.log(`[${event.tags}], ${Chalk.green(event.data)}`);
  }
};
server.on('log', formatLogEvent);

server.register(
  [
    HapiAuthJwt2,
    Inert,
    Vision,
    Blipp, {
      register: HapiSwagger,
      options: swaggerOptions
    }, {
      register: Good,
      options: goodOptions
    }
  ],
  (err) => {
    if (err) throw err;

    jwtAuth.apply(server);

    server.views({
      engines: {
        html: Handlebars
      },
      relativeTo: __dirname,
      path: './dist',
    });

    server.route([
      {
        method: 'GET',
        path: '/',
        config: {
          auth: false,
          handler: (request, reply) => {
            reply('Welcome SHOPBACK Code Challenge APIs');
          }
        },
      },
      {
        method: 'GET',
        path: '/{param*}',
        config: {
          auth: false,
          handler: {
            directory: {
              path: 'public'
            }
          }
        },
      },
      ...routes
    ]);
  }
);

server.start((err) => {
  if (err) throw err;

  webSocket.init(server.listener, () => {
    logger.info('Server running at: ' + server.info.uri);
  });

});
