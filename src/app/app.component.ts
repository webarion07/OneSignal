import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';


// import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';
import { isCordovaAvailable } from '../common/is-cordova-available';
import { oneSignalAppId, sender_id } from '../config';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(private oneSignal: OneSignal,public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      if (isCordovaAvailable()){
        this.oneSignal.startInit(oneSignalAppId, sender_id);
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
        this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
       
    // AND THIS METHOD RETURN YOUR DEVICES USER_ID

    this.oneSignal.getIds().then(identity => {
      console.log(identity.pushToken + ' its PUSHTOKEN'); 
      console.log(identity.userId + 'its USERID');
    });
        this.oneSignal.endInit();
      }

      // this.getToken();
      // this.firebaseNative.onNotificationOpen().subscribe(notif=>{
      //     console.log(notif)
      // })

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
 

  async getToken() { 
    let token;

    // if (this.platform.is('android')) {
    //   token = await this.firebaseNative.getToken();
    //   console.log("hiuser"+token)
    // } 
  
    // if (this.platform.is('ios')) {
    //   token = await this.firebaseNative.getToken();
    //   await this.firebaseNative.grantPermission();
    // } 
  }
  private onPushReceived(payload: OSNotificationPayload) {
    console.log(payload)
    //alert('Push recevied:' + payload.body);
  }
  
  private onPushOpened(payload: OSNotificationPayload) {
  console.log(payload);
  }
   
}

