import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
//import {AngularFireAuth , AngularFireAuthModule} from 'angularfire2/Auth';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class LoginService {
public isLogin =false;
users : FirebaseListObservable<any>;
  constructor(private db :AngularFireDatabase) { 
    if(window.sessionStorage.getItem("isLogin")){
      this.isLogin=true;
    }
  }

  registerUser(name,email, password) {
    console.log(email)
    //return this.af.auth.createUserWithEmailAndPassword(email, password);
    this.db.list('/users').push({
      name:name,
      email:email,
      password:password
    });
    return true;
  }
  loginWithEmail(email, password) {
    var match = 0;
var users = this.db.list('/users').subscribe(keys =>keys.forEach(element => {
 if(element.email==email && element.password==password ){
 console.log(element);
 return false; 
 }else{
  console.log("Username And Password not match");
 }

}));


/*this.users = this.db.list('/users/', {
  query: {
    orderByChild: 'name',
    equalTo: email
  }
)};*/
//console.log(this.users.b;
   // this.isLogin =true;
  //  window.sessionStorage.setItem("isLogin","true");
   // return this.af.auth.signInWithEmailAndPassword(email,password);
  }
  public login(){
    //return this.db.list('/users').filter(email,s=>email);
    return 
  }

}
