import { Injectable } from '@angular/core';
import { BaseExcelService, ExcelOption } from './base/base-excel.service';
import { Kpi, KpiCriterionDetail, EventDiaryDisplayModel } from 'src/app/models/data/data';
import { Row, RichText } from 'exceljs';
import { asEnumerable } from 'linq-es2015';


export class ExcelKpiEventDiaryService extends BaseExcelService {
    month: string;
    year: string;

    level1ManagerName: string;
    orgName: string;
    data: EventDiaryDisplayModel[];
    criterionDetails: KpiCriterionDetail[];
    dataColCount: number;
    colCount: number;
    days: Date[];
    blankRow: string[];
    months: Date[] = [];
    loopColumns: any[] = [];

    constructor(private docOption: ExcelKpiEventDiaryOption, fName: string, _data: EventDiaryDisplayModel[], colWidths: number[]
        , _days: Date[], _loopColumns) {
        super({
            data: docOption.data,
            filter: docOption.filter,
            sheetName: 'KPI',
            title: 'BẢN KẾ HOẠCH VÀ ĐÁNH GIÁ THỰC HIỆN CÔNG VIỆC ',
            colWidths: colWidths,
            header: docOption.headers,
            fileName: fName,
        });
        this.data = _data;
        this.days = _days;
        this.colCount = colWidths.length;
        this.dataColCount = colWidths.length - 3;
        this.months.push(new Date(this.days[0]));
        this.months.push(new Date(this.days[this.days.length - 1]));
        this.loopColumns = _loopColumns;
    }

    addTitle() {
        this.worksheet.addRow(this.getBlankRow());
        const r1 = this.getBlankRow();
        r1[0] = 'NHẬT KÝ SỰ KIỆN PHÁT SINH';
        const row1 = this.worksheet.addRow(r1);
        row1.getCell(this.colCount).merge(row1.getCell(1));

        const r2 = this.getBlankRow();
        r2[0] = '(Bảng tích mã sự kiện)';
        const row2 = this.worksheet.addRow(r2);
        row2.getCell(this.colCount).merge(row2.getCell(1));

        const r3 = this.getBlankRow();
        r3[0] = 'PHÒNG/ĐƠN VỊ: ' + this.orgName;
        const row3 = this.worksheet.addRow(r3);
        row3.getCell(this.colCount).merge(row3.getCell(1));

        const r4 = this.getBlankRow();
        r4[1] = 'Quản lý trực tiếp';
        r4[2] = this.level1ManagerName;
        r4[this.colCount - 4] = 'Ngày phát hành:';
        r4[this.colCount - 1] = this.getDateString(new Date());
        const row4 = this.worksheet.addRow(r4);
        row4.getCell(6).merge(row4.getCell(3));
        row4.getCell(this.colCount - 1).merge(row4.getCell(this.colCount - 3));

        row1.getCell(1).alignment = row2.getCell(1).alignment = row3.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };
        row1.height = 20;
        row2.height = row3.height = 15;

        row1.font = { name: 'Times New Roman', family: 4, size: 14, underline: 'none', bold: true };
        row2.font = { name: 'Times New Roman', family: 4, size: 10, underline: 'none', italic: true };
        row3.font = { name: 'Times New Roman', family: 4, size: 11, underline: 'none', bold: true };
        row4.font = { name: 'Times New Roman', family: 4, size: 10, underline: 'none', bold: true };

        const row5 = this.worksheet.addRow(this.getBlankRow());
    }

    addHeaders() {
        let month1 = this.months[0].getMonth() + 1 + '';
        month1 = month1.length === 1 ? '0' + month1 : month1;
        let month2 = this.months[1].getMonth() + 1 + '';
        month2 = month2.length === 1 ? '0' + month2 : month2;
        console.log(month1);
        console.log(month2);

        const month1Count = asEnumerable(this.days).Where(d => d.getMonth() === this.months[0].getMonth()).ToArray().length;
        // const month2Count = asEnumerable(this.days).Where(d => d.getMonth() === this.months[1].getMonth()).ToArray().length;
        const r1 = this.getBlankRow();
        r1[0] = 'TT';
        r1[1] = 'HỌ VÀ TÊN';
        r1[2] = 'Tháng ' + month1 + '/' + this.months[0].getFullYear().toString();
        r1[month1Count + 2] = 'Tháng ' + month2 +
            '/' + this.months[1].getFullYear().toString();
        r1[this.colCount - 1] = 'Ghi chú';
        const row1 = this.worksheet.addRow(r1);
        row1.getCell(month1Count + 2).merge(row1.getCell(3));
        row1.getCell(this.colCount - 1).merge(row1.getCell(month1Count + 3));

        const r2 = this.getBlankRow();
        for (let i = 0; i < this.days.length; i++) {
            r2[i + 2] = this.days[i].getDate().toString();
        }
        const row2 = this.worksheet.addRow(r2);
        row2.getCell(1).merge(row1.getCell(1));
        row2.getCell(2).merge(row1.getCell(2));
        row2.getCell(this.colCount).merge(row1.getCell(this.colCount));

        // boi mau ngay cuoi thang dau tien
        // const firstMonthDays = asEnumerable(this.days).Where(d => d.getMonth() === this.months[0].getMonth()).ToArray();
        // for (let j = 0; j < this.days.length; j++) {
        //     const el = this.days[j];
        //     if (el.getDate() === firstMonthDays[firstMonthDays.length - 1].getDate()) {
        //         row2.getCell(j + 3).fill = {
        //             type: 'pattern',
        //             pattern: 'solid',
        //             fgColor: { argb: 'FFA1A09F' },
        //             bgColor: { argb: 'FFA1A09F' },
        //         };
        //         break;
        //     }
        // }

        row1.font = { name: 'Times New Roman', family: 4, size: 10, underline: 'none', bold: true };
        row1.alignment = { vertical: 'middle', horizontal: 'center' };

        for (let i = 1; i < this.colCount + 1; i++) {
            row1.getCell(i).border = row2.getCell(i).border = {
                left: { style: 'thin' }, top: { style: 'thin' },
                right: { style: 'thin' }, bottom: { style: 'thin' }
            };
            row1.getCell(i).alignment = row2.getCell(i).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        }
    }

    addBody() {
        if (this.excelOption.data == null) { return; }

        const firstMonthDays = asEnumerable(this.days).Where(d => d.getMonth() === this.months[0].getMonth()).ToArray();
        const dataRows = [];

        for (let i = 0; i < this.data.length; i++) {
            const element = this.data[i];
            const rt = this.getBlankRow();
            rt[0] = (i + 1).toString();
            rt[1] = element.empName;
            const allRichText: RichText[] = [];
            let firstLineItem = false;
            const colRichTexts = [];
            for (let j = 0; j < this.loopColumns.length; j++) {
                const el = this.loopColumns[j];
                // let str = '';
                const colRichText = [];
                let firstLineItem1 = false;
                // su kien trong ngay
                for (let k = 0; k < this.data[i][el].value.length; k++) {
                    const c = this.data[i][el].value[k];
                    if (!c.isDeleted) {
                        // dong dau tien trong o khong co \r\n
                        let textLine = '', textLine1 = '';
                        if (!firstLineItem) {
                            firstLineItem = true;
                            textLine = c.criterionCatalogCode + '-' + Math.abs(c.kpiPoint) + '%';
                        } else {
                            textLine = ' \r\n' + c.criterionCatalogCode + '-' + Math.abs(c.kpiPoint) + '%';
                        }
                        if (!firstLineItem1) {
                            firstLineItem1 = true;
                            textLine1 = c.criterionCatalogCode;
                        } else {
                            textLine1 = ' \r\n' + c.criterionCatalogCode;
                        }

                        if (c.criterionCatalogCode.startsWith('m')) {
                            allRichText.push({
                                font: {
                                    color: {
                                        argb: `FFF60707`
                                    }
                                },
                                text: textLine
                            });
                            colRichText.push({
                                font: {
                                    color: {
                                        argb: `FFF60707`
                                    }
                                },
                                text: textLine1
                            });
                        } else {
                            allRichText.push({
                                font: {
                                    color: {
                                        argb: `FF000000`
                                    }
                                },
                                text: textLine
                            });
                            colRichText.push({
                                font: {
                                    color: {
                                        argb: `FF000000`
                                    }
                                },
                                text: textLine1
                            });
                        }
                        // let x = c.criterionCatalogCode + '/' + c.kpiPoint + '%\r\n';
                    }
                }
                colRichTexts.push(colRichText);
                // rt[j + 2] = str;
            }
            const row = this.worksheet.addRow(rt);
            dataRows.push(row);
            row.getCell(this.colCount).value = { richText: allRichText };
            for (let j = 0; j < this.loopColumns.length; j++) {
                row.getCell(j + 3).value = { richText: colRichTexts[j] };
            }


            // boi mau ngay cuoi thang dau tien
            // for (let j = 0; j < this.days.length; j++) {
            //     const el = this.days[j];
            //     if (el.getDate() === firstMonthDays[firstMonthDays.length - 1].getDate()) {
            //         row.getCell(j + 3).fill = {
            //             type: 'pattern',
            //             pattern: 'solid',
            //             fgColor: { argb: 'FFA1A09F' },
            //             bgColor: { argb: 'FFA1A09F' },
            //         };
            //         break;
            //     }
            // }
        }

        const r = this.getBlankRow();
        r[0] = 'Người tích mã ký tên';
        const rowBottom = this.worksheet.addRow(r);
        dataRows.push(rowBottom);
        rowBottom.getCell(2).merge(rowBottom.getCell(1));
        rowBottom.height = 30;

        // boi mau ngay cuoi thang dau tien
        // for (let j = 0; j < this.days.length; j++) {
        //     const el = this.days[j];
        //     if (el.getDate() === firstMonthDays[firstMonthDays.length - 1].getDate()) {
        //         rowBottom.getCell(j + 3).fill = {
        //             type: 'pattern',
        //             pattern: 'solid',
        //             fgColor: { argb: 'FFA1A09F' },
        //             bgColor: { argb: 'FFA1A09F' },
        //         };
        //         break;
        //     }
        // }

        dataRows.forEach(element => {
            element.font = { name: 'Times New Roman', family: 4, size: 10, underline: 'none' };
            for (let i = 1; i < this.colCount + 1; i++) {
                element.getCell(i).border = {
                    left: { style: 'thin' }, top: { style: 'thin' },
                    right: { style: 'thin' }, bottom: { style: 'thin' }
                };
                element.getCell(i).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
            }
        });
        rowBottom.font = { name: 'Times New Roman', family: 4, size: 10, underline: 'none', italic: true };

        const row5 = this.worksheet.addRow(this.getBlankRow());

        this.addRegulationItems();
        this.addRegulations();
    }

    addRegulationItems() {
        // muc ky luat/khen thuong

        //Khối lượng, tiến độ thực hiện công việc
        const regRows = [];
        const r1 = this.getBlankRow();
        r1[0] = 'A';
        r1[1] = 'Khối lượng, tiến độ thực hiện công việc';
        r1[21] = 'Trừ KPI';
        r1[23] = 'M';
        r1[24] = 'Khen thưởng';
        r1[this.colCount - 1] = 'Cộng KPI';
        const row1 = this.worksheet.addRow(r1);
        regRows.push(row1);
        const r2 = this.getBlankRow();
        r2[0] = 'a1';
        r2[1] = 'Một lần chậm thời gian hoàn thành công việc được giao';
        r2[21] = '1% - 40%';
        r2[23] = 'm1';
        r2[24] = 'Khen thưởng do Hoàn thành vượt thời gian, tiến độ công việc được giao từ 5 ngày trở lên, đối với công việc mang tính phức tạp';
        r2[this.colCount - 1] = '1% - 40%';
        const row2 = this.worksheet.addRow(r2);
        regRows.push(row2);

        // Chất lượng, kết quả thực hiện công việc
        const r3 = this.getBlankRow();
        r3[0] = 'B';
        r3[1] = 'Chất lượng, kết quả thực hiện công việc';
        const row3 = this.worksheet.addRow(r3);
        regRows.push(row3);
        const r4 = this.getBlankRow();
        r4[0] = 'b1';
        r4[1] = 'Một lần không hoàn thành đúng yêu cầu chất lượng công việc (đã được quy định rõ, cụ thể về tiêu chuẩn) được giao ';
        r4[21] = '1% - 30%';
        r4[23] = 'm2';
        r4[24] = 'Khen thưởng do Hoàn thành vượt mong đợi, kỳ vọng về chất lượng công việc mang tính phức tạp, thể hiện rõ sự sáng tạo, chuyên nghiệp, trách nhiệm, có sáng kiến được áp dụng vào thực tế công việc';
        r4[this.colCount - 1] = '1% - 30%';
        const row4 = this.worksheet.addRow(r4);
        regRows.push(row4);

        // Kỷ luật làm việc/Tinh thần phối hợp, hợp tác
        const r5 = this.getBlankRow();
        r5[0] = 'C';
        r5[1] = 'Kỷ luật làm việc/Tinh thần phối hợp, hợp tác';
        const row5 = this.worksheet.addRow(r5);
        regRows.push(row5);
        const r6 = this.getBlankRow();
        r6[0] = 'c1';
        r6[1] = 'Một lần vi phạm kỷ luật làm việc, có hành vi không đúng Văn hóa doanh nghiệp ở mức độ không nghiêm trọng (tham chiếu Nội quy lao động)';
        r6[21] = '1% - 10%';
        r6[23] = 'm3';
        r6[24] = 'Khen thưởng khi Thể hiện là tấm gương trong việc thực hiện đúng văn hóa doanh nghiệp, tuân thủ kỷ luật nội bộ, thường xuyên nhắc nhở đồng nghiệp tuân thủ kỷ luật, thành tích được ghi nhận từ các cấp lãnh đạo';
        r6[this.colCount - 1] = '1% - 100%';
        const row6 = this.worksheet.addRow(r6);
        regRows.push(row6);
        const r7 = this.getBlankRow();
        r7[0] = 'c2';
        r7[1] = 'Một lần vi phạm kỷ luật làm việc, có hành vi không đúng VHDN ở mức độ nghiêm trọng hoặc tái phạm việc vi phạm kỷ luật không nghiêm trọng';
        r7[21] = '10%-50%';
        const row7 = this.worksheet.addRow(r7);
        regRows.push(row7);
        const r8 = this.getBlankRow();
        r8[0] = 'c3';
        r8[1] = 'Một lần vi phạm kỷ luật làm việc, có hành vi không đúng VHDN ở mức độ đặc biệt nghiêm trọng hoặc tái phạm vi phạm kỷ luật nghiêm trọng';
        r8[21] = '50%-100%';
        const row8 = this.worksheet.addRow(r8);
        regRows.push(row8);

        // Lập kế hoạch và tổ chức công việc
        const r9 = this.getBlankRow();
        r9[0] = 'D';
        r9[1] = 'Lập kế hoạch và tổ chức công việc';
        const row9 = this.worksheet.addRow(r9);
        regRows.push(row9);
        const r10 = this.getBlankRow();
        r10[0] = 'd1';
        r10[1] = 'Không có kế hoạch thực hiện công việc cho bản thân và cho đơn vị gây ảnh hưởng liên đới đến cá nhân và/hoặc bộ phận khác';
        r10[21] = '1% - 10%';
        r10[23] = 'm4';
        r10[24] = 'Khen thưởng khi Thể hiện sự nghiêm túc, chuyên nghiệp và thể hiện năng lực xuất sắc trong việc lập kế hoạch, tổ chức thực hiện công việc theo kế hoạch, phân công, giao việc cho nhân viên, kết quả góp phần gia tăng hiệu quả công việc, được các quản lý đồng cấp và cấp trên thừa nhận';
        r10[this.colCount - 1] = '1% - 10%';
        const row10 = this.worksheet.addRow(r10);
        regRows.push(row10);
        const r11 = this.getBlankRow();
        r11[0] = 'd2';
        r11[1] = 'Chậm không tham gia ý kiến hoặc không cung cấp thông tin đối với Kế hoạch, công việc của bộ phận khác theo đúng chức năng, nhiệm vụ và theo quy định phải tham gia ý kiến hoặc cung cấp thông tin';
        r11[21] = '1% - 10%';
        const row11 = this.worksheet.addRow(r11);
        regRows.push(row11);
        const r12 = this.getBlankRow();
        r12[0] = 'd3';
        r12[1] = 'Một lần có phản hồi của CBNV thuộc quyền về việc phân công công việc chồng chéo hoặc bố trí công việc không phù hợp và được chứng minh là đúng';
        r12[21] = '1% - 10%';
        const row12 = this.worksheet.addRow(r12);
        regRows.push(row12);

        // Đào tạo, phát triển nhân viên
        const r13 = this.getBlankRow();
        r13[0] = 'E';
        r13[1] = 'Đào tạo, phát triển nhân viên';
        const row13 = this.worksheet.addRow(r13);
        regRows.push(row13);
        const r14 = this.getBlankRow();
        r14[0] = 'e1';
        r14[1] = 'Một ngày chậm trong việc lập kế hoạch đào tạo định kỳ của bộ phận hoặc không tổng hợp nhu cầu đào tạo của bộ phận theo quy định hoặc hướng dẫn';
        r14[21] = '1% - 10%';
        r14[23] = 'm5';
        r14[24] = 'Khen thưởng khi Thể hiện được là hình mẫu người quản lý tích cực, hiệu quả trong hoạt động đào tạo nội bộ, huấn luyện nhân viên và đạt được thành quả rõ rệt, giúp nhân viên tiến bộ, đóng góp nguồn kế cận được các quản lý đồng cấp và cấp trên thừa nhận';
        r14[this.colCount - 1] = '1% - 10%';
        const row14 = this.worksheet.addRow(r14);
        regRows.push(row14);
        const r15 = this.getBlankRow();
        r15[0] = 'e2';
        r15[1] = 'Một lần có phản hồi của CBNV thuộc quyền về việc không được quản lý đào tạo, hướng dẫn công việc theo đúng trách nhiệm hoặc việc đào tạo, hướng dẫn không đạt hiệu quả do lỗi chủ quan của quản lý và được chứng minh là đúng';
        r15[21] = '1% - 10%';
        const row15 = this.worksheet.addRow(r15);
        regRows.push(row15);

        let j = 1;
        regRows.forEach(element => {
            element.getCell(21).merge(element.getCell(2));
            element.getCell(23).merge(element.getCell(22));
            for (let i = 1; i < this.colCount + 1; i++) {
                element.getCell(i).border = {
                    left: { style: 'thin' }, top: { style: 'thin' },
                    right: { style: 'thin' }, bottom: { style: 'thin' }
                };
                if (i === 1 || i === 22 || i === 24 || i === this.colCount) {
                    element.getCell(i).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                } else {
                    element.getCell(i).alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
                }

                // boi dam dau muc
                if (j === 1 || j === 3 || j === 5 || j === 9 || j === 13) {
                    if (i === 1 || i === 2 || i === 22) {
                        element.getCell(i).font = { name: 'Times New Roman', family: 4, size: 10, underline: 'none', bold: true };
                    } else if (i === 24 || i === 25 || i === this.colCount) { // mau do
                        element.getCell(i).font = {
                            name: 'Times New Roman', family: 4, size: 10, underline: 'none'
                            , color: { argb: 'FFF60707' }, bold: true
                        };
                    }
                } else { // dong binh thuong
                    if (i === 1 || i === 2 || i === 22) {
                        element.getCell(i).font = { name: 'Times New Roman', family: 4, size: 10, underline: 'none' };
                    } else if (i === 24 || i === 25 || i === this.colCount) {
                        element.getCell(i).font = {
                            name: 'Times New Roman', family: 4, size: 10, underline: 'none'
                            , color: { argb: 'FFF60707' }
                        };
                    }
                }
            }
            j++;
        });

        row1.getCell(this.colCount - 1).merge(row1.getCell(25));
        row2.getCell(this.colCount - 1).merge(row2.getCell(25));
        row3.getCell(this.colCount).merge(row3.getCell(25));
        row4.getCell(this.colCount - 1).merge(row4.getCell(25));
        row5.getCell(this.colCount).merge(row5.getCell(25));
        row8.getCell(this.colCount - 1).merge(row6.getCell(25));
        row9.getCell(this.colCount).merge(row9.getCell(25));
        row12.getCell(this.colCount - 1).merge(row10.getCell(25));
        row13.getCell(this.colCount).merge(row13.getCell(25));
        row15.getCell(this.colCount - 1).merge(row14.getCell(25));

        row8.getCell(24).merge(row6.getCell(24));
        row8.getCell(this.colCount).merge(row6.getCell(this.colCount));
        row12.getCell(24).merge(row10.getCell(24));
        row12.getCell(this.colCount).merge(row10.getCell(this.colCount));
        row15.getCell(24).merge(row14.getCell(24));
        row15.getCell(this.colCount).merge(row14.getCell(this.colCount));

        row2.height = 60;
        row4.height = 80;
        row6.height = row7.height = row8.height = row10.height = row12.height = 30;
        row11.height = 40;
        row14.height = 30;
        row15.height = 80;
    }

    addRegulations() {
        this.worksheet.addRow(this.getBlankRow());
        this.worksheet.addRow(this.getBlankRow());
        this.worksheet.addRow(this.getBlankRow());

        const r1 = this.getBlankRow();
        r1[0] = 'NHẬT KÝ SỰ KIỆN PHÁT SINH';
        const row1 = this.worksheet.addRow(r1);
        row1.getCell(this.colCount).merge(row1.getCell(1));

        const r2 = this.getBlankRow();
        r2[0] = '(Bảng tích mã sự kiện)';
        const row2 = this.worksheet.addRow(r2);
        row2.getCell(this.colCount).merge(row2.getCell(1));

        const r3 = this.getBlankRow();
        r3[0] = 'QUY ĐỊNH';
        const row3 = this.worksheet.addRow(r3);
        row3.getCell(this.colCount).merge(row3.getCell(1));

        row1.getCell(1).alignment = row2.getCell(1).alignment = row3.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };
        row1.height = 20;
        row2.height = row3.height = 15;

        row1.font = { name: 'Times New Roman', family: 4, size: 14, underline: 'none', bold: true };
        row2.font = { name: 'Times New Roman', family: 4, size: 10, underline: 'none', italic: true };
        row3.font = { name: 'Times New Roman', family: 4, size: 11, underline: 'none', bold: true };

        this.worksheet.addRow(this.getBlankRow());

        // quy dinh
        const lstArr = [];
        const rItem1 = this.getBlankRow();
        rItem1[0] = '1. Nhật ký sự kiện phát sinh là tài liệu của công ty, nhằm ghi nhận kịp thời các thành tích, sai phạm trong công ty do người có thẩm quyền xác định, có hiệu lực với các thành tích, sai phạm đã diễn ra cùng thời điểm hoặc trước đó';
        const rowItem1 = this.worksheet.addRow(rItem1);
        lstArr.push(rowItem1);

        const rItem2 = this.getBlankRow();
        rItem2[0] = '2. Việc ghi Nhật ký sự kiện phát sinh hoặc thông báo cho người có thẩm quyền ghi Nhật ký sự kiện phát sinh khi có vi phạm là quyền lợi, nghĩa vụ của toàn thể CBNV';
        const rowItem2 = this.worksheet.addRow(rItem2);
        lstArr.push(rowItem2);

        const rItem3 = this.getBlankRow();
        rItem3[0] = '3. Việc phát hành (khởi tạo), ghi nhận, tổng hợp Nhật ký sự kiện phát sinh hàng tháng được thực hiện trên phần mềm KPI theo phân quyền của Giám đốc Khối Nhân sự. Trong trường hợp gặp sự cố phần mềm, các cấp quản lý có trách nhiệm phát hành và ghi nhận Nhật ký theo dạng bản cứng.';
        const rowItem3 = this.worksheet.addRow(rItem3);
        lstArr.push(rowItem3);

        const rItem4 = this.getBlankRow();
        rItem4[0] = '4. Khối Nhân sự lưu 1 bản cứng kết quả tổng hợp hàng tháng đã được Lãnh đạo Tập đoàn phê duyệt tại Khối';
        const rowItem4 = this.worksheet.addRow(rItem4);
        lstArr.push(rowItem4);

        const rItem5 = this.getBlankRow();
        rItem5[0] = '5. Người có thẩm quyền tích MSK ghi ký hiệu mã sự kiện liên quan vào ô tương ứng ngày/tên CBNV liên quan, tỷ lệ cộng - trừ KPI và giải thích, ghi chú rõ nguyên nhân';
        const rowItem5 = this.worksheet.addRow(rItem5);
        lstArr.push(rowItem5);

        const rItem6 = this.getBlankRow();
        rItem6[0] = '6. Thẩm quyền ghi sự kiện phát sinh';
        const rowItem6 = this.worksheet.addRow(rItem6);
        lstArr.push(rowItem6);

        lstArr.forEach(element => {
            element.getCell(this.colCount).merge(element.getCell(1));
            element.font = { name: 'Times New Roman', family: 4, size: 10, underline: 'none' };
            element.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
        });
        rowItem1.height = 30;
        rowItem3.height = rowItem4.height = 30;
        rowItem6.height = 30;
        rowItem6.alignment = { vertical: 'bottom', horizontal: 'left', wrapText: true };

        this.worksheet.addRow(this.getBlankRow());

        const lstArr1 = [];
        const rTable1 = this.getBlankRow();
        rTable1[0] = 'TT';
        rTable1[1] = `Người có thẩm quyền
ghi Nhật ký sự kiện phát sinh`;
        rTable1[12] = 'Đối tượng';
        rTable1[this.colCount - 3] = 'Ghi chú';
        const rowTable1 = this.worksheet.addRow(rTable1);
        lstArr1.push(rowTable1);

        const rTable2 = this.getBlankRow();
        rTable2[12] = 'Phó Tổng Giám đốc, Cố vấn cấp cao';
        rTable2[16] = 'Giám đốc Khối, Trưởng Ban và tương đương';
        rTable2[21] = 'Quản lý cấp dưới';
        rTable2[27] = 'Chuyên viên, Nhân viên';
        const rowTable2 = this.worksheet.addRow(rTable2);
        lstArr1.push(rowTable2);

        const rTable3 = this.getBlankRow();
        rTable3[0] = '1';
        rTable3[1] = 'Lãnh đạo Tập đoàn';
        rTable3[12] = 'x';
        rTable3[16] = 'x';
        rTable3[21] = 'x';
        rTable3[27] = 'x';
        rTable3[this.colCount - 3] = 'Bao gồm ghi nhận lỗi, điểm trừ KPI, khen thưởng KPI các mức và vượt khung';
        const rowTable3 = this.worksheet.addRow(rTable3);
        lstArr1.push(rowTable3);

        const rTable4 = this.getBlankRow();
        rTable4[0] = '2';
        rTable4[1] = 'Trợ lý Lãnh đạo Tập đoàn và các quản lý liên quan thực hiện khi có chỉ đạo, kết luận của Lãnh đạo Tập đoàn';
        rTable4[16] = 'x';
        rTable4[21] = 'x';
        rTable4[27] = 'x';
        rTable4[this.colCount - 3] = 'Theo chỉ đạo, kết luận của Lãnh đạo Tập đoàn';
        const rowTable4 = this.worksheet.addRow(rTable4);
        lstArr1.push(rowTable4);

        const rTable5 = this.getBlankRow();
        rTable5[0] = '3';
        rTable5[1] = 'Phó Tổng giám đốc, Cố vấn cấp cao';
        rTable5[16] = 'x';
        rTable5[21] = 'x';
        rTable5[27] = 'x';
        rTable5[this.colCount - 3] = 'Bao gồm ghi nhận lỗi, điểm trừ KPI các mức; duyệt Khen thưởng điểm KPI mức 5% và đề xuất khen thưởng  KPI mức khác';
        const rowTable5 = this.worksheet.addRow(rTable5);
        lstArr1.push(rowTable5);

        const rTable6 = this.getBlankRow();
        rTable6[0] = '4';
        rTable6[1] = 'Giám đốc Khối, Trưởng Ban và tương đương';
        rTable6[21] = 'x';
        rTable6[27] = 'x';
        rTable6[this.colCount - 3] = 'Ghi nhận lỗi, điểm trừ KPI các mức và đề xuất khen thưởng điểm KPI các mức';
        const rowTable6 = this.worksheet.addRow(rTable6);
        lstArr1.push(rowTable6);

        const rTable7 = this.getBlankRow();
        rTable7[0] = '5';
        rTable7[1] = 'Quản lý các cấp từ Phó GĐ Khối, Phó trưởng Ban và tương đương trở xuống';
        rTable7[21] = 'x';
        rTable7[27] = 'x';
        const rowTable7 = this.worksheet.addRow(rTable7);
        lstArr1.push(rowTable7);

        const rTable8 = this.getBlankRow();
        rTable8[0] = '6';
        rTable8[1] = 'Chuyên viên Nhân sự phụ trách quản lý lao động';
        rTable8[21] = 'Các cấp quản lý từ Trưởng phòng trở xuống';
        rTable8[27] = 'x';
        const rowTable8 = this.worksheet.addRow(rTable8);
        lstArr1.push(rowTable8);

        // border
        for (let i = 0; i < lstArr1.length; i++) {
            const element = lstArr1[i];
            for (let j = 1; j < this.colCount + 1; j++) {
                element.getCell(j).border = {
                    left: { style: 'thin' }, top: { style: 'thin' },
                    right: { style: 'thin' }, bottom: { style: 'thin' }
                };
            }
        }

        // merge
        rowTable2.getCell(1).merge(rowTable1.getCell(1));
        rowTable2.getCell(12).merge(rowTable1.getCell(2));
        rowTable1.getCell(this.colCount - 3).merge(rowTable1.getCell(13));
        rowTable2.getCell(this.colCount).merge(rowTable1.getCell(this.colCount - 2));
        rowTable2.getCell(16).merge(rowTable2.getCell(13));
        rowTable2.getCell(21).merge(rowTable2.getCell(17));
        rowTable2.getCell(27).merge(rowTable2.getCell(22));
        rowTable2.getCell(this.colCount - 3).merge(rowTable2.getCell(28));

        for (let i = 2; i < lstArr1.length; i++) {
            const element = lstArr1[i];
            element.getCell(12).merge(element.getCell(2));
            element.getCell(16).merge(element.getCell(13));
            element.getCell(21).merge(element.getCell(17));
            element.getCell(27).merge(element.getCell(22));
            element.getCell(this.colCount - 3).merge(element.getCell(28));
        }

        rowTable3.getCell(this.colCount).merge(rowTable3.getCell(this.colCount - 2));
        rowTable4.getCell(this.colCount).merge(rowTable4.getCell(this.colCount - 2));
        rowTable5.getCell(this.colCount).merge(rowTable5.getCell(this.colCount - 2));
        rowTable8.getCell(this.colCount).merge(rowTable6.getCell(this.colCount - 2));

        for (let i = 0; i < lstArr1.length; i++) {
            const element = lstArr1[i];
            element.font = { name: 'Times New Roman', family: 4, size: 10, underline: 'none' };
            element.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        }
        for (let i = 0; i < lstArr1.length; i++) {
            const element = lstArr1[i];
            element.getCell(2).alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
        }
        rowTable2.height = 30;
        rowTable3.height = 60;
        rowTable8.height = 30;
        rowTable4.height = 50;
        rowTable5.height = 80;
        rowTable6.height = 30;
        rowTable7.height = 30;

        rowTable1.font = { name: 'Times New Roman', family: 4, size: 10, underline: 'none', bold: true };
        rowTable1.getCell(2).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
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

    getBlankRow(): string[] {
        const ret = [];
        for (let i = 0; i < this.colCount; i++) {
            // cot ngay
            ret.push('');
        }
        return ret;
    }
}


export interface ExcelKpiEventDiaryOption {
    data: any;
    filter: ExcelKpiEventDiaryFilter;
    headers: string[];
}

export interface ExcelKpiEventDiaryFilter {
}