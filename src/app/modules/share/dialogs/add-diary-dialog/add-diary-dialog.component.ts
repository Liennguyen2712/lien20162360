import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmpModel, DiaryCriterionDetail, CriterionCatalog } from 'src/app/models/data/data';
import { CriterionCatalogService } from 'src/app/services/catalog/criterion-catalog.service';
import { SelectListItem, DiaryDetailInputModel } from 'src/app/models/base/utilities';
import asEnumerable from 'linq-es2015';
import { DiaryCriterionDetailService } from 'src/app/services/event-diary/diary-criterion-detail.service';
import { CommonDialogService } from 'src/app/services/utilities/dialog/dialog.service';
import { a } from '@angular/core/src/render3';

@Component({
  selector: 'app-add-diary-dialog',
  templateUrl: './add-diary-dialog.component.html',
  styleUrls: ['./add-diary-dialog.component.css']
})
export class AddDiaryDialogComponent implements OnInit {
  criterionCatalogs: CriterionCatalog[];
  toolTipData = '';

  constructor(
    public dialogRef: MatDialogRef<AddDiaryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DiaryDetailInputModel, private _criterionCatalogService: CriterionCatalogService,
    private _diaryCriterionDetailService: DiaryCriterionDetailService, private _dgService: CommonDialogService
  ) { }

  model: DiaryCriterionDetail = {};

  ngOnInit() {
    this.initialize();
  }

  fetchValue() {
    const currentCatalog = asEnumerable(this.criterionCatalogs).FirstOrDefault(x => x.id == this.model.criterionCatalogId);
    this.model.eventDiaryId = this.data.eventDiary.id;
    this.model.criterionCatalogId = currentCatalog.id;
    this.model.criterionCatalogCode = currentCatalog.code;
    this.model.criterionCatalogName = currentCatalog.criterionTitle;
    this.model.criterionCatalogFolderId = currentCatalog.parentId;
    this.model.criterionDate = this.data.date;
    this.model.userName = this.data.emp.userName;
    this.model.userFullName = this.data.emp.userFullName;
    this.model.criterionDayOfMonth = this.data.date.getDate();
    this.model.kpiMonthNumber = this.data.date.getMonth() + 1;
    this.model.pointRange = `[${currentCatalog.minimumPoint}] đến [${currentCatalog.maximumPoint}]`;
    if (this.model.kpiPoint < currentCatalog.minimumPoint || this.model.kpiPoint > currentCatalog.maximumPoint) {
      this.model.kpiPoint = 0;
    }
    this.model.isMinus = currentCatalog.isMinus;
    this.toolTipData = currentCatalog.criterionTitle;
  }

  async submit() {
    if (!this.model.kpiPoint || this.model.kpiPoint === 0) {
      this._dgService.alert('Trọng số phải khác 0');
      return;
    }
    console.log(this.model.comment);
    if (!this.model.comment || this.model.comment.trim() === '') {
      this._dgService.alert('Chưa nhập "Giải thích (thành tích/lỗi vi phạm)"');
      return;
    }

    const isConfirm = await this._dgService.confirm(`Bạn có chắc chắn chấm điểm KPI này dành cho nhân viên ${this.data.emp.userFullName}?`);

    if (!isConfirm) {
      return;
    }

    // cong hoac tru
    this.model.kpiPoint = this.model.isMinus ? -Math.abs(this.model.kpiPoint) : Math.abs(this.model.kpiPoint);

    const res = await this._diaryCriterionDetailService.addOrEdit(this.model);
    if (res.isSuccess) {
      this.dialogRef.close(true);
    } else {
      console.log(res.message);
      if (res.message) {
        if (res.message.startsWith('Có lỗi xảy ra')) {
          this._dgService.alert(res.message);
        } else {
          this._dgService.alert('Có lỗi xảy ra');
        }
      } else {
        this._dgService.alert('Có lỗi xảy ra');
      }
    }
  }

  private async initialize() {
    const response = await this._criterionCatalogService.getCriterionCatalog();

    if (response.isSuccess) {
      this.criterionCatalogs = asEnumerable<CriterionCatalog>(response.data).Where(x => x.criterionLevel == 2).OrderBy(x => x.code).ToArray();
    } else {
      this._dgService.alert('Có lỗi xảy ra');
      console.log(response.message);
    }
  }
}
