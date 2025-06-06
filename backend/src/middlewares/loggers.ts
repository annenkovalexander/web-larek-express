import winston from 'winston';
import * as expressWinston from 'express-winston';

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: '/app/logs/request.log' }),
  ],
  format: winston.format.json(),
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: '/app/logs/error.log' }),
  ],
  format: winston.format.json(),
});
