import winston, { format } from 'winston';
import 'winston-daily-rotate-file';

const transport = new winston.transports.DailyRotateFile({
  maxFiles: '14d',
  level: 'info',
  dirname: 'logs/server/daily',
  datePattern: 'YYYY-MM-DD',
  filename: '%DATE%.log'
});

const logger = winston.createLogger({
  format: format.combine(format.timestamp(), format.simple()),
  colorize: true,
  transports: [
    new winston.transports.File({
      filename: 'logs/server/error.log',
      level: 'error',
      handleExceptions: true
    }),
    new winston.transports.File({
      filename: 'logs/server/all.log',
      level: 'info',
      handleExceptions: true
    }),

    new winston.transports.Console({
      level: 'debug',
      json: false,
      handleExceptions: true
    }),
    transport
  ]
});

const morganLogger = winston.createLogger({
  format: format.combine(format.simple()),
  transports: [
    new winston.transports.File({
      filename: 'logs/requests/all.log',
      level: 'debug',
      handleExceptions: true
    }),
    new winston.transports.Console({
      level: 'debug',
      json: false,
      handleExceptions: true
    }),
    new winston.transports.DailyRotateFile({
      maxFiles: '14d',
      level: 'info',
      dirname: 'logs/requests/daily',
      datePattern: 'YYYY-MM-DD',
      filename: '%DATE%.log'
    })
  ]
});

export const logStream = {
  write(message) {
    morganLogger.info(message.toString());
  }
};

export default logger;
