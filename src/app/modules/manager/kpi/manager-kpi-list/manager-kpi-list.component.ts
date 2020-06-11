import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BaseGridComponent, BaseGridDatasource } from '../../../../models/base/base-grid-component';
import { Kpi, Org_Organization, UserOrg } from '../../../../models/data/data';
import { KpiMngFilterModel, GridFilterModel } from '../../../../models/base/utilities';
import { KpiService } from '../../../../services/kpi/kpi.service';
import { MonthPickerComponent } from 'src/app/modules/share/components/month-picker/month-picker.component';
import { UserOrgService } from 'src/app/services/orgs/user-org/user-org.service';
import { EventService } from 'src/app/services/event-diary/event.service';

@Component({
  selector: 'app-manager-kpi-list',
  templateUrl: './manager-kpi-list.component.html',
  styleUrls: ['./manager-kpi-list.component.css']
})
export class ManagerKpiListComponent extends BaseGridComponent<Kpi, KpiMngFilterModel, KpiService, MngKpiDataSource> {
  @ViewChild('monthFilter') monthFilter: MonthPickerComponent;
  displayedColumns = ['STT', 'kpi-month', 'employee-name', 'level1ManagerFullName', 'point',
    'classification', 'statusName', 'actions'];
  start = 0;
  length = 20;
  countTotal: number;
  orgId: number;
  Orgs: Org_Organization[];
  users: UserOrg[];
  empUserName: string;

  constructor(_service: KpiService, private _userOrgService: UserOrgService, private _eventService: EventService) {
    super(_service, MngKpiDataSource);
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
    this.filter.empName = this.empUserName;

    this.start = this.paginator.pageIndex * this.paginator.pageSize + 1;
    this.length = this.paginator.pageSize;
    this.filter.start = this.start;
    this.filter.length = this.length;
    this.filter.yearMonth = this.monthFilter.getYearMonth();
    this.filter.orgId = this.orgId;
    return this.filter;
  }

  getOrgs() {
    this._userOrgService.getOrgByCurrentLv1Mng().then(
      (result) => {
        this.Orgs = [];
        result.data.forEach(e => {
          const org = {
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

  async count(filter: KpiMngFilterModel) {
    try {
      const response = await this._service.countMng(filter);
      if (response.isSuccess) {
        this.countTotal = response.data;
      } else {
        console.log(response.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  ngOnInit() {
    super.ngOnInit();
    this.getOrgs();
    this.GetUsers();
  }
}

export class MngKpiDataSource extends BaseGridDatasource<Kpi, KpiMngFilterModel, KpiService> {
  async getPaging(filter: KpiMngFilterModel) {
    try {
      const response = await this.dataService.getPagingMng(filter);
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
