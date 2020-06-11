import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { EmpModel, DiaryCriterionDetail, UserOrg } from 'src/app/models/data/data';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import asEnumerable from 'linq-es2015';
import { CriterionCatalogService } from 'src/app/services/catalog/criterion-catalog.service';
import { CommonDialogService } from 'src/app/services/utilities/dialog/dialog.service';
import { DiaryCriterionDetailService } from 'src/app/services/event-diary/diary-criterion-detail.service';
import { UserOrgService } from 'src/app/services/orgs/user-org/user-org.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-diary-details',
  templateUrl: './user-diary-details.component.html',
  styleUrls: ['./user-diary-details.component.css']
})
export class UserDiaryDetailsComponent implements OnInit {
  displayedColumns = ['STT', 'criterionDate', 'criterionCatalogCode', 'criterionCatalogName', 'kpiPoint', 'createdByUserFullName'
    , 'createdByUserTitle', 'comment', 'action'];
  kpiPoint = 0;
  onDeleteEvent = new EventEmitter();
  UserOrgs: UserOrg[];
  userName = '';
  dataSource = new MatTableDataSource<DiaryCriterionDetail>();

  constructor(public dialogRef: MatDialogRef<UserDiaryDetailsComponent>, @Inject(MAT_DIALOG_DATA) public model: EmpModel
    , private _diaryCriterionDetailService: DiaryCriterionDetailService, private _dgService: CommonDialogService
    , private _userService: UserOrgService, private _authService: AuthService) {
  }

  async ngOnInit() {
    this.kpiPoint = asEnumerable(this.model.details).Where(x => !x.isDeleted).Sum(x => x.kpiPoint) + 100;
    this.userName = this._authService.getUsername();
    this._userService.getUsers().then(
      (result) => {
        if (result) {
          this.UserOrgs = result.data;
          for (let i = 0; i < this.model.details.length; i++) {
            const element = this.model.details[i];
            element.isLevel1MngAndOwner = this.isLevel1ManagerOwner(element);
            element.isHrAndOwner = this.isHrAndOwner(element);
            element.isHrMngAndOwner = this.isHrMngAndOwner(element);
          }

          this.dataSource.data = asEnumerable(this.model.details).OrderBy(x => x.id).ToArray();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async deleteEvent(item: DiaryCriterionDetail) {
    const isConfirm = await this._dgService.confirm('Bạn có chắc chắn xóa sự kiện này và thêm sự kiện thay thế?');

    if (!isConfirm) {
      return;
    }

    // const res = { isSuccess: true, message: '' };
    const res = await this._diaryCriterionDetailService.removeByManagerLv2(item);
    if (res.isSuccess) {
      this._dgService.alert('Xóa thành công');
      item.isDeleted = true;
      this.onDeleteEvent.emit({ emp: this.model, date: new Date(item.criterionDate) });
      this.dialogRef.close();
    } else {
      console.log(res.message);
      this._dgService.alert('Có lỗi xảy ra');
    }
  }

  get isLevel2Manager() {
    return this.model.moduleName === 'Mnglevel2EventDiaryComponent';
  }
  get isHrOrHrManager() {
    return (this.model.moduleName === 'HrEventDiaryComponent' || this.model.moduleName === 'HrManagerEventDiaryComponent');
  }

  isLevel1ManagerOwner(item) {
    if (this.UserOrgs) {
      const res = asEnumerable(this.UserOrgs).FirstOrDefault(x => x.userName === this.userName);
      if (res) {
        return this.model.moduleName === 'ManagerEventDiaryComponent' && +item.createdByUser === res.id;
      }
    }
    return false;
  }

  isHrAndOwner(item) {
    if (this.UserOrgs) {
      const res = asEnumerable(this.UserOrgs).FirstOrDefault(x => x.userName === this.userName);
      if (res) {
        return this.model.moduleName === 'HrEventDiaryComponent' && +item.createdByUser === res.id;
      }
    }
    return false;
  }

  isHrMngAndOwner(item) {
    if (this.UserOrgs) {
      const res = asEnumerable(this.UserOrgs).FirstOrDefault(x => x.userName === this.userName);
      if (res) {
        return this.model.moduleName === 'HrManagerEventDiaryComponent' && +item.createdByUser === res.id;
      }
    }
    return false;
  }

}
