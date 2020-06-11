import { Component, OnInit } from '@angular/core';
import { EmpTransfer, Org_Organization, UserOrg, Org_JobTitle } from 'src/app/models/data/data';
import { BaseAddOrEditComponent } from 'src/app/models/base/base-aoe-component';
import { EmpTransferFilterModel, RespondData } from 'src/app/models/base/utilities';
import { EmpTransferService } from 'src/app/services/orgs/emp-transfer/emp-transfer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDialogService } from 'src/app/services/utilities/dialog/dialog.service';
import { asEnumerable } from 'linq-es2015';

@Component({
  selector: 'app-emp-transfer-edit',
  templateUrl: './emp-transfer-edit.component.html',
  styleUrls: ['./emp-transfer-edit.component.css']
})
export class EmpTransferEditComponent extends BaseAddOrEditComponent<EmpTransfer, EmpTransferFilterModel,
EmpTransferService> implements OnInit {

  Orgs: Org_Organization[];
  UserOrgs: UserOrg[];
  JobTitles: Org_JobTitle[];

  constructor(_dataService: EmpTransferService, _route: ActivatedRoute, _router: Router, _dialogService: CommonDialogService) {
    super(_dataService, _route, _router, _dialogService);
  }

  async ngOnInit() {
    await super.ngOnInit();

    // tao moi
    if (!this.item) {
      this.item = { id: 0, code: '' };
    }

    this.initialize();
  }

  private initialize() {
    this.getOrgs();
    this.getUsers();
    this.getJobTitles();
  }

  getOrgs() {

    this._dataService.getOrgs().then(
      (result) => {
        this.Orgs = [];

        result.data.forEach(e => {
          const org = {
            id: e.id, name: e.name, description: e.description, organizationTypeID: e.organizationTypeID,
            nodeID: e.nodeID, directoryPath: e.directoryPath
          };
          this.Orgs.push(org);
        });
      }
      ,
      (error) => {
        console.log(error);
      }
    );

  }

  getJobTitles() {
    this._dataService.getJobTitles().then(
      (result) => {
        this.JobTitles = [];
        result.data.forEach(e => {
          const title = {
            id: e.id,
            title: e.title,
            description: e.description
          };
          this.JobTitles.push(title);
        });
      }
      ,
      (error) => {
        console.log(error);
      }
    );
  }

  getUsers() {
    this._dataService.getUsers().then(
      (result) => {
        this.UserOrgs = [];
        result.data.forEach(e => {
          const user = {
            id: e.id, userFullName: e.userFullName, jobTitle: e.jobTitle, orgId: e.orgId,
            level1ManagerId: e.level1ManagerId, level2ManagerId: e.level2ManagerId,
            jobTitleId: e.jobTitleId
          };
          this.UserOrgs.push(user);
        });
      }
      ,
      (error) => {
        console.log(error);
      }
    );
  }

  validateData(input: EmpTransfer): RespondData {
    const result: RespondData = { isSuccess: true, message: '' };
    return result;
  }

  fetchData() {

  }

  async addOrEdit() {
    if (!this.item.code) {
      alert('Chưa nhập mã');
      return;
    } else if (this.item.code.trim() === '') {
      alert('Chưa nhập mã');
      return;
    }

    console.log(this.item);
    this._dataService.addOrEdit(this.item).then(
      (data) => {
        if (data.isSuccess === true) {
          alert('Lưu thành công.');
          this._router.navigate(['/hr/hr-emp-transfer']);
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

  UserSelectChanged() {
    const usr = asEnumerable(this.UserOrgs).FirstOrDefault(x => x.id === this.item.userId);
    if (usr) {
      this.item.oldJobTitleId = usr.jobTitleId;
      this.item.oldLevel1MngId = usr.level1ManagerId;
      this.item.oldLevel2MngId = usr.level2ManagerId;
      this.item.oldOrgId = usr.orgId;
    }
  }
}
