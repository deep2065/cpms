import { Component, ViewEncapsulation,ElementRef,ViewChild,Injectable } from '@angular/core';
declare let jQuery: any;

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LocalDataSource } from 'ng2-smart-table';
import { forEach } from "@angular/router/src/utils/collection";

@Component({
  selector: '[remodel]',
  templateUrl: './remodel.template.html',
  styleUrls: [ './remodel.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class Remodel {
  
  quantity : FirebaseListObservable<any[]>;
  unit =[];
  item : FirebaseListObservable<any[]>;
  items : FirebaseListObservable<any[]>;
  trade =[];
  vendors : FirebaseListObservable<any[]>;
  material =[];
  items1 = [];
  remodelitem=[];
  cosdatas : FirebaseListObservable<any[]>;

  itemsarray = [];
  source: LocalDataSource;
  list = [];
    filTipo: string = 'todos';
    open:Number=0;
   // settings:any;
    dados: FirebaseListObservable<any[]>;
    additem = [];
    constructor(private db:AngularFireDatabase,private elementRef:ElementRef) {
      this.quantity = db.list('/quantitys');
      this.item = db.list('/remodels');
      this.items = db.list('/remodels');
      this.vendors = db.list('/vendors');
      this.db.list('/costdatas').subscribe(item=>item.forEach(items=>{
        // this.itemsarray.push({itemkey:items.$key,item:items.itemname});
         this.itemsarray.push(items);
       }))

     this.db.list('/items').subscribe(i=>i.forEach(it=>this.items1.push(it.itemname)));

      db.list('/costdatas').subscribe(keys=>keys.forEach(mat=>{        
          this.remodelitem.push({value:mat.$key,title:mat.itemname.itemname});
        this.tableconfigration();
      }));

      this.dados = this.db.list('/costdatas');
      this.source = new LocalDataSource();
      let _self = this;
      this.dados.forEach(element => {
        _self.source.load(element);
      });

    /*  db.list('/materials').subscribe(keys=>keys.forEach(mat=>{
        
          this.material.push({value:mat.materialname,title:mat.materialname});
        this.tableconfigration();
      }));*/
      db.list('/units').subscribe(keys=>keys.forEach(unit=>{
          this.unit.push({value:unit.unit,title:unit.unit});
        this.tableconfigration();
      }));
this.cosdatas =db.list('/costdatas');
      db.list('/categorys').subscribe(keys=>keys.forEach(cat=>{
        if(cat.tradetype=='contractor')
        this.trade.push(cat);
      }));
    }
    tableconfigration(){
      this.settings = {
        selectMode: 'multi',
        
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
          name:{title:'Remodel Item Name',filter:true,
        },             
          },
          actions: {         
            add: true,
            edit: true,
            delete: true,
            open: true,
            position: 'right',         
          }
      };
    }
    settings = {
      selectMode: 'multi',
      
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
        name:{title:'Remodel Item Name',filter:true,
      },             
        },
        actions: {         
          add: true,
          edit: true,
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
      if(this.accept){
      var indatadata={};
      if(data.itemname!=""){     
        indatadata={
          remodelname:data.itemname,
          notes:data.notes,
          //trade:data.trade,
          items:this.additem          
        }
      this.item.push(indatadata);
      this.success = "Item Added Successfully";
      }else{
      this.error="Please Fill Quantity Name Field";
      }
    }else{
      this.error="The Item Mterial Is already Created.";
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
accept=false;
    chkname(val:any){
      if(this.items1.indexOf(val)> -1){
        this.error="The Item Mterial Is already Created.";
        document.getElementById('itemnamematerial').focus();
        document.getElementById('itemnamematerial').className='form-control ng-untouched ng-pristine ng-valid error';
      }else{
        this.accept=true;
        this.error="";
        document.getElementById('itemnamematerial').className='form-control ng-untouched ng-pristine ng-valid';
        
      }
    }


    checkditem(event,value){
      if(event.target.checked){
        this.additem.push(value);
      }else{
        this.additem.splice(this.additem.indexOf(value),1);
      }
      console.log(this.additem);
    }

    removeitemfromarray(value){
      var id:any;
      this.additem.splice(this.additem.indexOf(value),1);
    }


}
