
import { Workbook, Worksheet } from 'exceljs';
import * as fs from 'file-saver';

// @Injectable({
//   providedIn: 'root'
// })
export abstract class BaseExcelService {
  workbook: Workbook;
  worksheet: Worksheet;

  constructor(protected excelOption: ExcelOption) {
    this.workbook = new Workbook();
  }

  addWorksheet() {
    this.worksheet = this.workbook.addWorksheet(this.excelOption.sheetName);
  }

  protected addTitle() {
    const title = this.worksheet.addRow([this.excelOption.title]);
    title.font = { name: 'Arial', family: 4, size: 16, underline: 'double', bold: true };
    this.worksheet.addRow([]);
  }

  abstract addFilterSubTitle();

  protected addHeaders() {
    if (this.excelOption.header != null) {
      const headerRows = this.worksheet.addRow(this.excelOption.header);

      headerRows.eachCell((cell, number) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFFF' },
          bgColor: { argb: 'CCFFFF' },
        };
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });
    }
  }

  setCollumnWidth() {
    if (this.excelOption.colWidths == null) {
      return;
    }

    for (let i = 0; i < this.excelOption.colWidths.length; i++) {
      const element = this.excelOption.colWidths[i];
      this.worksheet.getColumn(i + 1).width = this.excelOption.colWidths[i];
    }
  }

  protected addBody() {
    if (this.excelOption.data == null) { return; }

    this.excelOption.data.forEach(d => {
      const row = this.worksheet.addRow(d);
      row.eachCell((cell, colNum) => {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });
    });

    this.worksheet.addRow([]);
  }

  saveFile() {
    this.workbook.xlsx.writeBuffer().then((d) => {
      const blob = new Blob([d], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, this.excelOption.fileName + '.xlsx');
    });
  }

  exportExcel() {
    this.addWorksheet();
    this.addTitle();
    this.addFilterSubTitle();
    this.addHeaders();
    this.addBody();
    this.setCollumnWidth();
    this.saveFile();
  }
}

export class ExcelOption {
  data: string[][];
  filter?: any;
  sheetName: string;
  title: string;
  colWidths?: number[];
  header: string[];
  fileName: string;
}
