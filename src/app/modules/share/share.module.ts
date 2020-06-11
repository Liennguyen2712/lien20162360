import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MatButtonModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatCheckboxModule, MatTooltipModule } from '@angular/material';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AlertDialogComponent } from './dialogs/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AddDiaryDialogComponent } from './dialogs/add-diary-dialog/add-diary-dialog.component';
import { UserDiaryDetailsComponent } from './dialogs/user-diary/user-diary-details/user-diary-details.component';
import { MonthPickerComponent } from './components/month-picker/month-picker.component';
import { ChangePasswordDialogComponent } from './dialogs/change-password-dialog/change-password-dialog.component';
import { UpdateKpiDialogComponent } from './dialogs/update-kpi-dialog/update-kpi-dialog.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MM YYYY',
  },
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // ReactiveFormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    // LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    RouterModule,
    FlexLayoutModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  declarations: [SideNavComponent, AlertDialogComponent,
    ConfirmDialogComponent, AddDiaryDialogComponent, UserDiaryDetailsComponent, MonthPickerComponent, ChangePasswordDialogComponent
    , UpdateKpiDialogComponent],
  entryComponents: [AlertDialogComponent, ConfirmDialogComponent, AddDiaryDialogComponent, UserDiaryDetailsComponent
    , ChangePasswordDialogComponent, UpdateKpiDialogComponent],
  exports: [
    CommonModule,
    FormsModule,
    // ReactiveFormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatDialogModule,
    MonthPickerComponent,
    MatCheckboxModule
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    DatePipe
  ]
})
export class ShareModule { }
