import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getname',
  pure: false
})
export class GetnameBykey implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    return Object.keys(value)//.map(key => value[key]);
}

}