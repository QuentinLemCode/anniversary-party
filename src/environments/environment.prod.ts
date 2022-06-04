import { Environment } from './environment.interface';

export const environment: Environment = {
  production: true,
  serverUrl: process.env.SERVER_URL as string
};
