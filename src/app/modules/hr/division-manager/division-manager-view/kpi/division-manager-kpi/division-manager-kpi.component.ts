import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseGridComponent, BaseGridDatasource } from '../../../../../../models/base/base-grid-component';
import { GridFilterModel, KpiFilterModel } from '../../../../../../models/base/utilities';
import { KpiService } from '../../../../../../services/kpi/kpi.service';
import { Kpi, Org_Organization, ProcessStatus, UserOrg } from '../../../../../../models/data/data';
import { MonthPickerComponent } from '../../../../../share/components/month-picker/month-picker.component';
import { EmpKpiDataSource } from 'src/app/modules/employee/kpi/kpi-list/kpi-list.component';
import { CommonDialogService } from 'src/app/services/utilities/dialog/dialog.service';
import { AppConfig } from '../../../../../../services/config/app.config';
import AsEnumerable, { asEnumerable } from 'linq-es2015';
import { DateHelper } from '../../../../../../helpers/date-helper';
import { EventService } from 'src/app/services/event-diary/event.service';
@Component({
  selector: 'app-division-manager-kpi',
  templateUrl: './division-manager-kpi.component.html',
  styleUrls: ['./division-manager-kpi.component.css']
})
export class DivisionManagerKpiComponent extends BaseGridComponent<Kpi, KpiFilterModel, KpiService, DivisionManagerKpiDataSource>  {

  @ViewChild('monthFilter') monthFilter: MonthPickerComponent;
  displayedColumns = ['STT', 'kpi-month', 'employee-name', 'level1ManagerFullName', 'point',
    'classification', 'statusName', 'actions'];
  start = 0;
  length = 20;
  countTotal: number;
  Orgs: Org_Organization[];
  statusList: ProcessStatus[] = AsEnumerable(AppConfig.settings.KpiStatus).ToArray();

  selectedStatus = 0;
  empUserName = '';
  level1MngUserName = '';
  level1Users: UserOrg[];
  users: UserOrg[];

  constructor(_service: KpiService, private _dialogService: CommonDialogService, private _eventService: EventService) {
    super(_service, DivisionManagerKpiDataSource);
  }

  ngOnInit() {
    super.ngOnInit();
    this.getOrgs();
    this.GetUsers();
  }

  getOrgs() {
    this._service.getOrgsByDivManager().then(
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

  GetUsers() {
    return this._eventService.getUsers().then(
      (result) => {
        this.users = result.data;
        const allUser = {
          id: -1, name: 'Tất cả'
        };
        this.users.unshift(allUser);
      }
      ,
      (error) => {
        console.log(error);
      }
    );
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
    const childOrgs = (orgPath == null) ? null :
      asEnumerable(this.Orgs).Where(x => x.directoryPath && x.directoryPath.startsWith(orgPath)).Select(x => x.id).ToArray();
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
    if (this.filter.orgId == null || this.filter.orgId === 0) {
      this.filter.orgId = -1;
      this.filter.orgIds = [];
    } else {
      this.filter.orgIds = this.getChildOrg(this.filter.orgId);
    }
    this.filter.empName = this.empUserName;
    this.filter.level1ManagerUserName = this.level1MngUserName;

    if (this.selectedStatus != null && this.selectedStatus > 0) {
      this.filter.statusIds.push(this.selectedStatus);
    } else {
      this.filter.statusIds = asEnumerable(this.statusList).Select(x => x.id).ToArray();
    }
    console.log(this.filter);
    return this.filter;
  }

  async count(filter: KpiFilterModel) {
    try {
      const response = await this._service.countDivisionManagerKpi(filter);
      if (response.isSuccess) {
        this.countTotal = response.data;
      } else {
        console.log(response.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  orgChange(): void {
    this.level1Users = [];
    const org = asEnumerable(this.Orgs).FirstOrDefault(o => o.id === this.filter.orgId);
    this.level1MngUserName = '';

    if (org) {
      if (org.directoryPath) {
        // huypq modified 5/12/19, ko cần lấy Manager của những org con

        const level1MngIds = asEnumerable(this.users).Where(x => x.level1ManagerId > 0).Select(x => x.level1ManagerId);

        this.level1Users = asEnumerable(this.users).Where(x => level1MngIds.Contains(x.id) && x.orgId === org.id).ToArray();

        if (this.level1Users && this.level1Users.length > 0) {
          this.level1MngUserName = this.level1Users[0].userName;
        }
      }
    }
  }
}

export class DivisionManagerKpiDataSource extends BaseGridDatasource<Kpi, KpiFilterModel, KpiService> {
  async getPaging(filter: KpiFilterModel) {
    try {
      const response = await this.dataService.getDivisionManagerKpiPaging(filter);
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