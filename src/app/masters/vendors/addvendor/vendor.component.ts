import { Component, ViewEncapsulation,Output  } from '@angular/core';

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

declare let jQuery: any;

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import {CategoryModel} from './categoryform';
import 'rxjs/add/operator/map';


@Component({
  selector: '[vendor]',
  templateUrl: './vendor.template.html',
  styleUrls: [ './vendor.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class Vendor {
  birthDate: Date = null;
  expirationDate: Date = null;

  datepickerOpts: any = {
   placeholder: ' '
  };

  categoryitems : FirebaseListObservable<any[]>;
  vendors : FirebaseListObservable<any[]>;
  public trade=[];
    constructor(db:AngularFireDatabase) {
      this.categoryitems = db.list('/categorys');
      this.vendors = db.list('/vendors');
      db.list('/categorys').subscribe(keys=>keys.forEach(cat=>{
        if(cat.tradetype=='vendor')
        this.trade.push(cat);
      }));
    }
  
    public error:string="";
    public uperror:string="";
    public updata :object={};
    public success :string;
    addvendor(data:any){ 
      if(data.cname!=""){
      this.vendors.push(data);
     this.success ="Vendor Record Inserted";
    
      }else{
      this.error="Please Fill All Mandatory  Field";
      }
    }
    updatevendor(data:any){
      if(data.cname!=""){
     // this.categoryitems.push(data);
     var key = data.key;
     delete data.key;
     this.vendors.update(key,data);
      }else{
      this.uperror="Please Fill All Mandatory Field";
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
