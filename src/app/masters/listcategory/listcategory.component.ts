import { Component, ViewEncapsulation } from '@angular/core';

declare let jQuery: any;


import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';


@Component({
  selector: '[listcategory]',
  templateUrl: './listcategory.template.html',
  styleUrls: [ './listcategory.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class Listcontractor {
  birthDate: Date = null;
  expirationDate: Date = null;

  datepickerOpts: any = {
   placeholder: ' '
  };

  
  
  categoryitems : FirebaseListObservable<any[]>;
    constructor(db:AngularFireDatabase) {
      this.categoryitems = db.list('/categorys');
    }

  
    public error:string="";
    public uperror:string="";
    public updata :object={};
    submitcategory(data:any){
      if(data.cname!=""){
      this.categoryitems.push(data);
      }else{
      this.error="Please Fill Category Name Field";
      }
    }
    updatecategory(data:any){
      if(data.cname!=""){
     // this.categoryitems.push(data);
     var key = data.key;
     delete data.key;
     this.categoryitems.update(key,data);
      }else{
      this.uperror="Please Fill Category Name Field";
      }
    }
    deletecategory(data:any){
      var key = data.$key;
      this.categoryitems.remove(key);
      console.log(key);
    }

    editcategory(data:any){
      this.updata=data;
    }

}
