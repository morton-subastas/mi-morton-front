import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterword'
})
export class FilterwordPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
