import { Component, ViewEncapsulation } from '@angular/core';

declare let jQuery: any;


import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';


import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LocalDataSource } from 'ng2-smart-table';
import { forEach } from "@angular/router/src/utils/collection";

@Component({
  selector: '[listcategory]',
  templateUrl: './listcategory.template.html',
  styleUrls: [ './listcategory.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class Listcontractor {
  birthDate: Date = null;
  expirationDate: Date = null;

  datepickerOpts: any = {
   placeholder: ' '
  };

  source: LocalDataSource;
  list = [];
    filTipo: string = 'todos';
  dados: FirebaseListObservable<any[]>;
  public solicitacoes: any;

  
  categoryitems : FirebaseListObservable<any[]>;
    constructor(private db:AngularFireDatabase) {
      this.categoryitems = db.list('/categorys');
      this.dados = this.db.list('/categorys');
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
        cname:{title:'Trade Name',filter:false},
        tradetype: {title:'Trade Type',filter:false,},
        desc: {title:'Notes',filter:false},    
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
        cname:{title:'Trade Name',filter:false},
        tradetype: {title:'Trade Type',filter:false,},
        desc: {title:'Notes',filter:false},    
        },
        actions: {         
          add: false,
          edit: true,
          delete: true,
          open: true,
          position: 'right',         
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
          field: 'tradetype',
          search: query
        },
        {
          field: 'desc',
          search: query
        }
        
      ], false);
      
    }
    onDeleteConfirm(event) {
      if (window.confirm('Are you sure you want to delete?')) {
        var key = event.data.$key;
        this.categoryitems.remove(key);
        event.confirm.resolve();
      } else {
        event.confirm.reject();
      }
    }
  
    onSaveConfirm(event) {
      if (window.confirm('Are you sure you want to update?')) {
        var key = event.data.$key;
        this.categoryitems.update(key,event.newData);
        event.confirm.resolve(event.newData);
      } else {
        event.confirm.reject();
      }
    }

    onCreateConfirm(event) {
      if (window.confirm('Are you sure you want to create?')) {
        this.categoryitems.push(event.newData);
        event.confirm.resolve();
        this.source.refresh();
      } else {
        event.confirm.reject();
      }
    }

}
