import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { OauthProvider } from '../../providers/oauth/oauth';
import { DebugProvider } from '../../providers/debug/debug';

/**
 * Generated class for the SopEditorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sop-editor',
  templateUrl: 'sop-editor.html',
})
export class SopEditorPage {

  sop: any = {};
  steps: any[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public api: ApiProvider,
              public debug: DebugProvider,
              public oauth: OauthProvider)
  {
    this.sop = navParams.get('sop') || {
      id: null,
      name: '', desc: '', author: '',
      unit: '', time: 0, steps: []
    };
    this.steps = this.sop.steps.map(s => [s]);
  }
  
  reorderSteps(indexes) {
    let element = this.steps[indexes.from];
    this.steps.splice(indexes.from, 1);
    this.steps.splice(indexes.to, 0, element);
  }

  addStep() {
    this.steps.push(['']);
  }

  removeEmptySteps() {
    this.steps = this.steps.filter(a => a[0] != '');
  }

  save() {
    this.sop.steps = this.steps.map(a => a[0]).filter(s => s);
    let sop = Object.assign({}, this.sop);
    sop.author = this.api.getUser();
    sop.steps = JSON.stringify(this.sop.steps);
    if(sop.id)  this.update(sop);
    else        this.insert(sop);
  }
  
  insert(sop) {
    this.api.createSop(sop, data => {
      this.debug.info('Created SOP');
      this.debug.info(data);
      this.navCtrl.setRoot('MySopPage');
    });
  }
  
  update(sop) {
    this.api.updateSop(sop, data => {
      this.debug.info('Updated SOP');
      this.debug.info(data);
      this.navCtrl.pop();
    });
  }

  delete() {
    if (window.confirm('Are you sure?\n你確定嗎？') == true) { 
      this.api.deleteSop(this.sop.id, data => {
        this.debug.info(`Deleted SOP ${this.sop.id}`);
        this.debug.info(data);
        this.navCtrl.setRoot(this.navCtrl.first());
      });
    }
  }

  ionViewDidLoad() {
  }
}
