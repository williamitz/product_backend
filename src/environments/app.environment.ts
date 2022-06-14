import { registerAs } from '@nestjs/config';

export const config = registerAs('config', () => ({
  port: parseInt(process.env.SERVER_PORT, 10) || 3000,
  mode: process.env.SERVER_MODE || 'development',
  appname: 'Jarnest',

  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PSW,
    type: process.env.DB_TYPE,
  },
}));

// export const appconfig = () => ({
//   port: parseInt(process.env.SERVER_PORT, 10) || 3000,
//   appname: 'Jarnest',
// });
