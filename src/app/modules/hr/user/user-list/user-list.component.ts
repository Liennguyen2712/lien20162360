import { Component, OnInit } from '@angular/core';
import { UserOrg, Org_Organization } from 'src/app/models/data/data';
import { BaseGridComponent, BaseGridDatasource } from 'src/app/models/base/base-grid-component';
import { UserOrgService } from 'src/app/services/orgs/user-org/user-org.service';
import { GridFilterModel, UserOrgFilterModel } from 'src/app/models/base/utilities';
import { from } from 'rxjs';
import { first } from 'rxjs/operators';
import { CommonDialogService } from 'src/app/services/utilities/dialog/dialog.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends BaseGridComponent<UserOrg, UserOrgFilterModel, UserOrgService, UserOrgDataSource> {

  txtName: string;
  Orgs: Org_Organization[];
  orgId: number;

  start = 1;
  length = 15;
  countTotal = 0;
  displayedColumns = ['STT', 'code', 'name', 'dob', 'jobTitle', 'org'
    , 'email', 'firstKpiPeriod', 'status', 'actions'];

  constructor(_service: UserOrgService, private _dialogService: CommonDialogService) {
    super(_service, UserOrgDataSource);
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
    this.filter.name = this.txtName;
    this.filter.orgId = this.orgId;
    return this.filter;
  }

  ngOnInit() {
    super.ngOnInit();
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

  async removeUser(userName) {
    const isConfirm = await this._dialogService.confirm('Bạn chắc chắn xóa người dùng này?');
    if (!isConfirm) {
      return;
    }
    console.log(userName);

    this._service.RemoveUser(userName).then(
      (data) => {
        if (data.isSuccess === true) {
          alert('Lưu thành công.');
          this.searchPaging();
        } else {
          alert(data.message);
        }
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

export class UserOrgDataSource extends BaseGridDatasource<UserOrg, UserOrgFilterModel, UserOrgService> {
}