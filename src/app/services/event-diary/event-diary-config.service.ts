import { BaseDataService } from "src/app/services/base/base-data-service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RespondData, EventDiarySyncConfigModel } from "src/app/models/base/utilities";
import { AppConfig } from "../config/app.config";
import { BaseGridService } from "src/app/services/base/base-grid-services";
import { EventDiaryConfig } from "src/app/models/data/data";

@Injectable({
    providedIn: 'root'
})
export class EventDiaryConfigService extends BaseDataService {
    private getConfigOrgByLevel1ManagerUrl = AppConfig.settings.apiServerUrl
        + AppConfig.settings.eventDiaryConfigUrls.getConfigOrgByLevel1Manager;
    private getConfigOrgByLevel2ManagerUrl = AppConfig.settings.apiServerUrl
        + AppConfig.settings.eventDiaryConfigUrls.getConfigOrgByLevel2Manager;
    private getConfigOrgByKpiManagerUrl = AppConfig.settings.apiServerUrl
        + AppConfig.settings.eventDiaryConfigUrls.getConfigOrgByKpiManager;
    private getConfigOrgByDivManagerUrl = AppConfig.settings.apiServerUrl
        + AppConfig.settings.eventDiaryConfigUrls.getConfigOrgByDivManager;


    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    getConfigOrgByLevel1Manager(): Promise<RespondData> {
        return this.post(this.getConfigOrgByLevel1ManagerUrl, {});
    }

    getConfigOrgByLevel2Manager(): Promise<RespondData> {
        return this.post(this.getConfigOrgByLevel2ManagerUrl, {});
    }

    getConfigOrgByKpiManager(): Promise<RespondData> {
        return this.post(this.getConfigOrgByKpiManagerUrl, {});
    }

    getConfigOrgByDivManager(): Promise<RespondData> {
        return this.post(this.getConfigOrgByDivManagerUrl, {});
    }
}
