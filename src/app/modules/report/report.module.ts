import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiEvaluationOrgReportComponent } from './kpi-evaluation-org-report/kpi-evaluation-org-report.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../share/share.module';
import { CdkTableModule } from '@angular/cdk/table';
import { ViewStatisticsReportsComponent } from './view-statistics-reports/view-statistics-reports.component';
import { NgxMatSelectSearchModule } from '../share/components/ngx-mat-select/public_api';
import { PipeModule } from 'src/app/pipe/pipe.module';

export const routes: Routes = [
  { path: 'kpi-eval-org', component: KpiEvaluationOrgReportComponent },
  { path: 'total-elevation', component: ViewStatisticsReportsComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    CdkTableModule,
    NgxMatSelectSearchModule,
    PipeModule
  ],
  declarations: [KpiEvaluationOrgReportComponent, ViewStatisticsReportsComponent]
})
export class ReportModule { }
