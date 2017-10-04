import { Component, ViewEncapsulation } from '@angular/core';

declare let jQuery: any;


import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LocalDataSource } from 'ng2-smart-table';
import { forEach } from "@angular/router/src/utils/collection";

@Component({
  selector: '[remodeltype]',
  templateUrl: './remodeltype.template.html',
  styleUrls: [ './remodeltype.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class Remodeltype {
 
  
  
  item : FirebaseListObservable<any[]>;
  items : FirebaseListObservable<any[]>;
    
  quantity : FirebaseListObservable<any[]>;
  unit =[];
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
    constructor(private db:AngularFireDatabase) {
      this.item = db.list('/remodels');
      this.items = db.list('/remodels');

      this.dados = this.db.list('/materials');
      this.source = new LocalDataSource();
      let _self = this;
      this.dados.forEach(element => {
        _self.source.load(element);
      });



      db.list('/categorys').subscribe(keys=>keys.forEach(cat=>{
        if(cat.tradetype=='contractor')
        this.trade.push(cat);
      }));


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
    }

    updatetrade(data:any,value:any){
console.log(data);
console.log(value);
    }
    loadtable(data:any){
console.log(data);
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



    onDeleteConfirm(event,data:any) {
      if (window.confirm('Are you sure you want to delete?')) {
        var key:any = event.data.key-1;
        this.db.list('/remodels/'+data+'/material').$ref.ref.child(key).remove();
        event.confirm.resolve();
      } else {
        event.confirm.reject();
      }
    }
  
    onSaveConfirm(event,data:any) {
      if (window.confirm('Are you sure you want to update?')) {
        var key:any = event.data.key-1;
       this.db.list('/remodels/'+data+'/material').$ref.ref.child(key).set(event.newData);
        event.confirm.resolve(event.newData);
      } else {
        event.confirm.reject();
      }
    }

    onCreateConfirm(event,data:any,id) {
      if (window.confirm('Are you sure you want to create?')) {
        var count:number=0;
        var keyofdata = this.db.list('/remodels/'+data+'/material').subscribe(keys=>keys.forEach(ele=>{
          count++;
        }));
        var cou:any=count;
        //console.log(cou);
        event.newData['key']=count+1;
       this.db.list('/remodels/'+data+'/material').$ref.ref.child(cou).set(event.newData);
        event.confirm.resolve(event.newData);
        this.open=id;
       // this.source.refresh();
      } else {
        event.confirm.reject();
      }
    }





    public error:string="";
    public uperror:string="";
    public updata :object={};
    public success :string;
    updateitem(data:any){
      if(data.cname!=""){
     // this.categoryitems.push(data);
     var key = data.key;
     delete data.key;
     this.item.update(key,data);
     this.success = "Item Updated Successfully";
      }else{
      this.uperror="Please Fill All Field";
      }
    }
    deleteitem(data:any){
      var key = data.$key;
      this.item.remove(key);
      console.log(key);
    }

    edititem(data:any){
      this.updata=data;
    }

}
