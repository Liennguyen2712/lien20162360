import { Component, OnInit } from '@angular/core';
import { UserOrg, Org_Organization } from 'src/app/models/data/data';
import { BaseGridComponent, BaseGridDatasource } from 'src/app/models/base/base-grid-component';
import { UserOrgFilterModel, GridFilterModel } from 'src/app/models/base/utilities';
import { UserOrgService } from 'src/app/services/orgs/user-org/user-org.service';
import { UserOrgDataSource } from '../../user/user-list/user-list.component';
import { CommonDialogService } from 'src/app/services/utilities/dialog/dialog.service';

@Component({
  selector: 'app-division-manager-permission-list',
  templateUrl: './division-manager-permission-list.component.html',
  styleUrls: ['./division-manager-permission-list.component.css']
})
export class DivisionManagerPermissionListComponent extends BaseGridComponent<UserOrg, UserOrgFilterModel
, UserOrgService, DivMngUserOrgDataSource> {

  txtName: string;
  Orgs: Org_Organization[];
  orgId: number;

  start = 1;
  length = 20;
  countTotal = 0;
  displayedColumns = ['STT', 'name', 'org', 'jobTitle', 'actions'];

  constructor(_service: UserOrgService, private _dialogService: CommonDialogService) {
    super(_service, DivMngUserOrgDataSource);
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

  async count(filter: UserOrgFilterModel) {
    try {
      const response = await this._service.countDivisionManager(filter);
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

export class DivMngUserOrgDataSource extends BaseGridDatasource<UserOrg, UserOrgFilterModel, UserOrgService> {
  async getPaging(filter: UserOrgFilterModel) {
    try {
      const response = await this.dataService.searchPagingDivisionManager(filter);
      if (response.isSuccess) {
        const data = this.processData(response.data, filter);
        this.data.next(data);
        console.log(data);
        return;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}