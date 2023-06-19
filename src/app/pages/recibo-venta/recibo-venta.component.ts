import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recibo-venta',
  templateUrl: './recibo-venta.component.html',
  styleUrls: ['./recibo-venta.component.css']
})
export class ReciboVentaComponent implements OnInit {
  termino_html:string = '';
  subastaes:string = '';
  nombreSubasta: string = '';
  fechaSubasta: any;
  lugar: string = '';
  inv:string = '';
  items: any;
  imagene:string = '';
  descript:string='';
  paleta: string = '';
  hammer:number = 0.00;
  total: number = 0;
  subtotal: number = 0;
  premium:number = 0;
  iva:number = 0;
  recibo:string='';
  contador: number = 0;
  total_sum:number = 0;
  date:any;

  constructor(private activatedRoute: ActivatedRoute, private auth:AuthService,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log('params', params);

      this.subastaes = params['subasta'];
      this.termino_html = params['id'];
      this.inv = params['iv'];
      this.inv = this.inv.trim()
      console.log('this.inv', this.inv);
      
      this.nombreSubasta = params['salename'];
      this.fechaSubasta = new Date(params['saleDate']);
      this.date = params['saleDate']
      this.fechaSubasta = this.fechaSubasta.toLocaleDateString()
      this.lugar = params['salelocale'];
    });
    this.auth.getDetailSale(this.inv, this.date).subscribe(result =>{
      //console.log('result', result);
      //this.items= result;
      const uniqueValues = this.removeDuplicates(result);
      this.items = uniqueValues; 
      console.log('uniqueValues', uniqueValues);
      this.paleta = result[0]['bidder'][0];
      this.hammer = result[0]['hammer'];
      this.imagene = result[0]['pictpath'];
      this.descript = result[0]['descript'][0];
      this.recibo = result[0]['invno'];
      this.total = this.items.length;
      //console.log("TOTAL" + this.total);
      //console.log(this.items);

      while (this.contador < this.total){
        //console.log("entra" + this.contador);
        this.subtotal += this.items[this.contador]['hammer'];
        //console.log("sub" + this.subtotal);
        this.contador = this.contador + 1;
    }
    this.premium = this.subtotal * 0.20;
    this.iva = this.premium * 0.16;
    this.total_sum = this.subtotal + this.premium + this.iva;

    })
  }

  removeDuplicates(elements: any){
    console.log('elements: ', elements);
    const unique = [...new Map(elements.map((m:any) => [ m.lot, m ])).values()];
    console.log("unique", unique);
    return unique;    
    /* console.log('El valor de elements es: ', elements);
    const unique = elements.filter(
      (obj: any, index:any) =>
      elements.findIndex((item:any) => item.value === obj.value) === index
    );
    return unique */
  /*  this.yearList= this.yearList.slice(1)
    const unique = this.yearList.filter(
      (obj: any, index:any) =>
      this.yearList.findIndex((item:any) => item.value === obj.value) === index
    );
    console.log('unique: ', unique);
    return unique */
  }

  openDetail(event: any){
    console.log('El valor del evento es: ', event);
  }

}
