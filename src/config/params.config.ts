import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  dbServer: process.env.DB_SERVER || '',
  dbUser: process.env.DB_USER || '',
  dbPassword: process.env.DB_PASSWORD || '',
  dbName: process.env.DB_NAME || '',
  dbGetAllTranCallStatement: process.env.DB_GET_ALL_TRANCALL_STATEMENT || '',
  dbInsertTranCallStatement: process.env.DB_INSERT_TRANCALL_STATEMENT || ''
};
