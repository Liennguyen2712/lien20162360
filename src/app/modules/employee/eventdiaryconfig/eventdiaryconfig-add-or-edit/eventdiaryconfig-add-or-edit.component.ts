import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseAddOrEditComponent } from 'src/app/models/base/base-aoe-component';
import { KpiFilterModel, RespondData, ViewEventDiaryConfigFilterModel } from '../../../../models/base/utilities';
import { Kpi, KpiTask, CriterionCatalog, KpiCriterionDetail, EventDiaryConfig, Org_Organization, UserOrg, EVDConfigUserRow } from '../../../../models/data/data';
import { KpiService } from '../../../../services/kpi/kpi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDialogService } from '../../../../services/utilities/dialog/dialog.service';
import { MatTable, MatCheckbox } from '@angular/material';
import asEnumerable from 'linq-es2015';
import { ViewEventdiaryconfigService } from 'src/app/services/eventdiaryconfig/eventdiaryconfig.service';
import { e } from '@angular/core/src/render3';
import { UserOrgService } from 'src/app/services/orgs/user-org/user-org.service';

@Component({
  selector: 'app-eventdiaryconfig-add-or-edit',
  templateUrl: './eventdiaryconfig-add-or-edit.component.html',
  styleUrls: ['./eventdiaryconfig-add-or-edit.component.css']
})
export class EventdiaryconfigAddOrEditComponent extends BaseAddOrEditComponent<EventDiaryConfig, ViewEventDiaryConfigFilterModel,
ViewEventdiaryconfigService> implements OnInit {

  @ViewChild('taskTbl') _taskTbl: MatTable<any>;
  taskDisplayedColumns = ['STT', 'name', 'jobTitle', 'updatedDate', 'actions'];

  Orgs: Org_Organization[];
  UserOrgs: UserOrg[];
  filteredUserOrgs: UserOrg[];
  isReadOnly = true;

  constructor(_dataService: ViewEventdiaryconfigService, _route: ActivatedRoute, _router: Router, _dialogService: CommonDialogService) {
    super(_dataService, _route, _router, _dialogService);
  }

  async ngOnInit() {
    await super.ngOnInit().then(
      (res) => {
        this.isReadOnly = this.id > 0 ? true : false;
      },
      (err) => {

      }
    );

    // tao moi
    if (!this.item) {
      this.item = { id: 0, isActive: true };

    }

    this.initialize();
  }

  private initialize() {
    this.getOrgs();

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
        // them ten khoi/ban vao ten phong
        this.Orgs.forEach(el => {
          const parentName = this.getParentOrg(el);
          if (parentName !== '') {
            el.name = el.name + ' | ' + parentName + '';
          }
        });

        const allOrg = {
          id: -1, name: 'Tất cả phòng ban', description: '', organizationTypeID: -1,
          nodeID: '', directoryPath: ''
        };
        this.Orgs.unshift(allOrg);
        this.getUsers();
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
            id: e.id, userFullName: e.userFullName, jobTitle: e.jobTitle, orgId: e.orgId
            , userName: e.userName
          };
          this.UserOrgs.push(user);
        });
        // load danh sach nhan vien
        this.orgChange(this.item.orgId, true);
      }
      ,
      (error) => {
        console.log(error);
      }
    );
  }

  async deleteUser(i) {
    const isConfirm = await this._dialogService.confirm('Bạn chắc chắn xóa bản ghi này?');
    if (!isConfirm) {
      return;
    }

    const user = this.item.userList[i];
    if (user) {
      this.item.userList.splice(i, 1);
      this.changeUserComboSource();
    }
    this.reloadUserTbl();
  }

  addUser() {
    const currentUserBuffer = this.item.userList[this.item.userList.length - 1];

    if (this.isEmptyUser(currentUserBuffer)) {
      return;
    }

    this.addUserBuffer();
    this.reloadUserTbl();
    this.changeUserComboSource();
  }

  isEmptyUser(user: UserOrg) {
    return (user == null || user.id == null || !user.userFullName || user.userFullName.trim() === '');
  }

  isNotBufferUserItem(index: number) {
    return index < this.item.userList.length - 1;
  }

  private addUserBuffer() {
    const currLen = this.item.userList ? this.item.userList.length : 0;
    if (!this.item.userList) {
      this.item.userList = [];
    }

    const userBuffered: EVDConfigUserRow = { id: -1 };
    userBuffered.selectSource = [];
    const uList = this.getNewUserList();
    uList.forEach(element => {
      userBuffered.selectSource.push(element);
    });
    this.item.userList.push(userBuffered);
  }

  private reloadUserTbl() {
    if (this._taskTbl) {
      this._taskTbl.renderRows();
    }
  }

  async addOrEdit() {
    if (!this.item.code) {
      alert('Chưa nhập mã.');
      return;
    }
    if (this.item.code.trim() === '') {
      alert('Chưa nhập mã.');
      return;
    }

    // // huypq modified 16-12-2019 issues 153
    // const res = await this._dataService.updateKPI(this.item.id);

    // if (res.status == 'cancel') {
    //   return;
    // } 
    // console.log(this.item.userList);
    const tmpUserList = this.item.userList.filter(u => u.userFullName);

    const tmp: EventDiaryConfig = {
      id: this.item.id,
      name: this.item.name,
      description: this.item.description,
      orgId: this.item.orgId,
      orgName: this.item.orgName,
      level1ManagerUserName: this.item.level1ManagerUserName,
      level1ManagerFullName: this.item.level1ManagerFullName,
      level1ManagerJobTitle: this.item.level1ManagerJobTitle,
      level1ManagerOrgName: this.item.level1ManagerOrgName,
      level2ManagerUserName: this.item.level2ManagerUserName,
      level2ManagerFullName: this.item.level2ManagerFullName,
      level2ManagerJobTitle: this.item.level2ManagerJobTitle,
      code: this.item.code,
      level1ManagerUserId: this.item.level1ManagerUserId,
      level2ManagerUserId: this.item.level2ManagerUserId,
      userList: tmpUserList,
      isActive: this.item.isActive, // convert tu chuoi thanh so,

      // applyDate: res.data,
    };

    this._dataService.addOrEdit(tmp).then(
      (data) => {
        if (data.isSuccess === true) {
          alert('Lưu thành công.');
        } else {
          if (data.message) {
            if (data.message.includes('[**ERROR**]')) {
              alert(data.message);
            } else {
              alert('Có lỗi xảy ra');
            }
            console.log(data.message);
          } else {
            alert('Có lỗi xảy ra');
          }
        }
      }
      , (error) => {
        alert('Có lỗi xảy ra.');
        console.log(error);
      }
    );
  }

  orgChange(id, isLoading = false) {
    // load danh sach user theo phong ban
    this.filteredUserOrgs = [];
    this.filteredUserOrgs = this.getUserCurrentDep();

    // reset table user
    if (isLoading && this.item.userList && this.item.userList.length > 0) {
      // do nothing
    } else {
      this.item.userList = [];
    }
    this.changeUserComboSource();
    this.addUserBuffer();
    this.reloadUserTbl();

    const org = this.Orgs.filter(o => o.id === id);
    if (org && org.length > 0) {
      this.item.orgName = org[0].name;
    }
  }

  changeUserComboSource() {
    const filter = this.getNewUserList();

    // xoa user da chon nay o danh sach cua cac dong khac
    this.item.userList.forEach(el => {
      const usrSource = { id: el.id, userName: el.userName, jobTitle: el.jobTitle, userFullName: el.userFullName, selectSource: [] };
      filter.forEach(el1 => {
        usrSource.selectSource.push(el1);
      });
      const usr = { id: el.id, userName: el.userName, jobTitle: el.jobTitle, userFullName: el.userFullName };
      usrSource.selectSource.push(usr);

      el.selectSource = usrSource.selectSource;
    });
  }

  getNewUserList() {
    const filtered: UserOrg[] = [];
    if (this.filteredUserOrgs) {
      this.filteredUserOrgs.forEach(element => {
        filtered.push(element);
      });

      // xoa danh sach user da chon
      for (let i = 0; i < this.item.userList.length; i++) {
        const element = this.item.userList[i];
        const idx = filtered.findIndex(u => u.id === element.id);
        if (idx >= 0) {
          filtered.splice(idx, 1);
        }
      }
    }

    return filtered;
  }

  // danh sach user thuoc phong ban hien tai
  getUserCurrentDep() {
    let ret: UserOrg[];
    const currOrg = asEnumerable(this.Orgs).FirstOrDefault(o => o.id === this.item.orgId);
    if (currOrg != null) {
      const childOrgs: number[] = [];
      for (let i = 0; i < this.Orgs.length; i++) {
        const element = this.Orgs[i];

        if (element.directoryPath != null) {
          // org con, co dir path chua dir path cua org hien tai
          if (element.directoryPath.startsWith(currOrg.directoryPath) && element.directoryPath.length > currOrg.directoryPath.length
            && element.directoryPath.length > 0 && this.dotCount(currOrg) < this.dotCount(element)) {
            childOrgs.push(element.id);
          }
        }
      }
      ret = this.UserOrgs.filter(o => o.orgId === this.item.orgId || asEnumerable(childOrgs).Contains(o.orgId));
    }
    return ret;
  }

  dotCount(dotString: Org_Organization) {
    return dotString.directoryPath.split('.').length - 1;
  }

  getParentOrg(org: Org_Organization) {
    let ret = '';
    if (org.directoryPath != null) {
      for (let i = 0; i < this.Orgs.length; i++) {
        const element = this.Orgs[i];
        if (element.directoryPath != null) {
          // if (org.directoryPath.startsWith(element.directoryPath)
          //   && element.directoryPath.length < org.directoryPath.length
          //   && element.directoryPath.length > 0 && this.dotCount(org) === this.dotCount(element) + 1) {
          //   ret = element.name;
          //   break;
          // }
          if (this.isParentOrg(element.directoryPath, org.directoryPath)) {
            ret = element.name;
            break;
          }
        }
      }
    }
    return ret;
  }

  isParentOrg(test: string, child: string) {
    const dotsT = this.toDotArray(test);
    const dotsC = this.toDotArray(child);

    if (dotsT.length === dotsC.length - 1) {
      let j = 0;
      for (let i = 0; i < dotsC.length - 1; i++) {
        if (dotsT[i] !== dotsC[i]) {
          break;
        }
        j++;
      }
      if (j === dotsC.length - 1) {
        return true;
      }
    }
    return false;
  }

  toDotArray(directoryPath: string): any[] {
    const res = [];
    const x = directoryPath.split('.');
    x.forEach(element => {
      res.push(+element);
    });
    return res;
  }

  orgChangeLv1(id) {
    const usr = this.UserOrgs.filter(o => o.id === this.item.level1ManagerUserId);
    if (usr) {
      this.item.level1ManagerFullName = usr[0].userFullName;
      this.item.level1ManagerUserName = usr[0].userName;
    }
  }

  orgChangeLv2(id) {
    const usr = this.UserOrgs.filter(o => o.id === this.item.level2ManagerUserId);
    if (usr) {
      this.item.level2ManagerFullName = usr[0].userFullName;
      this.item.level2ManagerUserName = usr[0].userName;
    }
  }

  userChange(user: UserOrg) {
    // load thong tin nhan vien 
    let usr = this.UserOrgs.filter(u => u.id === user.id);
    if (usr) {
      user.jobTitle = usr[0].jobTitle;
      user.userFullName = usr[0].userFullName;
      user.userName = usr[0].userName;
    }
    this.changeUserComboSource();
  }

  fetchData() {
  }

  validateData(input: EventDiaryConfig): RespondData {
    const result: RespondData = { isSuccess: true, message: '' };
    return result;
  }

  async updateKPI() {
    const rs = await this._dataService.updateKPI(this.item.id);
    if (rs) {
      // fill lại dữ liệu sau khi thực hiện
      //this.getData();
    }
  }
}
