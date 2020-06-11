import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseGridComponent, BaseGridDatasource } from 'src/app/models/base/base-grid-component';
import { KpiPeriodConfig } from 'src/app/models/data/data';
import { GridFilterModel, KpiPeriodConfigFilterModel } from 'src/app/models/base/utilities';

import { MonthPickerComponent } from 'src/app/modules/share/components/month-picker/month-picker.component';
import { KpiPeriodConfigService } from 'src/app/services/kpiperiodconfig/kpiperiodconfig.service';

@Component({
  selector: 'app-kpiperiodconfig-list',
  templateUrl: './kpiperiodconfig-list.component.html',
  styleUrls: ['./kpiperiodconfig-list.component.css']
})
export class KpiPeriodConfigListComponent extends BaseGridComponent<KpiPeriodConfig, KpiPeriodConfigFilterModel, KpiPeriodConfigService, KpiPeriodConfigDataSource> {

  @ViewChild('monthFilter') monthFilter: MonthPickerComponent;
  displayedColumns = ['STT', 'Code', 'PeriodConfig', 'yearMonth', 'DaySendEvalation'
    , 'DateRange', 'Note', 'actions'];

  periodConfig: string;
  fromDate: Date;
  toDate: Date;

  start = 0;
  length = 20;
  Status = '';

  countTotal: number;
  //eventOrgs: EventDiaryConfig[] = [];


  constructor(_service: KpiPeriodConfigService) {
    super(_service, KpiPeriodConfigDataSource);
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
    this.filter.FromDate = this.fromDate;
    this.filter.ToDate = this.toDate;
    this.filter.PeriodConfig = this.periodConfig;
    return this.filter;
  }

  GetMonthYear(yearMonth: number) {
    const str = yearMonth + '';
    return str.substr(4) + '/' + str.substr(0, 4);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
export class KpiPeriodConfigDataSource extends BaseGridDatasource<KpiPeriodConfig, KpiPeriodConfigFilterModel, KpiPeriodConfigService> {
}
