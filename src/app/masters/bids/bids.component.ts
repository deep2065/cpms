import { Component, ViewEncapsulation,ElementRef,ViewChild,Injectable } from '@angular/core';
declare let jQuery: any;
declare let jsPDF;

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
  biddate:string = "";
  bidexpair:string ="";
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
  status:string='notapproved'
  totalprice:string="";
}

@Component({
  selector: '[bids]',
  templateUrl: './bids.template.html',
  styleUrls: [ './bids.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class Bids {
  biddate:Date = new Date();
  bidexpair:Date = new Date();
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
  remodel = [];
    constructor(private db:AngularFireDatabase,private elementRef:ElementRef) {
      this.quantity = db.list('/quantitys');
      this.item = db.list('/costdatas');
      this.items = db.list('/items');
      this.vendors = db.list('/vendors');
      this.protype23 = db.list('/protypes');
      this.project=db.list('/projects');

      db.list('/materials').subscribe(keys=>keys.forEach(mat=>{
        
          this.material.push({value:mat.materialname,title:mat.materialname});
        this.tableconfigration();
      }));

      db.list('/remodels').subscribe(keys=>keys.forEach(mat=>{        
          this.remodel.push(mat);
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
      //tomorrow.setDate(tomorrow.getDate() + 1);
      this.bidexpair=tomorrow;
      this.datepickerexpairOpts = {
        startDate:   this.bidexpair,
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
        var notes1:any =  document.getElementById("notes_"+id);
        var trade1:any = document.getElementById("trade_"+id);
        estimate={item:itemname,quantity:qty,price:price1,factor:aj.value,ltotal:total,notes:notes1.value,trade:trade1.value};
        
       // estimate={item:itemname,quantity:qty,price:price1,factor:aj.value,ltotal:total,notes:notes1.value};
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
    var total :any = (price*adj.value)*quantyti.value;
    document.getElementById("total_"+id).innerHTML=total;

    var itemname =  document.getElementById("itemname_"+id).innerHTML;
    var notes1:any =  document.getElementById("notes_"+id);
    var trade1:any = document.getElementById("trade_"+id);
    estimate={item:itemname,quantity:quantyti.value,price:price,factor:adj.value,ltotal:total,notes:notes1.value,trade:trade1.value};
    
   // estimate={item:itemname,quantity:quantyti.value,price:price,factor:adj.value,ltotal:total,notes:notes1.value};
    this.estimator[id]=estimate;
 // }else{
  //  alert(quantyti.value+" High value "+adj);
 // }
  
}

addnote($event,id){
  var estimate;
  var quantyti:any= document.getElementById("quantyti_"+id);
  var adj :any = document.getElementById("adj_"+id);
 // if(adj.value<quantyti.value){
    //adj.value=quantyti.value;
    var price:any= document.getElementById("price_"+id).innerHTML;    
    var total :any = (price*adj.value)*quantyti.value;

    var itemname =  document.getElementById("itemname_"+id).innerHTML;
    var notes1:any =  document.getElementById("notes_"+id);
    //estimate={item:itemname,quantity:quantyti.value,price:price,factor:adj.value,ltotal:total,notes:notes1.value};
    var trade1:any = document.getElementById("trade_"+id);
    estimate={item:itemname,quantity:quantyti.value,price:price,factor:adj.value,ltotal:total,notes:notes1.value,trade:trade1.value};
    
    this.estimator[id]=estimate;

}
accept=true;
submitbid(){
  if(this.prodata.projecttype==''){
    this.accept=false;
    document.getElementById("projecttypemsg").innerHTML='Please Select Project Type';    
    return false;
  }
  if(this.accept){
  this.prodata.items=this.additem;
  this.prodata.estimator=this.estimator
  var total:any=0
  this.estimator.forEach(function(val,ind,arr){
    total+= parseFloat(val.ltotal);
  });
  this.prodata.totalprice=total.toString();
  this.prodata.biddate = this.biddate.toDateString();
  this.prodata.bidexpair = this.bidexpair.toDateString();
  this.project.push(this.prodata);
  this.prodata=new projectdata();
  this.additem=[];
  this.estimator=[];
  //console.log(this.prodata);
}
}

validate(event){
console.log(event);
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
var trade1:any = document.getElementById("trade_"+id);
estimate={item:itemname,quantity:myNumber,price:theNumber,factor:adj.value,ltotal:total,trade:trade1.value};
this.estimator[id]=estimate;
}

loaditems(data){
  this.remodel.forEach(re=>{
    if(re.$key==data){
      this.additem=re.items;
    }
  })
  console.log(this.additem)
}
   
preview(){
 
var doc = new jsPDF('p','pt', 'a4', true);
doc.rect(40, 35, 157, 165);
doc.setFontSize(12);
doc.text(45, 25, this.prodata.companyname);
doc.text(45, 45, 'Client Info');
//doc.line(50, 50, 80, 80);
doc.text(45, 60, this.prodata.projecttype);
doc.text(45, 75, this.prodata.clientname);
doc.text(45, 90, this.prodata.clientadd);
doc.text(45, 120, this.prodata.clientname);
doc.text(45, 135, this.prodata.clientmobile);

//Bid info

doc.rect(220, 35, 157, 165);
doc.text(225, 45, 'Bid Info');
doc.text(225, 60, 'Remodel Type');
var name='';
this.db.list('/remodels').subscribe(r=>r.forEach(re=>{
  if(re.$key==this.prodata.remodeltype){
    name= re.remodelname;
  }
})); 
doc.text(225, 75, name);

doc.text(225, 90, '#Bed Rooms :- ');
doc.text(320, 90, this.prodata.bedroom);

doc.text(225, 120, '#Bath Rooms :- ');
doc.text(320, 120, this.prodata.bathroom);

doc.text(225, 150, 'Garage :- ');
doc.text(320, 150, this.prodata.garagetype);

doc.text(225, 180, 'Carpot :- ');
doc.text(320, 180, this.prodata.carpot);

//ganeral info

doc.rect(400, 35, 155,165);
doc.text(405, 45, 'General Info');
doc.text(405, 60, 'Bid Date :- ');
doc.text(405, 75, this.biddate.toDateString());

doc.text(405, 90, 'Bid Expiry :- ');
doc.text(405, 105, this.bidexpair.toDateString());

doc.text(405, 120, 'Prepared By');
doc.text(405, 135, this.prodata.preparedby);

doc.text(405, 150, 'Supervisor');
doc.text(405, 165, this.prodata.supervisor);

var col = ["Items", "Quantity","Unit Cost", "Adjustment Factor", "Line Total","Notes"];
//var col = ["Items", "Quantity","Unit Cost"];
var rows = [];
var total:any=0;
this.estimator.forEach(function(val,key,arr){ 
  var temp = [val.item,val.quantity,val.price,val.factor,val.ltotal, val.notes];
 // var temp = [val.item,val.quantity,val.price];
  rows.push(temp);
  total+=val.ltotal;
});
rows.push(['','','','Total',total,'']);
doc.autoTable(col, rows,{margin: {top: 220}});
  //doc.save('Test.pdf');
  //var pdf =btoa(doc.output('datauristring'));
  //window.open(atob(pdf));
  doc.output("dataurlnewwindow");
 // window.open(URL.createObjectURL(blob));
  //alert("This Functionality is Devlping Mode");
}
}
