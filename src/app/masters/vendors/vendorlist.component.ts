import { Component, ViewEncapsulation } from '@angular/core';
declare let jQuery: any;

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';



@Component({
  selector: '[vendorlist]',
  templateUrl: './vendorlist.template.html',
  styleUrls: [ './vendorlist.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class VendorList {
  birthDate: Date = null;
  expirationDate: Date = null;

  datepickerOpts: any = {
   placeholder: ' '
  };

  
  vendors : FirebaseListObservable<any[]>;
    constructor(db:AngularFireDatabase) {
      this.vendors = db.list('/vendors');
      console.log(this.vendors);
    }
    public error:string="";
    public uperror:string="";
    public updata :object={};
   
    updatevendor(data:any){
      if(data.cname!=""){
     // this.categoryitems.push(data);
     var key = data.key;
     delete data.key;
     this.vendors.update(key,data);
      }else{
      this.uperror="Please Fill Category Name Field";
      }
    }
    deletevendor(data:any){
      var key = data.$key;
      this.vendors.remove(key);
      console.log(key);
    }

    editvendor(data:any){
      this.updata=data;
    }

}
