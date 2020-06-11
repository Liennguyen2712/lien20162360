import { Injectable } from "@angular/core";
import { IAppConfig } from "../../models/base/utilities";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpBackend } from "@angular/common/http";
import { TranslateService } from "src/app/pipe/translate.service";
import { appGlobals } from "src/app/modules/share/app-global";

@Injectable()
export class AppConfig {
    static settings: IAppConfig;
    private httpClient: HttpClient;

    // https://stackoverflow.com/questions/46469349/how-to-make-an-angular-module-to-ignore-http-interceptor-added-in-a-core-module/49013534#49013534
    // ko inject httpClient vì sẽ trigger AuthInterceptor => ko load đc resource
    constructor(handler: HttpBackend, private trlService: TranslateService) {
        this.httpClient = new HttpClient(handler);
    }

    load() {
        const lang = appGlobals.getLang();
        const jsonFile = `assets/configs/config.${environment.name}.json`;
        return new Promise<void>((resolve, reject) => {
            this.httpClient.get(jsonFile).toPromise().then((response: IAppConfig) => {
                AppConfig.settings = <IAppConfig>response;
                // setup multi language
                this.trlService.use(lang);
                console.log(1);
                resolve();
            }).catch((response: any) => {
                reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }
}