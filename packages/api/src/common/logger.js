import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize, align } = winston.format;

const loggerLevel = process.env?.LOG_LEVEL ?? 'info';
const logger = winston.createLogger({
  level: loggerLevel,
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    align(),
    printf((info) => `[${info.timestamp}] [LF-BACKEND] - ${info.level} - ${info.message}`),
  ),
  transports: [
    new DailyRotateFile({ filename: './logs/error.log', level: 'error' }),
    new DailyRotateFile({ filename: './logs/combined.log' }),
    new winston.transports.Console({ level: loggerLevel }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

console.log = (...args) => logger.info.call(logger, ...args);
console.info = (...args) => logger.info.call(logger, ...args);
console.warn = (...args) => logger.warn.call(logger, ...args);
console.error = (...args) => logger.error.call(logger, ...args);
console.debug = (...args) => logger.debug.call(logger, ...args);

export default logger;
