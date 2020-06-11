import { Component, OnInit } from '@angular/core';
import { CriterionCatalog } from 'src/app/models/data/data';
import { BaseGridDatasource, BaseGridComponent } from 'src/app/models/base/base-grid-component';
import { CriterionCatalogFilterModel } from 'src/app/models/base/utilities';
import { CriterionCatalogService } from 'src/app/services/catalog/criterion-catalog.service';
import { CommonDialogService } from 'src/app/services/utilities/dialog/dialog.service';

@Component({
  selector: 'app-criterion-catalog-list',
  templateUrl: './criterion-catalog-list.component.html',
  styleUrls: ['./criterion-catalog-list.component.css']
})
export class CriterionCatalogListComponent extends BaseGridComponent<CriterionCatalog, CriterionCatalogFilterModel,
CriterionCatalogService, CriterionCatalogDataSource> {
  start = 1;
  length = 20;
  countTotal = 0;
  filterName = '';
  filterCode = '';
  displayedColumns = ['STT', 'code', 'criterionTitle', 'minimumPoint', 'maximumPoint', 'parentName', 'isFolder', 'isMinus', 'actions'];

  constructor(_service: CriterionCatalogService, private _dialogService: CommonDialogService) {
    super(_service, CriterionCatalogDataSource);
  }

  getFilter(): CriterionCatalogFilterModel {
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
    this.filter.criterionTitle = this.filterName;
    this.filter.code = this.filterCode;
    return this.filter;
  }

  ngOnInit() {
    super.ngOnInit();
  }
}

export class CriterionCatalogDataSource extends BaseGridDatasource<CriterionCatalog, CriterionCatalogFilterModel, CriterionCatalogService> {
}
