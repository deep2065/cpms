import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {HttpClient} from '@angular/common/http';

import { Http ,Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Resolve } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EmailService {


   results: string[];
   constructor(private http: Http) {}
  

  sendemail(to,subject,body,file,callback){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if(file){
      this.http.post('http://zaptas.com/Zaptas/mailsendfromangular/',{to:to,subject:subject,msg:body,file:file},{headers:headers}).subscribe(data=>{
        callback(data);
          });
      
    }else{
      this.http.post('http://zaptas.com/Zaptas/mailsendfromangular/',{to:to,subject:subject,msg:body},{headers:headers}).subscribe(data=>{
        callback(data);
          });      
    }
 
}


}
