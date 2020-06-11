import { Injectable } from "@angular/core";
import { BaseDataService } from "../base/base-data-service";
import { HttpClient } from "@angular/common/http";
import { CriterionCatalog } from "src/app/models/data/data";
import asEnumerable, { IEnumerable } from "linq-es2015";
import { AppConfig } from "../config/app.config";
import { RespondData, CriterionCatalogFilterModel } from "../../models/base/utilities";
import { BaseGridService } from "../base/base-grid-services";

@Injectable({
    providedIn: 'root'
})
export class CriterionCatalogService extends BaseGridService<CriterionCatalog, CriterionCatalogFilterModel> {
    private getCriterionCatalogUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.criterionCatalogUrls.getCriterionCatalog;

    getAllUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.criterionCatalogUrls.getAll;
    getUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.criterionCatalogUrls.get;
    pagingUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.criterionCatalogUrls.paging;
    addOrEditUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.criterionCatalogUrls.addOrEdit;
    deleteUrl: string;
    countUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.criterionCatalogUrls.count;

    catalogs: CriterionCatalog[] = [
        { id: 1, code: 'A', criterionTitle: 'Lỗi to A', minimumPoint: -10, maximumPoint: 40, isFolder: true, criterionLevel: 1 },
        { id: 2, code: 'A1', criterionTitle: 'Lỗi nhỏ A1', minimumPoint: -10, maximumPoint: 10, isFolder: true, criterionLevel: 2, parentId: 2 },
        { id: 3, code: 'A2', criterionTitle: 'Lỗi nhỏ A2', minimumPoint: -9, maximumPoint: 9, isFolder: true, criterionLevel: 2, parentId: 2 },
        { id: 4, code: 'A3', criterionTitle: 'Lỗi nhỏ A3', minimumPoint: -8, maximumPoint: 8, isFolder: true, criterionLevel: 2, parentId: 2 },
        { id: 5, code: 'A4', criterionTitle: 'Lỗi nhỏ A4', minimumPoint: -6, maximumPoint: 6, isFolder: true, criterionLevel: 2, parentId: 2 },
        { id: 6, code: 'A5', criterionTitle: 'Lỗi nhỏ A5', minimumPoint: -5, maximumPoint: 5, isFolder: true, criterionLevel: 2, parentId: 2 },
    ];

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    getCriterionCatalog(): Promise<RespondData> {
        // return asEnumerable(this.catalogs).Where(x => x.criterionLevel == 2).ToArray();
        return this.post(this.getCriterionCatalogUrl, {});
    }

}
