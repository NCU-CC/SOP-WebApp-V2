import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { ConfigProvider } from '../config/config'
import { OauthProvider } from '../oauth/oauth'
import { DebugProvider } from '../debug/debug'

/*
  Generated class for the SopApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  public accessToken;

  constructor(public http: Http,
              public oauth: OauthProvider,
              public debug: DebugProvider,
              public config: ConfigProvider)
  {
  }


  /******************************************************************
  * Public
  ******************************************************************/


  getUser(authorize=true, callback=undefined) {
    if (this.oauth.user) {
      this.debug.log(`User: ${this.oauth.user}`)
      if (callback) callback(this.oauth.user);
      else return this.oauth.user;
    } else {
      this.oauth.getAccessToken(accessToken => {
        this.accessToken = accessToken;
        this.userInfo(info => {
          this.oauth.user = info['resource_owner_id'];
          if (!this.oauth.user && authorize) {
            this.oauth.authorize();
          } else if (this.oauth.user && callback) {
            callback(this.oauth.user);
          }
        });
      }, authorize);
    }
  }


  /******************************************************************
  * Api calls
  ******************************************************************/


  // GET /sops
  getSops(params, callback) {
    this.request({
      method: 'get',
      url: '/sops',
      params: params
    }, callback);
  }


  // GET /sops/:id
  getSop(id, callback) {
    this.request({
      method: 'get',
      url: `/sops/${id}`
    }, callback);
  }


  // POST /sops
  createSop(sop, callback) {
    this.request({
      method: 'post',
      url: '/sops',
      body: sop,
      authorize: true
    }, callback);
  }
  

  // PUT /sops/:id
  updateSop(sop, callback) {
    this.request({
      method: 'put',
      url: `/sops/${sop['id']}`,
      authorize: true,
      body: sop
    }, callback)
  }


  // DELETE /sops/:id
  deleteSop(id, callback) {
    this.request({
      method: 'delete',
      url: `/sops/${id}`,
      authorize: true
    }, callback);
  }


  // GET /marks
  marks(callback) {
    this.request({
      method: 'get',
      url: `/marks`,
      authorize: true
    }, callback);
  }


  // GET /sops/:id/mark
  marked(id, callback) {
    this.request({
      method: 'get',
      url: `/sops/${id}/mark`,
      authorize: true
    }, callback);
  }


  // POST /sops/:id/mark
  mark(id, callback) {
    this.request({
      method: 'post',
      url: `/sops/${id}/mark`,
      authorize: true
    }, callback);
  }


  // DELETE /sops/:id/mark
  delMark(id, callback) {
    this.request({
      method: 'delete',
      url: `/sops/${id}/mark`,
      authorize: true
    }, callback);
  }


  // GET /myinfo
  userInfo(callback) {
    this.request({
      method: 'get',
      url: '/user_info',
      authorize: true
    }, callback);
  }


  /******************************************************************
  * Private
  ******************************************************************/



  private url(s) {
    return this.config.api.baseUrl + s;
  }


  private requestOptions(args) {
    /* Arguments
    args:
      params    -- GET params (object)
      data      -- with data?
      authorize -- with access token?
    */

    let options: any = { headers: {}, params: {} };
    
    if (this.accessToken)
      options.headers['Authorization'] = `Bearer ${this.accessToken}`;

    else if (args.authorize && !this.accessToken)
      this.oauth.authorize();
      
    if (args.data)
      options.headers['Content-Type'] = 'application/json';
    
    if (Object.keys(args.params).length > 0)
      options['params'] = args.params;

    return new RequestOptions(options);
  }

  

  private request(args, callback) {
    /* Arguments
    args:
      method    -- get|post|put|delete (string)
      url       -- request url (string)
      params    -- query params
      body      -- request body (object)
      authorize -- with access token?
    callback: (function)
    */
    
    
    let method = args.method || 'get';
    let url = args.url || '';
    let body = args.body ? JSON.stringify(args.body) : '';
    let options = this.requestOptions({
      params: args.params ? args.params : {},
      data: args.body ? true : false,
      authorize: args.authorize || false
    });

    this.debug.log(args)
    
    switch (method) {
      case 'get': case 'delete':
        this.http[method](this.url(url), options).map(r => r.json()).subscribe(callback);
        break;
      case 'post': case 'put': case 'patch':
        this.http[method](this.url(url), body, options).map(r => r.json()).subscribe(callback);
        break;
      default:
        this.debug.critical(`Error: no method called ${method}`);
    }
  }



}
