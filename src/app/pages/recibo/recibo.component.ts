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
  fecha_sub: string = '';
  paleta: string = '';
  total: number = 0;
  subtotal: number = 0;
  premium:number = 0;
  iva:number = 0;
  contador: number = 0;
  total_sum:number = 0;
  constructor(private activatedRoute: ActivatedRoute, private auth:AuthService,) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.subastaes = params['subasta'];
      this.termino_html = params['id'];
      this.inv = params['iv'];
    });
    console.log("INVNO" + this.inv);
    console.log("termino" + this.termino_html);
    
    this.auth.getDetailSaleImg(this.inv).subscribe(auctionfindSpecificSaleDB => {
      console.log("INFO");
      console.log(auctionfindSpecificSaleDB);
      this.recibo = auctionfindSpecificSaleDB[0]['invno'];
      this.num_sub  = auctionfindSpecificSaleDB[0]['saleno'];
      this.nom_sub = auctionfindSpecificSaleDB[0]['salename'];
      this.locale = auctionfindSpecificSaleDB[0]['salelocale'];
      this.fecha_sub = auctionfindSpecificSaleDB[0]['lastupdate'];
      this.paleta = auctionfindSpecificSaleDB[0]['bidder'][0];
      
      this.auctionsFindSpecificArr = auctionfindSpecificSaleDB;
      this.total = this.auctionsFindSpecificArr.length;
      console.log("TOTAL" + this.total);
      console.log(this.auctionsFindSpecificArr);
      
      while (this.contador < this.total){
          this.subtotal += this.auctionsFindSpecificArr[this.contador]['hammer']; 
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

  imprimir(){
    console.log("impirmi");
  }
}
