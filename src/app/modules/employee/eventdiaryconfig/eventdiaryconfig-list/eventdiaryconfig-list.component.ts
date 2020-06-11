import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseGridComponent, BaseGridDatasource } from 'src/app/models/base/base-grid-component';
import { ViewEventDiaryConfig, Org_Organization, UserOrg } from 'src/app/models/data/data';
import { GridFilterModel, ViewEventDiaryConfigFilterModel, EventDiaryFilterModel } from 'src/app/models/base/utilities';
import { ViewEventdiaryconfigService } from 'src/app/services/eventdiaryconfig/eventdiaryconfig.service';
import { MonthPickerComponent } from 'src/app/modules/share/components/month-picker/month-picker.component';
import { asEnumerable } from 'linq-es2015';
import { e } from '@angular/core/src/render3';



@Component({
  selector: 'app-eventdiaryconfig-list',
  templateUrl: './eventdiaryconfig-list.component.html',
  styleUrls: ['./eventdiaryconfig-list.component.css']
})

export class EventdiaryconfigListComponent extends BaseGridComponent<ViewEventDiaryConfig, ViewEventDiaryConfigFilterModel, ViewEventdiaryconfigService, ViewEventDiaryConfigDataSource> {
  @ViewChild('monthFilter') monthFilter: MonthPickerComponent;
  displayedColumns = ['STT', 'Code', 'orgName', 'level1ManagerName', 'Level2ManagerFullName', 'status', 'actions'];

  start = 0;
  length = 20;
  orgId = 0;
  level1ManagerId = 0;
  level2ManagerId = 0;
  Orgs: Org_Organization[];
  UserOrgs: UserOrg[];
  filteredUserOrgs: UserOrg[];
  filteredParentUserOrgs: UserOrg[];

  countTotal: number;
  //eventOrgs: EventDiaryConfig[] = [];


  constructor(_service: ViewEventdiaryconfigService) {
    super(_service, ViewEventDiaryConfigDataSource);
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
    this.filter.orgId = this.orgId;
    this.filter.level1ManagerId = this.level1ManagerId;
    this.filter.level2ManagerId = this.level2ManagerId;
    return this.filter;
  }

  getOrgs() {
    this._service.getOrgs().then(
      (result) => {
        this.Orgs = [];

        result.data.forEach(e => {
          const org = {
            id: e.id, name: e.name, description: e.description, organizationTypeID: e.organizationTypeID,
            nodeID: e.nodeID, directoryPath: e.directoryPath
          };
          this.Orgs.push(org);
        });
        const allOrg = {
          id: -1, name: 'Tất cả phòng ban', description: '', organizationTypeID: -1,
          nodeID: '', directoryPath: ''
        };
        this.Orgs.unshift(allOrg);
        this.getUsers();
      }
      ,
      (error) => {
        console.log(error);
      }
    );
  }

  getUsers() {
    this._service.getUsers().then(
      (result) => {
        this.UserOrgs = [];
        result.data.forEach(e => {
          const user = {
            id: e.id, userFullName: e.userFullName, jobTitle: e.jobTitle, orgId: e.orgId
          };
          this.UserOrgs.push(user);
        });
        const allUser = {
          id: -1, userFullName: 'Tất cả'};
        this.UserOrgs.unshift(allUser);
        // load danh sach nhan vien
        // this.orgChange(this.orgId);
      }
      ,
      (error) => {
        console.log(error);
      }
    );
  }

  orgChange(id) {
    // load danh sach user theo phong ban
    // cap 1
    this.filteredUserOrgs = [];
    this.filteredUserOrgs = this.UserOrgs.filter(o => o.orgId === this.orgId);

    // cap 2
    this.filteredParentUserOrgs = [];
    const currOrg = asEnumerable(this.Orgs).FirstOrDefault(o => o.id === this.orgId);
    if (currOrg != null) {
      let parentOrg: Org_Organization;
      for (let i = 0; i < this.Orgs.length; i++) {
        const element = this.Orgs[i];

        if (element.directoryPath != null) {
          // org cha, co dir path nam trong dir path cua org hien tai
          const crOrgDotCount = (currOrg.directoryPath.split('.').length - 1);
          if (currOrg.directoryPath.startsWith(element.directoryPath) && element.directoryPath.length < currOrg.directoryPath.length
            && element.directoryPath.length > 0 && crOrgDotCount === element.directoryPath.split('.').length) {
            parentOrg = element;
            break;
          }
        }
      }
      this.filteredParentUserOrgs = this.UserOrgs.filter(o => o.orgId === this.orgId || o.orgId === parentOrg.id);
    }
  }

  ngOnInit() {
    super.ngOnInit();
    this.getOrgs();
  }

}
export class ViewEventDiaryConfigDataSource extends BaseGridDatasource<ViewEventDiaryConfig, ViewEventDiaryConfigFilterModel, ViewEventdiaryconfigService> {
}
