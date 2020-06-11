import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UpdateKpiDialogModel, RespondData } from 'src/app/models/base/utilities';
import asEnumerable from 'linq-es2015';
import { CommonDialogService } from 'src/app/services/utilities/dialog/dialog.service';
import { a } from '@angular/core/src/render3';
import { KpiPeriodConfigService } from 'src/app/services/kpiperiodconfig/kpiperiodconfig.service';
import { MonthPickerComponent } from '../../components/month-picker/month-picker.component';

@Component({
  selector: 'app-update-kpi-dialog',
  templateUrl: './update-kpi-dialog.component.html',
  styleUrls: ['./update-kpi-dialog.component.css']
})
export class UpdateKpiDialogComponent implements OnInit {
  @ViewChild('monthFilter') monthFilter: MonthPickerComponent;

  constructor(
    public dialogRef: MatDialogRef<UpdateKpiDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: UpdateKpiDialogModel,
    private _kpiPeriodCfgService: KpiPeriodConfigService, private _dgService: CommonDialogService
  ) { }

  ngOnInit() {
  }

  // async submit() {
  //   const isConfirm = await this._dgService.confirm('Bạn có muốn cập nhật thay đổi KPI?');

  //   if (!isConfirm) {
  //     return;
  //   }
    
  //   this.data.yearMonth = this.monthFilter.getYearMonth();
  //   console.log(this.data);

  //   const res = await this._kpiPeriodCfgService.updateKPIByYearMonthEvent(this.data);
  //   if (res.isSuccess) {
  //     this._dgService.alert('Thay đổi KPI thành công');
  //     this.dialogRef.close(true);
  //   } else {
  //     console.log(res.message);
  //     this._dgService.alert('Có lỗi xảy ra');
  //   }
  // }

  forward() : void {
    const ym = this.monthFilter.getYearMonth();
    const rs: RespondData = {status: 'success', data: ym};
    this.dialogRef.close(rs);
  }

  cancel() : void {
    const rs: RespondData = {status: 'cancel'};
    this.dialogRef.close(rs);
  }
}
