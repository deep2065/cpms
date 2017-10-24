import { Component, ViewEncapsulation } from '@angular/core';
declare let jQuery: any;

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';


@Component({
  selector: '[material]',
  templateUrl: './material.template.html',
  styleUrls: [ './material.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class Material {
  
  material : FirebaseListObservable<any[]>;
 listmaterial =false;
    constructor(db:AngularFireDatabase) {
      this.material = db.list('/materials');
    }
  
    public error:string="";
    public uperror:string="";
    public updata :object={};
    public success:string ;
    submititem(data:any){
      if(data.materialname!=""){
      this.material.push(data);
      this.success = "Material Added Successfully";
      this.listmaterial=true;
      }else{
      this.error="Please Fill Material Name Field";
      }
    }


    onlynumber(e){
      var code = e.keyCode;
     // console.log();
      if(code>=96 && code<=105 || code==8){
        return true;
      }else{
        return false;
      }
    }
   

}
