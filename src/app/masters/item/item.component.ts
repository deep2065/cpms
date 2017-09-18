import { Component, ViewEncapsulation } from '@angular/core';
declare let jQuery: any;

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';


@Component({
  selector: '[item]',
  templateUrl: './item.template.html',
  styleUrls: [ './item.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class Item {
  
  quantity : FirebaseListObservable<any[]>;
  unit : FirebaseListObservable<any[]>;
  item : FirebaseListObservable<any[]>;
  trade : FirebaseListObservable<any[]>;
  vendors : FirebaseListObservable<any[]>;
    constructor(db:AngularFireDatabase) {
      this.quantity = db.list('/quantitys');
      this.unit = db.list('/units');
      this.item = db.list('/items');
      this.trade = db.list('/categorys');
      this.vendors = db.list('/vendors');
    }
  
    public error:string="";
    public uperror:string="";
    public updata :object={};
    public success:string ;
    submititem(data:any){
      if(data.itemquantity!=""){
      this.item.push(data);
      this.success = "Item Added Successfully";
      }else{
      this.error="Please Fill Quantity Name Field";
      }
    }
    updateitem(data:any){
      if(data.itemquantity!=""){
     var key = data.key;
     delete data.key;
     this.item.update(key,data);
      }else{
      this.uperror="Please Fill SubCategory Name Field";
      }
    }
    deleteitem(data:any){
      var key = data.$key;
      this.item.remove(key);
    }

    edititem(data:any){
      this.updata=data;
    }

}
