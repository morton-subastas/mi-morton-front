import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subasta'
})
export class SubastaPipe implements PipeTransform {

  transform(value: string ): String   {
    value =  value.substr(0,5);
   return value;
 }

}
