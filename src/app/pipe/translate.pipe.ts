import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service';

@Pipe({
    name: 'translate',
    pure: false
})
export class TranslatePipe implements PipeTransform {

    constructor(private translate: TranslateService) { }

    transform(key: any): any {
        if (key) {
            return this.translate.data[key.trim()] || key;
        } else { return key; }

    }
}