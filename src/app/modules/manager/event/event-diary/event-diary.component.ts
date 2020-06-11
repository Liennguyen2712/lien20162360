import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter, MatDatepicker, MatTable, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import asEnumerable from 'linq-es2015';
// import { Moment } from 'moment';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { DateHelper } from '../../../../helpers/date-helper';
import { DiaryCellTypeEnum, EventDiaryFilterModel } from '../../../../models/base/utilities';
import { DiaryCriterionDetail, DiaryDisplayCell, EmpModel, EventDiaryDisplayModel, EventDiaryModel, EventDiaryConfig } from '../../../../models/data/data';
import { EventService } from '../../../../services/event-diary/event.service';
import { CommonDialogService } from '../../../../services/utilities/dialog/dialog.service';
import { UserOrgService } from 'src/app/services/orgs/user-org/user-org.service';
import { EventDiaryConfigService } from 'src/app/services/event-diary/event-diary-config.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BaseMngEventDiary } from 'src/app/models/base/base-mng-event-diary';

// const moment = _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-event-diary',
  templateUrl: './event-diary.component.html',
  styleUrls: ['./event-diary.component.css'], providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
// export class EventDiaryComponent
// //  extends BaseGridComponent<EventDiary, EventDiaryFilterModel, EventService, EventDataSource> 
// {
//   @ViewChild('tbl') _tbl: MatTable<any>;
//   displayedColumns = [];
//   loopColumns = [];
//   model: EventDiaryModel = {};
//   dataSource: EventDiaryDisplayModel[] = [];
//   diaryDays = [];
//   DiaryCellTypeEnum = DiaryCellTypeEnum;
//   diaryDate = new FormControl(moment());
//   isFinishLoadingTbl = false;
//   emp: EmpModel[];
//   eventOrgs: EventDiaryConfig[] = [];
//   filter: EventDiaryFilterModel = {};
//   userFullName: string;

//   constructor(private _service: EventService, private _dialogService: CommonDialogService, private _datepipe: DatePipe, private _userOrgService: UserOrgService,
//     private _eventDiaryConfigService: EventDiaryConfigService, private _authService: AuthService) {
//     // super(_service, EventDataSource);
//   }

//   async ngOnInit() {
//     // super.ngOnInit();
//     this.userFullName = this._authService.getUserFullname();
//     await this.getData();
//   }

//   private reloadTbl() {
//     // this._tbl.renderRows();
//   }

//   getFilter(): EventDiaryFilterModel {
//     return null;
//   }

//   async getData() {
//     this.isFinishLoadingTbl = false;
//     this.dataSource = [];
//     await this.getModel();
//     this.isFinishLoadingTbl = true;
//   }

//   async getModel() {
//     try {

//       // huypq modified 29/11/2019 , gọi tuần tự thay vì gọi song song => mục đích khi lấy dữ liệu userOrg truyền thêm biến EventDiaryId => lấy userOrg sau khi lấy event
//       // get config org and user
//       // const [eventRes, empRes] = await Promise.all([this._eventDiaryConfigService.getConfigOrgByLevel1Manager(), this._userOrgService.getEDUsersByOrg(2)]);
//       const eventRes = await this._eventDiaryConfigService.getConfigOrgByLevel1Manager();

//       if (eventRes.isSuccess) {
//         this.eventOrgs = eventRes.data;
//         if (this.eventOrgs != null && this.eventOrgs.length > 0) {
//           this.filter.orgId = this.eventOrgs[0].orgId;
//         }
//       } else {
//         this._dialogService.alert(eventRes.message);
//       }

//       await this.searchPaging();

//     } catch (err) {
//       this._dialogService.alert(err.message);
//     }
//   }

//   // huypq added 29-11-2019 
//   isEditableDiary(col, item) {
//     const currentEmp = asEnumerable(this.emp).FirstOrDefault(x => x.userFullName == item.empName);
//     return !this._service.isReadonlyDiary(currentEmp);
//   }
//   //

//   async searchPaging() {
//     if (this.filter.orgId == null || this.filter.orgId <= 0) {
//       return;
//     }

//     const yearMonth = this._datepipe.transform(this.diaryDate.value, 'yyyyMM');
//     const result = await this._service.getEventByManager(yearMonth, this.filter.orgId);
//     if (result.isSuccess) {
//       if (result.data) {
//         this.model = result.data;
//         this.diaryDays = DateHelper.getDays(new Date(this.model.fromDate), new Date(this.model.toDate));

//         // huypq modified 29-11-2019 lấy emp theo event diary id
//         var empRes = await this._userOrgService.getEDUserByEvent(this.model.id);
//         if (empRes.isSuccess) {
//           this.emp = empRes.data;
//         } else {
//           this._dialogService.alert(empRes.message);
//         }

//         await this.fetchDisplayCollumn();
//         await this.initializeTblDataSource();
//       } else {
//         //this._dialogService.alert('Không có dữ liệu');
//       }
//     } else {
//       this._dialogService.alert(result.message);
//     }
//   }

//   //https://material.angular.io/components/datepicker/overview
//   chosenYearHandler(normalizedYear: Moment) {
//     const ctrlValue = this.diaryDate.value;
//     ctrlValue.year(normalizedYear.year());
//     this.diaryDate.setValue(ctrlValue);
//   }

//   chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
//     const ctrlValue = this.diaryDate.value;
//     ctrlValue.month(normalizedMonth.month());
//     this.diaryDate.setValue(ctrlValue);
//     datepicker.close();
//   }

//   // build giao diện bảng event diary
//   // convert từ dữ liệu model sang dữ liệu kiểu bảng datasource
//   async initializeTblDataSource() {
//     // row
//     if (this.emp == null) {
//       return;
//     }

//     for (let i = 0; i < this.emp.length; i++) {
//       const currentEmp = this.emp[i];
//       const row = await this.fetchTblLoopsColumns(currentEmp);
//       this.dataSource.push(row);
//     }
//   }

//   async openDetailsDialog(empName: string) {
//     const currentEmp = asEnumerable(this.emp).FirstOrDefault(x => x.userFullName == empName);
//     currentEmp.details = asEnumerable(this.model.details).Where(x => x.userFullName == empName).ToArray();
//     console.log(currentEmp);
//     this._service.diaryCriterionDetailListDialog(currentEmp);
//   }

//   // sinh những collumn tự động theo ngày
//   private async fetchTblLoopsColumns(currentEmp): Promise<EventDiaryDisplayModel> {
//     // column  
//     return new Promise<EventDiaryDisplayModel>((rs, rj) => {
//       const row: EventDiaryDisplayModel = {
//         empName: currentEmp.userFullName,
//         kpiPoint: this.calculateEmpKpiPoint(currentEmp.userName),
//         comment: ''
//       };

//       // loop - collumn tự động theo ngày giữa các event diary
//       for (let j = 0; j < this.diaryDays.length; j++) {
//         const cDay = this.diaryDays[j];
//         const ed = this.getEventDetailsByDayMonth(cDay.getDate(), cDay.getMonth() + 1, currentEmp.userName);
//         row[cDay.getDate() + '/' + (cDay.getMonth() + 1)] = this.fetchCellData(ed);
//       }

//       // loop - build comment
//       // const comments = asEnumerable(this.model.details).Where(x => x.userName == currentEmp.userName).Select(x => x.comment != null ? x.comment : '').ToArray();
//       // for (let i = 0; i < comments.length; i++) {
//       //   const el = comments[i];
//       //   row.comment = row.comment + ' ' + el;
//       // }
//       row.comment = this._service.getCommentFromModel(this.model.details, currentEmp.userName);

//       rs(row);
//     });
//   }

//   private calculateEmpKpiPoint(username: string) {
//     if (this.model.details == null || this.model.details.length == 0) {
//       return 100;
//     }
//     return asEnumerable(this.model.details).Where(x => x.userName == username).Sum(x => x.kpiPoint) + 100;
//   }

//   async openAddDiaryDialog(col, item) {
//     const currentEmp = asEnumerable(this.emp).FirstOrDefault(x => x.userFullName == item.empName);

//     // huypq modified 29/11/19
//     if (this._service.isReadonlyDiary(currentEmp)) {
//        return;
//     }

//     const date = asEnumerable(this.diaryDays).FirstOrDefault(x => x.getDate() + '/' + (x.getMonth() + 1) == col);
//     const rs = await this._service.addDiary(currentEmp, date, this.model);
//     if (rs) {
//       this.getData();
//     }
//   }

//   private fetchCellData(details: DiaryCriterionDetail[]) {
//     let result: DiaryDisplayCell = {};

//     if (details == null || details.length == 0) {
//       result.cellType = DiaryCellTypeEnum.Btn;
//       result.value = [];
//       return result;
//     }

//     result.cellType = DiaryCellTypeEnum.Arr;
//     result.value = details;
//     return result;
//   }

//   private fetchDisplayCollumn() {
//     return new Promise<void>((rs, rj) => {
//       this.loopColumns = asEnumerable(this.diaryDays).Select(x => x.getDate() + '/' + (x.getMonth() + 1)).ToArray();
//       this.displayedColumns = ['STT', 'EmpName', 'KpiPoint',];
//       this.displayedColumns = this.displayedColumns.concat(this.loopColumns);
//       this.displayedColumns.push('Comment');
//       rs();
//     });
//   }

//   private getEventDetailsByDayMonth(day: number, month: number, username: string) {
//     if (this.model.details == null || this.model.details.length == 0) {
//       return null;
//     }

//     let result = asEnumerable(this.model.details).Where(x => x.criterionDayOfMonth == day && x.kpiMonthNumber == month && x.userName == username).ToArray();
//     return result;
//   }
// }

export class EventDiaryComponent extends BaseMngEventDiary {
  moduleName = 'ManagerEventDiaryComponent';

  constructor(_service: EventService, _dialogService: CommonDialogService, _datepipe: DatePipe, _userOrgService: UserOrgService,
    _eventDiaryConfigService: EventDiaryConfigService, _authService: AuthService) {
    super(_service, _dialogService, _datepipe, _userOrgService, _eventDiaryConfigService, _authService);
  }
  
}
