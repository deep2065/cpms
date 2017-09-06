import { Component, ViewEncapsulation } from '@angular/core';
declare let jQuery: any;

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import {CategoryModel} from './categoryform';


@Component({
  selector: '[subcategory]',
  templateUrl: './subcategory.template.html',
  styleUrls: [ './subcategory.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class SubCategory {
  birthDate: Date = null;
  expirationDate: Date = null;

  datepickerOpts: any = {
   placeholder: ' '
  };

  categoryitems : FirebaseListObservable<any[]>;
  subcategoryitems : FirebaseListObservable<any[]>;
    constructor(db:AngularFireDatabase) {
      this.categoryitems = db.list('/categorys');
      this.subcategoryitems = db.list('/subcategorys');
    }
  
    public error:string="";
    public uperror:string="";
    public updata :object={};
    submitcategory(data:any){
      if(data.cname!=""){
      this.subcategoryitems.push(data);
      }else{
      this.error="Please Fill SubCategory Name Field";
      }
    }
    updatecategory(data:any){
      if(data.cname!=""){
     // this.categoryitems.push(data);
     var key = data.key;
     delete data.key;
     this.subcategoryitems.update(key,data);
      }else{
      this.uperror="Please Fill SubCategory Name Field";
      }
    }
    deletecategory(data:any){
      var key = data.$key;
      this.subcategoryitems.remove(key);
      console.log(key);
    }

    editcategory(data:any){
      this.updata=data;
    }

}
