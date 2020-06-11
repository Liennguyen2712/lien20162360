import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter, MatDatepicker, MatTable, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import asEnumerable from 'linq-es2015';
// import { Moment } from 'moment';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { UserOrgService } from 'src/app/services/orgs/user-org/user-org.service';
import { EventDiaryConfigService } from 'src/app/services/event-diary/event-diary-config.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EventDiaryModel, EventDiaryDisplayModel, EmpModel, EventDiaryConfig, DiaryCriterionDetail, DiaryDisplayCell, UserOrg } from '../data/data';
import { DiaryCellTypeEnum, EventDiaryFilterModel } from './utilities';
import { EventService } from '../../services/event-diary/event.service';
import { CommonDialogService } from '../../services/utilities/dialog/dialog.service';
import { DateHelper } from '../../helpers/date-helper';
import { AppConfig } from 'src/app/services/config/app.config';
import { ExcelKpiEventDiaryService, ExcelKpiEventDiaryOption } from 'src/app/services/excel/excel-kpi-event-diary.service';


const moment = _moment;

export abstract class BaseMngEventDiary {
  @ViewChild('tbl') _tbl: MatTable<any>;
  displayedColumns = [];
  loopColumns = [];
  model: EventDiaryModel = {};
  dataSource: EventDiaryDisplayModel[] = [];
  diaryDays = [];
  DiaryCellTypeEnum = DiaryCellTypeEnum;
  diaryDate = new FormControl(moment());
  isFinishLoadingTbl = false;
  emp: EmpModel[];
  eventOrgs: EventDiaryConfig[] = [];
  filter: EventDiaryFilterModel = {};
  userFullName: string;
  abstract moduleName: string;

  // tim kiem
  empUserName = '';
  level1MngUserName = '';
  users: UserOrg[] = [];

  // những status hiển thị trong nkskps
  displayDiaryStatusIds: number[] = asEnumerable(AppConfig.settings.KpiStatus).Select(x => x.id).ToArray();

  constructor(protected _service: EventService, protected _dialogService: CommonDialogService, protected _datepipe: DatePipe, protected _userOrgService: UserOrgService,
    protected _eventDiaryConfigService: EventDiaryConfigService, protected _authService: AuthService) {
    // super(_service, EventDataSource);
  }

  async ngOnInit() {
    // super.ngOnInit();
    this.userFullName = this._authService.getUserFullname();
    await this.getData(true);

    // mo popup tao moi
    const sub = this._service.onDeleteEvent.subscribe(async (data) => {
      console.log(data);
      // do something
      await this.openAddDiaryDialogFromListDialog(data);
    });
  }

  private reloadTbl() {
    // this._tbl.renderRows();
  }

  getFilter(): EventDiaryFilterModel {
    return null;
  }

  async getData(firstRun: boolean = false) {
    this.isFinishLoadingTbl = false;
    // this.dataSource = [];
    await this.getModel(firstRun);
    this.isFinishLoadingTbl = true;
  }

  protected async getModel(firstRun: boolean = false) {
    try {

      // danh sach nhan vien
      const usrRes = await this.GetUsers();
      if (usrRes.isSuccess) {
        this.users = usrRes.data;
        this.users = asEnumerable(this.users).OrderBy(x => x.userFullName).ToArray();
        console.log('User: ', this.users);
        if (this.moduleName === 'DivisionManagerEventComponent') {
          const allUser = { id: -1, userFullName: 'Tất cả' };

          this.users.unshift(allUser);
        }
      }

      // huypq modified 29/11/2019 , gọi tuần tự thay vì gọi song song => mục đích khi lấy dữ liệu userOrg truyền thêm biến EventDiaryId => lấy userOrg sau khi lấy event
      // get config org and user
      // const [eventRes, empRes] = await Promise.all([this._eventDiaryConfigService.getConfigOrgByLevel1Manager(), this._userOrgService.getEDUsersByOrg(2)]);
      const eventRes = await this.GetOrg();
      if (eventRes.isSuccess) {
        this.eventOrgs = eventRes.data;
        if (this.eventOrgs != null && this.eventOrgs.length > 0) {
          if (firstRun) {
            this.filter.orgId = this.eventOrgs[0].orgId;
            this.orgChange();
          }
        }
      } else {
        this._dialogService.alert(eventRes.message);
      }

      await this.searchPaging();

    } catch (err) {
      this._dialogService.alert(err.message);
    }
  }
  GetUsers(): Promise<any> {
    return this._service.getUsers();
  }

  GetOrg(): Promise<any> {
    return this._eventDiaryConfigService.getConfigOrgByLevel1Manager();
  }

  orgChange(): void {
  }

  // huypq added 29-11-2019 
  isEditableDiary(col, item) {
    const currentEmp = asEnumerable(this.emp).FirstOrDefault(x => x.userFullName == item.empName);
    return !this._service.isReadonlyDiary(currentEmp, this.moduleName);
  }
  //

  getEvent(yearMonth) {
    return this._service.getEventByManager(yearMonth, this.filter.orgId);
  }

  protected filterEmpByStatus(emp: EmpModel[]) {
    return asEnumerable(emp).Where(x => this.displayDiaryStatusIds.includes(x.currentKpiStatusId)).OrderBy(x => x.userFullName).ToArray();
  }

  async searchPaging() {
    this.isFinishLoadingTbl = false;
    this.dataSource = [];
    if (this.filter.orgId == null || this.filter.orgId <= 0 && (this.moduleName !== 'DivisionManagerEventComponent')) {
      return;
    }

    const yearMonth = this._datepipe.transform(this.diaryDate.value, 'yyyyMM');
    const result = await this.getEvent(yearMonth);
    if (result.isSuccess) {
      if (result.data) {
        this.model = result.data;
        this.diaryDays = DateHelper.getDays(new Date(this.model.fromDate), new Date(this.model.toDate));

        // huypq modified 29-11-2019 lấy emp theo event diary id
        const empRes = await this._userOrgService.getEDUserByEvent(this.model.id);

        if (empRes.isSuccess) {
          this.emp = this.filterEmpByStatus(empRes.data);
          console.log('Emp: ', this.emp);
        } else {
          this._dialogService.alert(empRes.message);
        }
        await this.fetchDisplayCollumn();
        await this.initializeTblDataSource();
      } else {
        //this._dialogService.alert('Không có dữ liệu');
      }
    } else {
      this._dialogService.alert(result.message);
    }
    this.isFinishLoadingTbl = true;
  }

  //https://material.angular.io/components/datepicker/overview
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.diaryDate.value;
    ctrlValue.year(normalizedYear.year());
    this.diaryDate.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.diaryDate.value;
    ctrlValue.month(normalizedMonth.month());
    this.diaryDate.setValue(ctrlValue);
    datepicker.close();
  }

  // build giao diện bảng event diary
  // convert từ dữ liệu model sang dữ liệu kiểu bảng datasource
  async initializeTblDataSource() {
    // row
    if (this.emp == null) {
      return;
    }

    for (let i = 0; i < this.emp.length; i++) {
      const currentEmp = this.emp[i];
      if (this.empUserName) {
        if (this.emp[i].userFullName.toLowerCase().indexOf(this.empUserName.toLowerCase()) > -1
          || (this.emp[i].userName === this.empUserName)) {
          const row = await this.fetchTblLoopsColumns(currentEmp);
          this.dataSource.push(row);
        }
      } else {
        const row = await this.fetchTblLoopsColumns(currentEmp);
        this.dataSource.push(row);
      }
    }
  }

  async openDetailsDialog(empName: string) {
    const currentEmp = asEnumerable(this.emp).FirstOrDefault(x => x.userFullName == empName);
    currentEmp.details = asEnumerable(this.model.details).Where(x => x.userFullName == empName).OrderBy(x => x.criterionDate).ToArray();
    console.log(currentEmp.details);
    currentEmp.moduleName = this.moduleName;
    currentEmp.canDeleteEvent = !this._service.isReadonlyDiary(currentEmp, this.moduleName);

    const res = this._service.diaryCriterionDetailListDialog(currentEmp);
    await res;
  }

  // sinh những collumn tự động theo ngày
  private async fetchTblLoopsColumns(currentEmp): Promise<EventDiaryDisplayModel> {
    // column
    return new Promise<EventDiaryDisplayModel>((rs, rj) => {
      const row: EventDiaryDisplayModel = {
        empName: currentEmp.userFullName,
        kpiPoint: this.calculateEmpKpiPoint(currentEmp.userName),
        comment: ''
      };

      // loop - collumn tự động theo ngày giữa các event diary
      for (let j = 0; j < this.diaryDays.length; j++) {
        const cDay = this.diaryDays[j];
        const ed = this.getEventDetailsByDayMonth(cDay.getDate(), cDay.getMonth() + 1, currentEmp.userName);
        row[cDay.getDate() + '/' + (cDay.getMonth() + 1)] = this.fetchCellData(ed);
      }

      // loop - build comment
      // const comments = asEnumerable(this.model.details).Where(x => x.userName == currentEmp.userName).Select(x => x.comment != null ? x.comment : '').ToArray();
      // for (let i = 0; i < comments.length; i++) {
      //   const el = comments[i];
      //   row.comment = row.comment + ' ' + el;
      // }
      row.comment = this._service.getCommentFromModel(this.model.details, currentEmp.userName);

      rs(row);
    });
  }

  private calculateEmpKpiPoint(username: string) {
    if (this.model.details == null || this.model.details.length == 0) {
      return 100;
    }
    return asEnumerable(this.model.details).Where(x => x.userName == username && !x.isDeleted).Sum(x => x.kpiPoint) + 100;
  }

  async openAddDiaryDialogFromListDialog(data) {
    // fill lai du lieu tu ham xoa
    this.getData();

    // huypq modified 29/11/19
    if (this._service.isReadonlyDiary(data.emp, this.moduleName)) {
      return;
    }

    const dateTmp = new Date(data.date);
    dateTmp.setHours(0, 0, 0, 0);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (dateTmp > now) {
      await this._dialogService.alert('Không được nhập sự kiện cho ngày trong tương lai');
      return;
    }
    const rs = await this._service.addDiary(data.emp, data.date, this.model);
    if (rs) {
      // fill lại dữ liệu sau khi thực hiện
      this.getData();
    }
  }

  async openAddDiaryDialog(col, item) {
    const currentEmp = asEnumerable(this.emp).FirstOrDefault(x => x.userFullName == item.empName);

    // huypq modified 29/11/19
    if (this._service.isReadonlyDiary(currentEmp, this.moduleName)) {
      return;
    }

    const date = asEnumerable(this.diaryDays).FirstOrDefault(x => x.getDate() + '/' + (x.getMonth() + 1) == col);
    const dateTmp = new Date(date);
    dateTmp.setHours(0, 0, 0, 0);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (dateTmp > now) {
      await this._dialogService.alert('Không được nhập sự kiện cho ngày trong tương lai');
      return;
    }

    const rs = await this._service.addDiary(currentEmp, date, this.model);
    if (rs) {
      // fill lại dữ liệu sau khi thực hiện
      this.getData();
    }
  }

  private fetchCellData(details: DiaryCriterionDetail[]) {
    let result: DiaryDisplayCell = {};

    if (details == null || details.length == 0) {
      result.cellType = DiaryCellTypeEnum.Btn;
      result.value = [];
      return result;
    }

    result.cellType = DiaryCellTypeEnum.Arr;
    result.value = details;
    return result;
  }

  private fetchDisplayCollumn() {
    return new Promise<void>((rs, rj) => {
      this.loopColumns = asEnumerable(this.diaryDays).Select(x => x.getDate() + '/' + (x.getMonth() + 1)).ToArray();
      this.displayedColumns = ['STT', 'EmpName', 'KpiPoint',];
      this.displayedColumns = this.displayedColumns.concat(this.loopColumns);
      rs();
    });
  }

  private getEventDetailsByDayMonth(day: number, month: number, username: string) {
    if (this.model.details == null || this.model.details.length == 0) {
      return null;
    }

    let result = asEnumerable(this.model.details).Where(x => x.criterionDayOfMonth == day && x.kpiMonthNumber == month && x.userName == username).ToArray();
    return result;
  }

  dotCount(dotString: string) {
    return dotString.split('.').length - 1;
  }

  isEventDeleted(value) {
    return value ? value.isDeleted : false;
  }

  exportExcel() {
    const data = [];

    const excelOptions: ExcelKpiEventDiaryOption = {
      data: data, filter: this.filter,
      headers: []
    };

    const colWidths = [4, 15];
    for (let i = 0; i < this.diaryDays.length; i++) {
      // cot ngay
      if (i === 19 || i === 11 || i === 27 || i === 28 || i === 29) {
        colWidths.push(5);
      } else {
        colWidths.push(4);
      }
    }

    // cot ghi chu
    colWidths.push(12);
    const excelService: ExcelKpiEventDiaryService = new ExcelKpiEventDiaryService(excelOptions, 'NKSK-' + this.model.yearMonth
      , this.dataSource, colWidths, this.diaryDays, this.loopColumns);
    excelService.year = this.model.yearMonth.toString().substr(0, 4);
    excelService.month = this.model.yearMonth.toString().substr(4);
    excelService.orgName = this.model.orgName;
    excelService.level1ManagerName = this.model.level1ManagerFullName;

    excelService.exportExcel();
  }
}
