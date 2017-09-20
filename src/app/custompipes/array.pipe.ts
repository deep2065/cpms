import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'array',
  pure: false
})
export class ArrayObject implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    return Object.keys(value)//.map(key => value[key]);
}

}
