import mssql from 'mssql';

import { dbConfig } from '../config/db.config';
import Logger from '../lib/logger';

export const dbPool = async () => {
  try {
    const pool = await mssql.connect(dbConfig);
    return pool;
  } catch (error) {
    Logger.error(error);
  }
};

export { mssql as sql };
