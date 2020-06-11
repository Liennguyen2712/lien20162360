import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseAddOrEditComponent } from 'src/app/models/base/base-aoe-component';
import { KpiFilterModel, RespondData, KpiReadOnlyFilter } from '../../../../models/base/utilities';
import { Kpi, KpiTask, CriterionCatalog, KpiCriterionDetail, EmpModel, EventDiaryModel } from '../../../../models/data/data';
import { KpiService } from '../../../../services/kpi/kpi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDialogService } from '../../../../services/utilities/dialog/dialog.service';
import { MatTable } from '@angular/material';
import asEnumerable from 'linq-es2015';
import { EventService } from 'src/app/services/event-diary/event.service';
import { BaseKpiAddOrEditComponent } from 'src/app/models/base/base-kpi-add-or-edit-component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mnglevel2-kpi-detail',
  templateUrl: './mnglevel2-kpi-detail.component.html',
  styleUrls: ['./mnglevel2-kpi-detail.component.css']
})
// export class Mnglevel2KpiDetailComponent  extends BaseAddOrEditComponent<Kpi, KpiFilterModel, KpiService> implements OnInit {

//   @ViewChild('taskTbl') _taskTbl: MatTable<any>;
//   taskDisplayedColumns = ['STT', 'task', 'assignedDate', 'expectation', 'deadline', 'result'];
//   criterionDisplayedColumns = ['STT', 'criterionTitle', 'maximumPoint', 'employeeEvaluatePoint', 'employeeEvaluateDate', 
//     'managerEvaluatePoint', 'managerEvaluateDate'];

//   criterionDetails: KpiCriterionDetail[];

//   constructor(_dataService: KpiService, _route: ActivatedRoute, _router: Router, _dialogService: CommonDialogService
//     ,private _evnService: EventService) {
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
//     console.log(task);
//     if (task) {
//       this.item.taskList.splice(i, 1);
//     }
//     this.reloadTaskTbl();
//   }

//   addTask() {
//     const currentTaskBuffer = this.item.taskList[this.item.taskList.length - 1];

//     if (this.isEmptyTask(currentTaskBuffer)) {
//       return;
//     }

//     this.addTaskBuffer();
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

//   fetchData() {
//     // remove buffer
//     this.item.taskList.splice(this.item.taskList.length - 1, 1);
//     this.item.kpiCriterionDetailList.splice(this.item.kpiCriterionDetailList.length - 2, 2);
//   }

//   private addTaskBuffer() {
//     const taskBuffered: KpiTask = { taskIndex: this.item.taskList.length + 1 };
//     this.item.taskList.push(taskBuffered);
//   }

//   private reloadTaskTbl() {
//     this._taskTbl.renderRows();
//   }

//   private initialize() {
//     this.getCriterionDetails();
//     this.createCriterionAggregateRow();
//     this.addTaskBuffer();
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

//   async addOrEdit() {
//     const tmpTaskList = this.item.taskList.filter(t => t.task);  
//     this.item.taskList = tmpTaskList;
//     this._dataService.processKpiLv2Mng(this.item).then(
//       (data) => {
//         if (data.isSuccess === true) {
//           this._dialogService.alert('Lưu thành công.');
//         }
//         console.log(data);
//       }
//       , (error) => { console.log(error); }
//     );
//   }

//   getReadOnlyFilter() {
//     const readonlyFilter : KpiReadOnlyFilter = { className : 'Mnglevel2KpiDetailComponent', kpiStatus : this.item.statusId};
//     return readonlyFilter;
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
// }

export class Mnglevel2KpiDetailComponent extends BaseKpiAddOrEditComponent {
  moduleName = 'Mnglevel2KpiDetailComponent';
  taskDisplayedColumns = ['STT', 'task', 'assignedDate', 'expectation', 'deadline', 'result'];
  criterionDisplayedColumns = ['STT', 'criterionTitle', 'maximumPoint', 'employeeEvaluatePoint', 'employeeEvaluateDate',
    'managerEvaluatePoint', 'managerEvaluateDate'];

  constructor(_dataService: KpiService, _route: ActivatedRoute, _router: Router, _dialogService: CommonDialogService,
    _evnService: EventService, _location: Location) {
    super(_dataService, _route, _router, _dialogService, _evnService, _location);
  }

  protected updateItem() {
    return this._dataService.processKpiLv2Mng(this.item);
  }
  
  // getDisplayTask() {
  //   return this.item.taskList;
  // }
}

