import { Injectable } from '@angular/core';
import { BaseExcelService, ExcelOption } from './base/base-excel.service';


export class ExcelKpiEvaluationOrgReportService extends BaseExcelService {
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
    bMinusCount: number;
    bMinusPercent: number;
    bCount: number;
    bPercent: number;
    cCount: number;
    cPercent: number;
    empCount: number;

    constructor(private docOption: ExcelKpiEvaluationOrgReportOption) {
        super({
            data: docOption.data,
            filter: docOption.filter,
            sheetName: 'Báo cáo',
            title: 'Báo cáo đánh giá KPI theo phòng ban',
            colWidths: [8, 20, 20, 20, 40, 25, 15, 25, 15, 40],
            header: docOption.headers,
            fileName: 'KPI-phong-ban',
        });
    }

    addHeaders() {
        // first row
        const firstRow = this.worksheet.addRow(['STT', 'Mã nhân viên','Họ và tên', 'Chức danh công việc', 'Phòng/Ban',
            'Kết quả đánh giá nhân viên tháng ' + this.month + ' năm ' + this.year, 
            '','Kết quả đánh quản lý giá tháng ' + this.month + ' năm ' + this.year, '',
            'Kết quả đánh nhân sự giá tháng ' + this.month + ' năm ' + this.year, '',
            'Phê duyệt của Lãnh đạo Tập đoàn ' + this.month + ' năm ' + this.year, '', 'Kêt quả KPI', '', 'Ghi chú']);
        const secondRow = this.worksheet.addRow(['', '', '', '', '',
            'Mức độ hoàn thành (%)', 'Xếp loại','Mức độ hoàn thành (%)', 'Xếp loại','Mức độ hoàn thành (%)', 'Xếp loại',
            'Mức độ hoàn thành (%)', 'Xếp loại', 'Mức độ hoàn thành (%)', 'Xếp loại', '']);

        firstRow.eachCell((cell, number) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF99CC00' },
                bgColor: { argb: 'FF808000' },
            };
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
        });

        secondRow.eachCell((cell, number) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF99CC00' },
                bgColor: { argb: 'FF808000' },
            };
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
        });

        // merge cell
        secondRow.getCell(1).merge(firstRow.getCell(1));
        secondRow.getCell(2).merge(firstRow.getCell(2));
        secondRow.getCell(3).merge(firstRow.getCell(3));
        secondRow.getCell(4).merge(firstRow.getCell(4));
        secondRow.getCell(5).merge(firstRow.getCell(5));
        secondRow.getCell(16).merge(firstRow.getCell(16));
        firstRow.getCell(7).merge(firstRow.getCell(6));
        firstRow.getCell(9).merge(firstRow.getCell(8));
        firstRow.getCell(11).merge(firstRow.getCell(10));
        firstRow.getCell(13).merge(firstRow.getCell(12));
        firstRow.getCell(15).merge(firstRow.getCell(14));
    }

    addBody() {
        if (this.excelOption.data == null) { return; }

        this.excelOption.data.forEach(d => {
            const row = this.worksheet.addRow(d);

            row.eachCell((cell, colNum) => {
                cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
                cell.alignment = { vertical: 'middle', horizontal: 'center' };
            });

            // phong ban
            if (d[0] == null) {
                row.getCell(2).merge(row.getCell(1));
                row.getCell(3).merge(row.getCell(1));
                row.getCell(4).merge(row.getCell(1));
                row.getCell(5).merge(row.getCell(1));
                row.getCell(6).merge(row.getCell(1));
                row.getCell(7).merge(row.getCell(1));
                row.getCell(8).merge(row.getCell(1));
                row.getCell(9).merge(row.getCell(1));
                row.getCell(10).merge(row.getCell(1));
                row.getCell(11).merge(row.getCell(1));
                row.getCell(12).merge(row.getCell(1));
                row.getCell(13).merge(row.getCell(1));
                row.getCell(14).merge(row.getCell(1));
                row.getCell(15).merge(row.getCell(1));
                row.getCell(16).merge(row.getCell(1));
                row.getCell(1).value = d[2];
                row.getCell(1).alignment = { vertical: 'middle', horizontal: 'left' };
                row.getCell(1).border = {
                    top: { style: 'thin' }, left: { style: 'thin' },
                    bottom: { style: 'thin' }, right: { style: 'thin' }
                };
                row.getCell(1).font = { bold: true };
            }
        });

        this.worksheet.addRow([]);

        // bang tong hop theo loai
        const summaryArr = [['', 'Bảng xếp loại', '', 'Số CBNV', 'Xếp loại theo tỉ lệ']
            , ['', 'Loại A+ (Hoàn thành xuất sắc)', '', this.aPlusCount, this.aPlusPercent]
            , ['', 'Loại A (Hoàn thành nhiệm vụ)', '', this.aCount, this.aPercent]
            , ['', 'Loại A- (Cơ bản hoàn thành nhiệm vụ)', '', this.aMinusCount, this.aMinusPercent]
            , ['', 'Loại B+ (Cần cải thiện)', '', this.bPlusCount, this.bPlusPercent]
            , ['', 'Loại B (Cần cải thiện)', '', this.bCount, this.bPercent]
            , ['', 'Loại B- (Cần cải thiện)', '', this.bMinusCount, this.bMinusPercent]
            , ['', 'Loại C (Không đạt yêu cầu)', '', this.cCount, this.cPercent]
            , ['', 'Tổng số CBNV đã đánh giá', '', this.empCount, '']];

        let idx = 1;
        summaryArr.forEach(d => {
            const row = this.worksheet.addRow(d);
            row.getCell(3).merge(row.getCell(2));
            let idx1 = 1;
            row.eachCell((cell, colNum) => {
                if (idx1 !== 1) {
                    cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
                    cell.alignment = { vertical: 'middle', horizontal: 'center' };

                    if (idx === 1 || idx === 8) {
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: 'FFFABF8F' },
                            bgColor: { argb: 'FF808000' },
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


export interface ExcelKpiEvaluationOrgReportOption {
    data: any[][];
    filter: KpiEvaluationOrgReportFilter;
    headers: string[];
}
export interface KpiEvaluationOrgReportFilter {
}