import { Component, ViewEncapsulation,ElementRef,ViewChild,Injectable } from '@angular/core';
declare let jQuery: any;

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LocalDataSource } from 'ng2-smart-table';
import { forEach } from "@angular/router/src/utils/collection";

@Component({
  selector: '[bids]',
  templateUrl: './bids.template.html',
  styleUrls: [ './bids.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class Bids {
  biddate: Date = new Date();
  bidexpair:Date =this.biddate;
  
  datepickerOpts = {
      startDate: new Date(),
      autoclose: true,
      todayBtn: 'linked',
      todayHighlight: true,
      assumeNearbyYear: true,
      format: 'm/d/yyyy',
      icon: 'fa fa-calendar'
  }

  




  quantity : FirebaseListObservable<any[]>;
  unit =[];
  item : FirebaseListObservable<any[]>;
  items : FirebaseListObservable<any[]>;
  trade =[];
  vendors : FirebaseListObservable<any[]>;
  material =[];
  itemsarray = [];
  additem = [];
  estimatordata =[];
  protype23:FirebaseListObservable<any[]>;
    constructor(db:AngularFireDatabase,private elementRef:ElementRef) {
      this.quantity = db.list('/quantitys');
      this.item = db.list('/costdatas');
      this.items = db.list('/items');
      this.vendors = db.list('/vendors');
      this.protype23 = db.list('/protypes');

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

      this.item.subscribe(item=>item.forEach(items=>{
       // this.itemsarray.push({itemkey:items.$key,item:items.itemname});
        this.itemsarray.push(items);
      }))
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
          materialname:{title:'Material Name',filter:false,
          editor:{
            type:'list',
            config:{
              list:this.material
            }
          }},
          materialquantity: {title:'Material Quantity',filter:false},
          materialunit: {title:'Material Unit',filter:false,
          editor:{
            type:'list',
            config:{
              list:this.unit
            }
          }},    
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
        materialname:{title:'Material Name',filter:false,
        editor:{
          type:'list',
          config:{
            list:[{value:"kg",title:"KG"}]
          }
        }},
        materialquantity: {title:'Material Quantity',filter:false},
        materialunit: {title:'Material Unit',filter:false,
        editor:{
          type:'list',
          config:{
            list:[{value:"kg",title:"KG"}]
          }
        }},    
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
      var indatadata={};
      if(data.itemname!=""){     
        indatadata={
          itemname:data.itemname,
          notes:data.notes,
          trade:data.trade,
          material:this.materialdata          
        }
      this.item.push(indatadata);
      this.success = "Item Added Successfully";
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
    datepickerexpairOpts= {
      startDate: this.biddate,
      autoclose: true,
      todayBtn: 'linked',
      todayHighlight: true,
      assumeNearbyYear: true,
      format: 'm/d/yyyy',
      icon: 'fa fa-calendar'
  }
    handleDateFromChange(event){      
      var tomorrow = event;
      tomorrow.setDate(tomorrow.getDate() + 1);
      this.bidexpair=tomorrow;
      this.datepickerexpairOpts = {
        startDate:  tomorrow,
        autoclose: true,
        todayBtn: 'linked',
        todayHighlight: true,
        assumeNearbyYear: true,
        format: 'm/d/yyyy',
        icon: 'fa fa-calendar'
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
      this.additem.splice(this.additem.indexOf(value),1);
    }

    getestimatordata(){
      this.additem.forEach(function(value,index,arr){

      });
      //this.estimatordata
    }
    changecostbyqty(event,item,id){
      var qty= event.target.value;
      var price1 :any;    
      var total :any;  
      item.material.forEach(function(value2,index,arr){
        if(qty==value2.quantity){
        price1=value2.price;
        var aj:any = document.getElementById("adj_"+id);
        total = (price1*aj.value);  
        document.getElementById("price_"+id).innerHTML=price1;
        document.getElementById("total_"+id).innerHTML=total;
        }
      });
    }
changeadj(event,id){
  var price:any= document.getElementById("price_"+id).innerHTML;
  var adj :any =event.target.value;
  var total :any = (price*adj);
  document.getElementById("total_"+id).innerHTML=total;
}

addnewprotype(event){
  if(event.target.value=='addnew'){
   document.getElementById("openaddprotypemodel").click();
  }
}

addprotype(data){
  if(data.protype!=''){
  this.protype23.push(data);
  console.log(data);
  document.getElementById("closeaddprotypemodel").click();
  }
}
   
}
