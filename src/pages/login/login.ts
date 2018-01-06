import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostmanProvider } from '../../providers/http/postman';
import { AlertsProvider } from '../../providers/alerts/alerts';
import sha256 from 'crypto-js/sha256';
import { StorageProvider } from '../../providers/storage/storage';
import { TabsPage } from '../tabs/tabs';
import { FCM } from '@ionic-native/fcm';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage{
  loginFormdata = null;
  successData = null;

  constructor(
    public navCtrl: NavController, 
    private authprovider: PostmanProvider, 
    private toast: AlertsProvider, 
    private storage: StorageProvider,
    private fcm: FCM
  ) {
    console.log("login ts");
  }

  login(value){
    this.loginFormdata = value;
    let pass = sha256(this.loginFormdata.password);
    //this.fcm.getToken().then(token => {
      let token = "ep3G3OOS_kQ:APA91bGzEIP71MULIBnL8jPd84QRDlxIoekjsEEYOQbg4FFEwaJHvEodR6jT-4hZnwDPK3kJKZdU6rtFk166WuUN0pGU8Tzpgwm_KbdKOnXL8n2yM5Gs9ct6-NOILgunwDHA_h6xrc25";
      console.log(token);
      this.authprovider.AuthLogin(this.loginFormdata.username, pass, token).subscribe(data => {
        this.successData = data;
        console.log(this.successData);
        switch(Object.keys(this.successData.response)[0]){
          case "error":
            this.toast.fireToast(this.successData.response.error);
          break;
  
          case "success":
            if(this.storage.setToken(this.successData.response.data.token)){ 
              this.toast.fireToast(this.successData.response.success);
              this.navCtrl.push(TabsPage);
            }else{
              this.toast.fireToast("Technical Problem");
            }
          break;
  
          default:
            this.toast.fireToast("Invalid Request");
          break;
        }
      }, error => {
        console.log(JSON.stringify(error));
        this.toast.fireToast("Please check your network connection");
      }, () => {
        console.log(this.successData);
      });
    //});
  }
}