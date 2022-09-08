/* eslint-disable @typescript-eslint/no-var-requires */
import cors from 'cors';
import Excel from 'exceljs';
import express, { Request, Response } from 'express';
import multer from 'multer';
import * as path from 'path';

import { storage } from './config/multer.config';
import { dbPool, queries, sql } from './database';
import { IFileItem } from './interfaces/import-file';
import Logger from './lib/logger';
import morganMiddleware from './middleware/morgan.middleware';
import { TypeRequestQuery } from './utils/query-request';
import {
  getCellValue,
  transformDate,
  transformNumber
} from './utils/transform';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(morganMiddleware);

export const uploadDir = path.join(__dirname, 'uploads/');
const upload = multer({ storage });

app.get('/', function (req: TypeRequestQuery<{}>, res: Response) {
  res.sendFile(__dirname + '/index.html');
});

const importFile = async (req: Request, res: Response) => {
  //path.join(__dirname, 'uploads/xlsx/test_file_new.xlsx');
  const filePath = req.file?.path as string;
  Logger.http(req.file);
  Logger.info(`importFile_filePath: ${filePath}`);

  try {
    const workbook = new Excel.Workbook();
    const content = await workbook.xlsx.readFile(filePath);
    const worksheet = content.worksheets[0];

    const startRowIdx = 2;
    const worksheetRowCount = worksheet.rowCount;
    const rows = worksheet.getRows(startRowIdx, worksheetRowCount - 1) ?? [];

    const items: IFileItem[] = rows.map((row): IFileItem => {
      return {
        contNo: getCellValue(row, 1),
        callNo: transformNumber(getCellValue(row, 2)),
        callDt: transformDate(getCellValue(row, 3)),
        callNm: getCellValue(row, 4),
        memo1: getCellValue(row, 5),
        userId: getCellValue(row, 6),
        inPDT: getCellValue(row, 7),
        callCode: getCellValue(row, 8),
        nextAPPT: transformDate(getCellValue(row, 9)),
        officer: getCellValue(row, 10)
      };
    });
    Logger.info(`begin::importFile_items:`);
    Logger.info({ ...items });
    Logger.info(`end::importFile_items:`);

    const pool = await dbPool();

    // insert without ORDERID
    items.forEach(async (v) => {
      await pool
        ?.request()
        .input('contNo', sql.NVarChar, v.contNo)
        .input('callNo', sql.Decimal, v.callNo <= 0 ? null : v.callNo)
        .input('callDt', sql.DateTime, v.callDt)
        .input('callNm', sql.NVarChar, v.callNm)
        .input('memo1', sql.NVarChar, v.memo1)
        .input('userId', sql.NVarChar, v.userId)
        .input('inPDT', sql.NVarChar, v.inPDT)
        .input('callCode', sql.NVarChar, v.callCode)
        .input('nextAPPT', sql.DateTime, v.nextAPPT)
        .input('officer', sql.NVarChar, v.officer)
        .query(queries.insertTranCall)
        .catch((reason) => Logger.error(reason));
    });
    res.json({ result: 'ok' });
  } catch (error) {
    Logger.error(error);
    res.json({ error });
  }
};

app.post('/import', upload.single('uploaded_file'), importFile);

// start server
const port =
  process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 3000;
app.listen(port, () => console.log('Server listening on port ' + port));
