import { Component, OnInit } from '@angular/core';
import { Kpi_CriterionTypeService } from 'src/app/services/kpi/kpi-criteriontype.service';
import { Kpi_CriterionType } from 'src/app/models/data/data';
import { Kpi_CriterionTypeFilterModel } from 'src/app/models/base/utilities';
import { BaseGridComponent, BaseGridDatasource } from 'src/app/models/base/base-grid-component';
import { CommonDialogService } from 'src/app/services/utilities/dialog/dialog.service';

@Component({
  selector: 'app-criterion-type-list',
  templateUrl: './criterion-type-list.component.html',
  styleUrls: ['./criterion-type-list.component.css']
})

export class CriterionTypeListComponent extends BaseGridComponent<Kpi_CriterionType, Kpi_CriterionTypeFilterModel, Kpi_CriterionTypeService, Kpi_CriterionTypeDataSource>{
  start = 1;
  length = 20;
  countTotal = 0;
  filterName = '';
  filterCode = '';
  displayedColumns = ['STT', 'code', 'name', 'actions'];

  constructor(_service: Kpi_CriterionTypeService, private _dialogService: CommonDialogService) {
    super(_service, Kpi_CriterionTypeDataSource);
  }


  getFilter(): Kpi_CriterionTypeFilterModel {
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

export class Kpi_CriterionTypeDataSource extends BaseGridDatasource<Kpi_CriterionType, Kpi_CriterionTypeFilterModel, Kpi_CriterionTypeService> {
}

