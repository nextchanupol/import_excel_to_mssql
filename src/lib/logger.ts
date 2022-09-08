import winston from 'winston';

const { combine, timestamp, colorize, printf } = winston.format;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
};

winston.addColors(colors);

const format = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  colorize({ all: true }),
  printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error'
  }),
  new winston.transports.File({ filename: 'logs/all.log' })
];

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports
});

export default Logger;
