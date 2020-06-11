import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { BaseAddOrEditComponent } from 'src/app/models/base/base-aoe-component';
import { RespondData, ViewEventDiaryConfigFilterModel, KpiPeriodConfigFilterModel } from '../../../../models/base/utilities';
import { EventDiaryConfig, Org_Organization, UserOrg, KpiPeriodConfig } from '../../../../models/data/data';
import { MatProgressSpinnerModule } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDialogService } from '../../../../services/utilities/dialog/dialog.service';
import { MatTable, MatCheckbox } from '@angular/material';
import asEnumerable from 'linq-es2015';
import { ViewEventdiaryconfigService } from 'src/app/services/eventdiaryconfig/eventdiaryconfig.service';
import { KpiPeriodConfigService } from 'src/app/services/kpiperiodconfig/kpiperiodconfig.service';
import { MonthPickerComponent } from 'src/app/modules/share/components/month-picker/month-picker.component';


@Component({
  selector: 'app-kpiperiodconfig-add-or-edit',
  templateUrl: './kpiperiodconfig-add-or-edit.component.html',
  styleUrls: ['./kpiperiodconfig-add-or-edit.component.css']
})
export class KpiperiodconfigAddOrEditComponent extends BaseAddOrEditComponent<KpiPeriodConfig, KpiPeriodConfigFilterModel,
KpiPeriodConfigService> implements OnInit {
  @ViewChild('monthFilter') monthFilter: MonthPickerComponent;

  Orgs: Org_Organization[];
  UserOrgs: UserOrg[];
  filteredUserOrgs: UserOrg[];
  yearMonth = '';

  constructor(_dataService: KpiPeriodConfigService, _route: ActivatedRoute, _router: Router, _dialogService: CommonDialogService) {
    super(_dataService, _route, _router, _dialogService);
  }

  async ngOnInit() {
    super.ngOnInit().then(
      (success) => {
        // tao moi
        if (!this.item) {
          this.item = { id: 0 };
        }

        if (this.item.yearMonth) {
          this.monthFilter.setDateValue(this.item.yearMonth);
          this.yearMonth = this.item.yearMonth.toString().substr(4) + '/' + this.item.yearMonth.toString().substr(0, 4);
        }
      }
      ,
      (error) => {

      },
    );

    // tao moi
    if (!this.item) {
      this.item = { id: 0 };
    }
  }

  async addOrEdit() {
    const tmp: KpiPeriodConfig = {
      id: this.item.id,
      code: this.item.code,
      fromDate: this.item.fromDate,
      toDate: this.item.toDate,
      note: this.item.note,
      dayStart: this.item.dayStart,
      dayEnd: this.item.dayEnd,
      daySendEvalation: this.item.daySendEvalation,
      periodConfig: this.item.periodConfig,
      createdDate: this.item.createdDate,
      createdByUser: this.item.createdByUser,
      yearMonth: this.item.id > 0 ? this.item.yearMonth : this.monthFilter.getYearMonth()
    };

    this._dataService.addOrEdit(tmp).then(
      (data) => {
        if (data.isSuccess === true) {
          alert('Lưu thành công.');
        } else {
          if (data.message.startsWith('Có lỗi xảy ra')) {
            alert(data.message);
          } else {
            console.log(data.message);
          }
        }
      }
      , (error) => {
        alert('Có lỗi xảy ra.');
        console.log(error);
      }
    );
  }

  dateChange(event) {
    // from date
    if (event === 1) {
      if (this.item.toDate) {
        if (this.item.fromDate >= this.item.toDate) {
          console.log(1);
          const d = new Date();
          d.setDate(new Date(this.item.toDate).getDate() - 30);
          this.item.fromDate = d;
        }
      }
    } else { // to date
      if (this.item.fromDate) {
        if (this.item.fromDate >= this.item.toDate) {
          const d = new Date();
          d.setDate(new Date(this.item.fromDate).getDate() + 30);
          this.item.toDate = d;
        }
      }
    }
  }

  fetchData() {
  }

  validateData(input: KpiPeriodConfig): RespondData {
    const result: RespondData = { isSuccess: true, message: '' };
    return result;
  }
}
