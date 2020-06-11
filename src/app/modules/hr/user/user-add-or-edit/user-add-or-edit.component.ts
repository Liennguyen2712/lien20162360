import { Component, OnInit, ViewChild } from '@angular/core';
import { MonthPickerComponent } from 'src/app/modules/share/components/month-picker/month-picker.component';
import { Org_Organization, UserOrg, Org_JobTitle } from 'src/app/models/data/data';
import { UserOrgFilterModel, RespondData } from 'src/app/models/base/utilities';
import { UserOrgService } from 'src/app/services/orgs/user-org/user-org.service';
import { BaseAddOrEditComponent } from 'src/app/models/base/base-aoe-component';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDialogService } from 'src/app/services/utilities/dialog/dialog.service';
import { Observable } from 'rxjs';

import { from } from 'rxjs';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { UserEmploymentHistoryComponent } from '../user-employment-history/user-employment-history.component';
import { AppConfig } from 'src/app/services/config/app.config';
import { asEnumerable } from 'linq-es2015';

@Component({
  selector: 'app-user-add-or-edit',
  templateUrl: './user-add-or-edit.component.html',
  styleUrls: ['./user-add-or-edit.component.css']
})
export class UserAddOrEditComponent extends BaseAddOrEditComponent<UserOrg, UserOrgFilterModel,
UserOrgService> implements OnInit {

  @ViewChild('monthFilter') monthFilter: MonthPickerComponent;
  Orgs: Org_Organization[];
  UserOrgs: UserOrg[];
  JobTitles: Org_JobTitle[];
  workStatus = asEnumerable(AppConfig.settings.workStatus).ToArray();

  constructor(_dataService: UserOrgService, _route: ActivatedRoute, _router: Router, _dialogService: CommonDialogService
    , public dialog: MatDialog) {
    super(_dataService, _route, _router, _dialogService);
  }

  async ngOnInit() {
    await super.ngOnInit();

    // tao moi
    if (!this.item) {
      this.item = { id: 0 };
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
          let org = {
            id: e.id, name: e.name, description: e.description, organizationTypeID: e.organizationTypeID,
            nodeID: e.nodeID, directoryPath: e.directoryPath
          };
          this.Orgs.push(org);
        });
        let allOrg = {
          id: -1, name: 'Tất cả phòng ban', description: '', organizationTypeID: -1,
          nodeID: '', directoryPath: ''
        };
        this.Orgs.unshift(allOrg);
      }
      ,
      (error) => {
        console.log(error);
      }
    );

  }

  getUsers() {
    this._dataService.getJobTitles().then(
      (result) => {
        this.JobTitles = [];
        result.data.forEach(e => {
          let title = {
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

  getJobTitles() {
    this._dataService.getUsers().then(
      (result) => {
        this.UserOrgs = [];
        result.data.forEach(e => {
          let user = {
            id: e.id, userFullName: e.userFullName, jobTitle: e.jobTitle, orgId: e.orgId
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

  async addOrEdit() {
    if (!this.item.code) {
      alert('Chưa nhập mã nhân viên');
      return;
    } else if (this.item.code.trim() === '') {
      alert('Chưa nhập mã nhân viên');
      return;
    }

    if (!this.item.userName) {
      alert('Chưa nhập tên đăng nhập');
      return;
    } else if (this.item.userName.trim() === '') {
      alert('Chưa nhập tên đăng nhập');
      return;
    }

    if (!this.item.status) {
      alert('Chưa nhập tình trạng làm việc');
      return;
    } else if (this.item.status.trim() === '') {
      alert('Chưa nhập tình trạng làm việc');
      return;
    }

    if (!this.item.kpiType) {
      alert('Chưa nhập mẫu đánh giá');
      return;
    } else if (this.item.kpiType.trim() === '') {
      alert('Chưa nhập mẫu đánh giá');
      return;
    }

    if (!this.item.orgId) {
      alert('Chưa nhập phòng ban');
      return;
    } else if (this.item.orgId <= 0) {
      alert('Chưa nhập phòng ban');
      return;
    }

    if (!this.item.isDivisionManager && !this.item.isEmpManager && !this.item.isEmployee && !this.item.isHrDirector
      && !this.item.isKpiManager && !this.item.isLevel1Manager && !this.item.isLevel2Manager && !this.item.isReport) {
      alert('Phải chọn một quyền');
      return;
    }

    const tmp: UserOrg = {
      id: this.item.id,
      userFullName: this.item.userFullName,
      jobTitleId: this.item.jobTitleId,
      orgId: this.item.orgId,
      userEmail: this.item.userEmail,
      status: this.item.status,
      firstKpiDate: this.item.firstKpiDate,
      kpiType: this.item.kpiType,
      level1ManagerId: this.item.level1ManagerId,
      level2ManagerId: this.item.level2ManagerId,
      isEmployee: this.item.isEmployee,
      isLevel1Manager: this.item.isLevel1Manager,
      isLevel2Manager: this.item.isLevel2Manager,
      isKpiManager: this.item.isKpiManager,
      isEmpManager: this.item.isEmpManager,
      isHrDirector: this.item.isHrDirector,
      isReport: this.item.isReport,
      isCreateUser: this.item.isCreateUser,
      userName: this.item.userName,
      dob: this.item.dob,
      startWorkDate: this.item.startWorkDate,
      code: this.item.code,
      idCardNumber: this.item.idCardNumber,
      idCardDate: this.item.idCardDate,
      idCardLocation: this.item.idCardLocation,
      isDivisionManager: this.item.isDivisionManager,
      isOrgManager: this.item.isOrgManager,
    };
    console.log(tmp);
    this._dataService.addOrEdit(tmp).then(
      (data) => {
        if (data.isSuccess === true) {
          alert('Lưu thành công.');
          this._router.navigate(['/hr/user']);
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

  validateData(input: UserOrg): RespondData {
    const result: RespondData = { isSuccess: true, message: '' };
    return result;
  }

  fetchData() {
  }

  permissionChanged() {
    if (this.item != null && !this.item.isHasLogin) {
      this.item.isCreateUser = this.item.isEmpManager || this.item.isEmployee || this.item.isHrDirector || this.item.isLevel1Manager ||
        this.item.isLevel2Manager || this.item.isReport || this.item.isKpiManager || this.item.isDivisionManager;
    }
  }

  createUserChanged() {
    if (this.item != null && !this.item.isHasLogin && !this.item.isCreateUser) {
      this.item.isEmpManager = this.item.isEmployee = this.item.isHrDirector = this.item.isLevel1Manager =
        this.item.isLevel2Manager = this.item.isReport = this.item.isKpiManager = this.item.isDivisionManager = false;
    }
  }

  showHistory() {
    const dialogRef = this.dialog.open(UserEmploymentHistoryComponent, {
      width: '720px',
      data: { userId: this.item.id }
    });
  }

  get isReadOnlyUser() {
    return this.item && this.item.id > 0;
  }
}