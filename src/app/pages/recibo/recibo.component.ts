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
  num_cliente: any;
  contador: number = 0;
  total_sum:number = 0;
  noRecibo: any;
  estado: any;
  receipt: any;
  saleSub:any;
  constructor(private activatedRoute: ActivatedRoute, private auth:AuthService,) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log('params', params);

      this.subastaes = params['subasta'];
      this.termino_html = params['id'];
      this.inv = params['iv'];
      this.estado = params['estate']
      this.num_cliente = params['cliente'];
      this.receipt = params['receipt'];
      this.saleSub = params['dateSale']
    });
    console.log("INVNO" + this.inv);

    console.log("termino" + this.termino_html);

    this.auth.getDetailSaleImg(this.receipt, this.num_cliente, this.inv, this.saleSub).subscribe(auctionfindSpecificSaleDB => {
      console.log("INFO");
      console.log(auctionfindSpecificSaleDB);
      const uniqueValue = this.removeDuplicates(auctionfindSpecificSaleDB);
      this.recibo = auctionfindSpecificSaleDB[0]['invno'];
      this.num_sub  = auctionfindSpecificSaleDB[0]['saleno'];
      this.nom_sub = auctionfindSpecificSaleDB[0]['salename'];
      this.locale = auctionfindSpecificSaleDB[0]['salelocale'];
      this.fecha_sub = new Date (auctionfindSpecificSaleDB[0]['saledate']);
      this.fecha_sub = this.fecha_sub.toLocaleDateString();
      console.log('Fecha ', this.fecha_sub)
      this.paleta = auctionfindSpecificSaleDB[0]['bidder'][0];
      this.hammer = auctionfindSpecificSaleDB[0]['hammer'];
      this.imagene = auctionfindSpecificSaleDB[0]['pictpath'];
      this.descript = auctionfindSpecificSaleDB[0]['descript'][0];

      this.auctionsFindSpecificArr = uniqueValue;
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

  removeDuplicates(elements: any){
    console.log('element', elements);
    const unique = [...new Map(elements.map((m:any) => [ m.lot, m])).values()];
    console.log('unique ', unique);
    return unique
  }

  imprimir(){
    console.log("impirmi");
  }

  transformQuantity(element:any){
    const numeroDecimales= (element + 0.00).toFixed(2)
    const numeroCompleto = numeroDecimales.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return numeroCompleto;
  }
  
  calculatePremiumReal(premium:any){
    let hammer = premium * 0.20;
    const hammerWithDecimals = (hammer + 0.00).toFixed(2)
    const hammerComplete = hammerWithDecimals.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return hammerComplete
  }
  
  calculateAFL(premium: any){
    const bidder = this.paleta;
    let bidsquare;
        if (bidder.startsWith("AL")){
            console.log("comison 23")
            bidsquare = premium * 0.03
        }
        else if (bidder.startsWith("MS")){
            console.log("comison 21")
            bidsquare = premium * 0.01
        }
        else{
            console.log("comison 20")
            bidsquare = 0
        }
    const hammerWithDecimals = (bidsquare + 0.00).toFixed(2)
    const hammerComplete = hammerWithDecimals.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return hammerComplete
  }

  calculateRealSubTotal(premium: any){
    const bidder = this.paleta;
    let bidsquare;
        if (bidder.startsWith("AL")){
            console.log("comison 23")
            bidsquare = premium + (premium * 0.23)
        }
        else if (bidder.startsWith("MS")){
            console.log("comison 21")
            bidsquare = premium + (premium * 0.21)
        }
        else{
            console.log("comison 20")
            bidsquare = premium + (premium * 0.20)
        }
    const hammerWithDecimals = (bidsquare + 0.00).toFixed(2)
    const hammerComplete = hammerWithDecimals.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return hammerComplete
  }

  calculateSubTotalReceipt(subtotal:any){
    const bidder = this.paleta;
    let bidsquare;
        if (bidder.startsWith("AL")){
            console.log("comison 23")
            bidsquare = subtotal + (subtotal * 0.23)
        }
        else if (bidder.startsWith("MS")){
            console.log("comison 21")
            bidsquare = subtotal + (subtotal * 0.21)
        }
        else{
            console.log("comison 20")
            bidsquare = subtotal + (subtotal * 0.20)
        }
    const hammerWithDecimals = (bidsquare + 0.00).toFixed(2)
    const hammerComplete = hammerWithDecimals.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return hammerComplete
  }

  calculatePremiumReceipt (subtotal:any){
    //const bidder = this.paleta;
    let bidsquare = subtotal * 0.20;
    const hammerWithDecimals = (bidsquare + 0.00).toFixed(2)
    const hammerComplete = hammerWithDecimals.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return hammerComplete
  }

  calculateBidsquareReceipt(subtotal: any){
    const bidder = this.paleta;
    let bidsquare;
        if (bidder.startsWith("AL")){
            console.log("comison 23")
            bidsquare =  (subtotal * 0.03)
        }
        else if (bidder.startsWith("MS")){
            console.log("comison 21")
            bidsquare = (subtotal * 0.01)
        }
        else{
            console.log("comison 20")
            bidsquare = (subtotal * 0.00)
        }
    const hammerWithDecimals = (bidsquare + 0.00).toFixed(2)
    const hammerComplete = hammerWithDecimals.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return hammerComplete
  }

  calculateIvaReceipt(subtotal: any){
    const bidder = this.paleta;
    let bidsquare = subtotal * 0.20;
        if (bidder.startsWith("AL")){
            console.log("comison 23")
            bidsquare = (bidsquare + (subtotal * 0.03)) * 0.16
        }
        else if (bidder.startsWith("MS")){
            console.log("comison 21")
            bidsquare = (bidsquare + (subtotal * 0.01)) * 0.16
        }
        else{
            console.log("comison 20")
            bidsquare = (subtotal + (subtotal * 0.00)) * 0.16
        }
    const hammerWithDecimals = (bidsquare + 0.00).toFixed(2)
    const hammerComplete = hammerWithDecimals.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return hammerComplete
  }

  calculateTotalReceipt(subtotal:any){
    console.log('subtotal ', subtotal)
    const bidder = this.paleta;
    let total;
    if (bidder.startsWith("AL")){
      console.log("comison 23");
      total = subtotal + (subtotal * 0.23) + ((subtotal * 0.23) * 0.16) 
    }
    else if (bidder.startsWith("MS")){
        console.log("comison 21")
        total = subtotal + (subtotal * 0.21) + ((subtotal * 0.21) * 0.16) 
    }
    else{
        console.log("comison 20")
        total = subtotal + (subtotal * 0.20) + ((subtotal * 0.20) * 0.16) 
    }
    const hammerWithDecimals = (total + 0.00).toFixed(2)
    const hammerComplete = hammerWithDecimals.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return hammerComplete
  }
}
