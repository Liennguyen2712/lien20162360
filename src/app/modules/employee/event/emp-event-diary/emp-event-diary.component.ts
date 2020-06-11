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
import { DiaryCriterionDetail, DiaryDisplayCell, EmpModel, EventDiaryDisplayModel, EventDiaryModel, EventDiaryConfig, Org_Organization, Org, UserOrg } from '../../../../models/data/data';
import { EventService } from '../../../../services/event-diary/event.service';
import { CommonDialogService } from '../../../../services/utilities/dialog/dialog.service';
import { UserOrgService } from 'src/app/services/orgs/user-org/user-org.service';
import { EventDiaryConfigService } from 'src/app/services/event-diary/event-diary-config.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BaseMngEventDiary } from 'src/app/models/base/base-mng-event-diary';

const moment = _moment;

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
  selector: 'app-emp-event-diary',
  templateUrl: './emp-event-diary.component.html',
  styleUrls: ['./emp-event-diary.component.css'], providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
// export class EmpEventDiaryComponent {

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
//   orgs: Org[] = [];
//   filter: EventDiaryFilterModel = {};
//   managerFullName: string;
//   managerId: number;

//   constructor(private _service: EventService, private _dialogService: CommonDialogService, private _datepipe: DatePipe, private _userOrgService: UserOrgService,
//     private _authService: AuthService) {
//     // super(_service, EventDataSource);
//   }

//   async ngOnInit() {
//     // super.ngOnInit();

//     this._userOrgService.getByName(this._authService.getUsername()).then(
//       (result) => {
//         const data = result.data as UserOrg;
//         if (data) {
//           console.log(data);
//           this.managerFullName = data.level1ManagerFullName;
//           this.managerId = data.level1ManagerId;
//         }
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
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
//       // get config org and user
//       // const [eventRes, empRes] = await Promise.all([this._userOrgService.getOrgByUser(), this._userOrgService.getEDUsersByOrg(2)]);

//       const eventRes = await this._userOrgService.getOrgByUser();
//       if (eventRes.isSuccess) {
//         if (eventRes.data != null) {
//           this.orgs = [eventRes.data];
//           this.filter.orgId = this.orgs[0].id;
//         }
//       } else {
//         this._dialogService.alert(eventRes.message);
//       }

//       // if (empRes.isSuccess) {
//       //   this.emp = empRes.data;
//       // } else {
//       //   this._dialogService.alert(empRes.message);
//       // }

//       await this.searchPaging();
//     } catch (err) {
//       this._dialogService.alert(err.message);
//     }
//   }

//   async searchPaging() {
//     if (this.filter.orgId == null || this.filter.orgId <= 0) {
//       return;
//     }

//     const yearMonth = this._datepipe.transform(this.diaryDate.value, 'yyyyMM');
//     const result = await this._service.getEventByEmp(yearMonth, this.filter.orgId);
//     if (result.isSuccess) {
//       if (result.data) {
//         this.model = result.data;
//         this.diaryDays = DateHelper.getDays(new Date(this.model.fromDate), new Date(this.model.toDate));
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
//         comment: this._service.getCommentFromModel(this.model.details, currentEmp.userName)
//       };

//       // loop - collumn tự động theo ngày giữa các event diary
//       for (let j = 0; j < this.diaryDays.length; j++) {
//         const cDay = this.diaryDays[j];
//         const ed = this.getEventDetailsByDayMonth(cDay.getDate(), cDay.getMonth() + 1, currentEmp.userName);
//         row[cDay.getDate() + '/' + (cDay.getMonth() + 1)] = this.fetchCellData(ed);
//       }

//       rs(row);
//     });
//   }

//   private calculateEmpKpiPoint(username: string) {
//     if (this.model.details == null || this.model.details.length == 0) {
//       return 100;
//     }
//     return asEnumerable(this.model.details).Where(x => x.userName == username).Sum(x => x.kpiPoint) + 100;
//   }

//   // async openAddDiaryDialog(col, item) {
//   //   const currentEmp = asEnumerable(this.emp).FirstOrDefault(x => x.userFullName == item.empName);
//   //   const date = asEnumerable(this.diaryDays).FirstOrDefault(x => x.getDate() + '/' + (x.getMonth() + 1) == col);
//   //   const rs = await this._service.addDiary(currentEmp, date, this.model);
//   //   if (rs) {
//   //     this.getData();
//   //   }
//   // }

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


export class EmpEventDiaryComponent extends BaseMngEventDiary {
  moduleName = 'EmpEventDiaryComponent';

  orgs: Org[] = [];
  managerFullName: string;

  constructor(_service: EventService, _dialogService: CommonDialogService, _datepipe: DatePipe, _userOrgService: UserOrgService,
    _eventDiaryConfigService: EventDiaryConfigService, _authService: AuthService) {
    super(_service, _dialogService, _datepipe, _userOrgService, _eventDiaryConfigService, _authService);
  }

  async ngOnInit() {
    // super.ngOnInit();

    this._userOrgService.getByName(this._authService.getUsername()).then(
      (result) => {
        const data = result.data as UserOrg;
        if (data) {
          console.log(data);
          this.managerFullName = data.level1ManagerFullName;
        }
      },
      (error) => {
        console.log(error);
      }
    );
    await this.getData();
  }

  async getModel() {
    try {
      // get config org and user
      // const [eventRes, empRes] = await Promise.all([this._userOrgService.getOrgByUser(), this._userOrgService.getEDUsersByOrg(2)]);
      const eventRes = await this._userOrgService.getOrgByUser();
      if (eventRes.isSuccess) {
        if (eventRes.data != null) {
          this.orgs = [eventRes.data];
          this.filter.orgId = this.orgs[0].id;
        }
      } else {
        this._dialogService.alert(eventRes.message);
      }

      // if (empRes.isSuccess) {
      //   this.emp = empRes.data;
      // } else {
      //   this._dialogService.alert(empRes.message);
      // }

      await this.searchPaging();
    } catch (err) {
      this._dialogService.alert(err.message);
    }
  }

  getEvent(yearMonth) {
    return this._service.getEventByEmp(yearMonth, this.filter.orgId);
  }

}