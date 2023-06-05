import { Pipe, PipeTransform } from '@angular/core';
import {ComprasInterface} from './../pages/interfaces/resultado.interfaces';
@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(compra: ComprasInterface[], page: number = 0, search: string = '', suma: number = 0): ComprasInterface[] {
    //console.log("_________________________________________");
      if(search.length == 0){
        //console.log("***IF***");
          return compra.slice(page,page + suma);         //comienza-termina
          //return [];
      }
      else{
        //console.log("***ELSE***");
        //console.log("filter");
        const resultPost = [];
        for(const post of compra){
          if(post.descript.indexOf(search) > -1){
            //console.log("SI");
            resultPost.push(post);
          }
        };
        return resultPost;
        /*
        //console.log(search);
        //const filterSearch = compra.filter(comprafilter => comprafilter.descript.includes(''+search+''));
        const filterSearch = compra.filter(comprafilter => {
            comprafilter.descript.includes(search)
        });
        console.log(filterSearch);
        //return filterSearch;
        return compra.slice(page,page + suma);         //comienza-termina
      */
      }
  }
}
