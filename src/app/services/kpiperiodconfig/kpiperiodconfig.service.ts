import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppConfig } from "../config/app.config";
import { BaseGridService } from "../base/base-grid-services";
import { KpiPeriodConfig } from "src/app/models/data/data";
import { KpiPeriodConfigFilterModel, RespondData, UpdateKpiDialogModel } from "src/app/models/base/utilities";

@Injectable({
  providedIn: 'root'
})
export class KpiPeriodConfigService extends BaseGridService<KpiPeriodConfig, KpiPeriodConfigFilterModel> {


  getAllUrl: string;
  getUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiPeriodConfigUrls.get;
  pagingUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiPeriodConfigUrls.paging;
  addOrEditUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiPeriodConfigUrls.addOrEdit;
  deleteUrl: string;
  countUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiPeriodConfigUrls.count;
  updateKPIByYearMonthEventUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiPeriodConfigUrls.updateKPIByYearMonthEvent;


  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }


  get(id: number): Promise<RespondData> {
    return this.post(this.getUrl + '/' + id, {});

  }

  getPaging(filter: any): Promise<RespondData> {
    return this.post(this.pagingUrl, filter);

  }

  count(filter: any): Promise<RespondData> {
    return this.post(this.countUrl, filter);

  }

  updateKPIByYearMonthEvent(data: UpdateKpiDialogModel) {
    return this.post(this.updateKPIByYearMonthEventUrl, data);
  }
}
