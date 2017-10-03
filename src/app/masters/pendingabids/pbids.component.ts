import { Component, ViewEncapsulation,ElementRef,ViewChild,Injectable } from '@angular/core';
declare let jQuery: any;

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LocalDataSource } from 'ng2-smart-table';
import { forEach } from "@angular/router/src/utils/collection";

export class projectdata {
  projecttype:string="";
  clientname:string="";
  companyname:string="";
  clientadd:string="";
  clientemail:string="";
  clientmobile:string="";
  biddate:string="";
  bidexpair:string="";
  preparedby:string="";
  supervisor:string="";
  gcomments:string="";
  housesqft:string="";
  bedroom:string="";
  bathroom:string="";
  garagetype:string="";
  carpot:string="";
  remodeltype:string="";
  items:object;
  estimator:object;
  comment:string ="";
  totalprice:string="";
  status:string="";
}

@Component({
  selector: '[pbids]',
  templateUrl: './pbids.template.html',
  styleUrls: [ './pbids.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class Pbids {
    datepickerOpts = {
      startDate: new Date(),
      autoclose: true,
      todayBtn: 'linked',
      todayHighlight: true,
      assumeNearbyYear: true,
      format: 'm/d/yyyy',
      icon: 'fa fa-calendar'
  }
prodata = new projectdata();

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
  estimator=[];
  protype23:FirebaseListObservable<any[]>;
  project:FirebaseListObservable<any[]>;
  dropdownprojectlist = [];
    constructor(private db:AngularFireDatabase,private elementRef:ElementRef) {
      this.quantity = db.list('/quantitys');
      this.item = db.list('/costdatas');
      this.items = db.list('/items');
      this.vendors = db.list('/vendors');
      this.protype23 = db.list('/protypes');
      this.project=db.list('/projects');

      db.list('/projects').subscribe(p=>p.forEach(ele=>this.dropdownprojectlist.push({key:ele.$key,name:ele.clientname})));
      
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
      startDate: this.prodata.biddate,
      autoclose: true,
      todayBtn: 'linked',
      todayHighlight: true,
      assumeNearbyYear: true,
      format: 'm/d/yyyy',
      icon: 'fa fa-calendar'
  }
    handleDateFromChange(event){      
      var tomorrow = event;
      //tomorrow.setDate(tomorrow.getDate() + 1);
      this.prodata.bidexpair=tomorrow;
      this.datepickerexpairOpts = {
        startDate:   this.prodata.bidexpair,
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
      var id:any;
      if(this.estimator.length>0){
        this.estimator.forEach(function(val,ind,arr){
          if(val.item==value.itemname){
            id=ind;
          }
        });
        this.estimator.splice(id,1);
      }
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
      var estimate;
      item.material.forEach(function(value2,index,arr){
        if(qty==value2.quantity){
        price1=value2.price;
        var aj:any = document.getElementById("adj_"+id);
        aj.value=qty;
        total = (price1*aj.value);  
        document.getElementById("price_"+id).innerHTML=price1;
        document.getElementById("total_"+id).innerHTML=total;
        var itemname =  document.getElementById("itemname_"+id).innerHTML;
        estimate={item:itemname,quantity:qty,price:price1,factor:aj.value,ltotal:total};
        }
      });
      this.estimator[id]=estimate;
    }
changeadj(event,id){
  var estimate;
  var quantyti:any= document.getElementById("quantyti_"+id);
  var adj :any =event.target;
 // if(adj.value<quantyti.value){
    //adj.value=quantyti.value;
    var price:any= document.getElementById("price_"+id).innerHTML;    
    var total :any = (price*adj.value);
    document.getElementById("total_"+id).innerHTML=total;
    var itemname =  document.getElementById("itemname_"+id).innerHTML;
    estimate={item:itemname,quantity:quantyti.value,price:price,factor:adj.value,ltotal:total};
    this.estimator[id]=estimate;
 // }else{
  //  alert(quantyti.value+" High value "+adj);
 // }
  
}

submitbid(){
  this.prodata.items=this.additem;
  this.prodata.estimator=this.estimator
  var total:any=0
  this.estimator.forEach(function(val,ind,arr){
    total+= parseFloat(val.ltotal);
  });
  this.prodata.totalprice=total.toString();
  this.prodata.status='notapproved';
  this.project.push(this.prodata);
  this.prodata=new projectdata();
  this.additem=[];
  this.estimator=[];
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



closetnumber(event,number,id){
var myNumber:any = event.target.value;
var numbers = [];
var pri = [];
var estimate;
number.forEach(function(val,index,arr){
  numbers.push(val.quantity)
  pri.push(val.price)
});

var distance:any = Math.abs(numbers[0] - myNumber);
var idx:any = 0;
for(var c:any = 1; c < numbers.length; c++){
    var cdistance:any = Math.abs(numbers[c] - myNumber);
    if(cdistance < distance){
        idx = c;
        distance = cdistance;
    }
}
var theNumber:any = pri[idx];
var total:any = (myNumber*theNumber);
document.getElementById("price_"+id).innerHTML=theNumber;
document.getElementById("total_"+id).innerHTML=total;
var adj:any = document.getElementById("adj_"+id);
var itemname =  document.getElementById("itemname_"+id).innerHTML;
estimate={item:itemname,quantity:myNumber,price:theNumber,factor:adj.value,ltotal:total};
this.estimator[id]=estimate;
}

selectproject(event){
   this.db.list('/projects').subscribe(s=>s.forEach(ele=>{
     if(ele.$key==event.target.value){
    this.additem=ele.items;
    this.estimator=ele.estimator;
    this.prodata.clientname=ele.clientname;
    this.prodata.clientadd=ele.clientadd;
    this.prodata.clientmobile=ele.clientmobile;
    this.prodata.remodeltype = ele.remodeltype;
    this.prodata.bedroom = ele.bedroom;
    this.prodata.bathroom = ele.bathroom;
    this.prodata.garagetype = ele.garagetype;
    this.prodata.biddate = ele.biddate
    this.prodata.bidexpair = ele.bidexpair;
    this.prodata.preparedby = ele.preparedby;
    this.prodata.supervisor = ele.supervisor;
     }
   }));
   
 }
   
}
