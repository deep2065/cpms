import { Component, ViewEncapsulation,ElementRef,ViewChild,Injectable } from '@angular/core';
declare let jQuery: any;

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LocalDataSource } from 'ng2-smart-table';
import { forEach } from "@angular/router/src/utils/collection";

@Component({
  selector: '[costdata]',
  templateUrl: './costdata.template.html',
  styleUrls: [ './costdata.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class Costdata {
  
  quantity : FirebaseListObservable<any[]>;
  unit =[];
  item : FirebaseListObservable<any[]>;
  items : FirebaseListObservable<any[]>;
  trade =[];
  vendors : FirebaseListObservable<any[]>;
  costdata : FirebaseListObservable<any[]>;
  material =[];
  items1= [];
    constructor(db:AngularFireDatabase,private elementRef:ElementRef) {
      this.quantity = db.list('/quantitys');
      this.item = db.list('/items');
      this.items = db.list('/items');
      this.vendors = db.list('/vendors');
      this.costdata = db.list('/costdatas');
var chkitem = [];
      db.list('/costdatas').subscribe(item=>item.forEach(val=>chkitem.push(val.itemname.itemname)));

      db.list('/items').subscribe(i=>i.forEach(el=>{
        if(chkitem.indexOf(el.itemname)== -1){
      this.items1.push(el);
        }

      }));  
      console.log(this.items1);

      db.list('/materials').subscribe(keys=>keys.forEach(mat=>{
        
          this.material.push({value:mat.materialname,title:mat.materialname});
        this.tableconfigration();
      }));
      db.list('/units').subscribe(keys=>keys.forEach(unit=>{
          this.unit.push({value:unit.unit,title:unit.unit});
        this.tableconfigration();
      }));

      db.list('/categorys').subscribe(keys=>keys.forEach(cat=>{
        if(cat.tradetype=='contractor')
        this.trade.push(cat);
      }));
    }
    tableconfigration(){
      this.settings = {
        
        delete: {
          confirmDelete: true,
          
        },
        add: {
          confirmCreate: true,
        },
        edit: {
          confirmSave: true,
        },
        columns: {      
          quantity:{title:'Quantity',filter:false},
          price: {title:'Price',filter:false},
          unit: {title:'Unit',filter:false,
          editor:{
            type:'list',
            config:{
              list:this.unit
            }
          }}, 
          notes:{title:'Notes',filter:false},   
          },
          actions: {         
            add: true,
            edit: false,
            delete: true,
            open: true,
            position: 'right',         
          }
      };
    }
    settings = {
      
      delete: {
        confirmDelete: true,
        
      },
      add: {
        confirmCreate: true,
      },
      edit: {
        confirmSave: true,
      },
      columns: {      
        quantity:{title:'Quantity',filter:false},
        price: {title:'Price',filter:false},
        unit: {title:'Unit',filter:false,
        editor:{
          type:'list',
          config:{
            list:this.unit
          }
        }}, 
        notes:{title:'Notes',filter:false},   
        },
        actions: {         
          add: true,
          edit: false,
          delete: true,
          open: true,
          position: 'right',         
        }
    };

    public error:string="";
    public uperror:string="";
    public updata :object={};
    public success:string ;
    public rows = [];
    public row1 :string;
    materialdata = [];
    submititem(data:any){
      var indatadata={};
      if(data.itemname!=""){     
        indatadata={
          itemname:data.itemname,
          trade:data.itemname.trade,
          material:this.materialdata,
          name:data.itemname.itemname       
        }
      this.costdata.push(indatadata);
      this.success = "Costdata Added Successfully";
      }else{
      this.error="Please Fill Quantity Name Field";
      }
    }
 
    onDeleteConfirm(event) {
      if (window.confirm('Are you sure you want to delete?')) {
        var rkey = event.data.key;
        console.log(rkey);
        var mainkey:number;
        this.materialdata.forEach(function(value,index,arr){
          if(value.key==rkey){
           mainkey= index;
          }
        })    
        this.materialdata.splice(mainkey,1);
        event.confirm.resolve();
      } else {
        event.confirm.reject();
      }
    }
  
    onSaveConfirm(event) {
      if (window.confirm('Are you sure you want to update?')) {
        var key = event.data.$key;
        //this.material.update(key,event.newData);
        event.confirm.resolve(event.newData);
      } else {
        event.confirm.reject();
      }
    }

    onCreateConfirm(event) {
      if (window.confirm('Are you sure you want to create?')) {
       // this.material.push(event.newData);
       event.newData['key']=this.materialdata.length+1;
       this.materialdata.push(event.newData);
        event.confirm.resolve(event.newData);
       // this.source.refresh();
      } else {
        event.confirm.reject();
      }
    }

}
