import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OauthProvider } from '../../providers/oauth/oauth';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  items: any[];
  filteredItems: any[];
  searchQuery: string;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private oauth: OauthProvider,
              private api: ApiProvider)
  {
    //
  }
  
  load() {
    this.api.getSops({}, data => {
      this.items = data;
      this.filteredItems = this.items.slice();
      if (this.oauth.user) {
        this.api.marks((marks) => {
          this.items.forEach((item) => {
            item.marked = marks.includes(item.id);
            item.isMine = (item.author === this.oauth.user);
          });
        });
      }
    });
  }

  doSearch() {
    let keywords = this.searchQuery.toLowerCase().split(' ').filter(s => s != '');

    this.filteredItems = this.items.filter(a => {
      return keywords.reduce((p, c) => {
        return p && a.name.toLowerCase().includes(c);
      }, true);
    });
  }

  openSop(sid) {
    this.navCtrl.push('SopPage', { sid: sid });
  }


  ionViewWillEnter() {
    this.load();
  }

  ionViewDidLoad() {
  }
}
