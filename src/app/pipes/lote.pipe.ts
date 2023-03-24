import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lote'
})
export class LotePipe implements PipeTransform {

  transform(value: string ): String   {
    value =  value.substr(5,15);
   return value;
 }

}
