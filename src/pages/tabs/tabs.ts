import { Component } from '@angular/core';
import { NavParams, Events } from 'ionic-angular'
import { HomePage } from '../home/home';
import { OrdersPage } from '../orders/orders';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;//ShowmenuPage; //ListshopsPage; // 
  tab2Root = OrdersPage;//

  mySelectedIndex: number;
  cartItem = 0;


  constructor(navParams: NavParams, public events:Events) {
    console.log("Loaded Tabs");
    this.mySelectedIndex = navParams.data.tabIndex || 0;
    this.cartUpdate();
  }

  cartUpdate(){
    console.log("Event Subscripted");
    this.events.subscribe('cart:items', basket => {
      this.cartItem = 0;
      for(let item of basket){
        if(item.quantity > 0){
          this.cartItem += item.quantity;
        }
      }
    });
  }


}
