import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, first } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { LANGUAGUE_CONFIG } from '../models/data/lang';
import { Dictionary } from '../helpers/IDictionary';
import { appGlobals } from '../modules/share/app-global';

@Injectable()
export class TranslateService {

    data: Dictionary<string> = new Dictionary();
    _http: HttpClient;
    constructor(private http: HttpClient) { this._http = http; }

    use(lang: string): Promise<{}> {
        const ret = new Promise<{}>((resolve, reject) => {
            appGlobals.setLang(lang || 'vn');
            const obj = this;
            LANGUAGUE_CONFIG.forEach(function (item) {
                // doc du lieu tu file json
                const langPath = `assets/i18n/${item}.${lang}.json`;
                console.log(langPath + '****');
                obj._http.get(langPath).subscribe(
                    translation => {
                        const tmp = Object.assign({}, translation || {});
                        Object.keys(tmp).forEach(key => {
                            obj.data.add(key, tmp[key]);
                        }
                        );
                    },
                    error => {
                        console.log('error:' + langPath); // console loi thoi, ko clear di
                    }
                );
            });
            resolve(obj.data);
        });
        return ret;
    }
}
