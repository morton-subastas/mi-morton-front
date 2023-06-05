import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formateado'
})
export class FormateadoPipe implements PipeTransform {

  transform(value: string): String {
    value =  value.replace('<B>','');
    value =  value.replace('<I>','');
    value =  value.replace('<D>','');
    value =  value.replace('<b1>','');
    value =  value.replace('<P>','');
    value =  value.replace('<b5>','');
    value =  value.replace('<el>','');
    value =  value.replace('<e5>','');
    value =  value.replace('<e2>','');
    value =  value.replace('<b3>','');
    value =  value.replace('<e3>','');
    value =  value.replace('<e1>','');
    value =  value.replace('<b2>','');
    value =  value.replace('<b4>','');
   return value;
  }

}
