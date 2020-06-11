import { Injectable } from '@angular/core';
import { BaseGridService } from '../base/base-grid-services';
import { Menu } from 'src/app/models/data/data';
import { GridFilterModel, RespondData } from '../../models/base/utilities';
import { HttpClient } from '@angular/common/http';
import asEnumerable from 'linq-es2015';
import { AppConfig } from '../config/app.config';
import { MatDialog } from '@angular/material';
import { ChangePasswordDialogComponent } from 'src/app/modules/share/dialogs/change-password-dialog/change-password-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends BaseGridService<Menu, GridFilterModel>{
  getAllUrl: string;
  getUrl: string;
  pagingUrl: string;
  addOrEditUrl: string;
  deleteUrl: string;
  countUrl: string;
  private getMenuUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.menuUrls.getMenu;

  constructor(protected httpClient: HttpClient, private _dialog: MatDialog) {
    super(httpClient);
  }

  getMenu() {
    return this.post(this.getMenuUrl, {});
  }

  fetchTree(listTrees: Menu[], currentLeaf: Menu): Menu[] {
    const result: Menu[] = [];

    if (currentLeaf == null) { return; }

    // next level childs
    const nextLevel = asEnumerable(listTrees).Where(x => x.parrentID == currentLeaf.id).OrderBy(x => x.displayOrder).ToArray();

    // Nếu không có next level => ko có child, đã là leaf cuối cùng
    if (nextLevel == null || nextLevel.length == 0) { return; }

    const leafInTree = asEnumerable(listTrees).FirstOrDefault(x => x.id == currentLeaf.id);

    // add childs for root
    leafInTree.childs = nextLevel;
    result.push(leafInTree);
    // gọi đệ quy cho các leaf ở next level
    for (let index = 0; index < nextLevel.length; index++) {
      const leaf = nextLevel[index];
      result.concat(this.fetchTree(listTrees, leaf));
    }
    return result;
  }

  openChangePwDialog() {
    const ref = this._dialog.open(ChangePasswordDialogComponent, {width: '500px'});
    return ref.afterClosed().toPromise();
  }
}
