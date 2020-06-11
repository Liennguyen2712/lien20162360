import { Injectable } from '@angular/core';
import { BaseGridService } from '../base/base-grid-services';
import { Kpi,  ViewUserEventDiary } from '../../models/data/data';
import {  RespondData,  ViewUserEventDiaryFilterModel } from '../../models/base/utilities';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../config/app.config';


@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseGridService<ViewUserEventDiary, ViewUserEventDiaryFilterModel> {

  getAllUrl: string;
  getUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.viewUserEventDiary.get;
  pagingUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.viewUserEventDiary.paging;
  addOrEditUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.viewUserEventDiary.addOrEdit;
  deleteUrl: string;
  countUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.viewUserEventDiary.count;
  private getUsersUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.userUrls.getUsers;
  
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  get(id: number): Promise<RespondData> {
     return this.post(`this.getUrl/${id}`, {});    
  }

  getPaging(filter: any): Promise<RespondData> {
     return this.post(this.pagingUrl, filter);
    //const result: RespondData = { isSuccess: true, data: testData };
    //return new Promise((rs, rj) => { rs(result); })
  }

  count(filter: any): Promise<RespondData> {
     return this.post(this.countUrl, filter);
    //return new Promise((rs, rj) => { return 13; })
  }

  getUsers(): Promise<RespondData> {
    console.log(this.getUsersUrl);
    return this.post(this.getUsersUrl, {});
  }
}
