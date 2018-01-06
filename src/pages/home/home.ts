import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostmanProvider } from '../../providers/http/postman';
import { StorageProvider } from '../../providers/storage/storage';
import { AlertsProvider } from '../../providers/alerts/alerts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  successData = null;

  constructor(
    public navCtrl: NavController,
    private postman: PostmanProvider, 
    private storage:StorageProvider,
    private toast:AlertsProvider
  ) {
    this.getData();
  }

  getData(){
    this.storage.getToken().then(token => {
      if(token != null){
        this.postman.getOrders(token).subscribe(data => {
          this.successData = data;
          console.log(data);
          switch(Object.keys(this.successData.response)[0]){
            case "error":
              this.toast.fireToast(this.successData.response.error);
            break;
    
            case "complete":
              if(this.storage.setToken(this.successData.response.data.token)){ 
                this.toast.fireToast(this.successData.response.success);
              }else{
                this.toast.fireToast("Technical Problem");
              }
            break;
    
            default:
              this.toast.fireToast("Invalid Request");
            break;
          }
        }, error => {

        }, () =>{

        });
      }
    });
  }

}
