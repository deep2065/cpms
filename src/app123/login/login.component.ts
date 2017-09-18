import { Component } from '@angular/core';

import {LoginService} from '../login.service';

import { ActivatedRoute, Router }       from '@angular/router';

@Component({
  selector: 'login',
  styleUrls: [ './login.style.scss' ],
  templateUrl: './login.template.html',
  host: {
    class: 'login-page app'
  }
})
export class Login {
  constructor(private loginservice : LoginService, private route :Router) {
    if(this.loginservice.isLogin){
      //this.route.navigate(["/dashboard"]);
    }
  }
  login(data :any){
//console.log(data);
this.loginservice.loginWithEmail(data.email,data.password);
//this.route.navigate(["/app/dashboard"]);
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
