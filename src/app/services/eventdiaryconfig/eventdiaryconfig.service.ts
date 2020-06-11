import { Injectable } from "@angular/core";
import { BaseDataService } from "src/app/services/base/base-data-service";
import { HttpClient } from "@angular/common/http";
import { AppConfig } from "../config/app.config";
import { BaseGridService } from "../base/base-grid-services";
import { ViewEventDiaryConfig } from "src/app/models/data/data";
import { ViewEventDiaryConfigFilterModel, RespondData } from "src/app/models/base/utilities";
import { UpdateKpiDialogComponent } from "src/app/modules/share/dialogs/update-kpi-dialog/update-kpi-dialog.component";
import { MatDialog } from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class ViewEventdiaryconfigService extends BaseGridService<ViewEventDiaryConfig, ViewEventDiaryConfigFilterModel> {

  getAllUrl: string;
  getUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.eventDiaryConfigUrls.get;
  pagingUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.eventDiaryConfigUrls.paging;
  addOrEditUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.eventDiaryConfigUrls.addOrEdit;
  deleteUrl: string;
  countUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.eventDiaryConfigUrls.count;
  orgsUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.eventDiaryConfigUrls.orgList;
  usersUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.eventDiaryConfigUrls.userList;


  constructor(protected httpClient: HttpClient, public dialog: MatDialog) {
    super(httpClient);
  }

  getPaging(filter: any): Promise<RespondData> {
    return this.post(this.pagingUrl, filter);

  }

  count(filter: any): Promise<RespondData> {
    return this.post(this.countUrl, filter);

  }

  getOrgs() {
    return this.post(this.orgsUrl, '');
  }

  getUsers() {
    return this.post(this.usersUrl, '');
  }

  async updateKPI(evnCfgId): Promise<RespondData> {
    const dialogRef = this.dialog.open(UpdateKpiDialogComponent, {
      width: '460px', height: '200px',
      data: { eventDiaryConfigId: evnCfgId }
    });

    return dialogRef.afterClosed().toPromise();
  }
}
