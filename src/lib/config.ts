import process from 'node:process';

export const NODE_ENV = process.env.NODE_ENV;
export const RESEND_API_KEY = process.env.RESEND_API_KEY as string;
export const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL as string;
export const CLOUDWATCH_GROUP_NAME = process.env.CLOUDWATCH_GROUP_NAME;
export const CLOUDWATCH_REGION = process.env.CLOUDWATCH_REGION;
export const CLOUDWATCH_SECRET_KEY = process.env.CLOUDWATCH_SECRET_KEY;
export const CLOUDWATCH_ACCESS_KEY = process.env.CLOUDWATCH_ACCESS_KEY;
