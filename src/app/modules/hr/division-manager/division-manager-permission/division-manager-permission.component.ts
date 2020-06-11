import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DivMngPer, UserOrg, DivMngPerUser, Org_Organization } from 'src/app/models/data/data';
import { UserOrgService } from 'src/app/services/orgs/user-org/user-org.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CommonDialogService } from 'src/app/services/utilities/dialog/dialog.service';
import { asEnumerable } from 'linq-es2015';

@Component({
  selector: 'app-division-manager-permission',
  templateUrl: './division-manager-permission.component.html',
  styleUrls: ['./division-manager-permission.component.css']
})
export class DivisionManagerPermissionComponent implements OnInit {

  dataSource: MatTableDataSource<DivMngPer>;
  Orgs: Org_Organization[];
  id: number;
  orgId: number;
  item: DivMngPerUser;

  displayedColumns = ['STT', 'orgName', 'actions'];

  constructor(private _service: UserOrgService, private _location: Location,
    protected _route: ActivatedRoute, private _dialogService: CommonDialogService) { }

  async ngOnInit() {
    this.id = this._route.snapshot.params['id'];
    this.item = { userId: 0 };
    if (this.id > 0) {
      const response = await this._service.getDivisionManagerPermission(this.id);
      if (response.isSuccess) {
        this.item = response.data;
        this.dataSource = new MatTableDataSource(this.item.details);
      }
    }

    const response1 = await this._service.getOrgs();
    if (response1.isSuccess) {
      this.Orgs = response1.data;
    }
  }

  goBack() {
    this._location.back();
  }

  async updateDivisionManagerPermission() {
    const response = await this._service.saveDivisionManagerPermission(this.item);
    if (response.isSuccess) {
      this._dialogService.alert('Lưu thành công');
    } else {
      this._dialogService.alert(response.message);
    }
  }

  remove(element) {
    const idx = this.item.details.findIndex(x => x.orgId === element.orgId);
    if (idx !== -1) {
      this.item.details.splice(idx, 1);
      this.dataSource = new MatTableDataSource(this.item.details);
    }
  }

  addOrg() {
    const org = asEnumerable(this.Orgs).FirstOrDefault(x => x.id === this.orgId);
    if (org && !asEnumerable(this.item.details).FirstOrDefault(x => x.orgId === this.orgId)) {
      const itm = { userId: this.item.userId, orgId: this.orgId, orgName: org.name };
      this.item.details.push(itm);
      console.log(itm);
      this.dataSource = new MatTableDataSource(this.item.details);
    }
  }
}
