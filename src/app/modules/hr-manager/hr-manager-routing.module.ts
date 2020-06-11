import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HrManagerEventDiaryComponent } from './event/hr-manager-event-diary/hr-manager-event-diary.component';
import { HrManagerKpiAddOrEditComponent } from 'src/app/modules/hr-manager/kpi/hr-manager-kpi-add-or-edit/hr-manager-kpi-add-or-edit.component';
import { HrManagerKpiListComponent } from 'src/app/modules/hr-manager/kpi/hr-manager-kpi-list/hr-manager-kpi-list.component';
import { UnlockKpiComponent } from './kpi/unlock-kpi/unlock-kpi.component';

const routes: Routes = [
  { path: 'event', component: HrManagerEventDiaryComponent },
  { path: 'kpi', component: HrManagerKpiListComponent },
  { path: 'kpi-add-or-edit/:id', component: HrManagerKpiAddOrEditComponent },
  { path: 'unlock-kpi', component: UnlockKpiComponent }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrManagerRoutingModule { }
