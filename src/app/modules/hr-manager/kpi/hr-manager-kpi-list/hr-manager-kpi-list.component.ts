import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseGridComponent, BaseGridDatasource } from '../../../../models/base/base-grid-component';
import { GridFilterModel, KpiFilterModel } from '../../../../models/base/utilities';
import { KpiService } from '../../../../services/kpi/kpi.service';
import { Kpi, Org_Organization, ProcessStatus, UserOrg } from '../../../../models/data/data';
import { MonthPickerComponent } from '../../../share/components/month-picker/month-picker.component';
import { EmpKpiDataSource } from 'src/app/modules/employee/kpi/kpi-list/kpi-list.component';
import { CommonDialogService } from 'src/app/services/utilities/dialog/dialog.service';
import { AsEnumerable, asEnumerable } from 'linq-es2015';
import { AppConfig } from '../../../../services/config/app.config';
import { EventService } from 'src/app/services/event-diary/event.service';

@Component({
  selector: 'app-hr-manager-kpi-list',
  templateUrl: './hr-manager-kpi-list.component.html',
  styleUrls: ['./hr-manager-kpi-list.component.css']
})
export class HrManagerKpiListComponent extends BaseGridComponent<Kpi, KpiFilterModel, KpiService, HrKpiDataSource>  {

  @ViewChild('monthFilter') monthFilter: MonthPickerComponent;
  displayedColumns = ['isSelected', 'STT', 'kpi-month', 'employee-name', 'level1ManagerFullName', 'point',
    'classification', 'statusName', 'actions'];
  start = 0;
  length = 20;
  countTotal: number;
  Orgs: Org_Organization[];
  statusList: ProcessStatus[] = AsEnumerable(AppConfig.settings.KpiStatus).Where(x => x.id > 3).ToArray();
  selectedStatus = 0;
  orgId = -1;
  moduleName = 'HrManagerKpiListComponent';
  isVip: boolean;
  level1Users: UserOrg[];
  users: UserOrg[];
  empUserName = '';
  level1MngUserName = '';

  constructor(_service: KpiService, private _dialogService: CommonDialogService, private _eventService: EventService) {
    super(_service, HrKpiDataSource);
  }

  ngOnInit() {
    super.ngOnInit();
    this.getOrgs();
    this.GetUsers();
  }

  getOrgs() {
    this._service.getOrgs().then(
      (result) => {
        this.Orgs = result.data;
        // console.log(result.data);
        // result.data.forEach(e => {
        //   const org = {
        //     id: e.id, name: e.name, description: '', organizationTypeID: e.organizationtypeid,
        //     nodeID: e.nodeid, directoryPath: e.directorypath
        //   };
        //   this.Orgs.push(org);
        // });
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

  // async getUncompletedKpi() {
  //   const rp = await this._service.updateStatusUncompletedKpi();
  //   if (rp.isSuccess) {
  //     alert('ok');
  //   } else {
  //     alert('not ok');
  //   }
  // }

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

    if (this.filter.orgId != -1) {
      this.filter.orgIds = this.getChildOrg(this.orgId);
    } else {
      this.filter.orgIds = [];
    }
    this.filter.empName = this.empUserName;
    this.filter.level1ManagerUserName = this.level1MngUserName;

    this.filter.statusIds = [];
    if (this.selectedStatus != null && this.selectedStatus > 0) {
      this.filter.statusIds.push(this.selectedStatus);
    } else {
      this.filter.statusIds = asEnumerable(this.statusList).Select(x => x.id).ToArray();
    }
    return this.filter;
  }

  async updateRangeKpiHRManagerPropose() {
    
    let selected = asEnumerable(this.dataSource.data.value).Where(x => x.uiIsSelected).ToArray();
    selected = this._service.filterKpiSelectAll(this.moduleName, selected);
    this._service.unSelectRow(selected, this.dataSource.data.value);

    if (selected == null || selected.length == 0) {
      await this._dialogService.alert('Chỉ thao tác được những bản ghi trạng thái chờ GĐ nhân sự phê duyệt!');
      return;
    }

    const isConfirmed = await this._dialogService.confirm('Bạn có chắc chắn muốn thay đổi?');
    if (!isConfirmed) {
      return;
    }

    // var selectedKpi = asEnumerable(this.dataSource.data.value).Where(x => x.uiIsSelected).ToArray();
    const rp = await this._service.updateRangeKpiHRManagerPropose(selected);
    if (rp.isSuccess) {
      this._dialogService.alert('Thay đổi thành công');
      this.searchPaging();
    } else {
      this._dialogService.alert(rp.message);
    }
  }
  orgChange(): void {
    this.level1Users = [];
    const org = asEnumerable(this.Orgs).FirstOrDefault(o => o.id === this.filter.orgId);
    this.level1MngUserName = '';
    if (org) {
      console.log(org);
      if (org.directoryPath) {
        // huypq modified 5/12/19, ko cần lấy Manager của những org con

        const level1MngIds = asEnumerable(this.users).Where(x => x.level1ManagerId > 0).Select(x => x.level1ManagerId);
        console.log(level1MngIds);
        this.level1Users = asEnumerable(this.users).Where(x => level1MngIds.Contains(x.id) && x.orgId === org.id).ToArray();

        if (this.level1Users && this.level1Users.length > 0) {
          this.level1MngUserName = this.level1Users[0].userName;
        }
      }
    }
  }

  async count(filter: KpiFilterModel) {
    try {
      const response = await this._service.countHrManagerKpi(filter);
      if (response.isSuccess) {
        this.countTotal = response.data;
      } else {
        console.log(response.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  }
}

export class HrKpiDataSource extends BaseGridDatasource<Kpi, KpiFilterModel, KpiService> {
  async getPaging(filter: KpiFilterModel) {
    try {
      const response = await this.dataService.getHrManagerKpiPaging(filter);
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