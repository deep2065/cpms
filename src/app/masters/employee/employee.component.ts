import { Component, ViewEncapsulation,Output  } from '@angular/core';

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

declare let jQuery: any;

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import {CategoryModel} from './categoryform';
import 'rxjs/add/operator/map';


@Component({
  selector: '[employee]',
  templateUrl: './employee.template.html',
  styleUrls: [ './employee.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class Employee {
  birthDate: Date = null;
  expirationDate: Date = null;

  datepickerOpts: any = {
   placeholder: ' '
  };

  employee : FirebaseListObservable<any[]>;
  menus : FirebaseListObservable<any[]>;
    constructor(db:AngularFireDatabase) {
      this.employee = db.list('/users');
      this.menus = db.list('/menus');
    }
  
    public error:string="";
    public uperror:string="";
    public updata :object={};
    public success :string;

    public services ={};
    addemployee(data:any){ 
      if(data.ename!=""){

var employeedetail = {
  empname:data.ename,
  empemail : data.email,
  empmobile:data.mobile,
  emppassword: data.password,
  empcode: data.ecode,
  permission: this.services
}
    this.employee.push(employeedetail);
    this.success ="Employee Record Inserted";
      }else{
        
      this.error="Please Fill All Mandatory  Field";
      }
    }
chekboxchecked(value:any,checked:boolean){
  if(checked){
    this.services[value]=value;
  }else{
delete this.services[value];
  }
}

    updateemployee(data:any){
      if(data.ename!=""){
     // this.categoryitems.push(data);
     var key = data.key;
     delete data.key;
     this.employee.update(key,data);
      }else{
      this.uperror="Please Fill All Mandatory Field";
      }
    }
    deleteemployee(data:any){
      var key = data.$key;
      this.employee.remove(key);
      console.log(key);
    }

    editemployee(data:any){
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

    public uploader: FileUploader = new FileUploader({url: URL});
    
      cancelItem(item: any): void {
        item.isUploading ? item.cancel() : item.remove();
      }
    
      floor(num: number): number {
        return Math.floor(num);
      }
    
}
