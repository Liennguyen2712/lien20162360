import { Injectable } from "@angular/core";
import { BaseDataService } from "src/app/services/base/base-data-service";
import { HttpClient } from "@angular/common/http";
import { AppConfig } from "../../config/app.config";
import { View_Statistics_Report_Filter } from "src/app/models/base/utilities";

@Injectable({
  providedIn: 'root'
})
export class ViewStatisticsReportsService  extends BaseDataService {

  searchUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.ViewStatisticsReports.search;
  orgsUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.ViewStatisticsReports.getOrgs;

  constructor(httpClient: HttpClient) {
      super(httpClient);
  }

  getOrgs() {
      return this.post(this.orgsUrl, '');
  }

  search(filter: View_Statistics_Report_Filter) {
      return this.post(this.searchUrl, filter);
  }
}