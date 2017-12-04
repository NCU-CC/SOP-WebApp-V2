import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ConfigProvider } from '../config/config'
import { DebugProvider } from '../debug/debug'
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the OauthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OauthProvider {
  
  public tokenData: any = {};
  public user: string = null;

  constructor(public http: Http,
              public config: ConfigProvider,
              public debug: DebugProvider,
              public platform: Platform)
  {
  }
  


  logout() {
    // clear local storage and reload page
    localStorage.removeItem('tokenData');
    location.href = '.';
  }



  authorize() {
    // forward to OAuth authorization
    location.href = this.config.oauth.authorizeUrl + '?' + [
      'response_type=token',
      `scope=${this.config.oauth.scopes.join('+')}`,
      `client_id=${this.config.oauth.clientId}`,
      `redirect_uri=${this.config.oauth.redirectUri}`
    ].join('&');
  }



  getAccessToken(callback, authorize=true) {
    // find token from uri, or redirect to OAuth

    let hash = location.hash, params: any = {};
    hash.substring(1).split('&').map(item => {
      let pair = item.split('=');
      params[pair[0]] = pair[1] || '';
    });

    if(params['token_type'] == 'bearer')
      this.getAccessTokenFromUri(params, callback);

    else
      this.getAccessTokenFromStorage(callback, authorize);
    
  }



  getAccessTokenFromUri(tokenInfo, callback) {

    this.debug.info(`Found token information in uri`);
    this.debug.log(tokenInfo);

    this.tokenData = {
      accessToken: tokenInfo['access_token'],
      refreshToken: tokenInfo['refresh_token'],
      expiredAt: tokenInfo['expires_in'] + new Date().getTime() / 1000
    };

    localStorage['tokenData'] = JSON.stringify(this.tokenData);
    callback(this.tokenData['accessToken']);
  }



  getAccessTokenFromStorage(callback, authorize=true) {
    this.tokenData = localStorage['tokenData'] ? JSON.parse(localStorage.tokenData) : false;
    
    
    if (this.tokenData) {

      this.debug.info('Found token information in local storage.');
      this.debug.log(this.tokenData);

      let expired = new Date().getTime() / 1000 > this.tokenData['expiredAt'] - 60;

      if (expired) {
        this.debug.info('Token is expired, refreshing.');
        this.refreshToken(callback);
      }

      else {
        callback(this.tokenData['accessToken']);
      }
    }
    
    else if (authorize) {

      this.debug.info('No token found in local storage, forwarding to OAuth');

      this.authorize();
    }
  }



  refreshToken(callback) {
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });

    this.http.post(this.config.oauth.tokenUrl, [
      'grant_type=refresh_token',
      `refresh_token=${this.tokenData['refreshToken']}`
    ].join('&'), options).subscribe((response => {
      this.tokenData = {
        accessToken: response['data'].access_token,
        refreshToken: response['data'].refresh_token,
        expiredAt: response['data'].expires_in + new Date().getTime() / 1000
      };
      this.debug.info('Token refreshed');
      this.debug.log(this.tokenData);

      localStorage.setItem('tokenData', JSON.stringify(this.tokenData));
      callback(this.tokenData['accessToken']);
    }));
  }


}
