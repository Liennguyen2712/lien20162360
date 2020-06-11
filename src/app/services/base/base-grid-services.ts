import { GridFilterModel, RespondData } from "../../models/base/utilities";
import { BaseDataService } from "src/app/services/base/base-data-service";
import { HttpClient } from "@angular/common/http";

export interface IGridService<TModel, TFilter extends GridFilterModel> {
    getPaging(filter: TFilter): Promise<RespondData>;
    get(id: number): Promise<RespondData>;
    getAll(): Promise<RespondData>;
    count(filter: TFilter): Promise<RespondData>;
    addOrEdit(model: any): Promise<RespondData>;
    detele(model: any): Promise<RespondData>;
    getReadOnlyStatus(obj: any) : boolean;
}

export abstract class BaseGridService<TModel, TFilter extends GridFilterModel>
    extends BaseDataService
    implements IGridService<TModel, TFilter> {

    abstract pagingUrl: string;
    abstract addOrEditUrl: string;
    abstract deleteUrl: string;
    abstract countUrl: string;
    abstract getAllUrl: string;
    abstract getUrl: string;

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    getPaging(filter: any): Promise<RespondData> {
        return this.post(this.pagingUrl, filter);
    }

    get(id: number): Promise<RespondData> {
        return this.post(`${this.getUrl}/${id}`, {});
    }

    getAll(): Promise<RespondData> {
        return this.post(this.getAllUrl, null);
    }

    count(filter: any): Promise<RespondData> {
        return this.post(this.countUrl, filter);
    }

    addOrEdit(model: any): Promise<RespondData> {
        return this.post(this.addOrEditUrl, model);
    }

    detele(model: any): Promise<RespondData> {
        return this.post(this.deleteUrl, model);
    }

    getReadOnlyStatus(obj: any) : boolean {
        return false;
    }
}