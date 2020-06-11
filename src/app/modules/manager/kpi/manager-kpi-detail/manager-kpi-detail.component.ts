import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseAddOrEditComponent } from '../../../../models/base/base-aoe-component';
import { Kpi, KpiCriterionDetail, KpiTask, EmpModel, EventDiaryModel } from '../../../../models/data/data';
import { KpiFilterModel, RespondData } from '../../../../models/base/utilities';
import { KpiService } from '../../../../services/kpi/kpi.service';
import { MatTable } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDialogService } from '../../../../services/utilities/dialog/dialog.service';
import { asEnumerable } from 'linq-es2015';
import { EventService } from 'src/app/services/event-diary/event.service';
import { BaseKpiAddOrEditComponent } from 'src/app/models/base/base-kpi-add-or-edit-component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manager-kpi-detail',
  templateUrl: './manager-kpi-detail.component.html',
  styleUrls: ['./manager-kpi-detail.component.css']
})

export class ManagerKpiDetailComponent extends BaseKpiAddOrEditComponent {
  moduleName = 'ManagerKpiDetailComponent';

  constructor(_dataService: KpiService, _route: ActivatedRoute, _router: Router, _dialogService: CommonDialogService,
    _evnService: EventService, _location: Location) {
    super(_dataService, _route, _router, _dialogService, _evnService, _location);
  }
}
