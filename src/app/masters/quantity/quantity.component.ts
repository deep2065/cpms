import { Component, ViewEncapsulation } from '@angular/core';
declare let jQuery: any;

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';


@Component({
  selector: '[quantity]',
  templateUrl: './quantity.template.html',
  styleUrls: [ './quantity.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class Quantity {
  
  quantity : FirebaseListObservable<any[]>;
  unit : FirebaseListObservable<any[]>;
    constructor(db:AngularFireDatabase) {
      this.quantity = db.list('/quantitys');
      this.unit = db.list('/units');
    }
  
    public error:string="";
    public uperror:string="";
    public updata :object={};
    public success:string ;
    submitquantity(data:any){
      if(data.cname!=""){
      this.quantity.push(data);
      this.success = "Quantity Added Successfully";
      }else{
      this.error="Please Fill Quantity Name Field";
      }
    }
    updatequantity(data:any){
      if(data.cname!=""){
     // this.categoryitems.push(data);
     var key = data.key;
     delete data.key;
     this.quantity.update(key,data);
      }else{
      this.uperror="Please Fill SubCategory Name Field";
      }
    }
    deletequantity(data:any){
      var key = data.$key;
      this.quantity.remove(key);
      console.log(key);
    }

    editquantity(data:any){
      this.updata=data;
    }

}
