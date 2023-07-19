import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-detalle-lote-venta',
  templateUrl: './detalle-lote-venta.component.html',
  styleUrls: ['./detalle-lote-venta.component.css']
})
export class DetalleLoteVentaComponent implements OnInit {
  subtotal: number = 0;
  
  total: any;
  iva: any;
  arr: any;
  isr: any;
  photo: any;
  imagen: any;
  premium: number = 0;
  hammer:any;
  commission: any;
  inssurance: any;
  reserve: any;
  lote: any;
  inv:any;
  lotDetail: any;


  constructor(private activatedRoute: ActivatedRoute, private auth:AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.lote = params['lote'];
      this.inv = params['inv'];
      /* console.log('params', params);
      this.hammer = params['hammer'];
      this.imagen = params['img'];
      this.lote = params['lote'];
      this.inv = params['inv'];
      this.premium =  this.hammer * 0.15;
      this.hammer = +this.hammer;
      console.log('premium ', this.premium);
      this.subtotal = this.hammer;
      console.log('subtotal ', this.subtotal);
      this.iva = this.premium * 0.16
      this.total= this.premium + this.subtotal + this.iva; */
    });
    this.getDetailLot(this.inv, this.lote);
  }

  getDetailLot(inv: any, lot: any){
    this.auth.getDetailLot(inv,lot ).subscribe((object: any) => {
      this.lotDetail = object;
      this.validateTerm(this.lotDetail)
    });
  }

  validateTerm(lotDetail: any){
    console.log('lotdetail: ',lotDetail.termsname);
    if(lotDetail.termsname == 'Especial  ' ){
      console.log('')
      this.calculateEspecialAmount(lotDetail)
    }
    else {
      this.calculateAmounts(lotDetail);
    }
  }

  calculateEspecialAmount(lotDetail: any){
    this.hammer = lotDetail.hammer;
    this.photo;

  }

  calculateAmounts(lotDetail: any){

  }

  numberWithCommas(x: any) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

}
