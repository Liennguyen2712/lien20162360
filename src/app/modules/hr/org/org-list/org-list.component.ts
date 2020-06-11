import { Component, OnInit } from '@angular/core';
import { Org_Organization } from 'src/app/models/data/data';
import { BaseGridComponent, BaseGridDatasource } from 'src/app/models/base/base-grid-component';
import { OrgFilterModel } from 'src/app/models/base/utilities';
import { OrgService } from 'src/app/services/orgs/org.service';
import { CommonDialogService } from 'src/app/services/utilities/dialog/dialog.service';

@Component({
  selector: 'app-org-list',
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.css']
})
export class OrgListComponent extends BaseGridComponent<Org_Organization, OrgFilterModel, OrgService, OrgDataSource>{
  start = 1;
  length = 20;
  countTotal = 0;
  filterName = '';
  filterCode = '';
  displayedColumns = ['STT', 'code', 'name', 'description', 'parentName', 'actions'];

  constructor(_service: OrgService, private _dialogService: CommonDialogService) {
    super(_service, OrgDataSource);
  }

  getFilter(): OrgFilterModel {
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
    this.filter.name = this.filterName;
    this.filter.code = this.filterCode;
    return this.filter;
  }

  ngOnInit() {
    super.ngOnInit();
  }

}

export class OrgDataSource extends BaseGridDatasource<Org_Organization, OrgFilterModel, OrgService> {
}
