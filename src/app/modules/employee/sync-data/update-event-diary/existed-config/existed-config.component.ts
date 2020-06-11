import { Component, Input, ViewChild, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { BaseGridComponent, BaseGridDatasource } from '../../../../../models/base/base-grid-component';
import { GridFilterModel, EventDiarySyncFilterModel } from '../../../../../models/base/utilities';
import { EventDiary, EventDiarySyncModel, Org_Organization } from '../../../../../models/data/data';
import { EventService } from '../../../../../services/event-diary/event.service';
import { MonthPickerComponent } from '../../../../share/components/month-picker/month-picker.component';
import { UserOrgService } from 'src/app/services/orgs/user-org/user-org.service';
import asEnumerable from 'linq-es2015';
import { CommonDialogService } from '../../../../../services/utilities/dialog/dialog.service';

@Component({
  selector: 'app-existed-config',
  templateUrl: './existed-config.component.html',
  styleUrls: ['./existed-config.component.css']
})
export class ExistedConfigComponent extends BaseGridComponent<EventDiarySyncModel, EventDiarySyncFilterModel, EventService, EventDiarySyncDataSource> implements OnChanges {
  countTotal: number;
  @Input() yearMonth;
  @Input() orgs: Org_Organization[];
  @ViewChild('monthFilter') monthFilter: MonthPickerComponent;
  displayedColumns = ['isSelected', 'STT', 'kpi-month', 'org-name', 'level1ManagerFullName', 'level2ManagerFullName'];
  @Output() changedTrigger = new EventEmitter<number>();
  start = 1;
  length = 5;

  constructor(_service: EventService, private _userOrgService: UserOrgService, private _dialog: CommonDialogService) {
    super(_service, EventDiarySyncDataSource);
  }

  ngOnChanges(change: SimpleChanges): void {
    if (change == null || change.yearMonth == null || change.yearMonth.firstChange) {
      return;
    }
    this.searchPaging();
  }

  // async getOrgs() {
  //   const orgRs = await this._userOrgService.getOrgs();
  //   if (orgRs.isSuccess) {
  //     this.orgs = orgRs.data;
  //     const noSelect: Org_Organization = { id: null, name: ' -------- Chọn -------- '};
  //     this.orgs.unshift(noSelect);
  //   }
  // }

  getFilter(): EventDiarySyncFilterModel {
    if (this.filter == null) {
      this.filter = { start: this.start, length: this.length };
    }
    console.log(this.yearMonth);
    this.filter.yearMonth = this.yearMonth;
    console.log('Update: ', this.yearMonth);

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

  searchPaging() {
    // const filter = this.getFilter();
    // this.resetPaging();
    this.getPaging();
  }

  async getPaging() {
    const filter = this.getFilter();
    await this.dataSource.getPaging(this.filter);
    this.count(this.filter);
    // this.checkAll(true);
  }

  checkAll(isChecked) {
    for (let i = 0; i < this.dataSource.data.value.length; i++) {
      const element = this.dataSource.data.value[i];
      element.uiIsSelected = isChecked;
    }
  }

  ngOnInit() {
    // this.getOrgs();
    super.ngOnInit();
  }

  async count(filter: EventDiarySyncFilterModel) {
    this.countTotal = this.dataSource.count;
  }

  async diaryUpdateRange() {
    console.log('diaryUpdateRange');
    const model = asEnumerable(this.dataSource.data.value).Where(x => x.uiIsSelected).ToArray();
    if (model == null || model.length == 0) {
      this._dialog.alert('Chưa có bản ghi nào được chọn!');
      return;
    }

    try {
      const rs = await this._service.updateRangeDiaryKpiConfigChanged(model);
      if (rs.isSuccess) {
        this._dialog.alert('Thay đổi thành công!');
        this.changedTrigger.emit(this.yearMonth);
      } else {
        this._dialog.alert(rs.message);
      }
    } catch (error) {
      this._dialog.alert('Có lỗi xảy ra!');
    }
  }
}

export class EventDiarySyncDataSource extends BaseGridDatasource<EventDiarySyncModel, EventDiarySyncFilterModel, EventService> {
  public count: number;

  async getPaging(filter: EventDiarySyncFilterModel) {
    try {
      const response = await this.dataService.getPagingExistedEventDiaryByYearMonth(filter);
      if (response.isSuccess) {
        const data = this.processData(response.data.paging, filter);
        this.data.next(data);
        console.log(response.data);
        this.count = response.data.count;
        return;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}
