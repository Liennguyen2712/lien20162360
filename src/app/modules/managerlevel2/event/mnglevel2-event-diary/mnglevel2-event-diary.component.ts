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
import { DiaryCriterionDetail, DiaryDisplayCell, EmpModel, EventDiaryDisplayModel, EventDiaryModel, EventDiaryConfig, UserOrg } from '../../../../models/data/data';
import { EventService } from '../../../../services/event-diary/event.service';
import { CommonDialogService } from '../../../../services/utilities/dialog/dialog.service';
import { UserOrgService } from 'src/app/services/orgs/user-org/user-org.service';
import { EventDiaryConfigService } from 'src/app/services/event-diary/event-diary-config.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BaseMngEventDiary } from 'src/app/models/base/base-mng-event-diary';
import { promise } from 'protractor';
import { BehaviorSubject } from 'rxjs';


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
  selector: 'app-mnglevel2-event-diary',
  templateUrl: './mnglevel2-event-diary.component.html',
  styleUrls: ['./mnglevel2-event-diary.component.css'], providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class Mnglevel2EventDiaryComponent extends BaseMngEventDiary {
  moduleName = 'Mnglevel2EventDiaryComponent';

  displayEventOrgs: EventDiaryConfig[] = [];
  level1Users: UserOrg[] = [];

  constructor(_service: EventService, _dialogService: CommonDialogService, _datepipe: DatePipe, _userOrgService: UserOrgService,
    _eventDiaryConfigService: EventDiaryConfigService, _authService: AuthService) {
    super(_service, _dialogService, _datepipe, _userOrgService, _eventDiaryConfigService, _authService);
  }

  GetOrg(): Promise<any> {
    return this._eventDiaryConfigService.getConfigOrgByLevel2Manager();
  }

  getEvent(yearMonth) {
    return this._service.getEventByManagerLv2(yearMonth, this.filter.orgId, this.level1MngUserName);
  }

  orgChange(): void {
    this.getDisplayOrgs();
    this.level1Users = [];
    const org = asEnumerable(this.eventOrgs).FirstOrDefault(o => o.orgId === this.filter.orgId);

    if (org) {
      if (org.orgDirPath) {
        // this.level1Users = this.eventOrgs.filter(o => o.orgDirPath && o.orgDirPath.trim() !== ''
        //   && o.orgDirPath.startsWith(org.orgDirPath));
        // if (this.level1Users && this.level1Users.length > 0) {
        //   this.level1Id = this.level1Users[0].level1ManagerUserId;
        // }

        // huypq modified 5/12/19, ko cần lấy Manager của những org con
        // this._service.getLevel1UserByLevel2Manager(this.filter.orgId).then(
        //   (result) => {
        //     this.level1Users = result.data;
        //   }
        //   , (error) => { console.log(error); }
        // );

        this.level1Users = this.eventOrgs.filter(o => o.orgId === this.filter.orgId);
        if (this.level1Users && this.level1Users.length > 0) {
          this.level1MngUserName = this.level1Users[0].level1ManagerUserName;
        }
      }
    }
  }

  // huypq modified 5/12/19, trường chọn org bị duplicate dữ liệu
  getDisplayOrgs() {
    this.displayEventOrgs = asEnumerable(this.eventOrgs).Select((x) => ({ orgId: x.orgId, orgName: x.orgName })).Distinct(z => z.orgId).ToArray();
  }
}
