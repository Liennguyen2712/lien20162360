import { Injectable } from '@angular/core';
import { BaseExcelService, ExcelOption } from './base/base-excel.service';
import { Kpi, KpiCriterionDetail } from 'src/app/models/data/data';
import { Row } from 'exceljs';


export class ExcelKpiEvaluationService extends BaseExcelService {
    month: string;
    year: string;

    empName: string;
    level1ManagerName: string;
    empJobTitle: string;
    level1ManagerJobTitle: string;
    level2ManagerName: string;
    orgName: string;
    data: Kpi;
    kpiType = '';
    criterionDetails: KpiCriterionDetail[];

    constructor(private docOption: ExcelKpiEvaluationOption, fName: string) {
        super({
            data: docOption.data,
            filter: docOption.filter,
            sheetName: 'KPI',
            title: 'BẢN KẾ HOẠCH VÀ ĐÁNH GIÁ THỰC HIỆN CÔNG VIỆC ',
            colWidths: [8, 10, 8, 12, 12, 23, 10, 10, 15],
            header: docOption.headers,
            fileName: fName,
        });
    }

    addTitle() {
        this.worksheet.addRow(['', '', '', '', '', '', '', '', '']);
        const title = this.worksheet.addRow(['', 'BẢN KẾ HOẠCH VÀ ĐÁNH GIÁ THỰC HIỆN CÔNG VIỆC', '', '', '', '', '', '', '']);
        const title1 = this.worksheet.addRow(['', 'Sử dụng trong kỳ đánh giá chính thức hàng tháng', '', '', '', '', '', '', '']);
        const title2 = this.worksheet.addRow(['', this.kpiType, '', '', '', '', '', '', '', '', '', '']);
        title.getCell(2).alignment = { vertical: 'middle', horizontal: 'center' };
        title.height = 30;
        title1.getCell(2).alignment = { vertical: 'middle', horizontal: 'center' };
        title2.getCell(2).alignment = { vertical: 'middle', horizontal: 'center' };
        title2.height = 20;
        for (let i = 3; i < 10; i++) {
            title.getCell(i).merge(title.getCell(2));
            title1.getCell(i).merge(title1.getCell(2));
            title2.getCell(i).merge(title2.getCell(2));
        }
        title.font = { name: 'Times New Roman', family: 4, size: 14, underline: 'none', bold: true };
        title2.font = title1.font = { name: 'Times New Roman', family: 4, size: 10, underline: 'none', italic: true };
    }

    addHeaders() {
        // first row
        const row1 = this.worksheet.addRow(['Họ và tên cán bộ:', '', '', this.empName, '', 'Họ tên quản lý trực tiếp:'
            , this.level1ManagerName, '', '']);
        const row2 = this.worksheet.addRow(['Chức danh:', '', '', this.empJobTitle, '', 'Chức danh:', this.level1ManagerJobTitle, '', '']);
        const row3 = this.worksheet.addRow(['Kỳ đánh giá:', '', '', 'Tháng ' + this.month + '/' + this.year, ''
            , 'Phòng ban:', this.orgName, '', '']);
        row1.height = row2.height = row3.height = 20;
        const rows = [row1, row2, row3];
        for (let i = 0; i < rows.length; i++) {
            const r = rows[i];
            r.getCell(2).merge(r.getCell(1));
            r.getCell(5).merge(r.getCell(4));
            r.getCell(8).merge(r.getCell(7));
            r.getCell(9).merge(r.getCell(7));
            r.font = { name: 'Times New Roman', family: 4, size: 10, underline: 'none' };
        }

        for (let i = 1; i < 10; i++) {
            const cell = row1.getCell(i);
            if (i === 1) {
                cell.border = { top: { style: 'thin' }, left: { style: 'thin' } };
            } else if (i === 9) {
                cell.border = { top: { style: 'thin' }, right: { style: 'thin' } };
            } else {
                cell.border = { top: { style: 'thin' } };
            }
        }
        row2.getCell(1).border = { left: { style: 'thin' } };
        row2.getCell(9).border = { right: { style: 'thin' } };
        for (let i = 1; i < 10; i++) {
            const cell = row3.getCell(i);
            if (i === 1) {
                cell.border = { left: { style: 'thin' }, bottom: { style: 'thin' } };
            } else if (i === 9) {
                cell.border = { right: { style: 'thin' }, bottom: { style: 'thin' } };
            } else {
                cell.border = { bottom: { style: 'thin' } };
            }
        }

        this.worksheet.addRow([]);
    }

    addBody() {
        if (this.excelOption.data == null) { return; }

        // ke hoach cong viec dau ky
        const planHeader =
            this.worksheet.addRow([`Kế hoạch/nhiệm vụ công việc đầu kỳ 
            (Mục tiêu/Công việc chính, gắn liền với nhiệm vụ của CBNV theo MTCV)`, '', 'TT', 'Công việc', ''
                , 'Kết quả đầu ra yêu cầu', 'Thời hạn', 'Tình trạng, kết quả thực hiện', '']);

        planHeader.getCell(5).merge(planHeader.getCell(4));
        planHeader.getCell(9).merge(planHeader.getCell(8));
        for (let i = 1; i < 10; i++) {
            const element = planHeader.getCell(i);
            element.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            element.font = { name: 'Times New Roman', family: 4, size: 10, underline: 'none', bold: true };
            element.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        }

        let j = 1;
        const planRows = [];
        this.data.taskList.forEach(element => {
            const row = this.worksheet.addRow(['', '', j.toString(), element.task, '', element.expectation
                , element.deadline ? this.getDateString(element.deadline) : '', element.result, '']);

            row.getCell(5).merge(row.getCell(4));
            row.getCell(9).merge(row.getCell(8));

            for (let k = 1; k < 10; k++) {
                const el = row.getCell(k);
                if (k === 3) {
                    el.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                }
                el.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
                el.font = { name: 'Times New Roman', family: 4, size: 10, underline: 'none' };
            }
            j++;
            planRows.push(row);
            row.height = 20;
        });
        planRows[j - 2].getCell(2).merge(planHeader.getCell(1));
        planHeader.height = 30;

        this.worksheet.addRow([]);

        // tieu chuan
        const criterialHeader1 = this.worksheet.addRow(['Tiêu chuẩn', '', 'Điểm chuẩn', 'Nhân viên tự đánh giá', '', ''
            , 'Người quản lý đánh giá (điểm quyết định nếu Khối Nhân sự và Lãnh đạo không có ý kiến khác)', '', '']);
        const criterialHeader2 = this.worksheet.addRow(['', '', '', 'Điểm đánh giá', 'Ghi chú', '', 'Điểm đánh giá', 'Ghi chú', '']);
        const criterialHeader3 = this.worksheet.addRow(['1', '', '', '2', '3', '', '4', '5', '']);

        const critSectionRows = [criterialHeader1, criterialHeader2, criterialHeader3];
        criterialHeader1.height = 45;
        criterialHeader2.height = 25;
        criterialHeader1.getCell(5).merge(criterialHeader1.getCell(4));
        criterialHeader1.getCell(6).merge(criterialHeader1.getCell(4));
        criterialHeader1.getCell(8).merge(criterialHeader1.getCell(7));
        criterialHeader1.getCell(9).merge(criterialHeader1.getCell(7));
        criterialHeader2.getCell(2).merge(criterialHeader1.getCell(1));
        criterialHeader3.getCell(3).merge(criterialHeader1.getCell(3));

        criterialHeader2.getCell(6).merge(criterialHeader2.getCell(5));
        criterialHeader2.getCell(9).merge(criterialHeader2.getCell(8));
        criterialHeader3.getCell(2).merge(criterialHeader3.getCell(1));
        criterialHeader3.getCell(6).merge(criterialHeader3.getCell(5));
        criterialHeader3.getCell(9).merge(criterialHeader3.getCell(8));

        j = 1;
        this.criterionDetails.forEach(element => {
            if (element.criterionTitle !== 'TỔNG ĐIỂM KPI' && element.criterionTitle !== 'XẾP LOẠI') {
                const row = this.worksheet.addRow([j.toString() + '. ' + element.criterionTitle,
                    '', element.maximumPoint + '%', element.employeeEvaluatePoint + '%', ''
                    , element.employeeEvaluateComment, element.managerEvaluatePoint + '%', element.managerEvaluateComment, '']);
                j++;
                row.getCell(2).merge(row.getCell(1));
                row.getCell(6).merge(row.getCell(5));
                row.getCell(9).merge(row.getCell(8));

                for (let k = 1; k < 10; k++) {
                    const el = row.getCell(k);
                    el.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                    el.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
                    el.font = { name: 'Times New Roman', family: 4, size: 10, underline: 'none' };
                }
                row.getCell(1).alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
                row.getCell(1).font = { name: 'Times New Roman', family: 4, size: 10, underline: 'none', bold: true };
                row.height = 40;
            }
        });
        const criterialFooter1 = this.worksheet.addRow(['TỔNG ĐIỂM KPI', '', '100%', this.data.empKpiPoint + '%',
            '', '', this.data.level1ManagerKpiPoint + '%', '', '']);
        const criterialFooter2 = this.worksheet.addRow(['XẾP LOẠI ', '', '', this.data.empKpiClassification,
            '', '', this.data.level1ManagerKpiClassification, '', '']);
        criterialFooter1.height = criterialFooter2.height = 20;
        criterialFooter1.getCell(2).merge(criterialFooter1.getCell(1));
        criterialFooter1.getCell(6).merge(criterialFooter1.getCell(5));
        criterialFooter1.getCell(9).merge(criterialFooter1.getCell(8));
        criterialFooter2.getCell(2).merge(criterialFooter2.getCell(1));
        criterialFooter2.getCell(6).merge(criterialFooter2.getCell(5));
        criterialFooter2.getCell(9).merge(criterialFooter2.getCell(8));
        critSectionRows.push(criterialFooter1);
        critSectionRows.push(criterialFooter2);

        for (let i = 0; i < critSectionRows.length; i++) {
            const element = critSectionRows[i];
            for (let k = 1; k < 10; k++) {
                const el = element.getCell(k);
                el.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                el.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
                el.font = { name: 'Times New Roman', family: 4, size: 10, underline: 'none', bold: true };
            }
        }
        this.worksheet.addRow([]);

        // y kien
        const signRows = [];
        const singEmpRow1 = this.worksheet.addRow(['Ý kiến của nhân viên về kết quả đánh giá',
            '', '', '', '', '', '', '', '']);
        signRows.push(singEmpRow1);
        singEmpRow1.getCell(7).merge(singEmpRow1.getCell(1));
        const singEmpRow11 = this.worksheet.addRow([]);
        signRows.push(singEmpRow11);
        singEmpRow1.getCell(7).merge(singEmpRow1.getCell(1));
        const singEmpRow12 = this.worksheet.addRow([]);
        signRows.push(singEmpRow12);
        const singEmpRow2 = this.worksheet.addRow(['Họ và tên Nhân viên', '', '', 'Chữ ký', '', '', 'Ngày / tháng / năm:', '', '']);
        signRows.push(singEmpRow2);
        singEmpRow2.getCell(2).merge(singEmpRow2.getCell(1));
        singEmpRow2.getCell(9).merge(singEmpRow2.getCell(7));
        const singEmpRow3 = this.worksheet.addRow([this.empName, '', '', '________________', '', '', '_____/____/____20__', '', '']);
        signRows.push(singEmpRow3);
        singEmpRow3.getCell(2).merge(singEmpRow3.getCell(1));
        singEmpRow3.getCell(5).merge(singEmpRow3.getCell(4));
        singEmpRow3.getCell(9).merge(singEmpRow3.getCell(7));
        const singEmpRow13 = this.worksheet.addRow([]);
        signRows.push(singEmpRow13);

        const singMng1Row1 = this.worksheet.addRow(['Ý kiến của người quản lý trực tiếp về kết quả đánh giá',
            '', '', '', '', '', '', '', '']);
        signRows.push(singMng1Row1);
        singMng1Row1.getCell(7).merge(singMng1Row1.getCell(1));
        const singMng1Row11 = this.worksheet.addRow([]);
        singMng1Row11.getCell(7).merge(singMng1Row11.getCell(1));
        signRows.push(singMng1Row11);
        const singMng1Row12 = this.worksheet.addRow([]);
        signRows.push(singMng1Row12);
        const singMng1Row2 = this.worksheet.addRow(['Họ và tên Quản lý trực tiếp', '', '', 'Chữ ký',
            '', '', 'Ngày / tháng / năm:', '', '']);
        signRows.push(singMng1Row2);
        singMng1Row2.getCell(3).merge(singMng1Row2.getCell(1));
        singMng1Row2.getCell(9).merge(singMng1Row2.getCell(7));
        const singMng1Row3 = this.worksheet.addRow([this.level1ManagerName, '', '', '________________',
            '', '', '_____/____/____20__', '', '']);
        signRows.push(singMng1Row3);
        singMng1Row3.getCell(2).merge(singMng1Row3.getCell(1));
        singMng1Row3.getCell(5).merge(singMng1Row3.getCell(4));
        singMng1Row3.getCell(9).merge(singMng1Row3.getCell(7));
        const singMng1Row13 = this.worksheet.addRow([]);
        signRows.push(singMng1Row13);

        const singMng2Row1 = this.worksheet.addRow(['Ý kiến của Trưởng đơn vị về kết quả đánh giá',
            '', '', '', '', '', '', '', '']);
        signRows.push(singMng2Row1);
        singMng2Row1.getCell(9).merge(singMng2Row1.getCell(1));
        const singMng2Row11 = this.worksheet.addRow([]);
        signRows.push(singMng2Row11);
        singMng2Row11.getCell(9).merge(singMng2Row11.getCell(1));
        const singMng2Row12 = this.worksheet.addRow([]);
        signRows.push(singMng2Row12);
        const singMng2Row2 = this.worksheet.addRow(['Họ và tên Trưởng đơn vị', '', '', 'Chữ ký', '', '', 'Ngày / tháng / năm:', '', '']);
        signRows.push(singMng2Row2);
        singMng2Row2.getCell(3).merge(singMng2Row2.getCell(1));
        singMng2Row2.getCell(9).merge(singMng2Row2.getCell(7));
        const singMng2Row3 = this.worksheet.addRow([this.level2ManagerName, '', '',
            '________________', '', '', '_____/____/____20__', '', '']);
        signRows.push(singMng2Row3);
        singMng2Row3.getCell(2).merge(singMng2Row3.getCell(1));
        singMng2Row3.getCell(5).merge(singMng2Row3.getCell(4));
        singMng2Row3.getCell(9).merge(singMng2Row3.getCell(7));
        const singMng2Row13 = this.worksheet.addRow([]);
        signRows.push(singMng2Row13);

        const singHrDirRow1 = this.worksheet.addRow(['Ý kiến của Khối Nhân sự về kết quả đánh giá',
            '', '', '', '', '', '', '', '']);
        signRows.push(singHrDirRow1);
        singHrDirRow1.getCell(9).merge(singHrDirRow1.getCell(1));
        const singHrDirRow11 = this.worksheet.addRow([]);
        singHrDirRow11.getCell(9).merge(singHrDirRow11.getCell(1));
        signRows.push(singHrDirRow11);
        const singHrDirRow12 = this.worksheet.addRow([]);
        signRows.push(singHrDirRow12);
        const singHrDirRow2 = this.worksheet.addRow(['', '', '', 'Chữ ký', '', '', 'Ngày / tháng / năm:', '', '']);
        signRows.push(singHrDirRow2);
        singHrDirRow2.getCell(9).merge(singHrDirRow2.getCell(7));
        const singHrDirRow3 = this.worksheet.addRow(['_________________', '', '', '________________',
            '', '', '_____/____/____20__', '', '']);
        signRows.push(singHrDirRow3);
        singHrDirRow3.getCell(2).merge(singHrDirRow3.getCell(1));
        singHrDirRow3.getCell(5).merge(singHrDirRow3.getCell(4));
        singHrDirRow3.getCell(9).merge(singHrDirRow3.getCell(7));
        const singHrDirRow13 = this.worksheet.addRow([]);
        signRows.push(singHrDirRow13);

        const singLeaderRow1 = this.worksheet.addRow(['PHÊ DUYỆT CỦA CHỦ TỊCH',
            '', '', '', '', '', '', '', '']);
        signRows.push(singLeaderRow1);
        singLeaderRow1.getCell(9).merge(singLeaderRow1.getCell(1));
        const singLeaderRow31 = this.worksheet.addRow([]);
        singLeaderRow31.getCell(9).merge(singLeaderRow31.getCell(1));
        signRows.push(singLeaderRow31);
        const singLeaderRow32 = this.worksheet.addRow([]);
        signRows.push(singLeaderRow32);
        const singLeaderRow2 = this.worksheet.addRow(['', '', '', 'Chữ ký', '', '', 'Ngày / tháng / năm:', '', '']);
        signRows.push(singLeaderRow2);
        singLeaderRow2.getCell(9).merge(singLeaderRow2.getCell(7));
        const singLeaderRow3 = this.worksheet.addRow(['', '', '', '________________', '', '', '_____/____/____20__', '', '']);
        signRows.push(singLeaderRow3);
        singLeaderRow3.getCell(5).merge(singLeaderRow3.getCell(4));
        singLeaderRow3.getCell(9).merge(singLeaderRow3.getCell(7));
        const singLeaderRow33 = this.worksheet.addRow([]);
        signRows.push(singLeaderRow33);


        signRows.forEach(element => {
            element.getCell(1).border = { left: { style: 'thin' } };
            element.getCell(9).border = { right: { style: 'thin' } };
            for (let k = 1; k < 10; k++) {
                element.getCell(k).font = { name: 'Times New Roman', family: 4, size: 10, underline: 'none' };
            }
        });

        singLeaderRow1.getCell(1).border = singHrDirRow1.getCell(1).border = singMng2Row1.getCell(1).border =
            singMng1Row1.getCell(1).border = singEmpRow1.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' } };
        singLeaderRow1.getCell(1).font = singHrDirRow1.getCell(1).font = singMng2Row1.getCell(1).font = singMng1Row1.getCell(1).font =
            singEmpRow1.getCell(1).font = {
                name: 'Times New Roman', family: 4, size: 10,
                underline: 'none', bold: true
            };
        singLeaderRow1.getCell(9).border = singHrDirRow1.getCell(9).border = singMng2Row1.getCell(9).border =
            singMng1Row1.getCell(9).border = singEmpRow1.getCell(9).border = { top: { style: 'thin' }, right: { style: 'thin' } };
        for (let k = 2; k < 9; k++) {
            singLeaderRow1.getCell(k).border = singHrDirRow1.getCell(k).border = singMng2Row1.getCell(k).border =
                singMng1Row1.getCell(k).border = singEmpRow1.getCell(k).border = { top: { style: 'thin' } };
        }

        singEmpRow3.getCell(7).alignment = singMng1Row3.getCell(7).alignment = singMng2Row3.getCell(7).alignment =
            singHrDirRow3.getCell(7).alignment = singLeaderRow3.getCell(7).alignment = singEmpRow2.getCell(7).alignment =
            singMng1Row2.getCell(7).alignment = singMng2Row2.getCell(7).alignment = singHrDirRow2.getCell(7).alignment =
            singLeaderRow2.getCell(7).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

        singLeaderRow33.getCell(1).border = { bottom: { style: 'thin' }, left: { style: 'thin' } };
        singLeaderRow33.getCell(9).border = { bottom: { style: 'thin' }, right: { style: 'thin' } };
        for (let k = 2; k < 9; k++) {
            singLeaderRow33.getCell(k).border = { bottom: { style: 'thin' } };
        }
    }

    addFilterSubTitle() {
    }

    getDateString(input: Date) {
        const date = new Date(input);
        let dd = date.getDate().toString();
        let mm = (date.getMonth() + 1).toString(); //January is 0!

        const yyyy = date.getFullYear().toString();
        if (date.getDate() < 10) {
            dd = '0' + dd;
        }
        if ((date.getMonth() + 1) < 10) {
            mm = '0' + mm;
        }
        return dd + '/' + mm + '/' + yyyy;
    }
}


export interface ExcelKpiEvaluationOption {
    data: any;
    filter: ExcelKpiEvaluationFilter;
    headers: string[];
}

export interface ExcelKpiEvaluationFilter {
}