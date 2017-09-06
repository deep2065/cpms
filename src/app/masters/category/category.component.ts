import { Component, ViewEncapsulation } from '@angular/core';
import * as data from './category.data';
declare let jQuery: any;
import { tableData } from './tables.data';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

const PEOPLE = [
  {
    'id': '1',
    'name': 'Algerd',
    'info': {
      'type': 'JPEG',
      'dimensions': '200x150'
    },
    'description': 'Palo Alto',
    'date': 'June 27, 2013',
    'status': {
      'progress': '29',
      'type': 'success'
    }
  }
 
];

import {CategoryModel} from './categoryform';


@Component({
  selector: '[category]',
  templateUrl: './category.template.html',
  styleUrls: [ './category.style.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class Category {
  birthDate: Date = null;
  expirationDate: Date = null;

  datepickerOpts: any = {
   placeholder: ' '
  };

  data: any[] = PEOPLE;
  
    rows: Array<any> = [];
    columns: Array<any> = [
      {title: 'Name', name: 'name'},
      {title: 'Position', name: 'position', sort: false},
      {title: 'Office', name: 'office', sort: 'asc'},
      {title: 'Extn.', name: 'ext', sort: ''},
      {title: 'Start date', name: 'startDate'},
      {title: 'Salary ($)', name: 'salary'}
    ];
  
    page: number = 1;
    itemsPerPage: number = 10;
    maxSize: number = 5;
    numPages: number = 1;
    length: number = 0;
  
    config: any = {
      paging: true,
      sorting: {columns: this.columns},
      filtering: {filterString: '', columnName: 'position'}
    };
  
    ng2TableData: Array<any> = tableData;
  
    pagingConfigStyle: Object = {
      'background': 'none',
      'border': 'none'
    };
  categoryitems : FirebaseListObservable<any[]>;
    constructor(db:AngularFireDatabase) {
      this.length = this.ng2TableData.length;
      this.categoryitems = db.list('/categorys');
    }

  getSelect2StateList(): [string] {
    return data.select2StateData;
  }

  getSelect2CountryList(): [string] {
    return data.select2CountryData;
  }

  getSelect2WebsiteAssociateList(): [string] {
    return data.select2WebsiteAssociateList;
  }

  getSelect2AccountGroupsList(): [string] {
    return data.select2AccountGroupsList;
  }

  ngOnInit(): void {    
    this.onChangeTable(this.config);
    jQuery('.parsleyjs').parsley({
      errorsContainer:  function ( elem, isRadioOrCheckbox ) {
        return jQuery(elem.$element).closest('.form-group').children('label');
      }
    });
    jQuery('.selectpicker').selectpicker();
  }

  
  
    changePage(page: any, data: Array<any> = this.ng2TableData): Array<any> {
      let start = (page.page - 1) * page.itemsPerPage;
      let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
      return data.slice(start, end);
    }
  
    changeSort(data: any, config: any): any {
      if (!config.sorting) {
        return data;
      }
  
      let columns = this.config.sorting.columns || [];
      let columnName: string = void 0;
      let sort: string = void 0;
  
      for (let i = 0; i < columns.length; i++) {
        if (columns[i].sort !== '' && columns[i].sort !== false) {
          columnName = columns[i].name;
          sort = columns[i].sort;
        }
      }
  
      if (!columnName) {
        return data;
      }
  
      // simple sorting
      return data.sort((previous: any, current: any) => {
        if (previous[columnName] > current[columnName]) {
          return sort === 'desc' ? -1 : 1;
        } else if (previous[columnName] < current[columnName]) {
          return sort === 'asc' ? -1 : 1;
        }
        return 0;
      });
    }
  
    changeFilter(data: any, config: any): any {
      if (!config.filtering) {
        return data;
      }
  
      let filteredData: Array<any> = data.filter((item: any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
  
      return filteredData;
    }
  
    onChangeTable(config: any, page: any = {page: this.page, itemsPerPage: this.itemsPerPage}): any {
      if (config.filtering) {
        Object.assign(this.config.filtering, config.filtering);
      }
      if (config.sorting) {
        Object.assign(this.config.sorting, config.sorting);
      }
  
      let filteredData = this.changeFilter(this.ng2TableData, this.config);
      let sortedData = this.changeSort(filteredData, this.config);
      this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
      this.length = sortedData.length;
    }
    public error:string="";
    public uperror:string="";
    public updata :object={};
    submitcategory(data:any){
      if(data.cname!=""){
      this.categoryitems.push(data);
      }else{
      this.error="Please Fill Category Name Field";
      }
    }
    updatecategory(data:any){
      if(data.cname!=""){
     // this.categoryitems.push(data);
     var key = data.key;
     delete data.key;
     this.categoryitems.update(key,data);
      }else{
      this.uperror="Please Fill Category Name Field";
      }
    }
    deletecategory(data:any){
      var key = data.$key;
      this.categoryitems.remove(key);
      console.log(key);
    }

    editcategory(data:any){
      this.updata=data;
    }

}
