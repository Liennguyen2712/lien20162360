import { NgModule } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AppRoutingModule } from 'src/app/modules/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { SideNavComponent } from 'src/app/modules/share/side-nav/side-nav.component';
import { ShareModule } from 'src/app/modules/share/share.module';
import { APP_INITIALIZER } from '@angular/core';
import { AppConfig } from './services/config/app.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/modules/auth.guard';
import { LoginComponent } from 'src/app/modules/login/login/login.component';
import { TranslateService } from './pipe/translate.service';

export function initializeApp(appConfig: AppConfig, trlService: TranslateService) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    // BrowserModule,
    ShareModule,
    AppRoutingModule,

    // Chu y cai nay phai de ngoai ko cho vao share module
    BrowserAnimationsModule,
  ],
  providers: [
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig], multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    TranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
