import { Component, OnInit } from '@angular/core';
import { BaseAddOrEditComponent } from 'src/app/models/base/base-aoe-component';
import { Org_Organization } from 'src/app/models/data/data';
import { OrgService } from 'src/app/services/orgs/org.service';
import { RespondData, OrgFilterModel } from 'src/app/models/base/utilities';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDialogService } from 'src/app/services/utilities/dialog/dialog.service';
import { MatDialog } from '@angular/material';
import { asEnumerable } from 'linq-es2015';

@Component({
  selector: 'app-org-add-edit',
  templateUrl: './org-add-edit.component.html',
  styleUrls: ['./org-add-edit.component.css']
})
export class OrgAddEditComponent extends BaseAddOrEditComponent<Org_Organization, OrgFilterModel, OrgService> implements OnInit {
  orgs: Org_Organization[];

  constructor(_dataService: OrgService, _route: ActivatedRoute, _router: Router, _dialogService: CommonDialogService
    , public dialog: MatDialog) {
    super(_dataService, _route, _router, _dialogService);
  }

  async ngOnInit() {
    await super.ngOnInit();

    // tao moi
    if (!this.item) {
      this.item = { id: 0 };
    }
    this.GetOrgs();
  }

  GetOrgs() {
    this._dataService.getAll().then(
      (result) => {
        this.orgs = result.data;
        const allOrg = {
          id: null, name: '--Chọn phòng ban--', description: '', organizationTypeID: -1,
          nodeID: '', directoryPath: ''
        };
        this.orgs.unshift(allOrg);

        // chinh sua phong ban bo phong ban hien tai
        if (this.item && this.item.id > 0) {
          const idx = this.orgs.findIndex(x => x.id === this.item.id);
          if (idx > -1) {
            this.orgs.splice(idx, 1);
          }
        }
      }
      ,
      (error) => {
        console.log(error);
      }
    );
  }

  async addOrEdit() {
    if (!this.item.code) {
      alert('Chưa nhập mã khối/phòng ban');
      return;
    } else if (this.item.code.trim() === '') {
      alert('Chưa nhập mã khối/phòng ban');
      return;
    }

    if (!this.item.name) {
      alert('Chưa nhập tên khối/phòng ban');
      return;
    } else if (this.item.name.trim() === '') {
      alert('Chưa nhập tên khối/phòng ban');
      return;
    }

    const tmp: Org_Organization = {
      id: this.item.id,
      code: this.item.code,
      name: this.item.name,
      description: this.item.description,
      parentId: this.item.parentId
    };
    console.log(tmp);
    this._dataService.addOrEdit(tmp).then(
      (data) => {
        if (data.isSuccess === true) {
          alert('Lưu thành công.');
          this._router.navigate(['/hr/hr-org']);
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

  validateData(input: Org_Organization): RespondData {
    return { isSuccess: true };
  }

  fetchData() {
  }
}
