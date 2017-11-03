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
  selector: '[newproject]',
  templateUrl: './newproject.template.html',
  styleUrls: [ './newproject.style.scss' ],
  encapsulation: ViewEncapsulation.None,
  providers: [EmailService]
})
export class Newproject {
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
    constructor( private db:AngularFireDatabase,private route:Router, private aroute:ActivatedRoute, private elementRef:ElementRef, private sendemail:EmailService) {
      this.quantity = db.list('/quantitys');
      this.item = db.list('/costdatas');
      this.items = db.list('/items');
      this.vendors = db.list('/vendors');
      this.protype23 = db.list('/protypes');
      //this.project=db.list('/projects');
      this.project=db.list('/mainproject');
db.list('/projects').subscribe(p=>p.forEach(ele=>
  {
    if(ele.status=='approve'){
    this.bidsname.push({key:ele.$key,name:ele.clientname});
    }
  }
));
var key:any;
this.aroute.params.subscribe(params => {
  key = params['key']; // (+) converts string 'id' to a number
});
//console.log(key);
this.selectbids(key);
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
  this.project.subscribe(p=>p.forEach(ele1=>{
    if(ele1.$key==id){
      //console.log(ele1.projectdetail);
    var  ele = ele1.projectdetail;
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
      this.prodata.status=ele.status;
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
password:any;
clientcontract(){
  var lMargin=15;     //left margin in mm
  var rMargin=15;    //right margin in mm
  var pdfInMM=210;  // width of A4 in mm
  var pageCenter=pdfInMM/2;
  var date = new Date();
  var adate = date.toDateString();
  var itemno=1;
  var itemtotal:any=0;
  
  var doc = new jsPDF("p","mm","a4");
  doc.lineHeightProportion=5;
  var paragraph="This Base Agreement (Agreement) is made by and between, McSloy Construction, L.L.C., (hereinafter referred to as “McSC”) and ";
  paragraph+= "<====Client name====>";
  paragraph+= " (hereinafter referred to as “Contractor”). The term “Contractor” is acknowledged and intended to mean both contractor and its employee’s and subcontractors where applicable. Both parties agree and acknowledge that they are entering into this Agreement subject to and in exchange for the terms and conditions set forth herein.  This Agreement shall have an effective date of "+adate+".\n\n I.RELATIONSHIP OF THE PARTIES TO THIS AGREEMENT \n1.Contractor hereby certifies that neither Contractor nor Contractor’s employees, agents, subcontractors or assigns are not employees of McSC and that Contractor is solely responsible for the selection, training, methods, tools and safety of these individuals and subcontractors, as well as their compensation including but not limited to taxes and charges incident to their payment including but not limited to, withholding taxes, social security taxes, and unemployment taxes. \n2.Contractor is solely responsible for the provision of any Worker’s Compensation Insurance coverage with respect to Contractor or Contractor’s agents, representatives, subagents, subcontractors, or employees. \n II.CONTRACTOR’S RESPONSIBILITIES \n Contractor shall maintain at all times discipline among his or her employees, subcontractors and agents, and agrees not to employ or subcontract any person unfit or without sufficient training and skill to perform the job he is contracted to do. \n 1.WORK/TOOLS OF TRADE \n Contractor has sole discretion with respect to its tools of trade, working hours, supervision and direction of Contractor’s agents, representatives, subagents, subcontractors, or employees so long as such discretion is not exercised in violation of local, state or federal rules, regulations, ordinances, laws or requirements. Contractor is obligated to perform his task in accordance with the plans and specifications of the homes as provided by McSC and incorporated into this Agreement by reference.  Contractor acknowledges to being familiar with all relevant plans and specifications or any work requested by McSCbefore starting any work.All labor and materials furnished by the Contractor shall be in accordance with all applicable manufacturing and construction codes and with the plans and specifications furnished by McSC.  Contractor shall keep a copy of such plans on each job while the work is in progress. \n 2. STANDARD OF WORK \n Contractor shall perform all labor in a good and workmanlike manner, according to the standard incorporated by reference into industry practice, and warrants that all labor done and any materials furnished by contractor will meet or exceed the standards of the International Residential code (IRC), the warranty standards as promulgated by the State of Texas (if any), the FHA minimum property standards, and any other applicable federal, state, or local building code requirements. \n 3. CONTRACTOR SAFETY POLICY \n Contractor hereby certifies: \n 4. LIABILITY FOR INJURY \n Contractor hereby agrees to accept sole responsibility to assume all expenses and liability for any injury or illness sustained by Contractor or any of its subcontractors or employees while on the job site or performing any task or work for in any way associated with McSC and: \n • To provide adequate training and supervision including safety training to Contractor’s employees and subcontractors. \n • To maintain and provide safe, appropriate and well maintained equipment and implements of work for contractor’s employees and subcontractors. \n •To supervise and direct his work to the best of his ability; and  \n • To give it all attention necessary for such proper supervision and direction.  \n Contractor and its employees and its contractors shall comply with all of the requirements of the Occupational Safety and Health Act of 1970 related to Contractor’s business including but not limited to fire safety, fall protection, GFCI protection, and adequate injury prevention equipment including hard hats and safety glasses as applicable. \n";
  paragraph+="\n5. SCOPE OF WORK \n ";  

  paragraph+="\nIII.CONTRACTOR’S INVOICES \n Contractor must submit itemized invoices for payment within 30 days after completion of the work performed on that particular home site. All invoices submitted by Contractor to McSC later than 6 months after such work was performed by Contractor will not be paid, and Contractor expressly waives any and all rights of payment for or collection of such sums from McSC. Invoice amount for contract (reference section 5) is ";
  paragraph+= itemtotal+". \n\n 1.CHANGE IN A WORK ORDER \n McSC reserves the right, from time to time, to order work changes in the nature of additions, deletions, or modifications, without invalidating this Agreement and agrees to make corresponding adjustments in the payments to be made to Contractor.  All changes will be authorized by a written change work order signed by McSC and Contractor.  Work shall be changed and the payment(s) to be made to Contractor shall be modified only as set out in the written change order. In conjunction with this Agreement, Approved Amendments to Price Lists shall be applicable only to new jobs started after the date of such Amended Price List. \n 2. ASSIGNMENT OF MANUFACTURER’S WARRANTIES \n Contractor shall furnish and assign to McSC all warranties and/or guarantees by manufacturers on goods, appliances and equipment furnished to McSC and shall further furnish all warranty or related certificates required by any municipality, VA and/or FHA.\n 3. INSPECTION \n Contractor shall be responsible for inspecting any work of another contractor that may affect his own work, and shall report in writing to McSC any defects in such work upon discovery of the defect prior to commencing work, or shall be deemed to have accepted such work as correct and fit to be accommodated into Contractor’s own work. \n 4. WARRANTY PERIOD \n Contractor warrants all labor and material furnished by him to be free of defect for a period of at least one (1) year from the date of the deed conveying the property from McSC to the ultimate purchaser. IV. PAYMENT TERMS \n Payment terms are net 30.  No payments shall be due under this Agreement unless and until Contractor has timely performed and delivered all work requested by McSC.  No payments will be disbursed until McSC has had reasonable opportunity to inspect the work performed and/or delivered, and has received an invoice identifying the subject work. \n 1. PAYMENTS WITHHELD  Contractor agrees that payments may be withheld and all costs incurred by McSC shall be charged against all monies due Contractor under this Agreement if: \n • Work is found defective and not remedied by Contractor.\n • Contractor does not make prompt and proper payments to his employees, agents and/or subcontractors.\n • Contractor does not make prompt payments for labor, materials or equipment furnished by third parties. \n • Contractor does not timely furnish itemized invoices as specified in this Agreement. \n • Another contractor is damaged by an act for which Contractor is responsible. \n • Claims or liens are filed on the job as a result of Contractor’s failure to make full and timely payments as required. \n • In the opinion of the McSC, Contractor’s work is not progressing satisfactorily. \n • McSC reasonably believes that the work cannot or will not be completed in accordance with all the terms and conditions of this Agreement. \n • Contractor fails to perform warranty service under this Agreement or any other prior or contemporaneous agreement with McSC. \n • McSC is fined by any governmental agency on account of or arising out of Contractor’s, his employees or his agent’s violation of any law, ordinance, regulation, administrative ruling or court order. \n • Contractor shall notify the McSC if they have not received the approved extra purchase orwork order for non-emergency work and the work is being delayed, or in the case of emergency work, they have not received the approved extra purchase or changed work order by the end of the following business day. \n • Contractor will not be paid for work they perform without the required work order(s) documentation. \n 2.TAXES \n Contractor shall pay all taxes required or imposed by law in connection with work under this Agreement including sales, use or similar taxes, and Contractor shall secure and pay for all licenses and permits necessary for proper completion of the work including sales tax permits where required.  This Agreement is to be considered a Lump Sum Contract.  State and local sales and use taxes are included in the Lump Sum Contract Price. \n 3. WORK IN PROGRESS \n";
  paragraph += "At all times, during the performance of this Agreement, McSC shall be entitled to hold, of all work in progress, statutory sums in accordance with the laws of the State of Texas.  Contractor waives his right to constitutional and statutory liens on any job not fully performed by Contractor.  \n V. DEFAULT BY CONTRACTOR \n 1. DEFECTIVE WORK \n When McSC notifies Contractor (orally or in writing) that any part of the work is defective, incorrect or does not conform to the terms of the plans and specifications, Contractor agrees to: \n • Make all repairs and correct such defects under the warranty within eight (8) hours of notice of such defect for emergency matters, and within forty-eight (48) hours of notice of such defect on a non-emergency basis; \n • McSC shall determine whether a defect constitutes an emergency;\n • To bear the cost of doing so, including the cost incurred by McSC for any disturbance of work being completed by McSC or its other Contractors; and \n • Where applicable, Warrant Mechanicals (i.e., plumbing, electrical and HVAC systems) for two (2) years. \n 2. WORK STOPPAGE  \n Contractor shall continually perform in a professional manner the work designated under this Agreement and at a pace consistent with McSC’s completion schedule.  In the event Contractor shall not substantially perform in a continuous manner and if Contractor shall fail to do so for three (3) consecutive days under any work orders, McSC shall have the right to give three (3) days written notice to Contractor and shall be entitled to terminate the employment of Contractor and declare Contractor in breach of this Agreement. \n 3. BREACH  \n In the event of a breach of this Agreement by Contractor, McSCshall be entitled to retain all sums due Contractor under any work orders and shall be entitled to cause the work to be performed by others, and shall apply any sums then due Contractor against such costs of completion and thereafter to the costs of a one (1) year warranty, and after all warranties have expired any excess shall be paid to Contractor.  In the event costs of such completion result in a deficiency, Contractor shall be fully responsible for the deficiency, together with any damages, costs of court, and reasonable attorney’s fees incurred by McSC in the recovery of such deficiency. \n VI. COMPLIANCE WITH LAWS, ORIDNANCES, AND BUILDING CODES \n Contractor agrees to comply with all current applicable laws, ordinances, building codes and all rules, regulations, or orders of all public or regulatory authorities relating to the performance of the work. \n O.S.H.A. COMPLIANCE \n Contractor and each of his employees will not enter McSC’s job site(s) without implementing O.S.H.A. approved fire protection and prevention standards in their entirety, and agree that, in the case of conflict between the Contractor’s Fire Safety Program and McSC’s Fire Safety Program, McSC’s Fire Safety program will prevail. \n WORKING CONDITIONS: Contractor shall be responsible for providing adequate safety training, safety devices, and safety clothing where necessary to ensure the safety of its employees and subcontractors and to immediately reporting unsafe work practice and/or job condition(s) to McSC and provide safe working procedures including equipment, training, and supervision for his employees, subcontractors, and agents. Contractor will comply with all provisions of the 1970 Occupational Safety and Health Act (OSHA) and all other applicable OSHA rules and regulations. This includes, but not limited to: \n • Compliance with OSHA’s Hazard and Communication Standard and provide McSC a copy of all Materials Safety Data Sheets for all hazardous or toxic chemicals used in connection with the work;  \n • Compliance with OSHA’s Fall Protection in the Construction Industry; and \n • Contractor shall immediately notify McSC of any job related injury to or death of any person employed by Contractor, or otherwise under the control of Contractor, in connection with the McSC  site. \n 1. SAFETY \n Contractor agrees to maintain proper storm water, fire and material safety. \n 2. DUTY TO NOTIFY \n Contractor agrees to assist McSC in maintaining a healthy, safe work environment for both employees and Contractors on an ongoing basis.  Contractor shall instruct its employees to immediately notify representatives or employees of McSC if, in the Contractor’s or employee of Contractor’s opinion, there is any condition, situation, or conduct on the work site which is currently dangerous or hazardous in any way to the employees of Contractor or any other person present on the job site or who may come upon the job site in the immediate future.  Contractor also agrees to notify McSC immediately if any of Contractors employees or Contractors are injured during work being performed by McSC or on McSC’s job site.   \n 3. WAGE AND HOUR LAWS AND IMMIGRATION REGULATIONS \n Contractor hereby certifies to McSC that it is in full compliance and shall remain in full compliance with the wage and hour (including overtime compensation) laws applicable to the State of Texas.  Violation of any of the provisions shall be deemed a material default under this Contract, and any liabilities incurred by Contractor as a result thereof shall be subject to the indemnity provisions of this Contract. \n Contractor warrants and agrees that all employees, subcontractors, and agents will be of legal age (18 years) to perform such work and comply with the requirements of all applicable immigration laws including the Immigration Reform and Central Act (IRCA) with respect to all Contractor’s employees. Contractor agrees to obtain properly completed Employment Eligibility Verification Forms (Form I-9) for all Contractors’ employees as required by IRCA; and verify social security numbers and other documentation submitted with each Form I-9. \n VII. INDEMNITY AND INSURANCE \n Contractor shall secure and maintain for the duration of the Contract such insurance as will protect it from claims under the Worker's Compensation Statute for the state in which the work is located and from such claims for bodily injury, death or property damage as may arise in the performance of Contractor’s services under this Agreement, such coverage to be equal or greater than the minimum limits hereinafter set forth. The Contractor hereby agrees to assume the entire responsibility and liability for any and all injuries or death of any and all persons and any and all losses or damage to property caused by or resulting from or arising out of any act, neglect or negligence, omission or agreement on the part of the Contractor, its agents, officers, employees, subcontractors or servants in connection with this Agreement or with the prosecution of the work hereunder, whether covered by the insurance specified herein or not.\n Contractor shall indemnify, defend and save harmless the McSC and its affiliates, agents, officers, employees, (including but not limited to home owners and property owners associations established by McSC or its officers and employees) from any and all claims, losses, damages, fines or penalties, legal suits or actions including reasonable attorney's fees, expenses and costs which may arise out of any and all work performed by Contractor or its agents, employees, subcontractors or servants and to assume all liability of Contractor and of McSC for such claims, losses, damages, legal suits or actions for the injuries, deaths, losses and or damages to persons or property. \n VIII. GENERAL TERMS AND CONDITIONS\n 1. NOTICES \n All notices must be in writing and must be delivered by personal delivery, by certified mail return receipt requested, email with confirmation by receipted notification, or by facsimile to the location for each party designated below.";
  doc.setFontSize(16);
  doc.text(50,10,'INDEPENDENT BASE CONTRACT AGREEMENT');
		doc.setFontSize(10);
        var lines =doc.splitTextToSize(paragraph, (pdfInMM-lMargin-rMargin));
  doc.text(lMargin,20,lines);
 // doc.text(lines,pageCenter,20); //see this line
//	doc.output("dataurlnewwindow");
var pdf =doc.output('datauristring');
this.password= Math.floor(Math.random() * 20000);
console.log(this.password);
this.db.list('/mainproject/'+this.bidproid+'/projectdetail').$ref.ref.child("password").set(this.password);

  var msg = 'Dear '+this.prodata.clientname+'<br>';
  msg+='Welcome Mr. '+this.prodata.clientname+' Your Project Contract is ready. <br> Use these credencial to sign this <br> Username :='+this.prodata.clientemail+' </br> Password is '+this.password+' </br> Sign Contract :- <a href=http://localhost:3000/masters/signature/'+this.bidproid+'>Click Here To Signature</a>';
   this.sendemail.sendemail(this.prodata.clientemail,"Client Contract",msg,pdf,function(data){    
    console.log(data);
 })


}

}
