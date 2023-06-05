import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detalle-lote-venta',
  templateUrl: './detalle-lote-venta.component.html',
  styleUrls: ['./detalle-lote-venta.component.css']
})
export class DetalleLoteVentaComponent implements OnInit {
  subtotal: number = 0;
  total: number = 0;
  imagen: any;
  premium: number = 0;
  iva: number = 0;
  hammer:number = 0;
  lote: any;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log('params', params);
      this.hammer = params['hammer'];
      this.imagen = params['img'];
      this.lote = params['lote']
      this.premium =  this.hammer * 0.15;
      this.hammer = +this.hammer;
      console.log('premium ', this.premium);
      this.subtotal = this.hammer;
      console.log('subtotal ', this.subtotal);
      this.iva = this.premium * 0.16
      this.total= this.premium + this.subtotal + this.iva;
    });
  }

  numberWithCommas(x: any) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

}
