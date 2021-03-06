import { Component, ViewEncapsulation } from '@angular/core';

declare let jQuery: any;


import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LocalDataSource } from 'ng2-smart-table';

import { ActivatedRoute, Router }       from '@angular/router';


@Component({
  selector: '[allproject]',
  templateUrl: './allproject.template.html',
  styleUrls: [ './allproject.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class Allproject {

  source: LocalDataSource;
  list = [];
  filTipo: string = 'todos';
  open:Number=0;
  dados: FirebaseListObservable<any[]>;
  public solicitacoes: any;
  
  unit : FirebaseListObservable<any[]>;
    constructor(private db:AngularFireDatabase, private route:Router) {      
      this.dados = this.db.list('/mainproject');
      this.source = new LocalDataSource();
      let _self = this;
      this.dados.forEach(element => {
        _self.source.load(element);
      });
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
          projectname: {title:'Project Name',filter:false},
          projectcost: {title:'Project Cost',filter:false},    
          projecttotal: {title:'Project Total',filter:false},    
          netprofit: {title:'Net Profit',filter:false},    
          },
          actions: {         
            add: false,
            edit: false,
            delete: false,
            open: false,
            position: 'right', 
            custom:[{
              name: 'view',
              title: 'Details',
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
        projectname: {title:'Project Name',filter:false},
        projectcost: {title:'Project Cost',filter:false},    
        projecttotal: {title:'Project Total',filter:false},    
        netprofit: {title:'Net Profit',filter:false},        
        },
        actions: {         
          add: false,
          edit: false,
          delete: false,
          open: false,
          position: 'right', 
          custom:[{
            name: 'view',
            title: 'Details',
                  }],        
        }
    };

    onCustom(event){
      if(event.action=="view"){
       this.route.navigate(["/app/masters/newproject/"+event.data.$key]); 
       //alert("Under Development");
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
