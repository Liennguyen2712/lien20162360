import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseAddOrEditComponent } from 'src/app/models/base/base-aoe-component';
import { Kpi, KpiTask, CriterionCatalog, KpiCriterionDetail, EventDiaryModel, EmpModel } from '../../../../../../models/data/data';
import { KpiFilterModel, RespondData, KpiReadOnlyFilter } from '../../../../../../models/base/utilities';
import { KpiService } from '../../../../../../services/kpi/kpi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDialogService } from '../../../../../../services/utilities/dialog/dialog.service';
import { MatTable } from '@angular/material';
import asEnumerable from 'linq-es2015';
import { promise } from 'protractor';
import { EventService } from 'src/app/services/event-diary/event.service';
import { BaseKpiAddOrEditComponent } from 'src/app/models/base/base-kpi-add-or-edit-component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-division-manager-kpi-detail',
  templateUrl: './division-manager-kpi-detail.component.html',
  styleUrls: ['./division-manager-kpi-detail.component.css']
})
export class DivisionManagerKpiDetailComponent extends BaseKpiAddOrEditComponent {
  moduleName = 'DivisionManagerKpiDetailComponent';
  taskDisplayedColumns = ['STT', 'task', 'assignedDate', 'expectation', 'deadline', 'result'];
  criterionDisplayedColumns = ['STT', 'criterionTitle', 'maximumPoint', 'employeeEvaluatePoint', 'employeeEvaluateDate'
    , 'managerEvaluatePoint', 'managerEvaluateDate'];

  constructor(_dataService: KpiService, _route: ActivatedRoute, _router: Router, _dialogService: CommonDialogService,
    _evnService: EventService, _location: Location) {
    super(_dataService, _route, _router, _dialogService, _evnService, _location);
  }

  protected updateItem() {
    return this._dataService.updateKpiHRSendManager(this.item);
  }

  protected addTaskBuffer() {
  }

  async customInit() {
    if (this.id && this.id > 0) {
      const rs = await this._dataService.getIsKpiValidForDivManager(this.id);
      if (rs.isSuccess) {
        if (!rs.data) {
          this._dialogService.alert('Không có quyền xem đánh giá này');
          this._router.navigate(['/hr/hr-div-mng-kpi']);
        }
      } else {
        this._dialogService.alert('Đã có lỗi xảy ra');
        this._router.navigate(['/hr/hr-div-mng-kpi']);
      }
    }
  }

}