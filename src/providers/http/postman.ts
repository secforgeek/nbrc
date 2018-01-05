import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertsProvider } from '../alerts/alerts';

@Injectable()
export class PostmanProvider {
  host = 'http://192.168.0.6';
  auth_url = this.host+'/api/authclient';

  data = null;
  loader = null;
  constructor(
    public http: HttpClient, 
    public alert: AlertsProvider
  ) { }

  AuthLogin(username, password, fcm){
    let htph = new HttpHeaders().set('content-type','application/json');
    let custom = {"username":username, "password":password.toString(), "fcm":fcm};
    return this.http.post(this.auth_url, custom, {headers:htph});
  }
}
