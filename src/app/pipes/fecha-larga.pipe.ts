import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaLarga'
})
export class FechaLargaPipe implements PipeTransform {

  transform(value: string): string {
    console.log("larga" + value);
    value =  value.substr(0,100);
    console.log("larga-value" + value);
    return value;
  }

}
