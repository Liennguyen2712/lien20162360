import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BaseDataService } from '../base/base-data-service';
import { Router, ActivatedRoute } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { AppConfig } from '../config/app.config';
import { CommonDialogService } from '../utilities/dialog/dialog.service';
import { ResetPasswordModel, RespondData } from 'src/app/models/base/utilities';
import { appGlobals } from 'src/app/modules/share/app-global';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseDataService {
  private apiUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.authUrls.token;
  private changePasswordUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.userUrls.changePassword;
  private jwtTokenName = 'id_token';

  constructor(protected httpClient: HttpClient, private router: Router, private route: ActivatedRoute, private _dialogService: CommonDialogService) {
    super(httpClient);
  }

  async sendSignIn(body: HttpParams) {
    return this.httpClient.post(this.apiUrl, body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    }).toPromise();
  }

  async signIn(username: string, password: string, returnUrl) {
    try {
      const body = new HttpParams()
        .set('username', username)
        .set('password', encodeURIComponent(password))
        .set('grant_type', 'password');
      const response = await this.sendSignIn(body);
      this.setSession(response);
      this.router.navigateByUrl(returnUrl);
    } catch (err) {
      if (err.error.error == null && err.error.error == '') {
        this._dialogService.alert('Có lỗi xảy ra!');
      } else {
        this._dialogService.alert(err.error.error);
      }
    }
  }

  getSessionParam(param) {
    return localStorage.getItem(param);
  }

  isLoggedIn() {
    return this.getSessionParam(this.jwtTokenName) != null;
  }

  signOut() {
    const lang = appGlobals.getLang();
    localStorage.clear();
    appGlobals.setLang(lang);
  }

  setSession(data) {
    localStorage.setItem('id_token', data.access_token);
    const userInfo = jwt_decode(data.access_token);

    const username = userInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    localStorage.setItem('username', username);

    const fullname = userInfo['fullname'];
    localStorage.setItem('fullname', fullname);

    const menus = userInfo['menu'];
    localStorage.setItem('menu', menus);

    // localStorage.setItem('expired', JSON.stringify(data.expires_in.valueOf()));
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  getUserFullname() {
    return localStorage.getItem('fullname');
  }

  getUserId() {
    return localStorage.getItem('userid');
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return expiresAt;
  }

  getAuth(authUrl: string): any {
    return this.post(authUrl, {});
  }

  changePassword(passwordModel: ResetPasswordModel): Promise<RespondData> {
    return this.post(this.changePasswordUrl, passwordModel);
  }
}