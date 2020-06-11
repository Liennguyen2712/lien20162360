import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseGridComponent, BaseGridDatasource } from '../../../../models/base/base-grid-component';
import { GridFilterModel, KpiFilterModel } from '../../../../models/base/utilities';
import { KpiService } from '../../../../services/kpi/kpi.service';
import { Kpi, ProcessStatus } from '../../../../models/data/data';
import { MonthPickerComponent } from '../../../share/components/month-picker/month-picker.component';
import { AppConfig } from '../../../../services/config/app.config';

@Component({
  selector: 'app-kpi-list',
  templateUrl: './kpi-list.component.html',
  styleUrls: ['./kpi-list.component.css']
})
export class KpiListComponent extends BaseGridComponent<Kpi, KpiFilterModel, KpiService, EmpKpiDataSource> {
  @ViewChild('monthFilter') monthFilter: MonthPickerComponent;
  displayedColumns = ['STT', 'kpi-month', 'employee-name', 'level1ManagerFullName', 'statusName', 'actions'];
  start = 0;
  length = 5;
  countTotal: number;
  statusList: ProcessStatus[] = AppConfig.settings.KpiStatus;
  selectedStatus = 0;

  constructor(_service: KpiService) {
    super(_service, EmpKpiDataSource);
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
    
    this.filter.statusIds = [];

    if (this.selectedStatus != null && this.selectedStatus > 0) {
      this.filter.statusIds.push(this.selectedStatus);
    }
    return this.filter;
  }

  ngOnInit() {
    super.ngOnInit();
  }
}

export class EmpKpiDataSource extends BaseGridDatasource<Kpi, KpiFilterModel, KpiService> {
}
