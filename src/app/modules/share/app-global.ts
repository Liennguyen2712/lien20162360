// cac ham dung chung nhet vao day
// globals.ts
import { Injectable } from '@angular/core';
import * as _moment from 'moment';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class appGlobals {
    public static setLang(lang: string) {
        localStorage.setItem('LANGUAGE', lang);
    }

    public static getLang(): string {
        if (!localStorage.getItem('LANGUAGE')) {
            localStorage.setItem('LANGUAGE', 'vn');
        }
        return localStorage.getItem('LANGUAGE');
    }

}