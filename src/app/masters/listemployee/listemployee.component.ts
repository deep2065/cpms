import {Component, ViewEncapsulation } from '@angular/core';
declare let jQuery: any;

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {ObjectPipe}  from '../custompipes/object.pipe';


@Component({
  selector: '[listemployee]',
  templateUrl: './listemployee.template.html',
  styleUrls: [ './listemployee.style.scss' ],
  encapsulation: ViewEncapsulation.None,

})
export class Listemployee {
  birthDate: Date = null;
  expirationDate: Date = null;

  datepickerOpts: any = {
   placeholder: ' '
  };

  
  employee : FirebaseListObservable<any[]>;
    constructor(db:AngularFireDatabase) {
      this.employee = db.list('/users');
    }
    public error:string="";
    public uperror:string="";
    public updata :object={};
   
    updateemployee(data:any){
      if(data.cname!=""){
     // this.categoryitems.push(data);
     var key = data.key;
     delete data.key;
     this.employee.update(key,data);
      }else{
      this.uperror="Please Fill Category Name Field";
      }
    }
    deleteemployee(data:any){
      var key = data.$key;
      this.employee.remove(key);
      console.log(key);
    }

    editemployee(data:any){
      this.updata=data;
    }

}
