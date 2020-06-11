import { Injectable } from "@angular/core";
import { BaseDataService } from "src/app/services/base/base-data-service";
import { HttpClient } from "@angular/common/http";
import { UnlockdiarycriterionFilter } from "src/app/models/base/utilities";
import { AppConfig } from "../config/app.config";


@Injectable({
  providedIn: 'root'
})
export class UnlockdiarycriterionService  extends BaseDataService {

  searchUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.UnlockdiarycriterionUrls.search;
  orgsUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.UnlockdiarycriterionUrls.getOrgs;

  constructor(httpClient: HttpClient) {
      super(httpClient);
  }

  getOrgs() {
      return this.post(this.orgsUrl, '');
  }

  search(filter: UnlockdiarycriterionFilter) {
      return this.post(this.searchUrl, filter);
  }
}