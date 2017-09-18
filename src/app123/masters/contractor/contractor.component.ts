import { Component, ViewEncapsulation } from '@angular/core';
declare let jQuery: any;

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import {CategoryModel} from './categoryform';
import 'rxjs/add/operator/map';


@Component({
  selector: '[contractor]',
  templateUrl: './contractor.template.html',
  styleUrls: [ './contractor.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class Contractor {
  birthDate: Date = null;
  expirationDate: Date = null;

  datepickerOpts: any = {
   placeholder: ' '
  };

  categoryitems : FirebaseListObservable<any[]>;
  subcategoryitems : FirebaseListObservable<any[]>;
  fsubcategoryitems : object;
  contractors : FirebaseListObservable<any[]>;
    constructor(db:AngularFireDatabase) {
      this.categoryitems = db.list('/categorys');
      this.subcategoryitems = db.list('/subcategorys');
      this.contractors = db.list('/contractors');
    }
  
    public error:string="";
    public uperror:string="";
    public updata :object={};
    public success :string;
    addcontractor(data:any){   
      
      if(data.cname!=""){
      this.contractors.push(data);
      this.success = "Contractor Record Inserted";
      }else{
      this.error="Please Fill All Mandatory  Field";
      }
    }
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
   
    getsubcategory(data:any){
    //  console.log(data);
      var d1 = this.subcategoryitems.map(subcategoryitems => subcategoryitems.filter(s => new RegExp(`^${data}`, 'gi').test(s)));

      console.log(d1);

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
