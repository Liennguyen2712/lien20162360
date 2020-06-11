import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mnglevel2EventDiaryComponent } from './event/mnglevel2-event-diary/mnglevel2-event-diary.component';
import { Mnglevel2KpiDetailComponent } from './kpi/mnglevel2-kpi-detail/mnglevel2-kpi-detail.component';
import { Mnglevel2KpiListComponent } from './kpi/mnglevel2-kpi-list/mnglevel2-kpi-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../share/share.module';
import { AuthGuard } from '../auth.guard';
import { NgxMatSelectSearchModule } from 'src/app/modules/share/components/ngx-mat-select/ngx-mat-select-search.module';

export const routes: Routes = [
  { path: 'event-diary', component: Mnglevel2EventDiaryComponent, canActivate: [AuthGuard] },
  { path: 'kpi-list', component: Mnglevel2KpiListComponent },
  { path: 'kpi-detail/:id', component: Mnglevel2KpiDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ShareModule,
    NgxMatSelectSearchModule
  ],
  declarations: [Mnglevel2EventDiaryComponent, Mnglevel2KpiDetailComponent, Mnglevel2KpiListComponent]
})
export class Managerlevel2Module { }
