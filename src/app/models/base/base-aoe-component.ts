import { GridFilterModel, RespondData } from "./utilities";

import { IGridService } from "../../services/base/base-grid-services";
import { OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonDialogService } from "src/app/services/utilities/dialog/dialog.service";

export abstract class BaseAddOrEditComponent<TData, TFilter extends GridFilterModel, TService extends IGridService<TData, TFilter>> implements OnInit {
    id: number;
    item: TData;
    isReadOnly = true;

    constructor(protected _dataService: TService, protected _route: ActivatedRoute, protected _router: Router, protected _dialogService: CommonDialogService) {
    }

    async ngOnInit() {
        this.id = this._route.snapshot.params['id'];
        await this.customInit();
        const response = await this._dataService.get(this.id);
        if (response.isSuccess) {
            this.item = response.data;
            console.log(this.item);
            this.isReadOnly = this._dataService.getReadOnlyStatus(this.getReadOnlyFilter());
        }
    }

    async customInit() {
    }

    getReadOnlyFilter() {
        return null;
    }

    async addOrEdit() {
        const isValid = this.validateData(this.item);

        if (!isValid.isSuccess) {
            console.log(isValid.message);
            await this._dialogService.alert('Đã có lỗi xảy ra');
        }

        try {
            this.fetchData();
            const rs = await this._dataService.addOrEdit(this.item);
            if (rs.isSuccess) {
                await this._dialogService.alert('Thay đổi thành công');
            } else {
                console.log(rs.message);
                await this._dialogService.alert('Đã có lỗi xảy ra');
            }
        } catch (err) {
            alert(err.message);
        }
    }

    abstract validateData(input: TData): RespondData;
    abstract fetchData();
}