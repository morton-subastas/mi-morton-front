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
  subtotalNew: any;
  premium:number = 0;
  iva:number = 0;
  num_cliente: any;
  contador: number = 0;
  total_sum:number = 0;
  noRecibo: any;
  estado: any;
  receipt: any;
  saleSub:any;
  arrayToEmail: any = [];
  premiumEmail:any;
  finalInfo:any=[];
  totalEmail:any;
  clientEmail:any;
  clientNum:any;
  debt:any;
  totalDebt:any;
  totalReceipt:any;

  constructor(private activatedRoute: ActivatedRoute, private auth:AuthService,) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.subastaes = params['subasta'];
      this.termino_html = params['id'];
      this.inv = params['iv'];
      this.estado = params['estate']
      this.num_cliente = params['cliente'];
      this.receipt = params['receipt'];
      this.saleSub = params['dateSale']
    });
  
    this.clientEmail = localStorage.getItem('email');
    this.clientNum = localStorage.getItem('cliente');
    

    this.auth.getDetailSaleImg(this.receipt, this.num_cliente, this.inv, this.saleSub).subscribe(auctionfindSpecificSaleDB => {
      const uniqueValue = this.removeDuplicates(auctionfindSpecificSaleDB);
      this.recibo = auctionfindSpecificSaleDB[0]['invno'];
      this.num_sub  = auctionfindSpecificSaleDB[0]['saleno'];
      this.nom_sub = auctionfindSpecificSaleDB[0]['salename'];
      this.locale = auctionfindSpecificSaleDB[0]['salelocale'];
      this.fecha_sub = new Date (auctionfindSpecificSaleDB[0]['saledate']);
      this.fecha_sub = this.fecha_sub.toLocaleDateString();
      this.paleta = auctionfindSpecificSaleDB[0]['bidder'][0];
      console.log(this.paleta);
      console.log(this.paleta.length);
      
      
      if(this.paleta=="      "){
        this.paleta = auctionfindSpecificSaleDB[0]['bidder'][1];
      }
      console.log(auctionfindSpecificSaleDB);
      
      this.hammer = auctionfindSpecificSaleDB[0]['hammer'];
      this.imagene = auctionfindSpecificSaleDB[0]['pictpath'];
      this.descript = auctionfindSpecificSaleDB[0]['descript'][0];
      this.auctionsFindSpecificArr = uniqueValue;
      this.total = this.auctionsFindSpecificArr.length;
      while (this.contador < this.total){
          this.subtotal += this.auctionsFindSpecificArr[this.contador]['hammer'];
          this.contador = this.contador + 1;
      }
  
      // SUBTOTAL TO SHOW 

      this.subtotalNew = this.subtotal.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      this.premium = this.subtotal * 0.20;
      this.iva = this.premium * 0.16;
      this.total_sum = this.subtotal + this.premium + this.iva;
      this.totalReceipt = this.calculateTotalDebt(this.subtotal);
      console.log(parseInt(this.totalReceipt));
      this.auth.getAmountDebt(this.inv).subscribe((debtAmount:any) => {
        this.debt = debtAmount[0].debt;
        this.totalDebt = this.totalReceipt - this.debt;
        console.log(this.totalDebt);
    })
      
    });
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

  openModal(){
    ($('#invoiceModal') as any).modal('show');
  }

  sendEmailConstancia(){
    var file_data = $("#constancia").prop("files")[0];  
    if(file_data === undefined){
      ($('#attachModal') as any).modal('show');
    }else{
    this.finalInfo.push({'premium':this.premiumEmail,'total':this.totalEmail,'subtotal':this.subtotal, 'email':this.clientEmail, 'cliente':this.clientNum});
    this.arrayToEmail.push(this.auctionsFindSpecificArr);
    var form_data = new FormData();       
    this.arrayToEmail = JSON.stringify(this.arrayToEmail);           
    form_data.append("file", file_data); 
    form_data.append("info", this.arrayToEmail); 
    form_data.append("total_info", JSON.stringify(this.finalInfo));          
       let ajax = new XMLHttpRequest();
        ajax.open('POST', 'http://localhost/mail/sendEmail.php');
        ajax.setRequestHeader("enctype","multipart/form-data");
        ajax.send(form_data);
        ajax.onreadystatechange = ():void => {
            if (ajax.readyState === 4 && ajax.status === 200) {
                console.log(ajax.responseText);
                ($('#successModal') as any).modal('show');
            }
        };    
      }
  }

  closeModal(){
    ($('#invoiceModal') as any).modal('hide');
    (<HTMLInputElement>document.getElementById('constancia')).value='';
  }

  openModalAttach(){
    ($('#attachModal') as any).modal('show');
  }

  closeModalAttach(){
    ($('#attachModal') as any).modal('hide');
  }

  closeModalSuccess(){
    ($('#successModal') as any).modal('hide');
    ($('#invoiceModal') as any).modal('hide');
    (<HTMLInputElement>document.getElementById('constancia')).value='';
  }

  closeModalError(){
    ($('#errorModal') as any).modal('hide');
    (<HTMLInputElement>document.getElementById('constancia')).value='';
  }

  numberWithCommas(x: any) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  calculateTotalPremium(amount: any){
    let calculate = Number(this.numberWithCommas(amount));
    return calculate.toFixed(2)
  }
  
  calculateTotal(amount: any){
    const calculate = amount;
    let finalCalculate:any = this.numberWithCommas(calculate);
    finalCalculate = parseInt(finalCalculate)
  }

  removeDuplicates(elements: any){
    const unique = [...new Map(elements.map((m:any) => [ m.lot, m])).values()];
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
            bidsquare = premium * 0.03
        }
        else if (bidder.startsWith("MS")){
            bidsquare = premium * 0.01
        }
        else{
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
            bidsquare = premium + (premium * 0.23)
        }
        else if (bidder.startsWith("MS")){
            bidsquare = premium + (premium * 0.21)
        }
        else{
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
            bidsquare = subtotal + (subtotal * 0.23)
        }
        else if (bidder.startsWith("MS")){
            bidsquare = subtotal + (subtotal * 0.21)
        }
        else{
            bidsquare = subtotal + (subtotal * 0.20)
        }
    const hammerWithDecimals = (bidsquare + 0.00).toFixed(2)
    const hammerComplete = hammerWithDecimals.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return hammerComplete
  }

  calculatePremiumReceipt (subtotal:any){
    const bidder = this.paleta;
    let bidsquare;
    if (bidder.startsWith("AL")){
      bidsquare = subtotal * 0.23
  }
  else if (bidder.startsWith("MS")){
      bidsquare = subtotal * 0.21
  }
  else{
    bidsquare = subtotal * 0.20;
  }

    this.premiumEmail = bidsquare;
    const hammerWithDecimals = (bidsquare + 0.00).toFixed(2)
    const hammerComplete = hammerWithDecimals.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return hammerComplete
  }

  calculateBidsquareReceipt(subtotal: any){
    const bidder = this.paleta;
    let bidsquare;
        if (bidder.startsWith("AL")){
            bidsquare =  (subtotal * 0.03)
        }
        else if (bidder.startsWith("MS")){
            bidsquare = (subtotal * 0.01)
        }
        else{
            bidsquare = (subtotal * 0.00)
        }
    const hammerWithDecimals = (bidsquare + 0.00).toFixed(2)
    const hammerComplete = hammerWithDecimals.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return hammerComplete
  }

  calculateIvaReceipt(subtotal: any){
    const bidder = this.paleta;
    
    let bidsquare = 0;
        if (bidder.startsWith("AL")){
            bidsquare = this.premium * 0.23;
            bidsquare = bidsquare * 0.16;
        }
        else if (bidder.startsWith("MS")){
            bidsquare = this.premium * 0.21;
            bidsquare = bidsquare * 0.16;
        }
        else{
            bidsquare = this.premium * 0.16;
        }
    const hammerWithDecimals = (bidsquare + 0.00).toFixed(2)
    const hammerComplete = hammerWithDecimals.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return hammerComplete
  }

  calculateTotalReceipt(subtotal:any){
    const bidder = this.paleta;
    let total;
    if (bidder.startsWith("AL")){
      total = this.subtotal + (this.subtotal * 0.23) + ((this.subtotal * 0.23) * 0.16);
    }
    else if (bidder.startsWith("MS")){
        total = subtotal + (subtotal * 0.21) + ((subtotal * 0.21) * 0.16) 
    }
    else{
        total = this.premium + this.subtotal + (this.premium * 0.16);
    }

    this.totalEmail = total;

    const hammerWithDecimals = (total + 0.00).toFixed(2)
    const hammerComplete = hammerWithDecimals.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return hammerComplete
  }

  calculateTotalDebt(subtotal:any){
    const bidder = this.paleta;
    let total;
    if (bidder.startsWith("AL")){
      total = this.subtotal + (this.subtotal * 0.23) + ((this.subtotal * 0.23) * 0.16);
    }
    else if (bidder.startsWith("MS")){
        total = subtotal + (subtotal * 0.21) + ((subtotal * 0.21) * 0.16) 
    }
    else{
        total = this.premium + this.subtotal + (this.premium * 0.16);
    }

    this.totalEmail = total;

    const hammerWithDecimals = (total + 0.00).toFixed(2)
    return hammerWithDecimals;
  }

  changeAuctName(saleName:any){
    if(saleName.toLocaleLowerCase().includes('descubrimiento') || saleName.toLocaleLowerCase().includes('oportunidades')){
      return "Subasta de los Sabados"
    }else{
      return saleName
    }
  }


}
