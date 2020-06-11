import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatTable, MatDatepicker } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { EventDiaryModel, EventDiaryDisplayModel, EmpModel, EventDiaryConfig, DiaryCriterionDetail, DiaryDisplayCell } from '../../../../models/data/data';
import { DiaryCellTypeEnum, EventDiaryFilterModel } from '../../../../models/base/utilities';
import { FormControl } from '@angular/forms';
import { EventService } from '../../../../services/event-diary/event.service';
import { CommonDialogService } from '../../../../services/utilities/dialog/dialog.service';
import { DatePipe } from '@angular/common';
import { UserOrgService } from '../../../../services/orgs/user-org/user-org.service';
import { EventDiaryConfigService } from '../../../../services/event-diary/event-diary-config.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { DateHelper } from '../../../../helpers/date-helper';
import { Moment } from 'moment';
import { asEnumerable } from 'linq-es2015';
import * as _moment from 'moment';
import { BaseMngEventDiary } from 'src/app/models/base/base-mng-event-diary';
import { AppConfig } from 'src/app/services/config/app.config';

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
  }
};

@Component({
  selector: 'app-hr-manager-event-diary',
  templateUrl: './hr-manager-event-diary.component.html',
  styleUrls: ['./hr-manager-event-diary.component.css'], providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class HrManagerEventDiaryComponent extends BaseMngEventDiary {
  moduleName = 'HrManagerEventDiaryComponent';
  displayDiaryStatusIds: number[] = asEnumerable(AppConfig.settings.KpiStatus).Where(x => x.id > 2).Select(x => x.id).ToArray();
  displayEventOrgs: EventDiaryConfig[] = [];

  level1MngUserName = '';
  level1Users: EventDiaryConfig[] = [];

  constructor(_service: EventService, _dialogService: CommonDialogService, _datepipe: DatePipe, _userOrgService: UserOrgService,
    _eventDiaryConfigService: EventDiaryConfigService, _authService: AuthService) {
    super(_service, _dialogService, _datepipe, _userOrgService, _eventDiaryConfigService, _authService);
  }

  GetOrg(): Promise<any> {
    return this._eventDiaryConfigService.getConfigOrgByKpiManager();
  }

  getEvent(yearMonth) {
    return this._service.getMonthlyEventDiaryByHRManager(yearMonth, this.filter.orgId, this.level1MngUserName, '');
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

        this.level1Users = this.eventOrgs.filter(o => o.orgId == this.filter.orgId);
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