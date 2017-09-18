import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { Select2Module } from 'ng2-select2';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { AlertModule, TooltipModule } from 'ngx-bootstrap';
import { TagInputModule } from 'ng2-tag-input';




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

import {FirebaseConfig}  from '../masters/firebaseConfig';

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


import { Vendor } from './addvendor/vendor.component';
import { VendorList } from './listvendor/vendorlist.component';


export const routes = [
  {path: '', redirectTo: 'vendor', pathMatch: 'full'},
  {path: 'vendor', component: Vendor},
  {path: 'vendorlist', component: VendorList}
];

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    Vendor,
    VendorList,
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
    UtilsModule,
    TagInputModule,
    RouterModule.forChild(routes),
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireDatabaseModule,  
    AngularFireAuthModule,
    
  ]
})
export class VendorsModule {
  static routes = routes;
}
