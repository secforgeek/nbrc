import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { LoginPage } from '../login/login';
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: StorageProvider,
    private nav: App
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }

  logout(){
    this.storage.resetAll();
    this.nav.getRootNav().push(LoginPage);
  }
}
