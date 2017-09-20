import { Component, ViewEncapsulation,OnInit } from '@angular/core';
declare let jQuery: any;

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LocalDataSource } from 'ng2-smart-table';
import { forEach } from "@angular/router/src/utils/collection";
import {CategoryModel} from './categoryform';
import 'rxjs/add/operator/map';


@Component({
  selector: '[listcontractor]',
  templateUrl: './listcontractor.template.html',
  styleUrls: [ './listcontractor.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class ListContractor {
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
  categoryitems : FirebaseListObservable<any[]>;
  contractors : FirebaseListObservable<any[]>;
  
    constructor(private db:AngularFireDatabase) {
      this.categoryitems = db.list('/categorys');
      this.contractors = db.list('/contractors');      
      this.dados = this.db.list('/contractors');
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
        cname:{title:'Company Name', filter: false},
        conname: {title:'Primary Name', filter: false},
        trade: {title:'Trade', filter: false,
        editor: {
          type: "list",
          config:{
            list: this.list  // a list to populate the options
          }} },
        cmobile: {title:'Phone', filter: false},
        cemail: {title:'Email', filter: false},
    
        },
        actions: {
         
          add: false,
          edit: true,
          delete: true,
          open: true,
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
      
      edit: {
        confirmSave: true,
      },
     columns: {      
      cname:{title:'Company Name', filter: false},
      conname: {title:'Primary Name', filter: false},
      trade: {title:'Trade', filter: false,
      editor: {
        type: "list",
        config:{
          list: this.list  // a list to populate the options
        }} },
      cmobile: {title:'Phone', filter: false},
      cemail: {title:'Email', filter: false},
  
      },
      actions: {
        custom:[{
          name: 'view',
          title: 'View ',
                }],
        add: false,
        edit: true,
        delete: true,
        open: true,
        position: 'right'
      }
      
      
      
    };
  

    onSearch(query: string = '') {
      this.source.setFilter([
        // fields we want to include in the search
        {
          field: 'cname',
          search: query
        },
        {
          field: 'conname',
          search: query
        },
        {
          field: 'trade',
          search: query
        },
        {
          field: 'cmobile',
          search: query
        },
        {
          field: 'cemail',
          search: query
        }
      ], false);
      
    }
    onDeleteConfirm(event) {
      if (window.confirm('Are you sure you want to delete?')) {
        var key = event.data.$key;
        this.contractors.remove(key);
        event.confirm.resolve();
      } else {
        event.confirm.reject();
      }
    }
  
    onSaveConfirm(event) {
      if (window.confirm('Are you sure you want to update?')) {
        var key = event.data.$key;
        this.contractors.update(key,event.newData);
        event.confirm.resolve(event.newData);
      } else {
        event.confirm.reject();
      }
    }
    onCustom(event){
      console.log(event);
    }
    public error:string="";
    public uperror:string="";
    public updata :object={};
   
    
    isChar(key:number){
      /*if((key>=65 || key<=90) || key==32 ){
        return true;
      }else{
        return false;
      }*/
    }

    isNumber(key:number){
     /* if((key>=96 || key<=105) && key==32 ){
        return true;
      }else{
        return false;
      }*/
    }
    
}
