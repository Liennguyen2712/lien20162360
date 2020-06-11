
import { NgModule,APP_INITIALIZER} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

//import { TranslateService } from './translate.service';
import { TranslatePipe } from './translate.pipe';


@NgModule({
    imports: [HttpClientModule],
    declarations: [TranslatePipe],
    exports: [TranslatePipe],
    providers : [],
})
export class PipeModule { }


