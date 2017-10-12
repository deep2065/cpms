import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {HttpClient} from '@angular/common/http';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Resolve } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EmailService {


  results: string[];
  
   // Inject HttpClient into your component or service.
   constructor(private http: HttpClient) {}
  

  sendemail(to,subject,body,callback){
    //var msg:string = 'to=dkk152207@gmail.com&subject=&msg=';
 this.http.post('http://zaptas.com/Zaptas/nodejsemail',{to:to,subject:subject,msg:body}).subscribe(data=>{
callback(data);
  });
  
}
/*
sendemailwithatouttachment(to,subject,body,callback){
  var server  = email.server.connect({
    user:    "SMTP_Injection", 
    password:"e5058207a72c75294c6556e75c74919a3fff27a5", 
    host:    "smtp.sparkpostmail.com", 
    ssl:     true
 });

 server.send({
  text:    body, 
  from:    "admin@mail.zaptas.com", 
  to:      to,
  subject: subject,
  
}, function(err, message) { 
   if(err)
   callback(err,null);
   else
   callback({success: true, msg: 'sent'});
});
}*/

}
