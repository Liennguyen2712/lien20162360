import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { MenuService } from "../services/menu/menu.service";
import { Observable, of } from "rxjs";
import { asEnumerable } from "linq-es2015";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http/http";
import { catchError } from "rxjs/operators";

import { throwError } from 'rxjs';
import { AppConfig } from "src/app/services/config/app.config";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private _menuService: MenuService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<boolean> | Promise<boolean> | boolean {
        const currentUrl = state.url;
        // check if user has permission with current url
        // tslint:disable-next-line:triple-equals
        if (currentUrl != '' && currentUrl != '/') {

            const isHavePermission = this.authService.isLoggedIn();

            if (!isHavePermission) {
                alert('Tài khoản không có quyền truy cập trang này!');
                this.router.navigate(['login'], {
                    queryParams: {
                        return: ''
                    }
                });
                return false;
            }
        }

        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            // huypq fixed 12/3/19 ko redirect den dashboard khi vao dia chi '/'
            let url = state.url;
            // tslint:disable-next-line:triple-equals
            if (url == '/') {
                url = '';
            }
            this.router.navigate(['login'], {
                queryParams: {
                    return: url
                }
            });
            return false;
        }
    }
}

@Injectable()

// https://blog.angular-university.io/angular-jwt-authentication/
export class AuthInterceptor implements HttpInterceptor {
    private apiUrl = AppConfig.settings.apiServerUrl + AppConfig.settings.apiServerUrl;

    constructor(private router: Router, private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem('id_token');
        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${idToken}`)
            });
            const result = next.handle(cloned);
            return result.pipe(catchError(err => this.handleAuthError(err)));
        } else {
            return next.handle(req);
        }
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        // handle your auth error or rethrow
        if (err.status === 401 || err.status === 403) {
            // navigate /delete cookies or whatever
            this.authService.signOut();
            this.router.navigateByUrl('login');
            return of('Xác thực không thành công!');
        }
        console.log(err);
        return Observable.throw(err);
    }
}

