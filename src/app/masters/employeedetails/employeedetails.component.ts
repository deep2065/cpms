import { Component, ViewEncapsulation,Output  } from '@angular/core';

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

declare let jQuery: any;

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import {CategoryModel} from './categoryform';
import 'rxjs/add/operator/map';

import { ActivatedRoute, Router }       from '@angular/router';
import {ObjectPipe}  from '../custompipes/object.pipe';


@Component({
  selector: '[employeedetails]',
  templateUrl: './employeedetails.template.html',
  styleUrls: [ './employeedetails.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class Employeedetails {
  birthDate: Date = null;
  expirationDate: Date = null;

  datepickerOpts: any = {
   placeholder: ' '
  };

  vendor =[];
    constructor(private db:AngularFireDatabase, private aroute:ActivatedRoute) {
      
      var key:any;
      this.aroute.params.subscribe(params => {
        key = params['key']; // (+) converts string 'id' to a number
     });
db.list('/users').subscribe(keys=>keys.forEach(ele=>{
  if(ele.$key==key){
    this.vendor.push(ele);
  }

}));

    }
    goback(){
      window.history.back();
    }

}
