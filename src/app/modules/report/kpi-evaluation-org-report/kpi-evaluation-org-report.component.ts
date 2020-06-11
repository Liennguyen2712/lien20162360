import { Component, OnInit, ViewChild } from '@angular/core';
import { Org_Organization, View_KpiEvaluation_Organization } from 'src/app/models/data/data';
import { BaseGridDatasource, BaseGridComponent } from 'src/app/models/base/base-grid-component';
import { View_KpiEvaluation_Organization_Service } from 'src/app/services/reports/kpi-evaluation-org/View_KpiEvaluation_Organization.service';
import { MonthPickerComponent } from '../../share/components/month-picker/month-picker.component';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material';
import { e } from '@angular/core/src/render3';
import { asEnumerable } from 'linq-es2015';
import { ExcelKpiEvaluationOrgReportOption, KpiEvaluationOrgReportFilter, ExcelKpiEvaluationOrgReportService } from 'src/app/services/excel/excel-kpi-evaluation-org-report.service';

@Component({
  selector: 'app-kpi-evaluation-org-report',
  templateUrl: './kpi-evaluation-org-report.component.html',
  styleUrls: ['./kpi-evaluation-org-report.component.css']
})
export class KpiEvaluationOrgReportComponent implements OnInit {
  @ViewChild('monthFilter') monthFilter: MonthPickerComponent;

  displayedColumns: string[] = ['STT', 'code', 'employeeName', 'employeeJobTitle'
    , 'organization', 'empKpiPoint', 'empKpiClassification','level1ManagerKpiPoint', 'level1ManagerKpiClassification',
    'hrKpiPoint', 'hrKpiPointClassification','finalKpiPoint', 'finalKpiClassification','reportPoint', 'reportClassification', 'finalKpiComment'];
  dataSource: MatTableDataSource<View_KpiEvaluation_Organization>;
  filter: KpiEvaluationOrgReportFilter;

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

  constructor(private _service: View_KpiEvaluation_Organization_Service) {

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

    if (ym && this.orgId) {
      // ten cot thang nam
      const str = '' + ym;
      this.month = str.slice(4);
      this.year = str.slice(0, 4);
      const org = this.Orgs.find(o => o.id === this.orgId);
      let dirPath = '';
      if (org) {
        dirPath = org.directoryPath;
      }

      const filter = { yearMonth: this.monthFilter.getYearMonth(), orgId: this.orgId, directoryPath: dirPath };

      this._service.search(filter).then(
        (result) => {
          const data = result.data as View_KpiEvaluation_Organization[];
          this.dataSource = new MatTableDataSource(result.data);

          // tong hop
          if (data && data.length > 0) {
            console.log(data);
            data.forEach(element => {
              if (element.reportClassification) {
                element.reportClassification = element.reportClassification.trim();
              }
            });
            
            // tong so phong ban
            const orgs = asEnumerable(data).Where(x => x.id === -1).ToArray();
            const orgCount = orgs ? orgs.length : 0;
            const totalEmp = data.length - orgCount;
            this.empCount = totalEmp;

            const aPlus = asEnumerable(data).Where(x => x.reportClassification === 'A+').ToArray();
            this.aPlusCount = aPlus ? aPlus.length : 0;
            this.aPlusPercent = this.aPlusCount * 100 / totalEmp;

            const a = asEnumerable(data).Where(x => x.reportClassification === 'A').ToArray();
            this.aCount = a ? a.length : 0;
            this.aPercent = this.aCount * 100 / totalEmp;

            const aMinus = asEnumerable(data).Where(x => x.reportClassification === 'A-').ToArray();
            this.aMinusCount = aMinus ? aMinus.length : 0;
            this.aMinusPercent = this.aMinusCount * 100 / totalEmp;

            const bPlus = asEnumerable(data).Where(x => x.reportClassification === 'B+').ToArray();
            this.bPlusCount = bPlus ? bPlus.length : 0;
            this.bPlusPercent = this.bPlusCount * 100 / totalEmp;

            const b = asEnumerable(data).Where(x => x.reportClassification === 'B').ToArray();
            this.bCount = b ? b.length : 0;
            this.bPercent = this.bCount * 100 / totalEmp;

            const bMinus = asEnumerable(data).Where(x => x.reportClassification === 'B-').ToArray();
            this.bMinusCount = bMinus ? bMinus.length : 0;
            this.bMinusPercent = this.bMinusCount * 100 / totalEmp;

            const c = asEnumerable(data).Where(x => x.reportClassification === 'C').ToArray();
            this.cCount = c ? c.length : 0;
            this.cPercent = this.cCount * 100 / totalEmp;

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
      alert('Chưa nhập thời gian đánh giá/phòng ban');
    }
  }

  export() {
    const data = asEnumerable<View_KpiEvaluation_Organization>(this.dataSource.data)
      .Select(x => [x.id === -1 ? null : x.no
        , x.code == null ? '' : x.code
        , x.employeeName == null ? '' : x.employeeName
        , x.id === -1 ? null : x.employeeJobTitle == null ? '' : x.employeeJobTitle
        , x.id === -1 ? null : x.organization == null ? '' : x.organization
        , x.id === -1 ? null : x.empKpiPoint == null ? 0 : x.empKpiPoint
        , x.id === -1 ? null : x.empKpiClassification == null ? '' : x.empKpiClassification
        , x.id === -1 ? null : x.level1ManagerKpiPoint == null ? 0 : x.level1ManagerKpiPoint
        , x.id === -1 ? null : x.level1ManagerKpiClassification == null ? '' : x.level1ManagerKpiClassification
        , x.id === -1 ? null : x.hrKpiPoint == null ? 0 : x.hrKpiPoint
        , x.id === -1 ? null : x.hrKpiPointClassification == null ? '' : x.hrKpiPointClassification
        , x.id === -1 ? null : x.finalKpiPoint == null ? 0 : x.finalKpiPoint
        , x.id === -1 ? null : x.finalKpiClassification == null ? '' : x.finalKpiClassification
        , x.id === -1 ? null : x.reportPoint == null ? 0 : x.reportPoint
        , x.id === -1 ? null : x.reportClassification == null ? '' : x.reportClassification
        , x.id === -1 ? null : x.finalKpiComment == null ? '' : x.finalKpiComment]).ToArray();

    const excelOptions: ExcelKpiEvaluationOrgReportOption = {
      data: data, filter: this.filter,
      headers: ['STT', 'Mã nhân viên','Họ và tên', 'Chức danh công việc', 'Phòng/Ban'
        , 'Mức độ hoàn thành (%)', 'Xếp loại', 'Mức độ hoàn thành (%)', 'Xếp loại',
        , 'Mức độ hoàn thành (%)', 'Xếp loại', 'Mức độ hoàn thành (%)', 'Xếp loại',
        , 'Mức độ hoàn thành (%)', 'Xếp loại', 
        'Ghi chú']
    };

    const excelService: ExcelKpiEvaluationOrgReportService = new ExcelKpiEvaluationOrgReportService(excelOptions);
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

  isOrgRow = (index, item) => item.id === -1;
}