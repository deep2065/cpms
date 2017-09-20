import { Component, ViewEncapsulation } from '@angular/core';

declare let jQuery: any;


import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LocalDataSource } from 'ng2-smart-table';
import { forEach } from "@angular/router/src/utils/collection";

@Component({
  selector: '[listmaterial]',
  templateUrl: './listmaterial.template.html',
  styleUrls: [ './listmaterial.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class Listmaterial {
 
  source: LocalDataSource;
  list = [];
    filTipo: string = 'todos';
   // settings:any;
    dados: FirebaseListObservable<any[]>;
    public solicitacoes: any;
  
  material : FirebaseListObservable<any[]>;
    constructor(private db:AngularFireDatabase) {
      this.material = db.list('/materials');
      this.dados = this.db.list('/materials');
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
        materialname:{title:'Material Name',filter:false},
        notes: {title:'Notes',filter:false},
        quantity: {title:'Quantity',filter:false},    
        },
        actions: {         
          add: false,
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
        materialname:{title:'Material Name',filter:false},
        notes: {title:'Notes',filter:false},
        quantity: {title:'Quantity',filter:false},    
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
          field: 'materialname',
          search: query
        },
        {
          field: 'notes',
          search: query
        },
        {
          field: 'quantity',
          search: query
        }
        
      ], false);
      
    }
    onDeleteConfirm(event) {
      if (window.confirm('Are you sure you want to delete?')) {
        var key = event.data.$key;
        this.material.remove(key);
        event.confirm.resolve();
      } else {
        event.confirm.reject();
      }
    }
  
    onSaveConfirm(event) {
      if (window.confirm('Are you sure you want to update?')) {
        var key = event.data.$key;
        this.material.update(key,event.newData);
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

  
}
