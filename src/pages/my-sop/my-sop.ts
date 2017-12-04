import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the MySopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-sop',
  templateUrl: 'my-sop.html',
})
export class MySopPage {

  items: any[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private api: ApiProvider)
  {
    //
  }

  load() {
    this.api.getSops({
      author: this.api.getUser()
    }, (data) => {
      this.items = data;
    });
  }

  editSop(sid = null) {
    this.navCtrl.push('SopEditorPage', {
      sid: sid
    })
  }

  openSop(sid) {
    this.navCtrl.push('SopPage', {
      sid: sid
    });
  }

  newSop() {
    this.navCtrl.push('SopEditorPage');
  }
  
  ionViewWillEnter() {
    this.load();
  }

  ionViewDidLoad() {
  }
}
