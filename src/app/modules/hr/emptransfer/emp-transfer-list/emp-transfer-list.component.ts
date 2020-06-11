import { Component, OnInit } from '@angular/core';
import { EmpTransferService } from 'src/app/services/orgs/emp-transfer/emp-transfer.service';
import { EmpTransferFilterModel } from 'src/app/models/base/utilities';
import { EmpTransfer } from 'src/app/models/data/data';
import { BaseGridDatasource, BaseGridComponent } from 'src/app/models/base/base-grid-component';

@Component({
  selector: 'app-emp-transfer-list',
  templateUrl: './emp-transfer-list.component.html',
  styleUrls: ['./emp-transfer-list.component.css']
})
export class EmpTransferListComponent
  extends BaseGridComponent<EmpTransfer, EmpTransferFilterModel, EmpTransferService, EmpTransferDataSource>  {

  fromDate: Date;
  toDate: Date;
  empName = '';
  start = 1;
  length = 20;
  countTotal = 0;
  displayedColumns = ['STT', 'code', 'transferDate', 'userFullName', 'oldJobTitle', 'oldOrg'
    , 'newOrg', 'actions'];

  constructor(_service: EmpTransferService) {
    super(_service, EmpTransferDataSource);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getFilter(): EmpTransferFilterModel {
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
    this.filter.empName = this.empName;
    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.toDate;
    return this.filter;
  }
}

export class EmpTransferDataSource extends BaseGridDatasource<EmpTransfer, EmpTransferFilterModel, EmpTransferService> {
}