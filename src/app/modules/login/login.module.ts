import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from 'src/app/pipe/pipe.module';

export const routes: Routes = [
  // { path: '', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    // CommonModule,    
    FormsModule,
    ReactiveFormsModule,
    PipeModule
  ],
  // declarations: [LoginComponent]
})
export class LoginModule { }
