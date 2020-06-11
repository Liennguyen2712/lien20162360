import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseGridComponent, BaseGridDatasource } from '../../../../models/base/base-grid-component';
import { GridFilterModel, KpiFilterModel } from '../../../../models/base/utilities';
import { KpiService } from '../../../../services/kpi/kpi.service';
import { Kpi, Org_Organization, ProcessStatus, UserOrg } from '../../../../models/data/data';
import { MonthPickerComponent } from '../../../share/components/month-picker/month-picker.component';
import { EmpKpiDataSource } from 'src/app/modules/employee/kpi/kpi-list/kpi-list.component';
import { AppConfig } from '../../../../services/config/app.config';
import { UserOrgService } from '../../../../services/orgs/user-org/user-org.service';
import asEnumerable from 'linq-es2015';
import { CommonDialogService } from 'src/app/services/utilities/dialog/dialog.service';
import { EventService } from 'src/app/services/event-diary/event.service';

@Component({
  selector: 'app-mnglevel2-kpi-list',
  templateUrl: './mnglevel2-kpi-list.component.html',
  styleUrls: ['./mnglevel2-kpi-list.component.css']
})
export class Mnglevel2KpiListComponent extends BaseGridComponent<Kpi, KpiFilterModel, KpiService, MngLv2KpiDataSource> {
  orgId: number;
  Orgs: Org_Organization[];
  employeeName: string;
  moduleName = 'Mnglevel2KpiListComponent';

  users: UserOrg[];

  @ViewChild('monthFilter') monthFilter: MonthPickerComponent;
  displayedColumns = ['isSelected', 'STT', 'kpi-month', 'employee-name',
    'org-name', 'kpipoint', 'kpiclassification'
    , 'level1ManagerFullName', 'statusName', 'actions'];
  start = 0;
  length = 20;
  countTotal: number;
  statusList: ProcessStatus[] = AppConfig.settings.KpiStatus;
  selectedStatus = 0;

  constructor(_service: KpiService, private _userOrgService: UserOrgService, private _dialogService: CommonDialogService,private _eventService: EventService) {
    super(_service, MngLv2KpiDataSource);
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

    if (this.selectedStatus != null && this.selectedStatus > 0) {
      this.filter.statusIds.push(this.selectedStatus);
    }
    return this.filter;
  }

  ngOnInit() {
    super.ngOnInit();
    this.getOrgs();
    this.GetUsers();
  }

  GetUsers() {
    return this._eventService.getUsers().then(
      (result) => {
        this.users = result.data;
        const allUser = {
          id: -1, userFullName: 'Tất cả'
        };
        this.users.unshift(allUser);
      }
      ,
      (error) => {
        console.log(error);
      }
    );
  }

  async count(filter: KpiFilterModel) {
    try {
      const response = await this._service.countMngLv2(filter);
      if (response.isSuccess) {
        this.countTotal = response.data;
      } else {
        console.log(response.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  getOrgs() {
    this._userOrgService.getOrgByCurrentLv2Mng().then(
      (result) => {
        this.Orgs = [];
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
        // this.filter.orgId = this.Orgs[0].id;
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

  async processRangeKpiLevel2Mng() {
    console.log('processRangeKpiLevel2Mng');
    let selected = asEnumerable(this.dataSource.data.value).Where(x => x.uiIsSelected).ToArray();
    selected = this._service.filterKpiSelectAll(this.moduleName, selected);
    this._service.unSelectRow(selected, this.dataSource.data.value);
    
    if (selected == null || selected.length == 0) {
      await this._dialogService.alert('Chỉ thao tác được những bản ghi trạng thái đang đánh giá!');
      return;
    }

    const isConfirmed = await this._dialogService.confirm('Bạn có chắc chắn muốn thay đổi?');
    if (!isConfirmed) {
      return;
    }

    const rs = await this._service.processRangeKpiLevel2Mng(selected);
    if (rs.isSuccess) {
      this._dialogService.alert('Thay đổi thành công');
      this.searchPaging();
    } else {
      this._dialogService.alert(rs.message);
    }
  }
}

export class MngLv2KpiDataSource extends BaseGridDatasource<Kpi, KpiFilterModel, KpiService> {
  async getPaging(filter: KpiFilterModel) {
    try {
      const response = await this.dataService.getPagingMngLv2(filter);
      if (response.isSuccess) {
        const data = this.processData(response.data, filter);
        this.data.next(data);
        return;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}
