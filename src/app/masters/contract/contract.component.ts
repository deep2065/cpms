import { Component, ViewEncapsulation } from '@angular/core';

declare let jQuery: any;


import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LocalDataSource } from 'ng2-smart-table';

import { ActivatedRoute, Router }       from '@angular/router';

@Component({
  selector: '[contract]',
  templateUrl: './contract.template.html',
  styleUrls: [ './contract.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class Contract {

 vendor =[];
    constructor(private db:AngularFireDatabase, private aroute:ActivatedRoute) {      
      var key:any;
      this.aroute.params.subscribe(params => {
        key = params['key']; // (+) converts string 'id' to a number
     });
    var vend = [];
db.list('/projects').subscribe(keys=>keys.forEach(ele=>{
  if(ele.$key==key){
         ele.estimator.forEach(ve=>{
         if(vend.indexOf(ve.vendor.conname)== -1){
       vend.push(ve.vendor.conname);
     }
      });
      vend.forEach(uv=>{
        var vename='';
        var vcost:any=0;
        var sign=null;
        var contract='';
        ele.estimator.forEach(ve1=>{
          if(uv==ve1.vendor.conname){
            vename=ve1.vendor.conname;
            vcost+= parseFloat(ve1.cost);
            if(ve1.sign){
              sign=1;
            }
            contract = ve1.contract;
          }
        });
        this.vendor.push({vname:vename,vcost:vcost,sign:sign,contact:contract});
      })
      
  }
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
          clientname: {title:'Project Name',filter:false},
          preparedby: {title:'Prepared By',filter:false},    
          totalprice: {title:'Total Price',filter:false},    
          clientmobile: {title:'Client Mobile',filter:false},    
          biddate: {title:'Bid Date',filter:false},    
          bidexpair: {title:'Bid Expairy Date',filter:false},    
          supervisor: {title:'Supervisor',filter:false},    
          status: {title:'Status',filter:false},    
          },
          actions: {         
            add: false,
            edit: false,
            delete: false,
            open: false,
            position: 'right', 
            custom:[{
              name: 'view',
              title: 'View Contac Sign',
                    }],        
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
        clientname: {title:'Project Name',filter:false},
        preparedby: {title:'Prepared By',filter:false},    
        totalprice: {title:'Total Price',filter:false},    
        clientmobile: {title:'Client Mobile',filter:false},    
        biddate: {title:'Bid Date',filter:false},    
        bidexpair: {title:'Bid Expairy Date',filter:false},    
        supervisor: {title:'Supervisor',filter:false},    
        status: {title:'Status',filter:false},        
        },
        actions: {         
          add: false,
          edit: false,
          delete: false,
          open: false,
          position: 'right', 
          custom:[{
            name: 'view',
            title: 'View Contac Sign',
                  }],        
        }
    };

    onCustom(event){
      if(event.action=="view"){
       // this.route.navigate(["/app/masters/vendordetails/"+event.data.$key]);
       alert("Under Development");
      }
    }


    onDeleteConfirm(event) {
      if (window.confirm('Are you sure you want to delete?')) {
        var key = event.data.$key;
        this.unit.remove(key);
        event.confirm.resolve();
      } else {
        event.confirm.reject();
      }
    }
  
    onSaveConfirm(event) {
      if (window.confirm('Are you sure you want to update?')) {
        var key = event.data.$key;
        this.unit.update(key,event.newData);
        event.confirm.resolve(event.newData);
      } else {
        event.confirm.reject();
      }
    }

    onCreateConfirm(event) {
      if (window.confirm('Are you sure you want to create?')) {
        this.material.push(event.newData);
        event.confirm.resolve();
        this.source.refresh();
      } else {
        event.confirm.reject();
      }
    }


  
    public error:string="";
    public uperror:string="";
    public updata :object={};
    public success :string;
    updateunit(data:any){
      if(data.cname!=""){
     // this.categoryitems.push(data);
     var key = data.key;
     delete data.key;
     this.unit.update(key,data);
     this.success = "Unit Updated Successfully";
      }else{
      this.uperror="Please Fill All Field";
      }
    }
    deleteunit(data:any){
      var key = data.$key;
      this.unit.remove(key);
      console.log(key);
    }

    editunit(data:any){
      this.updata=data;
    }

}
