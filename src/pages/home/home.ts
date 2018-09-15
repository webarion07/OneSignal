import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http/';
import { HttpHeaders } from '@angular/common/http';
import { OneSignal } from '@ionic-native/onesignal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private http: HttpClient) {

  }
  sendNotification() 
  {  
    var sendNotification = function(data) {
      var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic MmE2ZTliNGMtNTlkNC00N2YyLTlkM2EtYzc4MjIwZTc2NDBk"
      };
      
      var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
      };
      
      var https = require('https');
      var req = https.request(options, function(res) {  
        res.on('data', function(data) {
          console.log("Response:");
          console.log(JSON.parse(data));
        });
      });
      
      req.on('error', function(e) {
        console.log("ERROR:");
        console.log(e);
      });
      
      req.write(JSON.stringify(data));
      req.end();
    };
    
    var message = { 
      app_id: "608c2a94-a55b-4727-a421-86c49da006a3",
      contents: {"en": "English Message"},
      included_segments: ["All"]
    };
    
    sendNotification(message);
  }
}
