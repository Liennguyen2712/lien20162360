import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SideNavComponent } from 'src/app/modules/share/side-nav/side-nav.component';
import { AuthGuard } from 'src/app/modules/auth.guard';
import { LoginComponent } from './login/login/login.component';


const routes: Routes = [
  // { path: 'login', loadChildren: () => import('../modules/login/login.module').then(m => m.LoginModule) },
  { path: 'login', component: LoginComponent },
  {
    path: '', component: SideNavComponent, canActivate: [AuthGuard] 
    , children: [
      { path: 'mng2', loadChildren: '../modules/managerlevel2/managerlevel2.module#Managerlevel2Module' },
      { path: 'emp', loadChildren: '../modules/employee/employee.module#EmployeeModule' },
      { path: 'mng', loadChildren: '../modules/manager/manager.module#ManagerModule' },
      { path: 'hr', loadChildren: '../modules/hr/hr.module#HRModule' },
      { path: 'hr-mng', loadChildren: '../modules/hr-manager/hr-manager.module#HrManagerModule' },
      { path: 'reports', loadChildren: '../modules/report/report.module#ReportModule' },
      // { path: 'emp', loadChildren: () => import('../modules/employee/employee.module').then(m => m.EmployeeModule) },
      // { path: 'mng', loadChildren: () => import('../modules/manager/manager.module').then(m => m.ManagerModule) },
      // { path: 'hr', loadChildren: () => import('../modules/hr/hr.module').then(m => m.HRModule) },
    ]
  }
];

// https://medium.com/wineofbits/angular-2-routing-404-page-not-found-on-refresh-a9a0f5786268
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
