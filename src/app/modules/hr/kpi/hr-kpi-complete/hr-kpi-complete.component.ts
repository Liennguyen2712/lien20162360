import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseGridComponent, BaseGridDatasource } from '../../../../models/base/base-grid-component';
import { GridFilterModel, KpiFilterModel } from '../../../../models/base/utilities';
import { KpiService } from '../../../../services/kpi/kpi.service';
import { Kpi, Org_Organization, ProcessStatus } from '../../../../models/data/data';
import { MonthPickerComponent } from '../../../share/components/month-picker/month-picker.component';
import { EmpKpiDataSource } from 'src/app/modules/employee/kpi/kpi-list/kpi-list.component';
import { CommonDialogService } from 'src/app/services/utilities/dialog/dialog.service';
import asEnumerable, { AsEnumerable } from 'linq-es2015';
import { debug } from 'util';
import { AppConfig } from '../../../../services/config/app.config';

@Component({
  selector: 'app-hr-kpi-complete',
  templateUrl: './hr-kpi-complete.component.html',
  styleUrls: ['./hr-kpi-complete.component.css']
})
export class HrKpiCompleteComponent extends BaseGridComponent<Kpi, KpiFilterModel, KpiService, HrKpiCompleteDataSource>  {

  @ViewChild('monthFilter') monthFilter: MonthPickerComponent;
  displayedColumns = ['isSelected', 'STT', 'kpi-month', 'employee-name', 'level1ManagerFullName', 'statusName', 'actions'];
  start = 0;
  length = 20;
  countTotal: number;
  Orgs: Org_Organization[];
  orgId = -1;
  statusList: ProcessStatus[] = AsEnumerable(AppConfig.settings.KpiStatus).Where(x => x.id > 4).ToArray();
  selectedStatus = 0;

  constructor(_service: KpiService, private _dialogService: CommonDialogService) {
    super(_service, HrKpiCompleteDataSource);
  }

  ngOnInit() {
    super.ngOnInit();
    this.getOrgs();
  }

  getOrgs() {
    this._service.getOrgs().then(
      (result) => {
        this.Orgs = [];
        //this.Orgs = result.data;
        result.data.forEach(e => {
          let org = {
            id: e.id, name: e.name, description: e.description, organizationTypeID: e.organizationTypeID, nodeID: e.nodeID, directoryPath: e.directoryPath
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

  // async getUncompletedKpi() {
  //   const rp = await this._service.updateStatusUncompletedKpi();
  //   if (rp.isSuccess) {
  //     alert('ok');
  //   } else {
  //     alert('not ok');
  //   }
  // }

  async updateKpiCompleteRange() {
    var selectedKpi = asEnumerable(this.dataSource.data.value).Where(x => x.uiIsSelected).ToArray();
    const rp = await this._service.updateKpiCompleteRange(selectedKpi);
    if (rp.isSuccess) {
      this._dialogService.alert('Thay đổi thành công');
      this.searchPaging();
    } else {
      this._dialogService.alert(rp.message);
    }
  }

  checkAll(isChecked) {
    for (let i = 0; i < this.dataSource.data.value.length; i++) {
      const element = this.dataSource.data.value[i];
      element.uiIsSelected = isChecked;
    }
  }

  getFilter(): GridFilterModel {
    if (this.filter == null) {
      this.filter = { start: this.start, length: this.length };
    }

    if (this.paginator.pageIndex == null) {
      this.paginator.pageIndex = this.start;
    }

    if (this.paginator.pageSize == null) {
      this.paginator.pageSize = this.length;
    }

    this.start = this.paginator.pageIndex * this.paginator.pageSize + 1;
    this.length = this.paginator.pageSize;
    this.filter.start = this.start;
    this.filter.length = this.length;
    this.filter.yearMonth = this.monthFilter.getYearMonth();
    this.filter.orgId = this.orgId; 
    
    this.filter.statusIds = [];

    if (this.selectedStatus != null && this.selectedStatus > 0) {
      this.filter.statusIds.push(this.selectedStatus);
    } else {
      this.filter.statusIds = asEnumerable(this.statusList).Select(x => x.id).ToArray();
    }
    return this.filter;
  }

}

// export class HrKpiCompleteDataSource extends BaseGridDatasource<Kpi, KpiFilterModel, KpiService> {
//   // public processData(data: Kpi[], filter): any { debugger;
//   //   for (let i = 0; i < data.length; i++) {
//   //     const element = data[i];
//   //     element.uiIsSelected = false;
//   //   }
//   //   return data;
//   // }

//   async getPaging(filter: KpiFilterModel) {
//     try {
//       const response = await this.dataService.getPaging(filter);
//       if (response.isSuccess) {
//         debugger;
//         const data = this.processData(response.data, filter);
//         this.data.next(data);
//         return;
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   }

// }

export class HrKpiCompleteDataSource extends BaseGridDatasource<Kpi, KpiFilterModel, KpiService> {
   public processData(data: Kpi[], filter): any { 
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      element.uiIsSelected = false;
    }
    return data;
  }
}