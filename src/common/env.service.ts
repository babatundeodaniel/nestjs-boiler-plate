import * as dotenv from 'dotenv';
import * as fs from 'fs';

export interface EnvData {
  // application
  APP_ENV: string;
  APP_DEBUG: boolean;

  APP_PORT: string;
  APP_NAME: string;
  APP_DESC: string;
  APP_VER: string;
  APP_TAG: string;

  // database
  DB_TYPE: 'mysql' | 'mariadb';
  DB_HOST?: string;
  DB_USERNAME: string;
  DB_PORT?: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;

  // INTERNAL API Calls
  BASE_URL: string;
  API_KEY: string;

  FRONT_BASE_URL: string;

  // Email Settings
  SENDER_NAME: string;
  SENDER_EMAIL: string;
  COMPANY_NAME: string;
  ADDRESS_1: string;
  ADDRESS_2: string;

  // Security
  AUTH_SECRET_KEY: string;
}

export class EnvService {
  private vars: EnvData;

  constructor() {
    const environment = process.env.NODE_ENV || 'development';
    const env_file = fs.existsSync(`.${environment}.env`)
      ? `.${environment}.env`
      : `.env`;
    const data: any = dotenv.parse(fs.readFileSync(env_file));

    data.APP_ENV = environment;
    data.APP_DEBUG = data.APP_DEBUG === 'true' ? true : false;
    data.DB_PORT = parseInt(data.DB_PORT);

    data.APP_PORT = parseInt(data.APP_PORT) || 3000;

    this.vars = data as EnvData;
  }

  read(): EnvData {
    return this.vars;
  }

  isDev(): boolean {
    return this.vars.APP_ENV === 'development';
  }

  isProd(): boolean {
    return this.vars.APP_ENV === 'production';
  }
}
