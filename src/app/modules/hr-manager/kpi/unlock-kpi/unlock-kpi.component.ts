import { Component, ViewChild } from '@angular/core';
import asEnumerable, { AsEnumerable } from 'linq-es2015';
import { CommonDialogService } from 'src/app/services/utilities/dialog/dialog.service';
import { BaseGridComponent, BaseGridDatasource } from '../../../../models/base/base-grid-component';
import { GridFilterModel, KpiFilterModel } from '../../../../models/base/utilities';
import { Kpi, Org_Organization, ProcessStatus } from '../../../../models/data/data';
import { AppConfig } from '../../../../services/config/app.config';
import { KpiService } from '../../../../services/kpi/kpi.service';
import { MonthPickerComponent } from '../../../share/components/month-picker/month-picker.component';
import { UserOrgService } from '../../../../services/orgs/user-org/user-org.service';
import { UsersService } from '../../../../services/orgs/users.service';

@Component({
  selector: 'app-unlock-kpi',
  templateUrl: './unlock-kpi.component.html',
  styleUrls: ['./unlock-kpi.component.css']
})
export class UnlockKpiComponent extends BaseGridComponent<Kpi, KpiFilterModel, KpiService, UnlockKpiDataSource>  {

  @ViewChild('monthFilter') monthFilter: MonthPickerComponent;
  displayedColumns = ['isSelected', 'STT', 'kpi-month', 'organization', 'employee-name', 'level1ManagerFullName', 'level2ManagerFullName', 'statusName'];
  start = 0;
  length = 20;
  countTotal: number;
  Orgs: Org_Organization[];
  orgId = -1;
  statusList: ProcessStatus[] = AsEnumerable(AppConfig.settings.KpiStatus).Where(x => x.id == 4 || x.id == 3).ToArray();
  selectedStatus = 0;
  userList = [];
  level1MngList = [];
  level2MngList = [];

  constructor(_service: KpiService, private _dialogService: CommonDialogService, private _userOrgService: UserOrgService, private _userService: UsersService) {
    super(_service, UnlockKpiDataSource);
  }

  ngOnInit() {
    super.ngOnInit();
    this.getUsers();
    this.getOrgs();
  }

  async getUsers() {
    try {
      const [userRp, level1Rp, level2Rp] = await Promise.all([this._userService.getUsers(), this._userOrgService.getLevel1ManagerUserOrg(), this._userOrgService.getLevel2ManagerUserOrg()]);

      if (userRp.isSuccess) {
        this.userList = userRp.data;
        let share = {
          userName: null, name: '------ Chọn ------'
        };
        this.userList.unshift(share);
      } else {
        this._dialogService.alert(userRp.message);
      }

      if (level1Rp.isSuccess) {
        this.level1MngList = level1Rp.data;
        let share = {
          userName: null, userFullName: '------ Chọn ------'
        };
        this.level1MngList.unshift(share);
      } else {
        this._dialogService.alert(level1Rp.message);
      }

      if (level2Rp.isSuccess) {
        this.level2MngList = level2Rp.data;
        let share = {
          userName: null, userFullName: '------ Chọn ------'
        };
        this.level2MngList.unshift(share);
      } else {
        this._dialogService.alert(level2Rp.message);
      }

    } catch (err) {
      console.log('err: ', err);
      this._dialogService.alert('Có lỗi xảy ra: Không thể lấy dữ liệu');
    }
  }

  getOrgs() {
    this._service.getOrgs().then(
      (result) => {
        this.Orgs = [];
        //this.Orgs = result.data;
        result.data.forEach(e => {
          let org = {
            id: e.id, name: e.name, description: e.description, organizationTypeID: e.organizationTypeID, nodeID: e.nodeID, directoryPath: e.directoryPath
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

  // async updateKpiCompleteRange() {
  //   var selectedKpi = asEnumerable(this.dataSource.data.value).Where(x => x.uiIsSelected).ToArray();
  //   const rp = await this._service.updateKpiCompleteRange(selectedKpi);
  //   if (rp.isSuccess) {
  //     this._dialogService.alert('Thay đổi thành công');
  //     this.searchPaging();
  //   } else {
  //     this._dialogService.alert(rp.message);
  //   }
  // }

  checkAll(isChecked) {
    for (let i = 0; i < this.dataSource.data.value.length; i++) {
      const element = this.dataSource.data.value[i];
      element.uiIsSelected = isChecked;
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
    this.filter.orgId = this.orgId;

    if (this.filter.orgId != -1) {
      this.filter.orgIds = this.getChildOrg(this.orgId);
    } else {
      this.filter.orgIds = [];
    }

    this.filter.statusIds = [];

    if (this.selectedStatus != null && this.selectedStatus > 0) {
      this.filter.statusIds.push(this.selectedStatus);
    } else {
      this.filter.statusIds = asEnumerable(this.statusList).Select(x => x.id).ToArray();
    }
    return this.filter;
  }

  async unlockKpiRange() {
    const selectedKpi = asEnumerable(this.dataSource.data.value).Where(x => x.uiIsSelected).ToArray();

    if (selectedKpi == null || selectedKpi.length == 0) {
      return;
    }

    const confirm = await this._dialogService.confirm('Bạn có chắc chắn muốn mở khóa nksk này?');
    if (!confirm) {
      return;
    }

    try {
      const rs = await this._service.updateHRUnlockKpiRange(selectedKpi);
      if (rs.isSuccess) {
        this._dialogService.alert('Thay đổi thành công');
        this.searchPaging();
      } else {
        this._dialogService.alert(rs.message);
      }
    } catch (error) {
      this._dialogService.alert('Có lỗi xảy ra!');
    }};
  
}

export class UnlockKpiDataSource extends BaseGridDatasource<Kpi, KpiFilterModel, KpiService> {
  public processData(data: Kpi[], filter): any {
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      element.uiIsSelected = false;
    }
    return data;
  }
}