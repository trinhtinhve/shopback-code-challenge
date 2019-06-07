const fs = require('fs');
const winston = require('winston');
require('winston-daily-rotate-file');

const loggerConfig = require('./../config').loggerConfig;
const dateUtils = require('./DateUtils');

class Logger {
  constructor() {
    const { generalLogFileLevel, consoleLog } = loggerConfig;
    const datePattern = 'yyyy-MM-dd-HH.log';

    const logDir = './logs';
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    this.logger = new winston.Logger({
      transports: [
        new winston.transports.DailyRotateFile({
          filename: './logs/mainlog-',
          datePattern: datePattern,
          timestamp: dateUtils.formatDateTime,
          level: generalLogFileLevel,
          localTime: true
        })
      ],
      exitOnError: false
    });

    this.errorLogger = new winston.Logger({
      transports: [
        new winston.transports.DailyRotateFile({
          filename: './logs/error-',
          datePattern: datePattern,
          timestamp: dateUtils.formatDateTime,
          level: 'error',
          localTime: true
        })
      ],
      exceptionHandlers: [
        new winston.transports.File({
          filename: './logs/exceptions.log',
          timestamp: dateUtils.formatDateTime(),
          localTime: true
        })
      ],
      exitOnError: false
    });

    if (consoleLog) {
      this.logger.add(winston.transports.Console, {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
      });

      this.errorLogger.add(winston.transports.Console, {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
      });
    }
  }

  info(msg) {
    this.logger.info(msg);
  }

  error(msg, err = null) {
    this.errorLogger.error(msg, err);
  }

  debug(msg) {
    this.logger.debug(msg);
  }
}

module.exports = new Logger();
