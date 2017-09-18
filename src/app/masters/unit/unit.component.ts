import { Component, ViewEncapsulation } from '@angular/core';
declare let jQuery: any;

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';



@Component({
  selector: '[unit]',
  templateUrl: './unit.template.html',
  styleUrls: [ './unit.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class Unit {
  
  unit : FirebaseListObservable<any[]>;
  subcategoryitems : FirebaseListObservable<any[]>;
    constructor(db:AngularFireDatabase) {
      this.unit = db.list('/units');
    }
  
    public error:string="";
    public uperror:string="";
    public updata :object={};
    public success:string ;
    submitunit(data:any){
      if(data.cname!=""){
      this.unit.push(data);
      this.success = "Unit Added Successfully";
      }else{
      this.error="Please Fill Unit Name Field";
      }
    }
    updateunit(data:any){
      if(data.cname!=""){
     // this.categoryitems.push(data);
     var key = data.key;
     delete data.key;
     this.unit.update(key,data);
      }else{
      this.uperror="Please Fill Unit Name Field";
      }
    }
    deleteunit(data:any){
      var key = data.$key;
      this.unit.remove(key);
      console.log(key);
    }

    editunit(data:any){
      this.updata=data;
    }

}
