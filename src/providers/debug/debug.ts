import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DebugProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DebugProvider {

  constructor(public http: Http) {
    window['sop_debug_level'] = localStorage['sop_debug_level'] || 0;
  }

  log(s) {
    if (window['sop_debug_level'] > 2) console.log(s);
  }

  info(s) {
    if (window['sop_debug_level'] > 1) console.log(s);
  }

  critical(s) {
    if (window['sop_debug_level'] > 0) console.log(s);
  }

}
