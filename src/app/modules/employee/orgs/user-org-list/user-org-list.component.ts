import { Component, OnInit } from '@angular/core';
import { BaseGridComponent, BaseGridDatasource } from 'src/app/models/base/base-grid-component';
import { ViewUserEventDiary } from 'src/app/models/data/data';
import { ViewUserEventDiaryFilterModel, GridFilterModel } from 'src/app/models/base/utilities';
import { UsersService } from 'src/app/services/orgs/users.service';


@Component({
  selector: 'app-user-org-list',
  templateUrl: './user-org-list.component.html',
  styleUrls: ['./user-org-list.component.css']
})
export class UserOrgListComponent extends BaseGridComponent<ViewUserEventDiary, ViewUserEventDiaryFilterModel, UsersService, UsersDataSource> {
  displayedColumns = ['STT', 'kpi-month', 'org-name', 'employee-name', 'level1ManagerName', 'statusName', 'actions'];
  start = 0;
  length = 5;
  countTotal: number;

  constructor(_service: UsersService) {
    super(_service, UsersDataSource);
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
    return this.filter;
  }



  ngOnInit() {
    super.ngOnInit();
  }

}
export class UsersDataSource extends BaseGridDatasource<ViewUserEventDiary, ViewUserEventDiaryFilterModel, UsersService> {
}
