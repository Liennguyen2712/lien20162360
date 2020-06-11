import { Component, OnInit } from '@angular/core';
import { BaseAddOrEditComponent } from 'src/app/models/base/base-aoe-component';
import { CriterionCatalog } from 'src/app/models/data/data';
import { CriterionCatalogFilterModel, RespondData } from 'src/app/models/base/utilities';
import { CriterionCatalogService } from 'src/app/services/catalog/criterion-catalog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDialogService } from 'src/app/services/utilities/dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { Kpi_CriterionTypeService } from 'src/app/services/kpi/kpi-criteriontype.service';

@Component({
  selector: 'app-criterion-catalog-add-edit',
  templateUrl: './criterion-catalog-add-edit.component.html',
  styleUrls: ['./criterion-catalog-add-edit.component.css']
})
export class CriterionCatalogAddEditComponent extends
  BaseAddOrEditComponent<CriterionCatalog, CriterionCatalogFilterModel, CriterionCatalogService> implements OnInit {
  kpiCatalogs: CriterionCatalog[];
  minPointMinus = -1;
  maxPointMinus = -1;
  maxPoint = 1;
  minPoint = 1;

  constructor(_dataService: CriterionCatalogService, _route: ActivatedRoute, _router: Router, _dialogService: CommonDialogService
    , public dialog: MatDialog, private _critTypeService: Kpi_CriterionTypeService) {
    super(_dataService, _route, _router, _dialogService);
  }

  async ngOnInit() {
    await super.ngOnInit();
    // tao moi
    if (!this.item) {
      this.item = { id: 0 };
    } else {
      if (this.item.isMinus) {
        this.minPointMinus = this.item.minimumPoint;
        this.maxPointMinus = this.item.maximumPoint;
      } else {
        this.minPoint = this.item.minimumPoint;
        this.maxPoint = this.item.maximumPoint;
      }
    }

    const res = await this._critTypeService.getKpiCatalogs();
    if (res.isSuccess) {
      this.kpiCatalogs = res.data;
    }
  }

  async addOrEdit() {
    if (!this.item.code) {
      alert('Chưa nhập mã');
      return;
    } else if (this.item.code.trim() === '') {
      alert('Chưa nhập mã');
      return;
    }

    if (!this.item.criterionTitle) {
      alert('Chưa nhập tên');
      return;
    } else if (this.item.criterionTitle.trim() === '') {
      alert('Chưa nhập tên');
      return;
    }

    if (this.item.isMinus) {
      this.item.minimumPoint = this.minPointMinus ? this.minPointMinus : 0;
      this.item.maximumPoint = this.maxPointMinus ? this.maxPointMinus : 0;
    } else {
      this.item.minimumPoint = this.minPoint ? this.minPoint : 0;
      this.item.maximumPoint = this.maxPoint ? this.maxPoint : 0;
    }

    if (this.item.minimumPoint >= this.item.maximumPoint) {
      alert('Điểm tối thiểu phải nhỏ hơn điểm tối đa');
      return;
    }

    const tmp: CriterionCatalog = {
      id: this.item.id,
      code: this.item.code,
      criterionTitle: this.item.criterionTitle,
      minimumPoint: this.item.minimumPoint,
      maximumPoint: this.item.maximumPoint,
      parentId: this.item.parentId,
      isFolder: this.item.isFolder,
      isMinus: this.item.isMinus,
    };

    this._dataService.addOrEdit(tmp).then(
      (data) => {
        if (data.isSuccess === true) {
          alert('Lưu thành công.');
          this._router.navigate(['/hr/hr-crit-catalog']);
        } else {
          alert(data.message);
        }
        console.log(data);
      }
      , (error) => {
        console.log(error);
        alert(error);
      }
    );
  }

  validateData(input: CriterionCatalog): RespondData {
    return { isSuccess: true };
  }

  fetchData() {
  }

}
