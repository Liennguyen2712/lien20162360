import { Component, OnInit } from '@angular/core';
import { Menu } from '../../../models/data/data';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MenuService } from '../../../services/menu/menu.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { asEnumerable } from 'linq-es2015';
import { AppConfig } from '../../../services/config/app.config';
import { TranslateService } from 'src/app/pipe/translate.service';
import { appGlobals } from '../app-global';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  showSubmenu = false;
  showSubmenuSystem = false;
  menu: Menu[] = [];
  isOpened = false;
  authAction = 'Đăng nhập';
  defaultlanguage: string;
  currentLang: string;

  constructor(private breakpointObserver: BreakpointObserver,
    private _authService: AuthService,
    private router: Router,
    private _menuService: MenuService,
    private trsl: TranslateService) { }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  // isHandset$ = false;

  // getdefaultlanguage(): void {
  //   if (localStorage.getItem('DEFAULT_LANG')) {
  //     this.defaultlanguage = localStorage.getItem('DEFAULT_LANG');
  //   } else {
  //     this.defaultlanguage = 'vn';
  //   }
  // }

  changelang(lang: string): void {
    this.trsl.use(lang);
    this.currentLang = appGlobals.getLang();
    // this.isOpen = false;
  }

  async ngOnInit() {
    try {
      this.currentLang = appGlobals.getLang();
      if (this._authService.isLoggedIn()) {
        this.authAction = this._authService.getUsername();
        this.trsl.use(this.currentLang);
        console.log(2);
      }
      this.menu = (await this._menuService.getMenu()).data;

      const root = asEnumerable(this.menu).FirstOrDefault(x => x.parrentID == null || x.parrentID == 0);

      if (this.menu != null && root != null) {
        this.menu = this._menuService.fetchTree(this.menu, root);
        // debugger;
        // not display root
        if (this.menu[0].parrentID == null || this.menu[0].parrentID == 0) {
          this.menu = this.menu[0].childs;
        }
      }
    } catch (err) {
//      alert(err.message);
    }
    this.isOpened = true;
  }

  toggle(drawer) {
    drawer.toggle();
  }

  showMenu(item: Menu) {
    if (item.url != null && item.url.trim() != '') {
      item.isDisplayed = false;
      return;
    }
    item.isDisplayed = !item.isDisplayed;
  }

  signOut(): void {
    this._authService.signOut();
    this.router.navigate(['login'], {
      queryParams: {
        return: ''
      }
    });
  }

  changePw() {
    this._menuService.openChangePwDialog();
  }

  openNewTab() {
    window.open('https://cloud.brggroup.vn/index.php/s/i4h90FbMd9FR7xl', '_blank');
  }
}
