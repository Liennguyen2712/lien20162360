import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ShareModule } from 'src/app/modules/share/share.module';
import { HrKpiListComponent } from './kpi/hr-kpi-list/hr-kpi-list.component';
import { HrKpiAddOrEditComponent } from './kpi/hr-kpi-add-or-edit/hr-kpi-add-or-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddOrEditComponent } from './user/user-add-or-edit/user-add-or-edit.component';
import { UserEmploymentHistoryComponent } from './user/user-employment-history/user-employment-history.component';
import { HrEventDiaryComponent } from './event/hr-event-diary/hr-event-diary.component';
import { HrKpiCompleteDetailComponent } from './kpi/hr-kpi-complete-detail/hr-kpi-complete-detail.component';
import { HrKpiCompleteComponent } from 'src/app/modules/hr/kpi/hr-kpi-complete/hr-kpi-complete.component';
import { NgxMatSelectSearchModule } from 'src/app/modules/share/components/ngx-mat-select/ngx-mat-select-search.module';
import { UnlockdiarycriterionComponent } from './unlockdiarycriterion/unlockdiarycriterion.component';
import { EmpTransferListComponent } from './emptransfer/emp-transfer-list/emp-transfer-list.component';
import { EmpTransferEditComponent } from './emptransfer/emp-transfer-edit/emp-transfer-edit.component';
import { DivisionManagerPermissionComponent } from './division-manager/division-manager-permission/division-manager-permission.component';
import { DivisionManagerPermissionListComponent } from './division-manager/division-manager-permission-list/division-manager-permission-list.component';
import { DivisionManagerEventComponent } from './division-manager/division-manager-view/event/division-manager-event/division-manager-event.component';
import { DivisionManagerKpiDetailComponent } from './division-manager/division-manager-view/kpi/division-manager-kpi-detail/division-manager-kpi-detail.component';
import { DivisionManagerKpiComponent } from './division-manager/division-manager-view/kpi/division-manager-kpi/division-manager-kpi.component';
import { OrgAddEditComponent } from './org/org-add-edit/org-add-edit.component';
import { OrgListComponent } from './org/org-list/org-list.component';
import { CriterionTypeAddEditComponent } from './criterion/criterion-type/criterion-type-add-edit/criterion-type-add-edit.component';
import { CriterionTypeListComponent } from './criterion/criterion-type/criterion-type-list/criterion-type-list.component';
import { CriterionCatalogAddEditComponent } from './criterion/criterion-catalog/criterion-catalog-add-edit/criterion-catalog-add-edit.component';
import { CriterionCatalogListComponent } from './criterion/criterion-catalog/criterion-catalog-list/criterion-catalog-list.component';
import { PipeModule } from 'src/app/pipe/pipe.module';
// import { KpiperiodconfigAddOrEditComponent } from 'src/app/modules/employee/kpiperiodconfig/kpiperiodconfig-add-or-edit/kpiperiodconfig-add-or-edit.component';


export const routes: Routes = [
    { path: 'event', component: HrEventDiaryComponent },
    { path: 'kpi', component: HrKpiListComponent },
    { path: 'kpi-add-or-edit/:id', component: HrKpiAddOrEditComponent },
    { path: 'user', component: UserListComponent },
    { path: 'user-add-or-edit/:id', component: UserAddOrEditComponent },
    { path: 'hr-kpi-complete', component: HrKpiCompleteComponent },
    { path: 'hr-kpi-complete-detail/:id', component: HrKpiCompleteDetailComponent },
    { path: 'hr-emp-transfer', component: EmpTransferListComponent },
    { path: 'hr-emp-transfer/:id', component: EmpTransferEditComponent },
    { path: 'hr-div-mng-permiss', component: DivisionManagerPermissionListComponent },
    { path: 'hr-div-mng-permiss/:id', component: DivisionManagerPermissionComponent },
    { path: 'hr-div-mng-kpi', component: DivisionManagerKpiComponent },
    { path: 'hr-div-mng-kpi/:id', component: DivisionManagerKpiDetailComponent },
    { path: 'hr-div-mng-event', component: DivisionManagerEventComponent },
    { path: 'hr-org', component: OrgListComponent },
    { path: 'hr-org/:id', component: OrgAddEditComponent },
    { path: 'hr-crit-type', component: CriterionTypeListComponent },
    { path: 'hr-crit-type/:id', component: CriterionTypeAddEditComponent },
    { path: 'hr-crit-catalog', component: CriterionCatalogListComponent },
    { path: 'hr-crit-catalog/:id', component: CriterionCatalogAddEditComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ShareModule,
        NgxMatSelectSearchModule,
        PipeModule
    ],
    declarations: [HrKpiListComponent, HrKpiAddOrEditComponent, UserListComponent, UserAddOrEditComponent, UserEmploymentHistoryComponent
        , HrEventDiaryComponent, HrKpiCompleteComponent, HrKpiCompleteDetailComponent, UnlockdiarycriterionComponent
        , EmpTransferListComponent, EmpTransferEditComponent, DivisionManagerPermissionComponent, DivisionManagerPermissionListComponent
        , DivisionManagerEventComponent, DivisionManagerKpiDetailComponent, DivisionManagerKpiComponent, OrgAddEditComponent
        , OrgListComponent, CriterionTypeAddEditComponent, CriterionTypeListComponent, CriterionCatalogAddEditComponent
        , CriterionCatalogListComponent],
    entryComponents: [UserEmploymentHistoryComponent]
})
export class HRModule { }
