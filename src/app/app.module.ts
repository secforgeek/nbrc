import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { Toast } from '@ionic-native/toast';
import { FCM } from '@ionic-native/fcm';

import { HomePage } from '../pages/home/home';
import { AlertsProvider } from '../providers/alerts/alerts';
import { StorageProvider } from '../providers/storage/storage';
import { PostmanProvider } from '../providers/http/postman';
import { OrdersPage } from '../pages/orders/orders';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OrdersPage,
    TabsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    OrdersPage,
    TabsPage,
    LoginPage
  ],
  providers: [
    FCM,
    Toast,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AlertsProvider,
    StorageProvider,
    PostmanProvider
  ]
})
export class AppModule {}
