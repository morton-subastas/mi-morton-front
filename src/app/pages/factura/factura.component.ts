import { Component, OnInit } from '@angular/core';
import { Validators,FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
  providers: [DatePipe]
})
export class FacturaComponent implements OnInit {
formFactura!:FormGroup;
allMonedas: any;
allBancos:any;
allMetodos: any;
allFormasPago: any;
allProductosServicios:any;
allLugares:any;
allComprobantes: any;
allUnidades: any
allUsoCfdi: any;
allUsos: any;
editable: boolean = true;  
isDisabled: boolean = true;
invo: any;
termino_html: any;
inv:any;
recieve: any;
auction: any;
dateAuction: any;
currentDate : any;

  constructor(private formBuilder: FormBuilder, private auth:AuthService, private router:Router, private activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRouter.params.subscribe(params => {
      console.log('params', params);
      this.termino_html = params['id'];
      this.inv = params['iv'];
    });

    this.auth.getDetailSaleImg(this.inv, this.termino_html).subscribe(params=>{
      console.log('El valor de params es: ', params);
      this.recieve = params;
      this.auction = params[0].saleno_ok;
      this.auction = this.auction.trim();
      this.dateAuction = params[0].saledate;
      const date = new Date();
      this.currentDate = this.formatDate(date);
      console.log('Valor de auction ', this.auction);
      
    })
    console.log('***************************************** ',this.recieve);
    this.formFacturaF();
    
    this.auth.getMonedas().subscribe((monedas: any) => {
      this.allMonedas= monedas;
      console.log(this.allMonedas);
    });
    this.formFactura.controls['subastaFactura'].disable();
    this.formFactura.controls['emisorFactura'].disable();
    this.formFactura.controls['fechaParticipacionF'].disable();
    this.formFactura.controls['fechaFactura'].disable();
    this.auth.getBancos().subscribe((bancos: any) => {
      this.allBancos= bancos;
      console.log(this.allBancos);
    });

    this.auth.getMetodos().subscribe((bancos: any) => {
      this.allMetodos= bancos;
      console.log(this.allMetodos);
    });

    this.auth.getFormaspago().subscribe((bancos: any) => {
      this.allFormasPago= bancos;
      console.log(this.allFormasPago);
    });

    this.auth.getProductosServicios().subscribe((bancos: any) => {
      this.allProductosServicios= bancos;
      console.log(this.allProductosServicios);
    });

    this.auth.getLugarExpedicion().subscribe((bancos: any) => {
      this.allLugares= bancos;
      console.log(this.allLugares);
    });
    this.auth.getComprobantes().subscribe((bancos: any) => {
      this.allComprobantes= bancos;
      console.log(this.allComprobantes);
    });

    this.auth.getUnidad().subscribe((bancos: any) => {
      this.allUnidades= bancos;
      console.log(this.allUnidades);
    });

    this.auth.getUsoCfdi().subscribe((bancos: any) => {
      this.allUsoCfdi= bancos;
      console.log(this.allUsoCfdi);
    });

    this.auth.getAllUsos().subscribe((bancos: any) => {
      this.allUsos= bancos;
      console.log(this.allUsos);
    });

  }
  formatDate(inputDate: any) {
    let date, month, year;
  
    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();
  
      date = date
          .toString()
          .padStart(2, '0');
  
      month = month
          .toString()
          .padStart(2, '0');
  
    return `${date}/${month}/${year}`;
  }
  formFacturaF(){
    this.formFactura = this.formBuilder.group({
      folioFactura:  ['', Validators.required], 
      fechaFactura: ['', Validators.required],
      horaFactura:  ['', Validators.required],
      subastaFactura:  [this.auction, Validators.required],
      paletaFactura:  ['', Validators.required],
      fechaParticipacionF:  ['', Validators.required],
      emailSendFactura:  ['', Validators.required],
      rfc:['', Validators.required],
      emisorFactura:  ['Morton Subastas S.A de C.V.', Validators.required],
      receptorFactura:  ['', Validators.required],
      metodoPago:  ['', Validators.required],
      formaPago:  ['', Validators.required],
      monedaPago:  ['', Validators.required],
      tipoComprobante:  ['', Validators.required],
      tipoUso:  ['', Validators.required],
      lugarExpedicion:  ['', Validators.required],
    })
  }

}
