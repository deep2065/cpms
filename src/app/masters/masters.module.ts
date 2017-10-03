import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Select2Module } from 'ng2-select2';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { AlertModule, TooltipModule } from 'ngx-bootstrap';
import { Autosize } from 'angular2-autosize';
import { TagInputModule } from 'ng2-tag-input';
import { Ng2SmartTableModule } from 'ng2-smart-table';


import { PaginationModule, BsDropdownModule } from 'ngx-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { Ng2TableModule } from 'ng2-table';
import { JqSparklineModule } from '../layout/directives/sparkline/sparkline.module';
import { WidgetModule } from '../layout/widget/widget.module';
import { UtilsModule } from '../layout/utils/utils.module';

import { AngularFireModule } from 'angularfire2';
// for AngularFireDatabase
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
// for AngularFireAuth
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';

import {FirebaseConfig}  from './firebaseConfig';
import {ObjectPipe}  from '../custompipes/object.pipe';
import {Safehtml}  from '../custompipes/safehtml.pipe';
import {GetnameBykey}  from '../custompipes/getnamebykey.pipe';

declare let global: any;

let markdown = require('markdown').markdown;
global.markdown = markdown;
import 'bootstrap-markdown/js/bootstrap-markdown.js';
import 'bootstrap-select/dist/js/bootstrap-select.js';
import 'parsleyjs';
import 'twitter-bootstrap-wizard/jquery.bootstrap.wizard.js';
import 'bootstrap-colorpicker';
import 'jasny-bootstrap/js/inputmask.js';
import 'ng2-datetime/src/vendor/bootstrap-datepicker/bootstrap-datepicker.min.js';
import 'ng2-datetime/src/vendor/bootstrap-timepicker/bootstrap-timepicker.min.js';
import 'bootstrap-slider/dist/bootstrap-slider.js';


import { Category } from './category/category.component';
import { Listcontractor } from './listcategory/listcategory.component';
import { Contractor } from './contractor/contractor.component';
import { ListContractor } from './listcontractor/listcontractor.component';
import { SubCategory } from './subcategory/subcategory.component';
import { Unit } from './unit/unit.component';
import { Listunit } from './listunit/listunit.component';

import { Quantity } from './quantity/quantity.component';
import { Listquantity } from './listquantity/listquantity.component';

import { Item } from './item/item.component';
import { Listitem } from './listitem/listitem.component';

import { Employee } from './employee/employee.component';
import { Listemployee } from './listemployee/listemployee.component';
import { Material } from './material/material.component';
import { Listmaterial } from './listmaterial/listmaterial.component';
import { Costdata } from './costdata/costdata.component';
import { Listcostdata } from './listcostdata/listcostdata.component';

import { VendorList } from './listvendor/vendorlist.component';
import { Vendordetails } from './vendordetails/vendordetails.component';
import { Contractordetails } from './contractordetails/contractordetails.component';
import { Employeedetails } from './employeedetails/employeedetails.component';
import { Bids } from './bids/bids.component';
import { Pbids } from './pbids/pbids.component';
import { Ebids } from './editbid/ebids.component';
import { Remodel } from './remodel/remodel.component';
import { Remodeltype } from './remodeltype/remodeltype.component';

import {
  DatetimeTransparent
} from '../ui/datetime-transparent/datetime-transparent.directive';
import {
  MarkdownToolbarTransparent
} from '../ui/markdown-toolbar-transparent/markdown-toolbar-transparent.directive';


export const routes = [
  {path: '', redirectTo: 'trade', pathMatch: 'full'},
  {path: 'trade', component: Category}, 
  {path: 'tradelist', component: Listcontractor}, 
  {path: 'unit', component: Unit}, 
  {path: 'listunit', component: Listunit}, 
  {path: 'quantity', component: Quantity}, 
  {path: 'listquantity', component: Listquantity}, 
  {path: 'listcontractor', component: ListContractor},
  {path: 'subcategory', component: SubCategory},
  {path: 'contractor', component: Contractor},
  {path: 'item', component: Item},
  {path: 'listitem', component: Listitem},
  {path: 'employee', component: Employee},
  {path: 'listemployee', component: Listemployee},
  {path: 'material', component: Material},
  {path: 'materiallist', component: Listmaterial},
  {path: 'costdata', component: Costdata},
  {path: 'listcostdata', component: Listcostdata},
  {path: 'listvendor', component: VendorList},
  {path: 'vendordetails/:key', component: Vendordetails},
  {path: 'contractordetails/:key', component: Contractordetails},
  {path: 'employeedetails/:key', component: Employeedetails},
  {path: 'bids', component: Bids},
  {path: 'pendingbid', component: Pbids},
  {path: 'bidedit', component: Ebids},
  {path: 'remodeltype', component: Remodeltype},
  {path: 'remodel', component: Remodel},
];

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    Category,
    SubCategory,
    Contractor,
    ListContractor,
    Listcontractor,
    Unit,
    Listunit,
    Quantity,
    Listquantity,
    Item,
    ObjectPipe,
    GetnameBykey,
    Safehtml,
    Listitem,
    Material,
    Listmaterial,
    Employee,
    Listemployee,
    Listcostdata,
    VendorList,
    Contractordetails,
    Vendordetails,
    Employeedetails,
    Costdata,
    Bids,
    Pbids,
    Ebids,
    Remodeltype,
    Remodel,
    Autosize,
    MarkdownToolbarTransparent,        
    DatetimeTransparent,
  ],
  imports: [
    CommonModule,
    DataTableModule,
    FormsModule,
    Select2Module,
    NKDatetimeModule,
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    WidgetModule,
    Ng2TableModule,
    JqSparklineModule,
    Ng2SmartTableModule,
    UtilsModule,
    TagInputModule,
    RouterModule.forChild(routes),
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireDatabaseModule,  
    AngularFireAuthModule,
  ]
})
export class MastersModule {
  static routes = routes;
}
