import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RespondData } from "src/app/models/base/utilities";

export interface IDataService {
    post<TModel>(url: string, model: TModel): Promise<any> ;
}

export class BaseDataService implements IDataService {
    constructor(protected httpClient: HttpClient) { }

    post<TModel>(url: string, model: TModel): Promise<any> {
        return this.httpClient.post<RespondData>(url, model, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8'
            })
        }).toPromise();
    }
}
