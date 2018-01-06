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
  fetchdata = false;

  constructor(
    public navCtrl: NavController,
    private postman: PostmanProvider, 
    private storage:StorageProvider,
    private toast:AlertsProvider
  ) {
    this.storage.setToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1MTUyNTU0MDksImV4cCI6MzAzMTcyMDQxOCwiaXNzIjoiZ3Nkcm9pZC5jb20iLCJkYXRhIjp7InVzciI6IkFLU0hBWU1FU1MiLCJ0eXBlIjoiQyIsImVtYWlsIjoiYWtzaGF5QGdtYWlsLmNvbSJ9fQ.LBDE2PRSdilE9WU5stqFMc-_M2hMO9Da2EXurwgX_Vi0TA_d36Fd_jMEpU7VVslCl3cPBd75hy4z6bjHGoDhWlEG0LENqZO6YXFC9Q_IPqxwlUajh-hT14nfDHbZjWWbiGu9Ngf6B6jveUwHDMF68cIwZW6j8KYrUZhJ_wgTJlM');
  }

  ionViewDidLoad(){
    console.clear();
    console.log("IonViewDidLoad Homepage");
    this.successData = null;
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
              this.fetchdata = true;
              this.successData = this.successData.response.complete;
              console.log(this.successData);
            break;
    
            default:
              this.toast.fireToast("Invalid Request");
            break;
          }
        }, error => {
          console.log(error);
        }, () =>{
          console.log("Completed HOme");
        });
      }else{
        console.log("NoTOKEN");
      }
    });
  }

  getArrayValue(arr){
    return JSON.parse(arr.data);
  }

}
