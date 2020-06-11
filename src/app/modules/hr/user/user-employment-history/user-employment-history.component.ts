import { Component, OnInit, Inject } from '@angular/core';
import { UserEmployment } from 'src/app/models/data/data';
import { UserEmploymentFilterModel } from 'src/app/models/base/utilities';
import { UserEmploymentService } from 'src/app/services/orgs/emp-history/emp-historyservice';
import { BaseGridComponent, BaseGridDatasource } from 'src/app/models/base/base-grid-component';
import { CommonDialogService } from 'src/app/services/utilities/dialog/dialog.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user-employment-history',
  templateUrl: './user-employment-history.component.html',
  styleUrls: ['./user-employment-history.component.css']
})
export class UserEmploymentHistoryComponent extends BaseGridComponent<UserEmployment, UserEmploymentFilterModel, UserEmploymentService,
UserEmploymentHistoryDataSource> {

  displayedColumns = ['STT', 'fromDate', 'toDate', 'orgName', 'jobTitle'];
  start = 1;
  length = 50;
  countTotal: number;

  constructor(public dialogRef: MatDialogRef<UserEmploymentHistoryComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    _service: UserEmploymentService, private _dialogService: CommonDialogService) {
    super(_service, UserEmploymentHistoryDataSource);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getFilter(): UserEmploymentFilterModel {
    this.filter = { start: this.start, length: this.length, userId: this.data.userId };
    return this.filter;
  }
}

export class UserEmploymentHistoryDataSource extends BaseGridDatasource<UserEmployment, UserEmploymentFilterModel, UserEmploymentService> {
}