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

  menu : FirebaseListObservable<any[]>;
  subcategoryitems : FirebaseListObservable<any[]>;
    constructor(db:AngularFireDatabase) {
      this.menu = db.list('/menus');
    }
  
    public error:string="";
    public uperror:string="";
    public updata :object={};
    submitcategory(data:any){
      if(data.cname!=""){
      this.menu.push(data);
      }else{
      this.error="Please Fill SubCategory Name Field";
      }
    }
    updatecategory(data:any){
      if(data.cname!=""){
     // this.categoryitems.push(data);
     var key = data.key;
     delete data.key;
     this.menu.update(key,data);
      }else{
      this.uperror="Please Fill SubCategory Name Field";
      }
    }
    deletecategory(data:any){
      var key = data.$key;
      this.menu.remove(key);
      console.log(key);
    }

    editcategory(data:any){
      this.updata=data;
    }

}
