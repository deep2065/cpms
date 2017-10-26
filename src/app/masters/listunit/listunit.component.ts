import { Component, ViewEncapsulation } from '@angular/core';

declare let jQuery: any;


import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
  selector: '[listunit]',
  templateUrl: './listunit.template.html',
  styleUrls: [ './listunit.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class Listunit {
 
  item : FirebaseListObservable<any[]>;
  items : FirebaseListObservable<any[]>;
    
  quantity : FirebaseListObservable<any[]>;
  trade =[];
  vendors : FirebaseListObservable<any[]>;
  material =[];
  source: LocalDataSource;
  list = [];
    filTipo: string = 'todos';
    open:Number=0;
   // settings:any;
    dados: FirebaseListObservable<any[]>;
    public solicitacoes: any;
  
  unit : FirebaseListObservable<any[]>;
    constructor(private db:AngularFireDatabase) {
      this.unit = db.list('/units');
      this.item = db.list('/items');
      this.items = db.list('/items');

      this.dados = this.db.list('/units');
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
          unit: {title:'Unit',filter:false},
          notes: {title:'Notes',filter:false},    
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
        unit: {title:'Unit',filter:false},
        notes: {title:'Notes',filter:false},    
        },
        actions: {         
          add: false,
          edit: true,
          delete: true,
          open: true,
          position: 'right',         
        }
    };

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
