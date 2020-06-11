import { Component, OnInit, ViewChild } from '@angular/core';
import { Org_Organization, Unlockdiarycriterion } from 'src/app/models/data/data';

import { MonthPickerComponent } from '../../share/components/month-picker/month-picker.component';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material';
import { e } from '@angular/core/src/render3';
import { asEnumerable } from 'linq-es2015';

import { View_Statistics_Report_Filter } from 'src/app/models/base/utilities';
import { UnlockdiarycriterionService } from 'src/app/services/unlockdiarycriterion/unlockdiarycriterion.service';


@Component({
  selector: 'app-unlockdiarycriterion',
  templateUrl: './unlockdiarycriterion.component.html',
  styleUrls: ['./unlockdiarycriterion.component.css']
})
export class UnlockdiarycriterionComponent implements OnInit {
  @ViewChild('monthFilter') monthFilter: MonthPickerComponent;

  displayedColumns: string[] = ['STT', 'organization', 'TongSoNhanVien', 'A',
    'A_', 'B_', 'B', 'C'];
  dataSource: MatTableDataSource<Unlockdiarycriterion>;
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
  cCount: number;
  cPercent: number;
  empCount: number;

  Orgs: Org_Organization[];
  orgId: number;
  monthYear: number;
  month: string;
  year: string;

  constructor(private _service: UnlockdiarycriterionService) {

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
          const data = result.data as Unlockdiarycriterion[];
          this.dataSource = new MatTableDataSource(result.data);

          // tong hop
          /*if (data && data.length > 0) {
            console.log(data);
            // tong so phong ban
            const orgs = asEnumerable(data).Where(x => x.id === -1).ToArray();
            const orgCount = orgs ? orgs.length : 0;
            const totalEmp = data.length - orgCount;
            this.empCount = totalEmp;

            const aPlus = asEnumerable(data).Where(x => x.finalKpiClassification === 'A+').ToArray();
            this.aPlusCount = aPlus ? aPlus.length : 0;
            this.aPlusPercent = this.aPlusCount * 100 / totalEmp;

            const a = asEnumerable(data).Where(x => x.finalKpiClassification === 'A').ToArray();
            this.aCount = a ? a.length : 0;
            this.aPercent = this.aCount * 100 / totalEmp;

            const aMinus = asEnumerable(data).Where(x => x.finalKpiClassification === 'A-').ToArray();
            this.aMinusCount = aMinus ? aMinus.length : 0;
            this.aMinusPercent = this.aMinusCount * 100 / totalEmp;

            const bPlus = asEnumerable(data).Where(x => x.finalKpiClassification === 'B+').ToArray();
            this.bPlusCount = bPlus ? bPlus.length : 0;
            this.bPlusPercent = this.bPlusCount * 100 / totalEmp;

            const b = asEnumerable(data).Where(x => x.finalKpiClassification === 'B').ToArray();
            this.bCount = b ? b.length : 0;
            this.bPercent = this.bCount * 100 / totalEmp;

            const c = asEnumerable(data).Where(x => x.finalKpiClassification === 'C').ToArray();
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
            this.cCount = 0;
            this.cPercent = 0;
            this.empCount = 0;
          }*/
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      alert('Chưa nhập thời gian đánh giá/phòng ban');
    }
  }

  /*export() {
    const data = asEnumerable<Unlockdiarycriterion>(this.dataSource.data)
      .Select(x => [x.id === -1 ? null : x.no
        , x.employeeName == null ? '' : x.employeeName
        , x.id === -1 ? null : x.employeeJobTitle == null ? '' : x.employeeJobTitle
        , x.id === -1 ? null : x.organization == null ? '' : x.organization
        , x.id === -1 ? null : x.empKpiPoint == null ? 0 : x.empKpiPoint
        , x.id === -1 ? null : x.empKpiClassification == null ? '' : x.empKpiClassification
        , x.id === -1 ? null : x.finalKpiPoint == null ? 0 : x.finalKpiPoint
        , x.id === -1 ? null : x.finalKpiClassification == null ? '' : x.finalKpiClassification
        , x.id === -1 ? null : x.finalKpiComment == null ? '' : x.finalKpiComment]).ToArray();

    const excelOptions: ExcelKpiEvaluationOrgReportOption = {
      data: data, filter: this.filter,
      headers: ['STT', 'Họ và tên', 'Chức danh công việc', 'Phòng/Ban'
        , 'Mức độ hoàn thành (%)', 'Xếp loại', 'Mức độ hoàn thành (%)', 'Xếp loại',
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
    excelService.cCount = this.cCount;
    excelService.cPercent = this.cPercent;
    excelService.empCount = this.empCount;

    excelService.exportExcel();
  }*/

  isOrgRow = (index, item) => item.id === -1;
}
