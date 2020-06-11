import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseDataService } from "src/app/services/base/base-data-service";
import { AppConfig } from "../config/app.config";
import { DiaryCriterionDetail, EmpModel } from "src/app/models/data/data";
import { RespondData } from "../../models/base/utilities";

@Injectable({
    providedIn: 'root'
})
export class DiaryCriterionDetailService extends BaseDataService {

    private addOrEditUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.diaryCriterionDetailUrls.addOrEdit;
    private removeByManagerLv2Url = AppConfig.settings.apiServerUrl + AppConfig.settings.diaryCriterionDetailUrls.removeByManagerLv2;

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    public addOrEdit(detail: DiaryCriterionDetail): Promise<RespondData> {
        return this.post(this.addOrEditUrl, detail);
    }

    public removeByManagerLv2(detail: DiaryCriterionDetail): Promise<RespondData> {
        return this.post(this.removeByManagerLv2Url, detail);
    }
}
