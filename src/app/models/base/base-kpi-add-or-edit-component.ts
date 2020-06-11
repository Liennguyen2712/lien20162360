import { Component, ViewChild, OnInit } from '@angular/core';
import { BaseAddOrEditComponent } from 'src/app/models/base/base-aoe-component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTable } from '@angular/material';
import asEnumerable from 'linq-es2015';
import { EventService } from 'src/app/services/event-diary/event.service';
import { KpiService } from '../../services/kpi/kpi.service';
import { CommonDialogService } from '../../services/utilities/dialog/dialog.service';
import { RespondData, KpiReadOnlyFilter, KpiFilterModel } from './utilities';
import { KpiTask, KpiCriterionDetail, EventDiaryModel, EmpModel, Kpi } from '../data/data';
import { Location } from '@angular/common';
import { ExcelKpiEvaluationOption, ExcelKpiEvaluationService, ExcelKpiEvaluationFilter } from 'src/app/services/excel/excel-kpi-evaluation.service';

export abstract class BaseKpiAddOrEditComponent extends BaseAddOrEditComponent<Kpi, KpiFilterModel, KpiService> implements OnInit {
  @ViewChild('taskTbl') _taskTbl: MatTable<any>;
  taskDisplayedColumns = ['STT', 'task', 'assignedDate', 'expectation', 'deadline', 'result', 'actions'];
  criterionDisplayedColumns = ['STT', 'criterionTitle', 'maximumPoint', 'employeeEvaluatePoint', 'employeeEvaluateDate',
    'managerEvaluatePoint', 'managerEvaluateDate'];
  abstract moduleName: string;
  filter: ExcelKpiEvaluationFilter;

  criterionDetails: KpiCriterionDetail[];

  constructor(_dataService: KpiService, _route: ActivatedRoute, _router: Router, _dialogService: CommonDialogService,
    private _evnService: EventService, private _location: Location) {
    super(_dataService, _route, _router, _dialogService);
  }

  async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this.initialize();
  }

  validateData(input: Kpi): RespondData {
    const result: RespondData = { isSuccess: true, message: '' };
    return result;
  }

  async deleteTask(i) {
    const isConfirm = await this._dialogService.confirm('Bạn chắc chắn xóa bản ghi này?');

    if (!isConfirm) {
      return;
    }

    const task = this.item.taskList[i];
    if (task.id == null || task.id == 0) {
      this.item.taskList.splice(i, 1);
    } else {
      task.isUIDeleted = true;
    }
    this.reloadTaskTbl();
  }

  addTask() {
    const currentTaskBuffer = this.item.taskList[this.item.taskList.length - 1];
    currentTaskBuffer.isUIBuffer = false;

    if (this.isEmptyTask(currentTaskBuffer)) {
      return;
    }

    this.addTaskBuffer();
    this.reloadTaskTbl();
  }

  getDisplayTask() {
    const rs = asEnumerable(this.item.taskList).Where(x => (x.isUIDeleted != null && !x.isUIDeleted) || x.id == 0 || x.id == null).ToArray();
    return rs;
  }

  isEmptyTask(task: KpiTask) {
    return (task == null || task.task == null || task.task.trim() == '');
  }

  isNotBufferTaskItem(index: number) {
    return index < this.getDisplayTask().length - 1;
  }

  protected addTaskBuffer() {
    if (this.isReadOnly) {
      return;
    }
    const taskBuffered: KpiTask = { taskIndex: this.item.taskList.length + 1, isUIBuffer: true };
    this.item.taskList.push(taskBuffered);
  }

  protected reloadTaskTbl() {
    this._taskTbl.renderRows();
  }

  protected initialize() {
    this.getCriterionDetails();
    this.createCriterionAggregateRow();

    // mark no buffer
    for (let i = 0; i < this.item.taskList.length; i++) {
      const el = this.item.taskList[i];
      el.isUIBuffer = false;
    }

    this.addTaskBuffer();
    this.calCriterionAggregateRow();

  }

  protected getCriterionDetails() {
    if (this.item.kpiCriterionDetailList) {
      this.criterionDetails = this.item.kpiCriterionDetailList;
    } else {
    }
  }

  protected createCriterionAggregateRow() {
    const agrRow1: KpiCriterionDetail = { criterionTitle: 'TỔNG ĐIỂM KPI', employeeEvaluatePoint: 0, managerEvaluatePoint: 0, aggregateRow: 1 };
    const agrRow2: KpiCriterionDetail = { criterionTitle: 'XẾP LOẠI', employeeEvaluatePointChar: 'A', managerEvaluatePointChar: 'A', aggregateRow: 2 };
    this.criterionDetails.push(agrRow1);
    this.criterionDetails.push(agrRow2);
  }

  protected calCriterionAggregateRow(el: KpiCriterionDetail = null) {
    this.item.empKpiPoint = asEnumerable(this.criterionDetails).Where(x => x.aggregateRow != 1 && x.aggregateRow != 2).Sum(x => x.employeeEvaluatePoint != null ? x.employeeEvaluatePoint : 0);
    this.item.level1ManagerKpiPoint = asEnumerable(this.criterionDetails).Where(x => x.aggregateRow != 1 && x.aggregateRow != 2).Sum(x => x.managerEvaluatePoint != null ? x.managerEvaluatePoint : 0);
    this.item.empKpiClassification = this.calKpiClassification(this.item.empKpiPoint);
    this.item.level1ManagerKpiClassification = this.calKpiClassification(this.item.level1ManagerKpiPoint);    

    if (el != null) {
      el.employeeLastUpdatedDate = new Date();
    }
  }

  protected calKpiClassification(kpiPoint: number): string {
    if (kpiPoint >= 105) {
      return 'A+';
    } else if (kpiPoint >= 95) {
      return 'A';
    } else if (kpiPoint >= 85) {
      return 'A-';
    } else if (kpiPoint >= 75) {
      return 'B+';
    } else if (kpiPoint >= 66) {
      return 'B';
    } else if (kpiPoint >= 60) {
      return 'B-';
    } else {
      return 'C';
    }
  }

  fetchData() {
    // remove buffer
    this.item.taskList.splice(this.item.taskList.length - 1, 1);
    this.item.kpiCriterionDetailList.splice(this.item.kpiCriterionDetailList.length - 2, 2);
  }

  goBack() {
    this._location.back();
  }

  protected updateItem() {
    return this._dataService.updateKpiEmp(this.item);
  }

  async save() {
    await this.addOrEdit();
  }

  validate(item: Kpi): RespondData {
    const rs: RespondData = {};
    if (item.taskList == null || item.taskList.length == 0) {
      rs.isSuccess = true;
      return rs;
    }

    const isNotValid = asEnumerable(item.taskList).Any(x => (x.expectation == null || x.expectation.trim() == '') || (x.assignedDate == null) || (x.task == null || x.task.trim() == ''));

    if (isNotValid) {
      rs.isSuccess = false;
      rs.message = ' Phải nhập đầy đủ danh mục công việc, ngày giao việc và kết quả đầu ra yêu cầu';
      return rs;
    }

    rs.isSuccess = true;
    return rs;
  }

  async addOrEdit() {
    const tmpTaskList = this.item.taskList.filter(t => t.task);

    if (this.moduleName === 'Mnglevel2KpiDetailComponent') {
      if (!tmpTaskList || tmpTaskList.length === 0) {
        this._dialogService.alert('Phải nhập tối thiểu một công việc');
        return;
      }
      for (let i = 0; i < tmpTaskList.length; i++) {
        const element = tmpTaskList[i];
        if (!element.result) {
          this._dialogService.alert('Phải nhập tình trạng, kết quả thực hiện công việc');
          return;
        } else {
          if (element.result.trim() === '') {
            this._dialogService.alert('Phải nhập tình trạng, kết quả thực hiện công việc');
            return;
          }
        }
      }
    }

    this.item.taskList = tmpTaskList;

    const isValid = this.validate(this.item);
    if (!isValid.isSuccess) {
      await this._dialogService.alert(isValid.message);
      this.addTaskBuffer();
      return;
    }

    const data = await this.updateItem();

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

  getReadOnlyFilter() {
    const readonlyFilter: KpiReadOnlyFilter = { className: this.moduleName, kpiStatus: this.item.statusId };
    return readonlyFilter;
  }

  viewEventDiary() {
    // lay danh sach SKPS
    this._evnService.getEventByKpiId(this.item.id).then(
      (result) => {
        const data = result.data as EventDiaryModel;
        console.log(data);
        if (data) {
          const emp: EmpModel = { userFullName: this.item.employeeName };
          emp.details = data.details;
          this._evnService.diaryCriterionDetailListDialog(emp);
        }
      },
      (error) => { console.error(); }
    );
  }

  exportExcel() {
    const data = [];

    const excelOptions: ExcelKpiEvaluationOption = {
      data: data, filter: this.filter,
      headers: []
    };

    const excelService: ExcelKpiEvaluationService = new ExcelKpiEvaluationService(excelOptions, 'KPI-' + this.item.yearMonth);
    excelService.empName = this.item.employeeName;
    excelService.empJobTitle = this.item.employeeJobTitle;
    excelService.level1ManagerName = this.item.level1ManagerFullName;
    excelService.level1ManagerJobTitle = this.item.level1ManagerJobTitle;
    excelService.year = this.item.yearMonth.toString().substr(0, 4);
    excelService.month = this.item.yearMonth.toString().substr(4);
    excelService.orgName = this.item.organization;
    excelService.data = this.item;
    excelService.criterionDetails = this.criterionDetails;
    excelService.level2ManagerName = this.item.level2ManagerFullName;
    excelService.kpiType = '(' + this.item.criterionTypeName + ')';
    excelService.exportExcel();
  }
}
