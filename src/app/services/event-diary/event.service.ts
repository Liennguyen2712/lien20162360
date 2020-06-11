import { HttpClient } from "@angular/common/http";
import { Injectable, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material";
import { AddDiaryDialogComponent } from "src/app/modules/share/dialogs/add-diary-dialog/add-diary-dialog.component";
import { BaseGridService } from "src/app/services/base/base-grid-services";
import { GridFilterModel, RespondData } from "../../models/base/utilities";
import { EventDiaryModel, DiaryCriterionDetail, EmpModel } from "../../models/data/data";
import { AppConfig } from "../config/app.config";
import { UserDiaryDetailsComponent } from "src/app/modules/share/dialogs/user-diary/user-diary-details/user-diary-details.component";
import { asEnumerable } from "linq-es2015";

@Injectable({
    providedIn: 'root'
})
export class EventService extends BaseGridService<EventDiaryModel, GridFilterModel>{

    pagingUrl: string;
    addOrEditUrl: string;
    deleteUrl: string;
    countUrl: string;
    getAllUrl: string;
    getUrl: string;
    private getEvByManagerUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.eventDiaryUrls.getEvByManager;
    private getEvByManagerLv2Url = AppConfig.settings.apiServerUrl + AppConfig.settings.eventDiaryUrls.getEvByManagerLv2;
    private getEventByKpiManagerUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.eventDiaryUrls.getEventByKpiManager;
    private getEvByEmpUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.eventDiaryUrls.getEvByEmp;
    private getEvByKpiIdUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.eventDiaryUrls.getEvByKpiId;
    private getLevel1UserByLevel2ManagerUrl = AppConfig.settings.apiServerUrl
        + AppConfig.settings.eventDiaryUrls.getLevel1UserByLevel2Manager;
    private getPagingExistedEventDiaryByYearMonthUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.eventDiaryUrls.getPagingExistedEventDiaryByYearMonth;
    private getPagingMissingEventDiaryByYearMonthUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.eventDiaryUrls.getPagingMissingEventDiaryByYearMonth;
    private getMonthlyEventDiaryByHRManagerUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.eventDiaryUrls.getMonthlyEventDiaryByHRManager;
    private getUsersUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.eventDiaryUrls.getUsers;
    private getEventByDivManagerUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.eventDiaryUrls.getEventByDivManager;
    private addRangeDiaryKpiUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.eventDiaryUrls.addRangeDiaryKpi;
    private updateRangeDiaryKpiConfigChangedUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.eventDiaryUrls.updateRangeDiaryKpiConfigChanged;

    onDeleteEvent = new EventEmitter();

    constructor(protected httpClient: HttpClient, public dialog: MatDialog) {
        super(httpClient);
    }

    async getEventByManager(yearMonth: any, orgId: number): Promise<RespondData> {
        return this.post(this.getEvByManagerUrl, { yearMonth: yearMonth, orgId: orgId });
    }

    // Lấy các event thuộc quyền quản lý level 2, về mặt dữ liệu vẫn lấy = query level 1 của các manager cấp dưới của quản lý lv 2
    getEventByManagerLv2(yearMonth: any, orgId: number, mngUserName: string) {
        return this.post(this.getEvByManagerLv2Url, { yearMonth: yearMonth, orgId: orgId, mngUserName: mngUserName });
    }

    getUsers(): Promise<any> {
        return this.post(this.getUsersUrl, {});
    }

    getEventByKpiManager(yearMonth: any, orgId: number, mngUserName: string, employeeName: string) {
        return this.post(this.getEventByKpiManagerUrl, {
            yearMonth: yearMonth, orgId: orgId, mngUserName: mngUserName
            , employeeName: employeeName
        });
    }

    getEventByDivManager(yearMonth: any, orgId: number, mngUserName: string, employeeName: string) {
        return this.post(this.getEventByDivManagerUrl, {
            yearMonth: yearMonth, orgId: orgId, mngUserName: mngUserName
            , employeeName: employeeName
        });
    }

    getMonthlyEventDiaryByHRManager(yearMonth: any, orgId: number, level1MngUserName: string, employeeName: string) {
        return this.post(this.getMonthlyEventDiaryByHRManagerUrl, {
            yearMonth: yearMonth, orgId: orgId, mngUserName: level1MngUserName
            , employeeName: employeeName
        });
    }

    getLevel1UserByLevel2Manager(orgId): Promise<RespondData> {
        return this.post(this.getLevel1UserByLevel2ManagerUrl, { orgId: orgId });
    }

    async getEventByEmp(yearMonth: any, orgId: number): Promise<RespondData> {
        return this.post(this.getEvByEmpUrl, { yearMonth: yearMonth, orgId: orgId });
    }

    async getEventByKpiId(kpiId: number): Promise<RespondData> {
        return this.post(this.getEvByKpiIdUrl, { kpiId: kpiId });
    }

    async addDiary(emp, editedDate, diary): Promise<boolean> {

        const dialogRef = this.dialog.open(AddDiaryDialogComponent, {
            width: '689px',
            data: { emp: emp, date: editedDate, eventDiary: diary }
        })

        return dialogRef.afterClosed().toPromise();
    }

    async diaryCriterionDetailListDialog(emp): Promise<void> {
        const dialogRef = this.dialog.open(UserDiaryDetailsComponent, {
            width: '986px',
            data: emp
        });

        const sub = dialogRef.componentInstance.onDeleteEvent.subscribe((data) => {
            // do something
            this.onDeleteEvent.emit(data);
        });

        return dialogRef.afterClosed().toPromise();
    }

    getCommentFromModel(details: DiaryCriterionDetail[], username: string) {
        const comments = asEnumerable(details).Where(x => x.userName == username).Select(x => x.comment != null ? x.comment : '').ToArray();
        let comment = '';
        for (let i = 0; i < comments.length; i++) {
            const el = comments[i];
            comment = comment + ' ' + el;
        }
        return comment;
    }

    isReadonlyDiary(currentEmp: EmpModel, cmpName: string): boolean {
        switch (cmpName) {
            case 'HrEventDiaryComponent':
                return this.getHRKpiIsReadonlyDiary(currentEmp);
            case 'HrManagerEventDiaryComponent':
                return this.getHRManagerIsReadonlyDiary(currentEmp);
            default:
                return this.getDefaultIsReadonlyDiary(currentEmp);
        }
    }

    getPagingExistedEventDiaryByYearMonth(filter) {
        return this.post(this.getPagingExistedEventDiaryByYearMonthUrl, filter);
    }

    getPagingMissingEventDiaryByYearMonth(filter) {
        return this.post(this.getPagingMissingEventDiaryByYearMonthUrl, filter);
    }

    updateRangeDiaryKpiConfigChanged(model): Promise<RespondData> {
        return this.post(this.updateRangeDiaryKpiConfigChangedUrl, model);
    }

    addRangeDiaryKpi(model): Promise<RespondData> {
        return this.post(this.addRangeDiaryKpiUrl, model);
    }

    private getDefaultIsReadonlyDiary(currentEmp: EmpModel) {
        if (currentEmp.currentKpiStatusId == 1 || currentEmp.currentKpiStatusId == 2) {
            return false;
        }
        return true;
    }

    private getHRKpiIsReadonlyDiary(currentEmp: EmpModel) {
        if (currentEmp.currentKpiStatusId == 3) {
            return false;
        }
        return true;
    }

    private getHRManagerIsReadonlyDiary(currentEmp: EmpModel) {
        if (currentEmp.currentKpiStatusId == 4) {
            return false;
        }
        return true;
    }
}