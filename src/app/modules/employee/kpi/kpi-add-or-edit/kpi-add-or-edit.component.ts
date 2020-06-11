import { Component } from '@angular/core';
import { BaseKpiAddOrEditComponent } from 'src/app/models/base/base-kpi-add-or-edit-component';
import { KpiService } from '../../../../services/kpi/kpi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDialogService } from '../../../../services/utilities/dialog/dialog.service';
import { EventService } from '../../../../services/event-diary/event.service';
import { Location } from '@angular/common';
import { KpiTask, Kpi } from 'src/app/models/data/data';
import { UserOrgService } from '../../../../services/orgs/user-org/user-org.service';
import { RespondData } from '../../../../models/base/utilities';
import asEnumerable from 'linq-es2015';

@Component({
  selector: 'app-kpi-add-or-edit',
  templateUrl: './kpi-add-or-edit.component.html',
  styleUrls: ['./kpi-add-or-edit.component.css']
})
export class KpiAddOrEditComponent extends BaseKpiAddOrEditComponent {
  moduleName = 'KpiAddOrEditComponent';
  isVIP = false;

  constructor(_dataService: KpiService, _route: ActivatedRoute, _router: Router, _dialogService: CommonDialogService,
    _evnService: EventService, _location: Location, private _userOrg: UserOrgService) {
    super(_dataService, _route, _router, _dialogService, _evnService, _location);
  }

  async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this.getVIPInfo();
  }

  async getVIPInfo() {
    var rs = await this._userOrg.validateVip();
    if (rs.isSuccess) {
      this.isVIP = rs.data && this.item.statusId != 1;
    }
  }

  validateVIP(item: Kpi): RespondData {
    const rs: RespondData = { isSuccess: false, message: 'Yêu cầu bắt buộc phải có thông tin Danh mục công việc, Ngày giao việc, Kết quả yêu cầu, Thời hạn hoàn thành, Tình trạng, kết quả thực hiện' };
    if (item.taskList == null || item.taskList.length == 0) {
      rs.isSuccess = false;
      return rs;
    }

    var isEmptyProperties = asEnumerable(item.taskList).Any(x => x.assignedDate == null || x.expectation == null || x.expectation.trim() == ''
      || x.deadline == null || x.result == null || x.result.trim() == '' || x.task == null || x.task.trim() == '');
    if (isEmptyProperties) {
      rs.isSuccess = false;
      return rs;
    }

    rs.isSuccess = true;
    return rs;
  }

  async updateVIP() {
    // this.addTask();
    console.log(this.item.taskList);
    const tmpTaskList = this.item.taskList.filter(t => !this.isEmptyTask(t));
    this.item.taskList = tmpTaskList;

    const isValid = this.validateVIP(this.item);
    if (!isValid.isSuccess) {
      await this._dialogService.alert(isValid.message);

      // huypq modified 25-12-19 , add lai bufffer
      if (this.item.taskList.length == 0 || !asEnumerable(this.item.taskList).Any(x => x.isUIBuffer)) {
        this.addTaskBuffer();
      }
      return;
    }

    const data = await this._dataService.updateVIP(this.item);

    try {
      if (data.isSuccess === true) {
        await this._dialogService.alert('Lưu thành công.');
        this.goBack();
      } else {
        await this._dialogService.alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
}