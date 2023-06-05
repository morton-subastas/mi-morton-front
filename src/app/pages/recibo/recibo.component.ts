import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-recibo',
  templateUrl: './recibo.component.html',
  styleUrls: ['./recibo.component.css']
})
export class ReciboComponent implements OnInit {
  termino_html:string = '';
  subastaes:string = '';
  inv:string = '';
  auctionsFindSpecificArr:any = [];
  auctionsFindSpecificArr2:any = [];
  //---
  recibo:string = '';
  num_sub:string = '';
  nom_sub:string = '';
  locale:string = '';
  fecha_sub: any = '';
  imagene:string = '';
  descript:string='';
  paleta: string = '';
  hammer:number = 0.00;
  total: number = 0;
  subtotal: number = 0;
  premium:number = 0;
  iva:number = 0;
  contador: number = 0;
  total_sum:number = 0;
  noRecibo: any;
  estado: any;
  constructor(private activatedRoute: ActivatedRoute, private auth:AuthService,) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log('params', params);

      this.subastaes = params['subasta'];
      this.termino_html = params['id'];
      this.inv = params['iv'];
      this.estado = params['estate']
    });
    console.log("INVNO" + this.inv);

    console.log("termino" + this.termino_html);

    this.auth.getDetailSaleImg(this.inv, this.termino_html).subscribe(auctionfindSpecificSaleDB => {
      console.log("INFO");
      console.log(auctionfindSpecificSaleDB);

      this.recibo = auctionfindSpecificSaleDB[0]['invno'];
      this.num_sub  = auctionfindSpecificSaleDB[0]['saleno'];
      this.nom_sub = auctionfindSpecificSaleDB[0]['salename'];
      this.locale = auctionfindSpecificSaleDB[0]['salelocale'];
      this.fecha_sub = new Date (auctionfindSpecificSaleDB[0]['lastupdate'][1]);
      this.fecha_sub = this.fecha_sub.toLocaleDateString();
      console.log('Fecha ', this.fecha_sub)
      this.paleta = auctionfindSpecificSaleDB[0]['bidder'][0];
      this.hammer = auctionfindSpecificSaleDB[0]['hammer'];
      this.imagene = auctionfindSpecificSaleDB[0]['pictpath'];
      this.descript = auctionfindSpecificSaleDB[0]['descript'][0];

      this.auctionsFindSpecificArr = auctionfindSpecificSaleDB;
      this.total = this.auctionsFindSpecificArr.length;
      console.log("TOTAL" + this.total);
      console.log(this.auctionsFindSpecificArr);

      while (this.contador < this.total){
          console.log("entra" + this.contador);
          this.subtotal += this.auctionsFindSpecificArr[this.contador]['hammer'];
          console.log("sub" + this.subtotal);
          this.contador = this.contador + 1;
      }
      this.premium = this.subtotal * 0.20;
      this.iva = this.premium * 0.16;
      this.total_sum = this.subtotal + this.premium + this.iva;

      /*
      console.log("ANTES _" + this.recibo + "_");
      this.auth.getRecibo(this.recibo).subscribe( res =>{
        console.log("RECIBO");
        console.log(res);
      });
    */
    });
    /*
    this.auth.getDetailImg(this.termino_html).subscribe(auctionfindSpecificDB => {
      //console.log("**************************DETAIL");
      this.auctionsFindSpecificArr = auctionfindSpecificDB;
      //console.log(this.auctionsFindSpecificArr);
      //console.log("fin otro");
      //console.log(auctionfindSpecificDB);
    });
    */
  }

  calculatePremium(amount: any){
    const calculate = amount * 0.20 
    let finalCalculate = Number( this.numberWithCommas(calculate))
    return finalCalculate.toFixed(2);
  }

  calculateIVA(amount:any){
    const calculate = amount; 
    let finalCalculate = Number( this.numberWithCommas(calculate))
    return finalCalculate.toFixed(2);
  }

  numberWithCommas(x: any) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  calculateTotalPremium(amount: any){
    let calculate = Number(this.numberWithCommas(amount));
    return calculate.toFixed(2)
  }
  
  calculateTotal(amount: any){
    console.log('amount ', amount );
    const calculate = amount;
    let finalCalculate:any = this.numberWithCommas(calculate);
    finalCalculate = parseInt(finalCalculate)
    console.log('finalCalculate', finalCalculate);
    
  }


  imprimir(){
    console.log("impirmi");
  }
}
