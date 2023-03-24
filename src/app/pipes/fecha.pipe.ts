import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {
  dia:string = ''; ano: string = ''; mes:string = ''; fechaFormat:string = ''; separa:string = "/";

  transform(value: string ): String   {
    value =  value.substr(0,10);
    this.ano = value.substr(0,4);
    this.mes = value.substr(5,2);
    this.dia = value.substr(8,2);
   //return this.dia;
    this.fechaFormat = this.dia + this.separa + this.mes + this.separa + this.ano;
   return this.fechaFormat;
   //return value;
   //return this.dia;
 }

}
