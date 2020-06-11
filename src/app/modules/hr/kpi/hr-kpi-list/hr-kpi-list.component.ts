import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseGridComponent, BaseGridDatasource } from '../../../../models/base/base-grid-component';
import { GridFilterModel, KpiFilterModel } from '../../../../models/base/utilities';
import { KpiService } from '../../../../services/kpi/kpi.service';
import { Kpi, Org_Organization, ProcessStatus } from '../../../../models/data/data';
import { MonthPickerComponent } from '../../../share/components/month-picker/month-picker.component';
import { EmpKpiDataSource } from 'src/app/modules/employee/kpi/kpi-list/kpi-list.component';
import { CommonDialogService } from 'src/app/services/utilities/dialog/dialog.service';
import { AppConfig } from '../../../../services/config/app.config';
import AsEnumerable, { asEnumerable } from 'linq-es2015';
import { DateHelper } from '../../../../helpers/date-helper';

@Component({
  selector: 'app-hr-kpi-list',
  templateUrl: './hr-kpi-list.component.html',
  styleUrls: ['./hr-kpi-list.component.css']
})
export class HrKpiListComponent extends BaseGridComponent<Kpi, KpiFilterModel, KpiService, EmpKpiDataSource>  {

  @ViewChild('monthFilter') monthFilter: MonthPickerComponent;
  displayedColumns = ['isSelected', 'STT', 'kpi-month', 'employee-name', 'level1ManagerFullName', 'point',
    'classification', 'statusName', 'actions'];
  start = 0;
  length = 20;
  countTotal: number;
  Orgs: Org_Organization[];
  statusList: ProcessStatus[] = AsEnumerable(AppConfig.settings.KpiStatus).Where(x => x.id > 2).ToArray();

  selectedStatus = 0;
  employeeName = '';
  level1ManagerName = '';
  moduleName = 'HrKpiListComponent';

  constructor(_service: KpiService, private _dialogService: CommonDialogService) {
    super(_service, EmpKpiDataSource);
  }

  ngOnInit() {
    super.ngOnInit();
    this.getOrgs();
  }

  getOrgs() {
    this._service.getOrgs().then(
      (result) => {
        this.Orgs = [];
        //this.Orgs = result.data;
        result.data.forEach(e => {
          let org = {
            id: e.id, name: e.name, description: e.description, organizationTypeID: e.organizationTypeID,
            nodeID: e.nodeID, directoryPath: e.directoryPath
          };
          this.Orgs.push(org);
        });
        let allOrg = {
          id: -1, name: 'Tất cả phòng ban', description: '', organizationTypeID: -1,
          nodeID: '', directoryPath: ''
        };
        this.Orgs.unshift(allOrg);
      }
      ,
      (error) => {
        console.log(error);
      }
    );
  }

  checkAll(isChecked) {
    for (let i = 0; i < this.dataSource.data.value.length; i++) {
      const element = this.dataSource.data.value[i];
      element.uiIsSelected = isChecked;
    }
  }

  async getUncompletedKpi() {
    const childOrgs = this.getChildOrg(this.filter.orgId);
    const rp = await this._service.updateStatusUncompletedKpi(this.monthFilter.getYearMonth(), childOrgs);
    if (rp.isSuccess) {
      if (rp.message == null || rp.message.length == 0) {
        this._dialogService.alert('Thay đổi thành công');
        this.searchPaging();
      } else {
        this._dialogService.alert(rp.message);
      }
    } else {
      this._dialogService.alert('Có lỗi xảy ra');
    }
  }

  getChildOrg(orgId) {
    const orgPath = (this.filter.orgId > 0) ? asEnumerable(this.Orgs).FirstOrDefault(x => x.id == this.filter.orgId).directoryPath : null;
    const childOrgs = (orgPath == null) ? null : asEnumerable(this.Orgs).Where(x => x.directoryPath && x.directoryPath.startsWith(orgPath)).Select(x => x.id).ToArray();
    return childOrgs;
  }

  getFilter(): GridFilterModel {
    if (this.filter == null) {
      this.filter = { start: this.start, length: this.length };
    }

    if (this.paginator.pageIndex == null) {
      this.paginator.pageIndex = this.start;
    }

    if (this.paginator.pageSize == null) {
      this.paginator.pageSize = this.length;
    }

    this.start = this.paginator.pageIndex * this.paginator.pageSize + 1;
    this.length = this.paginator.pageSize;
    this.filter.start = this.start;
    this.filter.length = this.length;
    this.filter.yearMonth = this.monthFilter.getYearMonth();
    this.filter.statusIds = [];
    if (this.filter.orgId == null || this.filter.orgId == 0) {
      this.filter.orgId = -1;
      this.filter.orgIds = [];
    } else {
      this.filter.orgIds = this.getChildOrg(this.filter.orgId);
    }
    this.filter.employeeName = this.employeeName;
    this.filter.level1ManagerName = this.level1ManagerName;

    if (this.selectedStatus != null && this.selectedStatus > 0) {
      this.filter.statusIds.push(this.selectedStatus);
    } else {
      this.filter.statusIds = asEnumerable(this.statusList).Select(x => x.id).ToArray();
    }
    console.log(this.filter);
    return this.filter;
  }

  async updateRangeKpiBusinessApplication() {
    let selected = asEnumerable(this.dataSource.data.value).Where(x => x.uiIsSelected).ToArray();
    selected = this._service.filterKpiSelectAll(this.moduleName, selected);
    this._service.unSelectRow(selected, this.dataSource.data.value);

    if (selected == null || selected.length == 0) {
      await this._dialogService.alert('Chỉ thao tác được những bản ghi trạng thái đã gửi nhân sự!');
      return;
    }

    const isConfirmed = await this._dialogService.confirm('Bạn có chắc chắn muốn thay đổi?');
    if (!isConfirmed) {
      return;
    }

    // var selectedKpi = asEnumerable(this.dataSource.data.value).Where(x => x.uiIsSelected).ToArray();
    const rp = await this._service.updateRangeKpiBusinessApplication(selected);
    if (rp.isSuccess) {
      this._dialogService.alert('Thay đổi thành công');
      this.searchPaging();
    } else {
      this._dialogService.alert(rp.message);
    }
  }
}
