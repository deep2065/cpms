import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class Filter implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    //return Object.keys(value)//.map(key => value[key]);
    if(value){
        value.forEach(element => {
            if(element.status=="notapprove")
            return value;
        });
    console.log(value);
    }
}

}
