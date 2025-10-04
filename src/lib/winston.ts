import winston from 'winston';
import WinstonCloudWatch from 'winston-cloudwatch';
import {
  CLOUDWATCH_ACCESS_KEY,
  CLOUDWATCH_GROUP_NAME,
  CLOUDWATCH_REGION,
  CLOUDWATCH_SECRET_KEY,
  NODE_ENV
} from '@/lib/config';

const isDev = NODE_ENV === 'development';

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    isDev
      ? winston.format.combine(
          winston.format.colorize(),
          winston.format.printf(({ level, message, timestamp, ...meta }) => {
            return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
          })
        )
      : winston.format.prettyPrint()
  ),
  transports: [
    ...(isDev ? [new winston.transports.Console()] : []),
    ...(!isDev
      ? [
          new WinstonCloudWatch({
            logGroupName: CLOUDWATCH_GROUP_NAME,
            logStreamName: `${CLOUDWATCH_GROUP_NAME}-${NODE_ENV}`,
            awsRegion: CLOUDWATCH_REGION,
            awsAccessKeyId: CLOUDWATCH_ACCESS_KEY,
            awsSecretKey: CLOUDWATCH_SECRET_KEY
          })
        ]
      : [])
  ]
});

// const logger = winston.createLogger({
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.prettyPrint()
//   ),
//   transports: [
//     new WinstonCloudWatch({
//       logGroupName: CLOUDWATCH_GROUP_NAME,
//       logStreamName: `${CLOUDWATCH_GROUP_NAME}-${NODE_ENV}`,
//       awsRegion: CLOUDWATCH_REGION,
//       awsAccessKeyId: CLOUDWATCH_ACCESS_KEY,
//       awsSecretKey: CLOUDWATCH_SECRET_KEY
//     })
//   ]
// });

export default logger;
