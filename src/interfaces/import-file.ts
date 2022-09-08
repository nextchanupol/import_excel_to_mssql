export interface IResult {
  list: IFileItem[];
}

export interface IFileItem {
  contNo: string;
  callNo: number;
  callDt: string;
  callNm: string;
  memo1: string;
  userId: string;
  inPDT: string;
  callCode: string;
  nextAPPT: string;
  officer: string;
}
