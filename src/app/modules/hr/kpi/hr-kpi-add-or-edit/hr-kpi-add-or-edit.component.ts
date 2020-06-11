import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseAddOrEditComponent } from 'src/app/models/base/base-aoe-component';
import { Kpi, KpiTask, CriterionCatalog, KpiCriterionDetail, EventDiaryModel, EmpModel } from '../../../../models/data/data';
import { KpiFilterModel, RespondData, KpiReadOnlyFilter } from '../../../../models/base/utilities';
import { KpiService } from '../../../../services/kpi/kpi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDialogService } from '../../../../services/utilities/dialog/dialog.service';
import { MatTable } from '@angular/material';
import asEnumerable from 'linq-es2015';
import { promise } from 'protractor';
import { EventService } from 'src/app/services/event-diary/event.service';
import { BaseKpiAddOrEditComponent } from 'src/app/models/base/base-kpi-add-or-edit-component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hr-kpi-add-or-edit',
  templateUrl: './hr-kpi-add-or-edit.component.html',
  styleUrls: ['./hr-kpi-add-or-edit.component.css']
})
// export class HrKpiAddOrEditComponent extends BaseAddOrEditComponent<Kpi, KpiFilterModel, KpiService> implements OnInit {

//   @ViewChild('taskTbl') _taskTbl: MatTable<any>;
//   taskDisplayedColumns = ['STT', 'task', 'assignedDate', 'expectation', 'deadline', 'result'];
//   criterionDisplayedColumns = ['STT', 'criterionTitle', 'maximumPoint', 'employeeEvaluatePoint', 'employeeEvaluateDate'
//     , 'managerEvaluatePoint', 'managerEvaluateDate'];

//   criterionDetails: KpiCriterionDetail[];

//   constructor(_dataService: KpiService, _route: ActivatedRoute, _router: Router, _dialogService: CommonDialogService
//     , private _evnService: EventService) {
//     super(_dataService, _route, _router, _dialogService);
//   }

//   async ngOnInit(): Promise<void> {
//     await super.ngOnInit();
//     this.initialize();
//   }

//   validateData(input: Kpi): RespondData {
//     const result: RespondData = { isSuccess: true, message: '' };
//     return result;
//   }

//   async deleteTask(i) {
//     const isConfirm = await this._dialogService.confirm('Bạn chắc chắn xóa bản ghi này?');

//     if (!isConfirm) {
//       return;
//     }

//     const task = this.item.taskList[i];
//     if (task.id == null || task.id == 0) {
//       this.item.taskList.splice(i, 1);
//     } else {
//       task.isUIDeleted = true;
//     }
//     this.reloadTaskTbl();
//   }

//   addTask() {
//     const currentTaskBuffer = this.item.taskList[this.item.taskList.length - 1];

//     if (this.isEmptyTask(currentTaskBuffer)) {
//       return;
//     }

//     this.reloadTaskTbl();
//   }

//   getDisplayTask() {
//     const rs = asEnumerable(this.item.taskList).Where(x => x.isUIDeleted != null && !x.isUIDeleted).ToArray();
//     return rs;
//   }

//   isEmptyTask(task: KpiTask) {
//     return (task == null || task.task == null || task.task.trim() == '');
//   }

//   isNotBufferTaskItem(index: number) {
//     return index < this.item.taskList.length - 1;
//   }

//   private reloadTaskTbl() {
//     this._taskTbl.renderRows();
//   }

//   private initialize() {
//     this.getCriterionDetails();
//     this.createCriterionAggregateRow();
//     this.calCriterionAggregateRow();
//   }

//   private getCriterionDetails() {
//     if (this.item.kpiCriterionDetailList) {
//       this.criterionDetails = this.item.kpiCriterionDetailList;
//     } else {
//     }
//   }

//   private createCriterionAggregateRow() {
//     const agrRow1: KpiCriterionDetail = { criterionTitle: 'TỔNG ĐIỂM KPI', employeeEvaluatePoint: 0, managerEvaluatePoint: 0, aggregateRow: 1 };
//     const agrRow2: KpiCriterionDetail = { criterionTitle: 'XẾP LOẠI', employeeEvaluatePointChar: 'A', managerEvaluatePointChar: 'A', aggregateRow: 2 };
//     this.criterionDetails.push(agrRow1);
//     this.criterionDetails.push(agrRow2);
//   }

//   private calCriterionAggregateRow() {
//     this.item.empKpiPoint = asEnumerable(this.criterionDetails).Where(x => x.aggregateRow != 1 && x.aggregateRow != 2).Sum(x => x.employeeEvaluatePoint != null ? x.employeeEvaluatePoint : 0);
//     this.item.level1ManagerKpiPoint = asEnumerable(this.criterionDetails).Where(x => x.aggregateRow != 1 && x.aggregateRow != 2).Sum(x => x.managerEvaluatePoint != null ? x.managerEvaluatePoint : 0);
//     this.item.empKpiClassification = this.calKpiClassification(this.item.empKpiPoint);
//     this.item.level1ManagerKpiClassification = this.calKpiClassification(this.item.level1ManagerKpiPoint);
//   }

//   private calKpiClassification(kpiPoint: number): string {
//     if (kpiPoint >= 105) {
//       return 'A+';
//     } else if (kpiPoint >= 95) {
//       return 'A';
//     } else if (kpiPoint >= 85) {
//       return 'A-';
//     } else if (kpiPoint >= 75) {
//       return 'B+';
//     } else if (kpiPoint >= 60) {
//       return 'B';
//     } else {
//       return 'C';
//     }
//   }

//   fetchData() {
//     // remove buffer
//     this.item.taskList.splice(this.item.taskList.length - 1, 1);
//     this.item.kpiCriterionDetailList.splice(this.item.kpiCriterionDetailList.length - 2, 2);
//   }

//   async Save() {
//     // const tmpTaskList = this.item.taskList.filter(t => t.task);
//     // const tmp: Kpi = {
//     //   id: this.item.id,
//     //   empKpiPoint: this.item.empKpiPoint,
//     //   empKpiClassification: this.item.empKpiClassification,
//     //   hrKpiPoint: this.item.hrKpiPoint,
//     //   hrKpiPointClassification: this.item.hrKpiPointClassification,
//     //   hrKpiPointComment: this.item.hrKpiPointComment,
//     //   finalKpiPoint: this.item.finalKpiPoint,
//     //   finalKpiClassification: this.item.finalKpiClassification,
//     //   finalKpiComment: this.item.finalKpiComment,
//     //   level1ManagerKpiPoint: this.item.level1ManagerKpiPoint,
//     //   level1ManagerKpiClassification: this.item.level1ManagerKpiClassification,
//     //   taskList: tmpTaskList,
//     //   kpiCriterionDetailList: this.item.kpiCriterionDetailList
//     // };
//     // this.item.taskList = tmpTaskList;
//     this._dataService.updateKpiHRSendManager(this.item).then(
//       async (data) => {
//         if (data.isSuccess === true) {
//           await this._dialogService.alert('Lưu thành công.');
//         } else {
//           await this._dialogService.alert('Có lỗi xảy ra');
//           console.log(data.message);
//         }
//       }
//       , (error) => { console.log(error); }
//     );
//   }

//   viewEventDiary() {
//     // lay danh sach SKPS
//     this._evnService.getEventByKpiId(this.item.yearMonth, this.item.organizationId, this.item.id).then(
//       (result) => {
//         const data = result.data as EventDiaryModel;
//         if (data) {
//           const emp: EmpModel = { userFullName: this.item.employeeName };
//           emp.details = data.details;
//           this._evnService.diaryCriterionDetailListDialog(emp);
//         }
//       },
//       (error) => { console.error(); }
//     );
//   }

//   getReadOnlyFilter() {
//     const readonlyFilter: KpiReadOnlyFilter = { className: 'HrKpiAddOrEditComponent', kpiStatus: this.item.statusId };
//     return readonlyFilter;
//   }
// }

export class HrKpiAddOrEditComponent extends BaseKpiAddOrEditComponent {
  moduleName = 'HrKpiAddOrEditComponent';
  taskDisplayedColumns = ['STT', 'task', 'assignedDate', 'expectation', 'deadline', 'result'];
  criterionDisplayedColumns = ['STT', 'criterionTitle', 'maximumPoint', 'employeeEvaluatePoint', 'employeeEvaluateDate'
    , 'managerEvaluatePoint', 'managerEvaluateDate'];

  constructor(_dataService: KpiService, _route: ActivatedRoute, _router: Router, _dialogService: CommonDialogService,
    _evnService: EventService, _location: Location) {
    super(_dataService, _route, _router, _dialogService, _evnService, _location);
  }

  protected updateItem() {
    return this._dataService.updateKpiHRSendManager(this.item);
  }

  protected addTaskBuffer() {
  }

  // getDisplayTask() {
  //   return this.item.taskList;
  // }
}
