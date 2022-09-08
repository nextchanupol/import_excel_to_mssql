import config from './params.config';

export const dbConfig = {
  user: config.dbUser,
  password: config.dbPassword,
  server: config.dbServer,
  database: config.dbName,
  options: {
    trustServerCertificate: true,
    encrypt: false
  }
};
