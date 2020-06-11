import { Injectable } from '@angular/core';
import { BaseGridService } from '../base/base-grid-services';
import { Kpi, ViewUserEventDiary } from '../../models/data/data';
import { RespondData, ViewUserEventDiaryFilterModel } from '../../models/base/utilities';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../config/app.config';


@Injectable({
  providedIn: 'root'
})
export class OrgService extends BaseGridService<ViewUserEventDiary, ViewUserEventDiaryFilterModel> {

  getAllUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.orgUrls.getAll;
  getUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.orgUrls.get;
  pagingUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.orgUrls.paging;
  addOrEditUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.orgUrls.addOrEdit;
  deleteUrl: string;
  countUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.orgUrls.count;

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
}
