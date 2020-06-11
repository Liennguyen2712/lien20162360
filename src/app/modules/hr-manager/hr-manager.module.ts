import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrManagerRoutingModule } from './hr-manager-routing.module';
import { HrManagerKpiListComponent } from './kpi/hr-manager-kpi-list/hr-manager-kpi-list.component';
import { HrManagerKpiAddOrEditComponent } from './kpi/hr-manager-kpi-add-or-edit/hr-manager-kpi-add-or-edit.component';
import { HrManagerEventDiaryComponent } from './event/hr-manager-event-diary/hr-manager-event-diary.component';
import { ShareModule } from 'src/app/modules/share/share.module';
import { NgxMatSelectSearchModule } from '../share/components/ngx-mat-select/public_api';
import { UnlockKpiComponent } from './kpi/unlock-kpi/unlock-kpi.component';
import { PipeModule } from 'src/app/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    HrManagerRoutingModule,    
    ShareModule,
    NgxMatSelectSearchModule,
    PipeModule
  ],
  declarations: [HrManagerKpiListComponent, HrManagerKpiAddOrEditComponent, HrManagerEventDiaryComponent, UnlockKpiComponent]
})
export class HrManagerModule { }
