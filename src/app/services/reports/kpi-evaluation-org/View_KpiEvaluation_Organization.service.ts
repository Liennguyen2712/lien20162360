import { Injectable } from "@angular/core";
import { BaseDataService } from "src/app/services/base/base-data-service";
import { HttpClient } from "@angular/common/http";
import { AppConfig } from "../../config/app.config";
import { View_KpiEvaluation_Organization } from "src/app/models/data/data";
import { BaseGridService } from "../../base/base-grid-services";
import { View_KpiEvaluation_Organization_Filter } from "src/app/models/base/utilities";

@Injectable({
    providedIn: 'root'
})
export class View_KpiEvaluation_Organization_Service extends BaseDataService {

    searchUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.View_KpiEvaluation_OrganizationUrls.search;
    orgsUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.View_KpiEvaluation_OrganizationUrls.getOrgs;

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    getOrgs() {
        return this.post(this.orgsUrl, '');
    }

    search(filter: View_KpiEvaluation_Organization_Filter) {
        return this.post(this.searchUrl, filter);
    }
}