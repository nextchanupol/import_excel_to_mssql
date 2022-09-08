import { Query } from 'express-serve-static-core';

export interface TypeRequestQuery<T extends Query> extends Express.Request {
  query: T;
}
