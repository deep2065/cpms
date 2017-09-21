import {Component, ViewEncapsulation } from '@angular/core';
declare let jQuery: any;

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {ObjectPipe}  from '../custompipes/object.pipe';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LocalDataSource } from 'ng2-smart-table';
import { forEach } from "@angular/router/src/utils/collection";


import { ActivatedRoute, Router }       from '@angular/router';

@Component({
  selector: '[listemployee]',
  templateUrl: './listemployee.template.html',
  styleUrls: [ './listemployee.style.scss' ],
  encapsulation: ViewEncapsulation.None,

})
export class Listemployee {
  birthDate: Date = null;
  expirationDate: Date = null;

  datepickerOpts: any = {
   placeholder: ' '
  };

  source: LocalDataSource;
  list = [];
    filTipo: string = 'todos';
   // settings:any;
    dados: FirebaseListObservable<any[]>;
    public solicitacoes: any;
  employee : FirebaseListObservable<any[]>;
    constructor(private db:AngularFireDatabase, private route:Router) {
      this.employee = db.list('/users');
      this.dados = this.db.list('/users');
      this.source = new LocalDataSource();
      let _self = this;
      this.dados.forEach(element => {
        _self.source.load(element);
      });

      db.list('/categorys').subscribe(keys=>keys.forEach(cat=>{
        if(cat.tradetype=='contractor')
        {
          this.list.push({value:cat.cname,title:cat.cname});
        }
        this.tableconfigration();
       this.source.refresh();
      }));
    }
    tableconfigration(){
      this.settings = {
        delete: {
          confirmDelete: true,
          
        },
        
        edit: {
          confirmSave: true,
        },
       columns: {      
        empcode:{title:'Employee Code', filter: false},
        empname: {title:'Employee Name', filter: false},
        empemail: {title:'Email', filter: false, },
        empmobile: {title:'Mobile', filter: false},
        },
       
        actions: {
         
          add: false,
          edit: false,
          delete: true,
          open: true,
          position: 'right',
          custom:[{
            name: 'view',
            title: ' Details ',
                  },{name:'edit',title:" Edit "}],
        }
        
        
        
      };
    }
   
    settings = {
      
      delete: {
        confirmDelete: true,
        
      },
      
      edit: {
        confirmSave: true,
      },
     columns: {      
      empcode:{title:'Employee Code', filter: false},
      empname: {title:'Employee Name', filter: false},
      empemail: {title:'Email', filter: false, },
      empmobile: {title:'Mobile', filter: false},
      },
      actions: {
        custom:[{
          name: 'view',
          title: ' Details ',
                },{name:'edit',title:" Edit "}],
        add: false,
        edit: false,
        delete: true,
        open: true,
        position: 'right'
      }
      
      
      
    };
  

    onSearch(query: string = '') {
      this.source.setFilter([
        // fields we want to include in the search
        {
          field: 'empcode',
          search: query
        },
        {
          field: 'empname',
          search: query
        },
        {
          field: 'empemail',
          search: query
        },
        {
          field: 'empmobile',
          search: query
        },
       
      ], false);
      
    }
    onDeleteConfirm(event) {
      if (window.confirm('Are you sure you want to delete?')) {
        var key = event.data.$key;
        this.employee.remove(key);
        event.confirm.resolve();
      } else {
        event.confirm.reject();
      }
    }
  
    onSaveConfirm(event) {
      if (window.confirm('Are you sure you want to update?')) {
        var key = event.data.$key;
        this.employee.update(key,event.newData);
        event.confirm.resolve(event.newData);
      } else {
        event.confirm.reject();
      }
    }
    onCustom(event){
      if(event.action=="view"){
        this.route.navigate(["/app/masters/employeedetails/"+event.data.$key]);
      }
      if(event.action=="edit"){
      alert(event.data.$key+"Edit");
        //this.route.navigate(["/app/masters/employeedetails/"+event.data.$key]);
      }
    }
    

}
