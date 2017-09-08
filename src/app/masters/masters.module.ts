import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Select2Module } from 'ng2-select2';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { AlertModule, TooltipModule } from 'ngx-bootstrap';
import { Autosize } from 'angular2-autosize';
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

import {FirebaseConfig}  from './firebaseConfig';

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
import { Contractor } from './contractor/contractor.component';
import { ListContractor } from './listcontractor/listcontractor.component';
import { SubCategory } from './subcategory/subcategory.component';

import {
  DatetimeTransparent
} from '../ui/datetime-transparent/datetime-transparent.directive';
import {
  MarkdownToolbarTransparent
} from '../ui/markdown-toolbar-transparent/markdown-toolbar-transparent.directive';


export const routes = [
  {path: '', redirectTo: 'category', pathMatch: 'full'},
  {path: 'category', component: Category},  
  {path: 'listcontractor', component: ListContractor},
  {path: 'subcategory', component: SubCategory},
  {path: 'contractor', component: Contractor},
];

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    Category,
    SubCategory,
    Contractor,
    ListContractor,
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
