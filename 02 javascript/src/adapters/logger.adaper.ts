import winston, { format } from "winston";

const {combine, timestamp, json} = format

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(),  json()),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: './logs/combined.log' }),
  ],
});

export const buildLogger =(service: string)=>{
    return {
        log: (message: string)=>{
            logger.log('info', {message, service})
        },
        error: (error: string)=>{
          logger.error('error', {error, service})
      }
    }
}