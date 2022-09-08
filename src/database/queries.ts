import config from '../config/params.config';

export const queries = {
  getAllTranCall: config.dbGetAllTranCallStatement,
  insertTranCall: config.dbInsertTranCallStatement
};
