import { Injectable } from '@angular/core';
import { EmpTransfer } from 'src/app/models/data/data';
import { EmpTransferFilterModel } from 'src/app/models/base/utilities';
import { BaseGridService } from '../../base/base-grid-services';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class EmpTransferService extends BaseGridService<EmpTransfer, EmpTransferFilterModel> {

  pagingUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.empTransferUrls.paging;
  addOrEditUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.empTransferUrls.addOrEdit;
  deleteUrl: string;
  countUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.empTransferUrls.count;
  getAllUrl: string;
  getUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.empTransferUrls.get;
  orgsUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.userOrgUrls.getAllOrg;
  usersUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.userOrgUrls.getAllUser;
  jobTitlesUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.userOrgUrls.getAllJobTitle;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getUsers() {
    return this.post(this.usersUrl, '');
  }

  getJobTitles() {
    return this.post(this.jobTitlesUrl, '');
  }

  getOrgs() {
    return this.post(this.orgsUrl, '');
  }
}
