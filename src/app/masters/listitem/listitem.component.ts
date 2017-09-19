import { Component, ViewEncapsulation } from '@angular/core';

declare let jQuery: any;


import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';


@Component({
  selector: '[listitem]',
  templateUrl: './listitem.template.html',
  styleUrls: [ './listitem.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class Listitem {
 
  
  
  item : FirebaseListObservable<any[]>;
  items : FirebaseListObservable<any[]>;
    constructor(db:AngularFireDatabase) {
      this.item = db.list('/items');
      this.items = db.list('/items');
    }

  
    public error:string="";
    public uperror:string="";
    public updata :object={};
    public success :string;
    updateitem(data:any){
      if(data.cname!=""){
     // this.categoryitems.push(data);
     var key = data.key;
     delete data.key;
     this.item.update(key,data);
     this.success = "Item Updated Successfully";
      }else{
      this.uperror="Please Fill All Field";
      }
    }
    deleteitem(data:any){
      var key = data.$key;
      this.item.remove(key);
      console.log(key);
    }

    edititem(data:any){
      this.updata=data;
    }

}
