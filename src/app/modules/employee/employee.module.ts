import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ShareModule } from 'src/app/modules/share/share.module';
import { KpiListComponent } from './kpi/kpi-list/kpi-list.component';
import { KpiAddOrEditComponent } from './kpi/kpi-add-or-edit/kpi-add-or-edit.component';
import { UserOrgListComponent } from './orgs/user-org-list/user-org-list.component';
import { UserOrgAddOrEditComponent } from './orgs/user-org-add-or-edit/user-org-add-or-edit.component';
import { EventdiaryconfigListComponent } from './eventdiaryconfig/eventdiaryconfig-list/eventdiaryconfig-list.component';
import { EventdiaryconfigAddOrEditComponent } from './eventdiaryconfig/eventdiaryconfig-add-or-edit/eventdiaryconfig-add-or-edit.component';
import { KpiperiodconfigAddOrEditComponent } from './kpiperiodconfig/kpiperiodconfig-add-or-edit/kpiperiodconfig-add-or-edit.component';
import { KpiPeriodConfigListComponent } from './kpiperiodconfig/kpiperiodconfig-list/kpiperiodconfig-list.component';
import { EmpEventDiaryComponent } from './event/emp-event-diary/emp-event-diary.component';
import { NgxMatSelectSearchModule } from 'src/app/modules/share/components/ngx-mat-select/ngx-mat-select-search.module';
import { UpdateEventDiaryComponent } from './sync-data/update-event-diary/update-event-diary.component';
import { ExistedConfigComponent } from './sync-data/update-event-diary/existed-config/existed-config.component';
import { MissingConfigComponent } from './sync-data/update-event-diary/missing-config/missing-config.component';
import { PipeModule } from 'src/app/pipe/pipe.module';


export const routes: Routes = [
  { path: 'kpi', component: KpiListComponent },
  { path: 'kpi-add-or-edit/:id', component: KpiAddOrEditComponent },
  { path: 'event', component: EmpEventDiaryComponent },
  { path: 'user', component: KpiListComponent },
  { path: 'user-add-or-edit/:id', component: KpiAddOrEditComponent },
  // { path: 'user-event-diary', component: UsersListComponent},
  { path: 'user-event-diary', component: UserOrgListComponent },
  { path: 'event-diary-config', component: EventdiaryconfigListComponent },
  { path: 'event-config-add-or-edit/:id', component: EventdiaryconfigAddOrEditComponent },
  { path: 'kpi-config', component: KpiPeriodConfigListComponent },
  { path: 'kpi-config-add-or-edit/:id', component: KpiperiodconfigAddOrEditComponent },
  { path: 'event-diary-sync', component: UpdateEventDiaryComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ShareModule,
    NgxMatSelectSearchModule,
    PipeModule
  ],
  declarations: [KpiListComponent, KpiAddOrEditComponent, UserOrgListComponent, UserOrgAddOrEditComponent, EventdiaryconfigListComponent,
    EventdiaryconfigAddOrEditComponent, KpiperiodconfigAddOrEditComponent, KpiPeriodConfigListComponent, EmpEventDiaryComponent, UpdateEventDiaryComponent, ExistedConfigComponent, MissingConfigComponent]
})
export class EmployeeModule { }
