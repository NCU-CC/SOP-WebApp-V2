import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {

  private local = false;

  public api;
  public oauth;
  
  constructor() {
    if (this.local) {

      this.api = {
        baseUrl: 'https://apitest.cc.ncu.edu.tw/sop/v2'
      }; 

      this.oauth = {
        scopes: ['sop.sop.write', 'sop.mark.write'],
        authorizeUrl: 'https://oauth.apitest.cc.ncu.edu.tw/oauth/authorize',
        clientId: '2a2969b346976f1395f5054c04ced72087f36bff33b6076c947bdbf84cee1d9e',
        clientSecret: '49a1c8a33a432b4154ec2afc9085ce9500e3322906eccdde8bf76a3b92247233',
        redirectUri: 'http://localhost:8100/',
        tokenUrl: 'https://oauth.apitest.cc.ncu.edu.tw/oauth/token'
      };

    } else {

      this.api = {
        baseUrl: 'https://apitest.cc.ncu.edu.tw/sop/v2'
      };
      
      this.oauth = {
        scopes: ['sop.sop.write', 'sop.mark.write'],
        authorizeUrl: 'https://oauth.apitest.cc.ncu.edu.tw/oauth/authorize',
        clientId: '2a2969b346976f1395f5054c04ced72087f36bff33b6076c947bdbf84cee1d9e',
        clientSecret: '49a1c8a33a432b4154ec2afc9085ce9500e3322906eccdde8bf76a3b92247233',
        redirectUri: 'https://webapp.cc.ncu.edu.tw/sop/',
        tokenUrl: 'https://oauth.apitest.cc.ncu.edu.tw/oauth/token'
      };

    }
  }

}
