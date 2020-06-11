import { Injectable } from "@angular/core";
import { BaseDataService } from "src/app/services/base/base-data-service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppConfig } from "../../config/app.config";
import { UserOrg, DivMngPerUser } from "src/app/models/data/data";
import { UserOrgFilterModel, RespondData } from "src/app/models/base/utilities";
import { BaseGridService } from "../../base/base-grid-services";

import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserOrgService extends BaseGridService<UserOrg, UserOrgFilterModel> {

    private rootUrl = AppConfig.settings.apiServerUrl;
    getAllUrl: string;
    getUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.userOrgUrls.get;
    getByNameUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.userOrgUrls.getbyname;

    pagingUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.userOrgUrls.paging;
    addOrEditUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.userOrgUrls.addOrEdit;
    deleteUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.userOrgUrls.deleteUser;
    countUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.userOrgUrls.count;
    orgsUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.userOrgUrls.orgs;
    usersUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.userOrgUrls.users;
    jobTitlesUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.userOrgUrls.jobTitles;
    private getEDUsersByOrgUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.userOrgUrls.getEDUsersByOrg;
    private getOrgByUserUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.userOrgUrls.getOrgByUser;
    private getEDUsersByEventUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.userOrgUrls.getEDUsersByEvent;
    private getOrgByCurrentLv2MngUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.userOrgUrls.getOrgsByCurrentLevel2Manager;
    private getOrgByCurrentLv1MngUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.userOrgUrls.getOrgsByCurrentLevel1Manager;
    private getLevel1ManagerUserOrgUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.userOrgUrls.getLevel1ManagerUserOrg;
    private getLevel2ManagerUserOrgUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.userOrgUrls.getLevel2ManagerUserOrg;
    private countDivisionManagerUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.userOrgUrls.countDivisionManager;
    private searchPagingDivisionManagerUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.userOrgUrls.searchPagingDivisionManager;
    private getDivisionManagerPermissionUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.userOrgUrls.getDivisionManagerPermission;
    private saveDivisionManagerPermissionUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.userOrgUrls.saveDivisionManagerPermission;
    private validateVipUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.userOrgUrls.isVip;

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    getEDUsersByOrg(orgId: number) {
        return this.post(this.getEDUsersByOrgUrl, { orgId: orgId });
    }

    getOrgs() {
        return this.post(this.orgsUrl, '');
    }

    getUsers() {
        return this.post(this.usersUrl, '');
    }
    getJobTitles() {
        return this.post(this.jobTitlesUrl, '');
    }

    getByName(name: string) {
        const data = { userName: name };
        return this.post(this.getByNameUrl, data);
    }

    getOrgByUser() {
        return this.post(this.getOrgByUserUrl, {});
    }

    getOrgByCurrentLv2Mng() {
        return this.post(this.getOrgByCurrentLv2MngUrl, {});
    }

    getOrgByCurrentLv1Mng() {
        return this.post(this.getOrgByCurrentLv1MngUrl, {});
    }

    getEDUserByEvent(eventId) {
        return this.post(this.getEDUsersByEventUrl, { eventDiaryId: eventId });
    }

    getOrgsEx() {
        return this.httpClient.post<any>(`${this.orgsUrl}`, {})
            .pipe(map(ret => {
                return ret;
            }));
    }

    getLevel1ManagerUserOrg() {
        console.log(this.getLevel1ManagerUserOrgUrl);
        return this.post(this.getLevel1ManagerUserOrgUrl, {});
    }

    getLevel2ManagerUserOrg() {
        console.log(this.getLevel2ManagerUserOrgUrl);
        return this.post(this.getLevel2ManagerUserOrgUrl, {});
    }

    RemoveUser(userName: string) {
        return this.post(this.deleteUrl, { userName: userName });
    }

    countDivisionManager(filter: UserOrgFilterModel) {
        return this.post(this.countDivisionManagerUrl, filter);
    }

    searchPagingDivisionManager(filter: UserOrgFilterModel) {
        return this.post(this.searchPagingDivisionManagerUrl, filter);
    }

    getDivisionManagerPermission(id: number) {
        return this.post(`${this.getDivisionManagerPermissionUrl}/${id}`, {});
    }

    saveDivisionManagerPermission(model: DivMngPerUser) {
        return this.post(`${this.saveDivisionManagerPermissionUrl}`, model);
    }

    validateVip(): Promise<RespondData> {
        return this.post(this.validateVipUrl, {});
    }
}