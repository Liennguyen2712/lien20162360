import { Component, OnInit } from '@angular/core';
import { BaseAddOrEditComponent } from 'src/app/models/base/base-aoe-component';
import { Kpi_CriterionType, CriterionCatalog } from 'src/app/models/data/data';
import { Kpi_CriterionTypeFilterModel, RespondData } from 'src/app/models/base/utilities';
import { Kpi_CriterionTypeService } from 'src/app/services/kpi/kpi-criteriontype.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDialogService } from 'src/app/services/utilities/dialog/dialog.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { asEnumerable } from 'linq-es2015';

@Component({
  selector: 'app-criterion-type-add-edit',
  templateUrl: './criterion-type-add-edit.component.html',
  styleUrls: ['./criterion-type-add-edit.component.css']
})
export class CriterionTypeAddEditComponent extends
  BaseAddOrEditComponent<Kpi_CriterionType, Kpi_CriterionTypeFilterModel, Kpi_CriterionTypeService> implements OnInit {

  dataSource: MatTableDataSource<Kpi_CriterionType>;
  displayedColumns = ['STT', 'catalogName', 'startPoint', 'actions'];
  kpiCatalogs: CriterionCatalog[];
  catalogId: number;
  startPoint: number;

  constructor(_dataService: Kpi_CriterionTypeService, _route: ActivatedRoute, _router: Router, _dialogService: CommonDialogService
    , public dialog: MatDialog) {
    super(_dataService, _route, _router, _dialogService);
  }

  async ngOnInit() {
    await super.ngOnInit();

    // tao moi
    if (!this.item) {
      this.item = { id: 0, catalogs: [] };
    } else {
      this.dataSource = new MatTableDataSource(this.item.catalogs);
    }
    const res = await this._dataService.getKpiCatalogs();
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

    if (!this.item.name) {
      alert('Chưa nhập tên');
      return;
    } else if (this.item.name.trim() === '') {
      alert('Chưa nhập tên');
      return;
    }

    const tmp: Kpi_CriterionType = {
      id: this.item.id,
      code: this.item.code,
      name: this.item.name,
      catalogs: this.item.catalogs
    };

    this._dataService.addOrEdit(tmp).then(
      (data) => {
        if (data.isSuccess === true) {
          alert('Lưu thành công.');
          this._router.navigate(['/hr/hr-crit-type']);
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

  validateData(input: Kpi_CriterionType): RespondData {
    return { isSuccess: true };
  }

  remove(element) {
    const idx = this.item.catalogs.findIndex(x => x.id === element.id);
    if (idx !== -1) {
      this.item.catalogs.splice(idx, 1);
      this.dataSource = new MatTableDataSource(this.item.catalogs);
    }
  }

  addCatalog() {
    const catalog = asEnumerable(this.kpiCatalogs).FirstOrDefault(x => x.id === this.catalogId);
    if (this.startPoint && +this.startPoint !== 0 && catalog &&
      !asEnumerable(this.item.catalogs).FirstOrDefault(x => x.criterionCatalogId === this.catalogId && x.criterionTypeId === this.id)) {
      const itm = { criterionCatalogId: this.catalogId, startPoint: this.startPoint, catalogName: catalog.criterionTitle };
      this.item.catalogs.push(itm);
      this.dataSource = new MatTableDataSource(this.item.catalogs);
    }
  }

  fetchData() {
  }

}
