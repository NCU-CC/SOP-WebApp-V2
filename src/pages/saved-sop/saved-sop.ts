import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { OauthProvider } from '../../providers/oauth/oauth';

/**
 * Generated class for the SavedSopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-saved-sop',
  templateUrl: 'saved-sop.html',
})
export class SavedSopPage {

  items: any[];
  selectedSop: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public api: ApiProvider,
              public oauth: OauthProvider)
  {
    //
  }

  load() {
    this.api.getSops({
      'marker': this.api.getUser()
    }, (data) => {
      this.items = data;
    });
  }

  openSop(id) {
    this.navCtrl.push('SopPage', { sid: id });
  }

  ionViewWillEnter() {
    this.load();
  }

  ionViewDidLoad() {
  }
}
