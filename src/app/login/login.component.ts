import { Component } from '@angular/core';

import {LoginService} from '../login.service';

import { ActivatedRoute, Router }       from '@angular/router';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
  selector: 'login',
  styleUrls: [ './login.style.scss' ],
  templateUrl: './login.template.html',
  host: {
    class: 'login-page app'
  }
})
export class Login {
  constructor(private loginservice : LoginService, private route :Router, private db :AngularFireDatabase) {
    if(this.loginservice.isLogin){
      this.route.navigate(["/app/dashboard"]);
    }
  }
  public error :string;
  login(data :any){
var going = true;
var users = this.db.list('/users').subscribe(keys =>keys.forEach(element => {
  if(going){
 if(element.empemail==data.email && element.emppassword==data.password ){
 window.sessionStorage.setItem("isLogin","true");
 window.sessionStorage.setItem("userkey",element.$key);
 window.sessionStorage.setItem("username",element.empname);
 this.loginservice.isLogin=true;
going = false;
this.route.navigate(["/app/dashboard"]);
 }else{
  this.error = "Username and Password Not Match";
 }
  }    
}));

  }

  registeruser(){
    var data ={
      name:"User",
      email:"User@email.com",
      password:"user"
    };
    this.loginservice.registerUser(data.name,data.email,data.password);
  }
}
