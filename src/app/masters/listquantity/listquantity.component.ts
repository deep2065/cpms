import { Component, ViewEncapsulation } from '@angular/core';
declare let jQuery: any;

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';



@Component({
  selector: '[listquantity]',
  templateUrl: './listquantity.template.html',
  styleUrls: [ './listquantity.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class Listquantity {
  
  quantity : FirebaseListObservable<any[]>;
    constructor(db:AngularFireDatabase) {
      this.quantity = db.list('/quantitys');
    }
  
    public error:string="";
    public uperror:string="";
    public updata :object={};
    public success:string ;
   
    updatequantity(data:any){
      if(data.cname!=""){
     // this.categoryitems.push(data);
     var key = data.key;
     delete data.key;
     this.quantity.update(key,data);
     this.success ="Quantity Updated Successfully";
      }else{
      this.uperror="Please Fill All Field";
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
