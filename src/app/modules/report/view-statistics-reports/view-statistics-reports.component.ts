import { Component, OnInit, ViewChild } from '@angular/core';
import { Org_Organization, View_Statistics_Reports } from 'src/app/models/data/data';

import { MonthPickerComponent } from '../../share/components/month-picker/month-picker.component';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material';
import { e } from '@angular/core/src/render3';
import { asEnumerable } from 'linq-es2015';
import { ViewStatisticsReportsService } from 'src/app/services/reports/view_statistics_reports/view-statistics-reports.service';
import { View_Statistics_Report_Filter } from 'src/app/models/base/utilities';
import { ExcelViewStatisticsReportService, ExcelViewStatisticsReportOption } from 'src/app/services/excel/excel-view-statistics-report.service';

@Component({
  selector: 'app-view-statistics-reports',
  templateUrl: './view-statistics-reports.component.html',
  styleUrls: ['./view-statistics-reports.component.css']
})
export class ViewStatisticsReportsComponent implements OnInit {
  @ViewChild('monthFilter') monthFilter: MonthPickerComponent;

  displayedColumns: string[] = ['STT', 'organization', 'TongSoNhanVien',
    'aPlusCount', 'aPlusPercent', 'aCount', 'aPercent', 'aMinusCount', 'aMinusPercent',
    'bPlusCount', 'bPlusPercent', 'bCount', 'bPercent','bMinusCount', 'bMinusPercent', 'cCount', 'cPercent'];
  dataSource: MatTableDataSource<View_Statistics_Reports>;
  filter: View_Statistics_Report_Filter;

  // tong hop
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

  Orgs: Org_Organization[];
  orgId: number;
  monthYear: number;
  month: string;
  year: string;

  constructor(private _service: ViewStatisticsReportsService) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getOrgs();
  }

  getOrgs() {
    this._service.getOrgs().then(
      (result) => {
        this.Orgs = [];
        result.data.forEach(e => {
          let org = {
            id: e.id, name: e.name, description: e.description, organizationTypeID: e.organizationTypeID,
            nodeID: e.nodeID, directoryPath: e.directoryPath
          };
          this.Orgs.push(org);
        });
      }
      ,
      (error) => {
        console.log(error);
      }
    );
  }


  search() {
    const ym = this.monthFilter.getYearMonth();

    if (ym) {
      // ten cot thang nam
      const str = '' + ym;
      this.month = str.slice(4);
      this.year = str.slice(0, 4);
       const org = this.Orgs.find(o => o.id === this.orgId);
       let dirPath = '';
       if (org) {
         dirPath = org.directoryPath;
       }

      //const filter = { yearMonth: this.monthFilter.getYearMonth() };
      const filter = { yearMonth: this.monthFilter.getYearMonth(), orgId: this.orgId, directoryPath: dirPath };

      this._service.search(filter).then(
        (result) => {
          const data = result.data as View_Statistics_Reports[];
          this.dataSource = new MatTableDataSource(result.data);

          // tong hop
          if (data && data.length > 0) {
            // tong so phong ban
            this.empCount = asEnumerable(data).Sum(x => x.tongSoNhanVien);

            this.aPlusCount = asEnumerable(data).Sum(x => x.ap);
            this.aPlusPercent = Math.round(this.aPlusCount * 10000 / this.empCount) / 100;

            this.aCount = asEnumerable(data).Sum(x => x.a);
            this.aPercent = Math.round(this.aCount * 10000 / this.empCount) / 100;

            this.aMinusCount = asEnumerable(data).Sum(x => x.am);
            this.aMinusPercent = Math.round(this.aMinusCount * 10000 / this.empCount) / 100;

            this.bPlusCount = asEnumerable(data).Sum(x => x.bp);
            this.bPlusPercent = Math.round(this.bPlusCount * 10000 / this.empCount) / 100;

            this.bCount = asEnumerable(data).Sum(x => x.b);
            this.bPercent = Math.round(this.bCount * 10000 / this.empCount) / 100;

            this.bMinusCount = asEnumerable(data).Sum(x => x.bm);
            this.bMinusPercent = Math.round(this.bMinusCount * 10000 / this.empCount) / 100;

            this.cCount = asEnumerable(data).Sum(x => x.c);
            this.cPercent = Math.round(this.bCount * 10000 / this.empCount) / 100;

          } else {
            this.aPlusCount = 0;
            this.aPlusPercent = 0;
            this.aCount = 0;
            this.aPercent = 0;
            this.aMinusCount = 0;
            this.aMinusPercent = 0;
            this.bPlusCount = 0;
            this.bPlusPercent = 0;
            this.bCount = 0;
            this.bPercent = 0;
            this.bMinusCount = 0;
            this.bMinusPercent = 0;
            this.cCount = 0;
            this.cPercent = 0;
            this.empCount = 0;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      alert('Chưa nhập thời gian đánh giá');
    }
  }

  export() {
    const data = asEnumerable<View_Statistics_Reports>(this.dataSource.data)
      .Select(x => [x.stt === null ? 0 : x.stt
        , x.organization === null ? '' : x.organization
        , x.tongSoNhanVien === null ? 0 : x.tongSoNhanVien
        , x.ap === null ? 0 : x.ap
        , x.apPercent === null ? '0%' : x.apPercent + '%'
        , x.a === null ? 0 : x.a
        , x.aPercent === null ? '0%' : x.aPercent + '%'
        , x.am === null ? 0 : x.am
        , x.amPercent === null ? '0%' : x.amPercent + '%'
        , x.bp === null ? 0 : x.bp
        , x.bpPercent === null ? '0%' : x.bpPercent + '%'
        , x.bm === null ? 0 : x.bm
        , x.bmPercent === null ? '0%' : x.bmPercent + '%'
        , x.c === null ? 0 : x.c
        , x.cPercent === null ? '0%' : x.cPercent + '%'
        , x.b === null ? 0 : x.b
        , x.bPercent === null ? '0%' : x.bPercent + '%']).ToArray();

    const excelOptions: ExcelViewStatisticsReportOption = {
      data: data, filter: this.filter,
      headers: ['STT', 'Họ và tên', 'Chức danh công việc', 'Phòng/Ban'
        , 'Mức độ hoàn thành (%)', 'Xếp loại', 'Mức độ hoàn thành (%)', 'Xếp loại',
        'Ghi chú']
    };

    const excelService: ExcelViewStatisticsReportService = new ExcelViewStatisticsReportService(excelOptions);
    excelService.month = this.month;
    excelService.year = this.year;
    excelService.aPlusCount = this.aPlusCount;
    excelService.aPlusPercent = this.aPlusPercent;
    excelService.aCount = this.aCount;
    excelService.aPercent = this.aPercent;
    excelService.aMinusCount = this.aMinusCount;
    excelService.aMinusPercent = this.aMinusPercent;
    excelService.bPlusCount = this.bPlusCount;
    excelService.bPlusPercent = this.bPlusPercent;
    excelService.bCount = this.bCount;
    excelService.bPercent = this.bPercent;
    excelService.bMinusCount = this.bMinusCount;
    excelService.bMinusPercent = this.bMinusPercent;
    excelService.cCount = this.cCount;
    excelService.cPercent = this.cPercent;
    excelService.empCount = this.empCount;

    excelService.exportExcel();
  }
}