import { Injectable } from '@angular/core';
import { BaseExcelService, ExcelOption } from './base/base-excel.service';


export class ExcelViewStatisticsReportService extends BaseExcelService {
    month: string;
    year: string;
    aPlusCount: number;
    aPlusPercent: number;
    aCount: number;
    aPercent: number;
    aMinusCount: number;
    aMinusPercent: number;
    bPlusCount: number;
    bPlusPercent: number;
    bCount: number;
    bPercent: number;
    bMinusCount: number;
    bMinusPercent: number;
    cCount: number;
    cPercent: number;
    empCount: number;

    constructor(private docOption: ExcelViewStatisticsReportOption) {
        super({
            data: docOption.data,
            filter: docOption.filter,
            sheetName: 'Báo cáo',
            title: 'BẢNG TỔNG HỢP KẾT QUẢ ĐÁNH GIÁ CBNV BRG',
            colWidths: [8, 20, 10, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
            header: docOption.headers,
            fileName: 'KPI-tong-hop',
        });
    }

    addTitle() {
        const title = this.worksheet.addRow(['BẢNG TỔNG HỢP KẾT QUẢ ĐÁNH GIÁ CBNV BRG', '', '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '']);
        const title1 = this.worksheet.addRow(['THÁNG ' + this.month + ' NĂM ' + this.year, '', '', '', '', '', '', '', '', '', '',
            '', '', '', '', '', '']);
        title.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };
        title1.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };
        for (let i = 2; i < 16; i++) {
            title.getCell(i).merge(title.getCell(1));
            title1.getCell(i).merge(title1.getCell(1));
        }
        title1.font = title.font = { name: 'Times New Roman', family: 4, size: 14, underline: 'none', bold: true };
        this.worksheet.addRow([]);
    }

    addHeaders() {
        // first row
        const firstRow = this.worksheet.addRow(['STT', 'Phòng/Ban', 'Tổng số CBNV', 'Xếp loại A+', '', 'Xếp loại A', ''
            , 'Xếp loại A-', '', 'Xếp loại B+', '', 'Xếp loại B', '', 'Xếp loại B-', '', 'Xếp loại C', '']);
        const secondRow = this.worksheet.addRow(['', '', '', 'Số lượng', 'Tỷ lệ', 'Số lượng', 'Tỷ lệ', 'Số lượng', 'Tỷ lệ', 'Số lượng'
            , 'Tỷ lệ', 'Số lượng', 'Tỷ lệ', 'Số lượng', 'Tỷ lệ', 'Số lượng', 'Tỷ lệ']);

        firstRow.eachCell((cell, number) => {
            this.SetHeader(cell);
        });

        secondRow.eachCell((cell, number) => {
            this.SetHeader(cell);
        });

        // merge cell
        secondRow.getCell(1).merge(firstRow.getCell(1));
        secondRow.getCell(2).merge(firstRow.getCell(2));
        secondRow.getCell(3).merge(firstRow.getCell(3));

        firstRow.getCell(5).merge(firstRow.getCell(4));
        firstRow.getCell(7).merge(firstRow.getCell(6));
        firstRow.getCell(9).merge(firstRow.getCell(8));
        firstRow.getCell(11).merge(firstRow.getCell(10));
        firstRow.getCell(13).merge(firstRow.getCell(12));
        firstRow.getCell(15).merge(firstRow.getCell(14));
        firstRow.getCell(17).merge(firstRow.getCell(16));
    }

    private SetHeader(cell) {
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFAC090' },
            bgColor: { argb: 'FFFAC090' },
        };
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    }

    addBody() {
        if (this.excelOption.data == null) { return; }

        this.excelOption.data.forEach(d => {
            const row = this.worksheet.addRow(d);

            row.eachCell((cell, colNum) => {
                cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
                cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
            });
        });

        // footer
        const footerRow1 = this.worksheet.addRow(['Tổng số CBNV đã đánh giá', '', this.empCount, this.aPlusCount, this.aPlusPercent + '%'
            , this.aCount, this.aPercent + '%', this.aMinusCount, this.aMinusPercent + '%', this.bPlusCount, this.bPlusPercent + '%'
            , this.bCount, this.bPercent + '%',this.bMinusCount, this.bMinusPercent + '%', this.cCount, this.cPercent + '%']);
        const footerRow2 = this.worksheet.addRow(['Tỷ lệ xếp loại chung', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']);
        footerRow1.getCell(2).merge(footerRow1.getCell(1));
        footerRow2.getCell(2).merge(footerRow2.getCell(1));
        for (let i = 3; i < 18; i++) {
            footerRow2.getCell(i).merge(footerRow1.getCell(i));
        }
        footerRow1.eachCell((cell, colNum) => {
        });
        for (let i = 1; i < 18; i++) {
            footerRow2.getCell(i).border = footerRow1.getCell(i).border = {
                top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }
                , right: { style: 'thin' }
            };
            footerRow2.getCell(i).alignment = footerRow1.getCell(i).alignment = {
                vertical: 'middle',
                horizontal: 'center', wrapText: true
            };
        }
        for (let i = 1; i < 3; i++) {
            footerRow2.getCell(i).fill = footerRow1.getCell(i).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFAC090' },
                bgColor: { argb: 'FFFAC090' },
            };
        }

        this.worksheet.addRow([]);

        // bang tong hop theo loai
        const row1 = this.worksheet.addRow(['', 'Bảng xếp loại', 'Kết quả đánh giá tháng ' + this.month + ' năm ' + this.year, '']);
        const row2 = this.worksheet.addRow(['', '', 'Số CBNV', 'Xếp loại theo tỉ lệ']);
        row1.getCell(4).merge(row1.getCell(3));
        row2.getCell(2).merge(row1.getCell(2));
        for (let i = 2; i < 6; i++) {
            row2.getCell(i).alignment = row1.getCell(i).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
            row2.getCell(i).border = row1.getCell(i).border = {
                top: { style: 'thin' }, left: { style: 'thin' },
                bottom: { style: 'thin' }, right: { style: 'thin' }
            };
            row2.getCell(i).fill = row1.getCell(i).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFAC090' },
                bgColor: { argb: 'FFFAC090' },
            };
        }

        const summaryArr = [['', 'Loại A+ (Hoàn thành xuất sắc)', this.aPlusCount, this.aPlusPercent + '%']
            , ['', 'Loại A (Hoàn thành nhiệm vụ)', this.aCount, this.aPercent + '%']
            , ['', 'Loại A- (Cơ bản hoàn thành nhiệm vụ)', this.aMinusCount, this.aMinusPercent + '%']
            , ['', 'Loại B+ (Cần cải thiện)', this.bPlusCount, this.bPlusPercent + '%']
            , ['', 'Loại B (Cần cải thiện)', this.bCount, this.bPercent + '%']
            , ['', 'Loại B- (Cần cải thiện)', this.bMinusCount, this.bMinusPercent + '%']
            , ['', 'Loại C (Không đạt yêu cầu)', this.cCount, this.cPercent + '%']
            , ['', 'Tổng số CBNV đã đánh giá', this.empCount, '100%']];

        let idx = 1;
        summaryArr.forEach(d => {
            const row = this.worksheet.addRow(d);
            let idx1 = 1;
            row.eachCell((cell, colNum) => {
                if (idx1 !== 1) {
                    cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
                    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

                    if (idx === 8) {
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: 'FFFAC090' },
                            bgColor: { argb: 'FFFAC090' },
                        };
                    }
                }
                idx1++;
            });

            idx++;
        });
    }

    addFilterSubTitle() {
    }
}


export interface ExcelViewStatisticsReportOption {
    data: any[][];
    filter: ViewStatisticsReportFilter;
    headers: string[];
}
export interface ViewStatisticsReportFilter {
}