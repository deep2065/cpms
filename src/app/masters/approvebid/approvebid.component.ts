import { Component, ViewEncapsulation,ElementRef,ViewChild,Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
declare let jQuery: any;
declare let jsPDF;

import { ActivatedRoute, Router }       from '@angular/router';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LocalDataSource } from 'ng2-smart-table';
import { forEach } from "@angular/router/src/utils/collection";

import{EmailService} from '../../sendemail/email.service';


export class projectdata {
  bidkey:string="";
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
  sign:string='';
}

@Component({
  selector: '[approvebid]',
  templateUrl: './approvebid.template.html',
  styleUrls: [ './approvebid.style.scss' ],
  encapsulation: ViewEncapsulation.None,
  providers: [EmailService]
})
export class Approvebid {
  projectstartdate:Date = new Date();
  projectenddate:Date = new Date();
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

  bidsname = [];
    constructor( private db:AngularFireDatabase,private route:Router, private elementRef:ElementRef, private sendemail:EmailService) {
      this.quantity = db.list('/quantitys');
      this.item = db.list('/costdatas');
      this.items = db.list('/items');
      this.vendors = db.list('/vendors');
      this.protype23 = db.list('/protypes');
      this.project=db.list('/projects');
db.list('/projects').subscribe(p=>p.forEach(ele=>
  {
    if(ele.status=='approve'){
    this.bidsname.push({key:ele.$key,name:ele.clientname});
    }
  }
));
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
      startDate: new Date(),
      autoclose: true,
      todayBtn: 'linked',
      todayHighlight: true,
      assumeNearbyYear: true,
      format: 'm/d/yyyy',
      icon: 'fa fa-calendar'
  }
    handleDateFromChange(event){
      this.projectenddate=event;
      this.datepickerexpairOpts = {
        startDate:   event,
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
bidid:any;
items123=[];
bidproid = '';
bidtrade=[];
selectbids(id){
  this.project.subscribe(p=>p.forEach(ele=>{
    if(ele.$key==id){
      var itrade = [];
      this.bidproid=id;
      this.bidid=ele.items;
      this.estimator=ele.estimator;
      this.prodata.clientname = ele.clientname;
      this.prodata.clientadd = ele.clientadd;
      this.prodata.clientmobile = ele.clientmobile;
      this.db.list('/remodels').subscribe(r=>r.forEach(re=>{
        if(re.$key==ele.remodeltype){
          this.prodata.remodeltype = re.remodelname;
        }
      }));    
      ele.estimator.forEach(function(val,key,arr){  
       if(itrade.indexOf(val.trade)== -1){     
       itrade.push(val.trade);
        }
        });  
      this.prodata.bedroom = ele.bedroom;
      this.prodata.bathroom = ele.bathroom;
      this.prodata.garagetype = ele.garagetype;
      this.prodata.carpot = ele.carpot;
      this.prodata.preparedby = ele.preparedby;
      this.prodata.supervisor = ele.supervisor;
      this.prodata.biddate = ele.biddate;
      this.prodata.bidexpair = ele.bidexpair;
      this.prodata.totalprice = ele.totalprice;
      this.prodata.bidkey=ele.$key;
      this.prodata.estimator=ele.estimator;
      this.prodata.projecttype=ele.projecttype;
      this.prodata.companyname=ele.companyname;
      this.prodata.clientemail=ele.clientemail;
      this.prodata.gcomments=ele.gcomments;
      this.prodata.housesqft=ele.housesqft;
      this.prodata.items=ele.items;
      this.prodata.comment=ele.comment;
      this.prodata.status='disapprove';
      this.bidtrade=itrade;
      this.prodata.sign=ele.sign||'';
    }
  }));

}

materiallist(){
  this.items123=[];
 this.bidid.forEach(ele=>{
   this.items123.push(ele.itemname);
 }); 

}

disapprove(){
  this.bidsname=[];
  if(confirm("Are you sure to disapprove this bid")){   
    this.db.list("/oldproject").push(this.prodata);
    this.db.list('/projects/'+this.bidproid).$ref.ref.child('status').set('disapprove');
  }
   }

   viewpdf(){
      for(var i=0;i<this.bidtrade.length;i++ ){
        this.makepdf(this.bidtrade[i]);
      }
      this.pdfforclient(); 
     }
  

makepdf(tval){
  
  var doc = new jsPDF('p','pt', 'a4', true);
 // doc.rect(40, 35, 157, 165);
  doc.setFontSize(12);
  doc.text(45, 25, this.prodata.companyname);
  //doc.text(45, 40, "PDF For Vendor");
 /* doc.text(45, 45, 'Client Info');
  //doc.line(50, 50, 80, 80);
  doc.text(45, 60, this.prodata.projecttype);
  doc.text(45, 75, this.prodata.clientname);
  doc.text(45, 90, this.prodata.clientadd);
  doc.text(45, 120, this.prodata.clientname);
  doc.text(45, 135, this.prodata.clientmobile);*/
  
  //Bid info
  
  doc.rect(220, 35, 157, 165);
  doc.text(225, 45, 'Bid Info');
  doc.text(225, 60, 'Remodel Type');
  doc.text(225, 75, this.prodata.remodeltype);
  
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
  doc.text(405, 75, this.prodata.biddate);
  
  doc.text(405, 90, 'Bid Expiry :- ');
  doc.text(405, 105, this.prodata.bidexpair);
  
  doc.text(405, 120, 'Prepared By');
  doc.text(405, 135, this.prodata.preparedby);
  
  doc.text(405, 150, 'Supervisor');
  doc.text(405, 165, this.prodata.supervisor);
  
  //var col = ["Items", "Quantity","Unit Cost", "Adjustment Factor", "Line Total","Notes"];
  var col = ["Items", "Quantity","Notes"];
  //var col = ["Items", "Quantity","Unit Cost"];
  var rows = [];
  var total:any=0;

  this.estimator.forEach(function(val,key,arr){ 
    if(val.trade==tval){
   // var temp = [val.item,val.quantity,val.price,val.factor,val.ltotal, val.notes];
    var temp = [val.item,val.quantity, val.notes];
   // var temp = [val.item,val.quantity,val.price];
    rows.push(temp);
    //total+=val.ltotal;
    }
  });
  //rows.push(['','','','Total',total,'']);
  doc.autoTable(col, rows,{margin: {top: 220}});
    doc.save('vendor.pdf');
    //var pdf =btoa(doc.output('datauristring'));
    //window.open(atob(pdf));
    //doc.output("dataurlnewwindow");
   // window.open(URL.createObjectURL(blob));
    //alert("This Functionality is Devlping Mode");
  
}

pdfforclient(){
  
  var doc = new jsPDF('p','pt', 'a4', true);
   doc.rect(40, 35, 157, 165);
   doc.setFontSize(12);
   doc.text(45, 25, this.prodata.companyname);
   //doc.text(45, 40, "PDF For Vendor");
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
   doc.text(225, 75, this.prodata.remodeltype);
   
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
   doc.text(405, 75, this.prodata.biddate);
   
   doc.text(405, 90, 'Bid Expiry :- ');
   doc.text(405, 105, this.prodata.bidexpair);
   
   doc.text(405, 120, 'Prepared By');
   doc.text(405, 135, this.prodata.preparedby);
   
   doc.text(405, 150, 'Supervisor');
   doc.text(405, 165, this.prodata.supervisor);
   
   //var col = ["Items", "Quantity","Unit Cost", "Adjustment Factor", "Line Total","Notes"];
   var col = ["Items", "Quantity","Line Total","Notes"];
   //var col = ["Items", "Quantity","Unit Cost"];
   var rows = [];
   var total:any=0;
 
   this.estimator.forEach(function(val,key,arr){     
    // var temp = [val.item,val.quantity,val.price,val.factor,val.ltotal, val.notes];
     var temp = [val.item,val.quantity,val.ltotal, val.notes];
    // var temp = [val.item,val.quantity,val.price];
     rows.push(temp);
     total+=val.ltotal;
   });
   rows.push(['','Total',total,'']);
   doc.autoTable(col, rows,{margin: {top: 220}});
     doc.save('Client.pdf');
     //var pdf =btoa(doc.output('datauristring'));
     //window.open(atob(pdf));
     //doc.output("dataurlnewwindow");
    // window.open(URL.createObjectURL(blob));
     //alert("This Functionality is Devlping Mode");
   
}

movetoproject(){
  //console.log(this.prodata.sign);
  document.getElementById('openprojectdates').click();
 /* if(!this.prodata.sign){
    alert("Wait For Client Confirmation");
  }
  
  else{
    document.getElementById('openprojectdates').click();
    
  var totalitem = this.estimator.length;
  var i=0;
  this.estimator.forEach(e=>{
    if(e.award){
i++;
    }
  })
 
  if(totalitem!=i){
    alert("Please Award All Item");
  }else{
    document.getElementById('openprojectdates').click();    
  }
}*/
}

motoprojectalldata(){
  var procost:any=0;
  
  var data = {
    projectname:this.prodata.clientname,
    projecttotal:this.prodata.totalprice,      
    projectcost:0,
    netprofit:(parseFloat(this.prodata.totalprice)-procost),
    projectdetail:this.prodata,
    projectstartdate:this.projectstartdate.toDateString(),
    projectenddate:this.projectenddate.toDateString(),
    projectduration:this.caculateday(this.projectstartdate,this.projectenddate)+1,
   // project
  }
this.db.list('/mainproject').push(data);
this.db.list('/projects/'+this.bidproid).$ref.ref.child('status').set('movedtoproject');
}

caculateday( date1, date2 ) {
  //Get 1 day in milliseconds
  var one_day=1000*60*60*24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;
    
  // Convert back to days and return
  return Math.round(difference_ms/one_day); 
}
awarditem(){
  var key = this.bidproid;
  this.route.navigate(["/app/masters/awarditem/"+key]);
}

}
