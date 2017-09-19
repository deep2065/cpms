import { Component, ViewEncapsulation,ElementRef,ViewChild,Injectable } from '@angular/core';
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
  items : FirebaseListObservable<any[]>;
  trade : FirebaseListObservable<any[]>;
  vendors : FirebaseListObservable<any[]>;
  material : FirebaseListObservable<any[]>;
    constructor(db:AngularFireDatabase,private elementRef:ElementRef) {
      this.quantity = db.list('/quantitys');
      this.unit = db.list('/units');
      this.item = db.list('/items');
      this.items = db.list('/items');
      console.log(this.items);
      this.trade = db.list('/categorys');
      this.vendors = db.list('/vendors');
      this.material = db.list('/materials');
    }
  
    public error:string="";
    public uperror:string="";
    public updata :object={};
    public success:string ;
    public rows = [];
    public row1 :string;
    submititem(data:any){
      var indatadata={};
      if(data.itemquantity!=""){  
        
       
        indatadata={
          itemname:data.itemname,
          notes:data.notes,
          material:[{
            materialname:data.materialname_1,
            materialquantity:data.materialquantity_1,
            materialunit:data.materialunit_1
          },
          {
            materialname:data.materialname_2,
            materialquantity:data.materialquantity_2,
            materialunit:data.materialunit_2
          },
          {
            materialname:data.materialname_3,
            materialquantity:data.materialquantity_3,
            materialunit:data.materialunit_3
          }
        ]
          
        }     
//console.log(indatadata);
      this.item.push(indatadata);
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
    @ViewChild('rowbody') rowtablebody:ElementRef;

    addrows = function(item:any){
     this.rows.push(item);
     this.row1=item;
   
     //var d1 = this.elementRef.nativeElement.querySelector('#rowbodyname');
    // d1.nativeElement.insertAdjacentHTML('beforeend', item);
      console.log(this.rows)
   }
   

}
