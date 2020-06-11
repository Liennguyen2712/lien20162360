import { Injectable } from '@angular/core';
import { BaseGridService } from '../base/base-grid-services';
import { Kpi, Kpi_CriterionType } from '../../models/data/data';
import { GridFilterModel, RespondData, KpiFilterModel, KpiReadOnlyFilter, Kpi_CriterionTypeFilterModel } from '../../models/base/utilities';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../config/app.config';
import { asEnumerable } from 'linq-es2015';
// import AsEnumerable, { asEnumerable } from 'linq-es2015';

@Injectable({
  providedIn: 'root'
})
export class Kpi_CriterionTypeService extends BaseGridService<Kpi_CriterionType, Kpi_CriterionTypeFilterModel> {

  getAllUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiCriterionTypeUrls.getAll;
  getUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiCriterionTypeUrls.get;
  pagingUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiCriterionTypeUrls.paging;
  addOrEditUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiCriterionTypeUrls.addOrEdit;
  deleteUrl: string;
  countUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiCriterionTypeUrls.count;
  getKpiCatalogsUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.kpiCriterionTypeUrls.getKpiCatalogs;

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  getKpiCatalogs() {
    return this.post(this.getKpiCatalogsUrl, {});
  }
}
