import { Injectable } from '@angular/core';
import { EmpTransfer, UserEmployment } from 'src/app/models/data/data';
import { EmpTransferFilterModel, UserEmploymentFilterModel } from 'src/app/models/base/utilities';
import { BaseGridService } from '../../base/base-grid-services';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class UserEmploymentService extends BaseGridService<UserEmployment, UserEmploymentFilterModel> {

  pagingUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.employmentHistoryUrls.paging;
  addOrEditUrl: string;
  deleteUrl: string;
  countUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.employmentHistoryUrls.count;
  getAllUrl: string;
  getUrl: string;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

}
