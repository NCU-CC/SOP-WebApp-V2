import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { OauthProvider } from '../providers/oauth/oauth';
import { ApiProvider } from '../providers/api/api';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  
  rootPage = 'HomePage';

  pages = [
    { title: 'MENU_HOME', component: 'HomePage' },
    { title: 'MENU_HELP', component: 'HelpPage' },
  ];

  pagesRequiredLogin = [
    { title: 'MENU_SAVED_SOP', component: 'SavedSopPage' },
    { title: 'MENU_MY_SOP', component: 'MySopPage' },
  ];

  constructor(private translate: TranslateService,
              private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private oauth: OauthProvider,
              private api: ApiProvider)
  {
    this.api.getUser(false, () => {
      this.pages = this.pages.concat(this.pagesRequiredLogin);
    });
    this.initTranslate();
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  initTranslate() {
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en');
    }
  }

  navPage(page) {
    this.nav.setRoot(page.component);
  }

  logout() {
    this.oauth.logout();
  }
}

