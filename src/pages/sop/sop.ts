import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { DebugProvider } from '../../providers/debug/debug';
import { OauthProvider } from '../../providers/oauth/oauth';

/**
 * Generated class for the SopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sop',
  templateUrl: 'sop.html',
})
export class SopPage {

  sop: any;
  editable: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private api: ApiProvider,
              private debug: DebugProvider,
              private oauth: OauthProvider)
  {
    this.updateSop({
      name: '', desc: '', author: '',
      unit: '', time: 0,  steps: []
    });
    if (this.navParams.get('sid'))
      this.load();
    else
      this.navCtrl.setRoot('HomePage');
  }
  
  load() {
    this.getSop(this.navParams.get('sid'));
  }
  
  //

  getSop(id) {
    this.api.getSop(id, data => {
      this.updateSop(data);
      this.editable = this.oauth.user == this.sop.author;
      if (this.oauth.user)
        this.getMark(id);
    });
  }

  getMark(id) {
    this.api.marked(id, data => {
      this.sop.marked = data;
    });
  }

  mark() {
    this.api.mark(this.sop.id, () => {
      this.debug.info('Mark ok');
      this.getMark(this.sop.id);
    });
  }

  delMark() {
    this.api.delMark(this.sop.id, () => {
      this.debug.info('Delete mark ok');
      this.getMark(this.sop.id);
    });
  }

  //

  updateSop(sop) {
    this.sop = sop;
    this.sop.date = new Date(Date.parse(sop.updated_at)).toDateString();
  }

  editSop() {
    this.navCtrl.push('SopEditorPage', {
      sop: this.sop
    });
  }

  copySop() {
    this.sop.id = undefined;
    this.sop.author = this.api.getUser();
    this.navCtrl.push('SopEditorPage', {
      sop: this.sop
    });
  }
  
  ionViewWillEnter() {
  }

  ionViewDidLoad() {
  }
  
}
