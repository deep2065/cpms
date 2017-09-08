import { Component, ViewEncapsulation } from '@angular/core';
declare let jQuery: any;

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import {CategoryModel} from './categoryform';
import 'rxjs/add/operator/map';


@Component({
  selector: '[listcontractor]',
  templateUrl: './listcontractor.template.html',
  styleUrls: [ './listcontractor.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class ListContractor {
  birthDate: Date = null;
  expirationDate: Date = null;

  datepickerOpts: any = {
   placeholder: ' '
  };

  categoryitems : FirebaseListObservable<any[]>;
  contractors : FirebaseListObservable<any[]>;
    constructor(db:AngularFireDatabase) {
      this.categoryitems = db.list('/categorys');
      this.contractors = db.list('/contractors');
    }
  
    public error:string="";
    public uperror:string="";
    public updata :object={};
   
    updatecontractor(data:any){
      if(data.cname!=""){
     // this.categoryitems.push(data);
     var key = data.key;
     delete data.key;
     this.contractors.update(key,data);
      }else{
      this.uperror="Please Fill All Mandatory Field";
      }
    }
    deletecontractor(data:any){
      var key = data.$key;
      this.contractors.remove(key);
      console.log(key);
    }

    editcontractor(data:any){
      this.updata=data;
    }
   
    
    isChar(key:number){
      /*if((key>=65 || key<=90) || key==32 ){
        return true;
      }else{
        return false;
      }*/
    }

    isNumber(key:number){
     /* if((key>=96 || key<=105) && key==32 ){
        return true;
      }else{
        return false;
      }*/
    }
    
}
