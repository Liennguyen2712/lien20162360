import { Injectable } from '@angular/core';
import { BaseGridService } from '../base/base-grid-services';
import { Kpi } from '../../models/data/data';
import { GridFilterModel, RespondData, KpiFilterModel, KpiReadOnlyFilter } from '../../models/base/utilities';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../config/app.config';
import { asEnumerable } from 'linq-es2015';
// import AsEnumerable, { asEnumerable } from 'linq-es2015';

@Injectable({
  providedIn: 'root'
})
export class KpiService extends BaseGridService<Kpi, KpiFilterModel> {
  getAllUrl: string;
  getUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiUrls.get;
  pagingUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiUrls.paging;
  addOrEditUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiUrls.addOrEdit;
  deleteUrl: string;
  countUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiUrls.count;
  private pagingMngUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiUrls.pagingMng;
  private pagingMngLv2Url = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiUrls.pagingMngLv2;
  private orgsUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiUrls.orgs;
  private updateKpiEmpUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiUrls.updateKpiEmp;
  private processKpiLevel2MngUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiUrls.processKpiLevel2Mng;
  private updateStatusUncompletedKpiUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiUrls.updateStatusUncompletedKpi;
  private updateKpiHRSendManagerUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiUrls.updateKpiHRSendManager;
  private updateKpiSendCorLeaderUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiUrls.updateKpiSendCorLeader;
  private updateKpiCompleteUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiUrls.updateKpiComplete;
  private updateKpiCompleteRangeUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiUrls.updateKpiCompleteRange;
  private countMngUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiUrls.countMng;
  private countMngLv2Url = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiUrls.countMngLv2;
  private updateHRUnlockKpiRangeUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiUrls.updateHRUnlockKpiRange;
  private updateVIPUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiUrls.updateVIP;
  private getDivisionManagerKpiPagingUrl = AppConfig.settings.apiServerUrl
    + AppConfig.settings.kpiUrls.getDivisionManagerKpiPaging;
  private countDivisionManagerKpiUrl = AppConfig.settings.apiServerUrl
    + AppConfig.settings.kpiUrls.countDivisionManager;
  private getIsKpiValidForDivManagerUrl = AppConfig.settings.apiServerUrl
    + AppConfig.settings.kpiUrls.getIsKpiValidForDivManager;
  private getOrgsByDivManagerUrl = AppConfig.settings.apiServerUrl
    + AppConfig.settings.kpiUrls.getOrgsByDivManager;
  private processRangeKpiLevel2MngUrl = AppConfig.settings.apiServerUrl
    + AppConfig.settings.kpiUrls.processRangeKpiLevel2Mng;
  private updateRangeKpiBusinessApplicationUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiUrls.updateRangeKpiBusinessApplication;
  private updateRangeKpiHRManagerProposeUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiUrls.updateRangeKpiHRManagerPropose;
  private countHrManagerKpiUrl = AppConfig.settings.apiServerUrl
    + AppConfig.settings.kpiUrls.countHrManagerKpi;
  private getHrManagerKpiPagingUrl = AppConfig.settings.apiServerUrl
    + AppConfig.settings.kpiUrls.getHrManagerKpiPaging;

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  getPagingMng(filter) {
    return this.post(this.pagingMngUrl, filter);
  }

  getPagingMngLv2(filter) {
    return this.post(this.pagingMngLv2Url, filter);
  }

  getOrgs() {
    return this.post(this.orgsUrl, '');
  }

  getOrgsByDivManager() {
    return this.post(this.getOrgsByDivManagerUrl, {});
  }

  updateKpiEmp(model: any) {
    return this.post(this.updateKpiEmpUrl, model);
  }

  processKpiLv2Mng(model: any) {
    return this.post(this.processKpiLevel2MngUrl, model);
  }

  updateStatusUncompletedKpi(yearMonth, orgIds): Promise<RespondData> {
    return this.post(this.updateStatusUncompletedKpiUrl, { yearMonth: yearMonth, orgIds: orgIds });
  }

  updateKpiHRSendManager(model: any): Promise<RespondData> {
    return this.post(this.updateKpiHRSendManagerUrl, model);
  }

  updateKpiSendCorLeader(model: any): Promise<RespondData> {
    return this.post(this.updateKpiSendCorLeaderUrl, model);
  }

  updateKpiComplete(model: any): Promise<RespondData> {
    return this.post(this.updateKpiCompleteUrl, model);
  }

  updateKpiCompleteRange(model: any): Promise<RespondData> {
    return this.post(this.updateKpiCompleteRangeUrl, model);
  }

  getReadOnlyStatus(obj: KpiReadOnlyFilter): boolean {
    if (obj == null) {
      return true;
    }

    switch (obj.className) {
      case 'KpiAddOrEditComponent':
      case 'ManagerKpiDetailComponent':
      case 'Mnglevel2KpiDetailComponent':
        return this.getKpiAddOrEditReadonlyStatus(obj);
      case 'HrKpiAddOrEditComponent':
        return this.getHRKpiAddOrEditReadonlyStatus(obj);
      case 'HrKpiCompleteDetailComponent':
        return this.getHRKpiCompleteDetailReadonlyStatus(obj);
      case 'HrManagerKpiAddOrEditComponent':
        return this.getHRManageKpiAoEReadonlyStatus(obj);
      default:
        return true;
    }
  }

  countMng(filter: any) {
    return this.post(this.countMngUrl, filter);
  }

  countMngLv2(filter: any) {
    return this.post(this.countMngLv2Url, filter);
  }

  updateHRUnlockKpiRange(model: any) {
    return this.post(this.updateHRUnlockKpiRangeUrl, model);
  }

  updateVIP(model: any) {
    return this.post(this.updateVIPUrl, model);
  }

  private getKpiAddOrEditReadonlyStatus(obj: KpiReadOnlyFilter): boolean {
    if (obj.kpiStatus == 1 || obj.kpiStatus == 2) { return false; }
    return true;
  }

  private getHRKpiAddOrEditReadonlyStatus(obj: KpiReadOnlyFilter): boolean {
    if (obj.kpiStatus == 3) {
      return false;
    }
    return true;
  }

  private getHRKpiCompleteDetailReadonlyStatus(obj: KpiReadOnlyFilter): boolean {
    if (obj.kpiStatus == 5) {
      return false;
    }
    return true;
  }

  private getHRManageKpiAoEReadonlyStatus(obj: KpiReadOnlyFilter): boolean {
    if (obj.kpiStatus == 4) {
      return false;
    }
    return true;
  }

  getDivisionManagerKpiPaging(filter: KpiFilterModel) {
    return this.post(this.getDivisionManagerKpiPagingUrl, filter);
  }

  countDivisionManagerKpi(filter: KpiFilterModel) {
    return this.post(this.countDivisionManagerKpiUrl, filter);
  }

  getIsKpiValidForDivManager(id: number) {
    return this.post(`${this.getIsKpiValidForDivManagerUrl}`, { orgId: id });
  }

  processRangeKpiLevel2Mng(model: any) {
    return this.post(this.processRangeKpiLevel2MngUrl, model);
  }

  updateRangeKpiBusinessApplication(model: any) {
    return this.post(this.updateRangeKpiBusinessApplicationUrl, model);
  }

  updateRangeKpiHRManagerPropose(model: any) {
    return this.post(this.updateRangeKpiHRManagerProposeUrl, model);
  }

  filterKpiSelectAll(module: string, kpiList: Kpi[]): Kpi[] {
    switch (module) {
      case 'Mnglevel2KpiListComponent':
        return kpiList.filter(x => x.statusId == 2);
      case 'HrKpiListComponent':
        return kpiList.filter(x => x.statusId == 3);
      case 'HrManagerKpiListComponent': 
        return kpiList.filter(x => x.statusId == 4);
      default:
        return kpiList;
    }
  }

  unSelectRow(selected: Kpi[], all: Kpi[]) {
    for (let index = 0; index < all.length; index++) {
      const el = all[index];
      const test = asEnumerable(selected).Any(x => x.id == el.id);
      if (!test) {
        el.uiIsSelected = false;
      }
    }
  }

  getHrManagerKpiPaging(filter: KpiFilterModel) {
    return this.post(this.getHrManagerKpiPagingUrl, filter);
  }

  countHrManagerKpi(filter: KpiFilterModel) {
    return this.post(this.countHrManagerKpiUrl, filter);
  }
}
