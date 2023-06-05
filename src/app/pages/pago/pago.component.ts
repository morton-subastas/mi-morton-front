import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Validators,FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { sha256, sha224 } from 'js-sha256';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  formPayment!:FormGroup;
  nocliente: any;
  nombreCliente: any
  noRecibo: any;
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
  premium:any;
  iva:any;
  contador: number = 0;
  total_sum:any;
  itemSpecify: any;
  elements: any;
  reference:any;
  email:any;
  totalbefore:any;
  phone: any;
  order = 'Proceso';
  hash : any;
  signature: any;
  totalInput: any;
  keyPrepro: any= '2=cl((7Sh5q)H+#c)F)Zj6434%oAq1Svg8#PMxQj7-#j0#tP9B2rV5%RNNo8T6qds39c0t553S&J)BSI=CkDW54-+Tg&U)=3AgiDgz95!=J6J#9=-0dJ))Pr3#ii1%a+'

  //url = "https://prepro.adquiracloud.mx/";
  url = "https://prepro.adquiracloud.mx/clb/endpoint/mortonSubastas";
  encode: any;

  constructor(private activatedRoute: ActivatedRoute, private auth:AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.noRecibo = params['noRecibo'];
      this.totalbefore = params['total'];
    });
    
    this.getInfo(this.noRecibo,'test');
    
    this.reference = this.getReference();
    console.log('Reference', this.reference );
    const order:any = 'Proceso';
    //console.log('this.totalbefore ', this.totalbefore);
    this.totalInput = this.convertTotal(this.totalbefore)
    this.signature =this.buildMpSignature(this.reference, order,this.totalInput)
    console.log('signatur ', this.signature);
    this.hash = this.generateHash(this.keyPrepro, this.signature);

    this.nombreCliente = localStorage.nombre;
    this.nocliente = localStorage.cliente;
    this.email = localStorage.email;
    this.buildForm(this.totalInput, this.phone);
  }

  convertTotal(mount: any){
    let mountTransform = Number(mount).toFixed(2)
    return mountTransform;
  }

  buildMpSignature(referencia: any, order: any, total: any){
    const signature =  order+referencia+total;
    return signature
  }


  getInfo(termino: any,termina: any){
    this.auth.getDetailSaleImg(termino, termina).subscribe(items => {
      //console.log("INFO");
      this.elements = items;
      this.recibo = items[0]['invno'];
      this.num_sub  = items[0]['saleno'];
      this.nom_sub = items[0]['salename'];
      this.locale = items[0]['salelocale'];
      this.fecha_sub = new Date (items[0]['lastupdate'][1]);
      this.fecha_sub = this.fecha_sub.toLocaleDateString();
      //console.log('Fecha ', this.fecha_sub)
      this.paleta = items[0]['bidder'][0];
      this.hammer = items[0]['hammer'];
      this.imagene = items[0]['pictpath'];
      this.descript = items[0]['descript'][0];
      this.phone = items[0].phone;
      //console.log('this.phone ', this.phone)
      this.itemSpecify = items;
      this.total = this.itemSpecify.length;
      //console.log("TOTAL" + this.total);
      //console.log(this.itemSpecify);

      while (this.contador < this.total){
          //console.log("entra" + this.contador);
          this.subtotal += this.itemSpecify[this.contador]['hammer'];
          //console.log("sub" + this.subtotal);
          this.contador = this.contador + 1;
      }
      this.premium = (this.subtotal * 0.20);
      this.iva = (this.premium * 0.16);
      this.total_sum = this.subtotal + this.premium + this.iva;
      this.total_sum = (this.total_sum).toFixed(2)
    });
  }

  getReference(){
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear());
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const dia1 = day + month + year;
    const dia2 = hours + minutes + seconds;
    return this.reference = `F${dia1}H${dia2}`;
  }

  buildForm(total: any, phone: any){
    console.log("Valor de total y phone ", total, phone)
    this.formPayment = this.formBuilder.group({
      mp_order: ['Proceso', Validators.required],
      mp_account: [6288, Validators.required],
      mp_nameS: [ this.num_sub , Validators.required],
      mp_product: [1, Validators.required],
      mp_reference: [this.reference, Validators.required],
      mp_node: [0, Validators.required],
      mp_concept:[1, Validators.required],
      mp_currency: [1, Validators.required],
      mp_signature: [this.hash, Validators.required],
      mp_urlsuccess: ['https://infosubastas.mortonsubastas.com/#/satisfactorio', Validators.required],
      mp_urlfailure: ['https://infosubastas.mortonsubastas.com/#/insatisfactorio', Validators.required],
      mp_respuesta: ['', Validators.required],
      llave_hmac: ['', Validators.required],
      mp_customername: [this.nombreCliente, Validators.required],
      mp_email: [this.email, Validators.required],
      mp_phone:[phone, Validators.required],
      mp_amount: [total, Validators.required],
    });
  }

  generateHash(key: any, signature: any){
    let hash = sha256.hmac(key,signature);
    return hash
  } 

  catchForm(){
    console.log('this.formPayment.value ',this.formPayment.value); 
    //this.auth.multiPagos()
  }

  generatePayment(){
    console.log('this.formPayment.value ', this.formPayment.value);
    this.auth.multiPagos(this.formPayment.value).subscribe(res=>{
      console.log('res', res );
    })
  }

  
}
