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
  vat: any;
  arr: any;
  isr: any;
  photo: any;
  imagen: any;
  premium: number = 0;
  saleno: any;
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
      this.imagen = params['img'];
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
    this.lote = lotDetail.lot;
    this.reserve = lotDetail.reserve;
    this.hammer = lotDetail.hammer;
    this.photo = this.validatePhoto(lotDetail.photonote);
    this.saleno = lotDetail.saleno;
    this.inssurance = this.hammer * lotDetail.inspct ;
    this.commission = this.hammer * (lotDetail.cms1/100);
    this.arr = this.calculateArr(lotDetail);
    this.isr = (this.hammer - this.inssurance - this.photo - this.commission - this.arr)* 0.08; 
    this.vat =  (this.inssurance + this.commission + this.photo) * 0.16; 
    this.total = this.hammer - this.inssurance - this.photo - this.commission - this.vat - this.arr - this.isr;
  }

  validatePhoto(photonote: any){  
    let convertPhoto: any;
    if (photonote == '' || photonote == undefined || photonote == 0){
      convertPhoto = 0;
    }
    else {
      convertPhoto = parseInt(photonote)
    }
    return convertPhoto;
  }

  calculateAmounts(lotDetail: any){
    this.lote = lotDetail.lot;
    this.reserve = lotDetail.reserve;
    this.hammer = lotDetail.hammer;
    this.photo = this.validatePhoto(lotDetail.photonote);
    this.saleno = lotDetail.saleno;
    this.inssurance = this.hammer * lotDetail.inspct ;
    this.commission = this.calculateCommision(this.hammer);
    this.arr = this.calculateArr(lotDetail);
    this.isr = (this.hammer - this.inssurance - this.photo - this.commission - this.arr)* 0.08; 
    this.vat =  (this.inssurance + this.commission + this.photo) * 0.16; 
    this.total = this.hammer - this.inssurance - this.photo - this.commission - this.vat - this.arr - this.isr;
  }

  calculateCommision(hammer: any){
    let commission;
    if (hammer >= 0 && hammer < 4999){
        commission = hammer * 0.20;
    }
    if (this.hammer >= 5000 && this.hammer < 99999){
        commission = hammer * 0.15;
    }
    if (this.hammer >= 100000 && this.hammer < 199999){
        commission = hammer * 0.12;
    }
    if (this.hammer >= 200000){
        commission = hammer * 0.10;
    }
    return commission
  }

  calculateArr(lotDetail: any){
    let arr;
      if(lotDetail.hammer !=0 && (lotDetail.itemstatus=='VEN' || lotDetail.itemstatus =='EAC') 
      && lotDetail.ddspct == -1){
          console.log('Si hay arr', lotDetail.lot)
          if(lotDetail.hammer >= 500001){
              arr = lotDetail.hammer * 0.015;
          }if(lotDetail.hammer >= 200001 && lotDetail.hammer <= 500000) {
              arr = lotDetail.hammer * 0.02;
          }
          if(lotDetail.hammer >= 50001 && lotDetail.hammer <= 200000){
              arr = this.hammer * 0.03;
          }
          if(lotDetail.hammer >= 1 && lotDetail.hammer <= 50000){
              arr= lotDetail.hammer * 0.04;
          }
          return arr
      }
      else {
          console.log('No hay arr')
          return arr = 0
      }
  }

  numberWithCommas(x: any) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

}
