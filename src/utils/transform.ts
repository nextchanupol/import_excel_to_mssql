import dayjs from 'dayjs';
import Excel from 'exceljs';

export const getCellValue = (row: Excel.Row, cellIndex: number) => {
  const cell = row.getCell(cellIndex);
  //   console.log(cell.value);
  return cell.value ? cell.value.toString().trim() : '';
};

// YYYY-MM-DD
export const transformDate = (value: string) => {
  const date = new Date(value);
  const m = date.getMonth() + 1;
  const mm = m < 10 ? `0${m}` : m;
  return `${date.getFullYear()}-${mm}-${date.getDate()}`;
};

export const transformDateTime = () => {
  return dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss');
};

export const transformNumber = (value: string): number => {
  return +value.replace("'", '.');
};
