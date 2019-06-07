module.exports = {
  serverHost: '127.0.0.1',
  serverPort: 6969,
  jwtKey: 'Wp6QJzmDRsr7rq7K4bzFBDzkjFWfQSscASn7GtJCLu8s3Zsdz6NF6um4UQqtLgLb',
  jwtExpiresIn: '1 day',
  loggerConfig: {
    consoleLog: true,
    generalLogFileLevel: 'debug'
  },
  cachingConfig: {
    host: '127.0.0.1',
    port: 6379
  }
};
