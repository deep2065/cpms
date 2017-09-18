import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'object',
  pure: false
})
export class ObjectPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    return Object.keys(value)//.map(key => value[key]);
}

}
