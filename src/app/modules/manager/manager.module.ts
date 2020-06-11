import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ShareModule } from '../share/share.module';
import { EventDiaryComponent } from './event/event-diary/event-diary.component';
import { AuthGuard } from 'src/app/modules/auth.guard';
import { ManagerKpiListComponent } from './kpi/manager-kpi-list/manager-kpi-list.component';
import { ManagerKpiDetailComponent } from './kpi/manager-kpi-detail/manager-kpi-detail.component';
import { NgxMatSelectSearchModule } from '../share/components/ngx-mat-select/public_api';
import { PipeModule } from 'src/app/pipe/pipe.module';


export const routes: Routes = [
  { path: 'event-diary', component: EventDiaryComponent },
  { path: 'kpi-list', component: ManagerKpiListComponent },
  { path: 'kpi-detail/:id', component: ManagerKpiDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ShareModule,
    NgxMatSelectSearchModule,
    PipeModule
  ],
  declarations: [EventDiaryComponent, ManagerKpiListComponent, ManagerKpiDetailComponent]
})
export class ManagerModule { }
