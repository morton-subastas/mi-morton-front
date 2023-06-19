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
formConcepts!: FormGroup;
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
recieves: any;
auction: any;
dateAuction: any;
currentDate : any;
commission = 0.20;
comissionIva = 0.16;
conceptsList : any = [
  {
    lot: Number,
    quantity: Number,
    unitaryValue: Number,
    hammer: Number,
    SatConcept: Number,
    unity: Number,
    comission: Number,
    description: String
  }
];

  constructor(private formBuilder: FormBuilder, private auth:AuthService, private router:Router, private activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRouter.params.subscribe(params => {
      this.termino_html = params['id'];
      this.inv = params['iv'];
    });

    this.auth.getDetailSaleImg(this.inv, this.termino_html).subscribe(params=>{
      this.recieves = params;
      console.log("this.recieve******************: ", this.recieves);
      this.auction = params[0].saleno_ok;
      this.auction = this.auction.trim();
      this.dateAuction = params[0].saledate;
      this.dateAuction = this.formatDate(this.dateAuction)
      const date = new Date();
      this.currentDate = this.formatDate(date);
    })
    this.formFacturaF();
    this.disableFields();
    this.formsConcepts();
    
    this.auth.getMonedas().subscribe((monedas: any) => {
      this.allMonedas= monedas;
    });

    this.auth.getBancos().subscribe((bancos: any) => {
      this.allBancos= bancos;
    });

    this.auth.getMetodos().subscribe((bancos: any) => {
      this.allMetodos= bancos;
    });
    this.auth.getFormaspago().subscribe((bancos: any) => {
      this.allFormasPago= bancos;
    });

    this.auth.getProductosServicios().subscribe((bancos: any) => {
      this.allProductosServicios= bancos;
    });

    this.auth.getLugarExpedicion().subscribe((bancos: any) => {
      this.allLugares= bancos;
    });
    this.auth.getComprobantes().subscribe((bancos: any) => {
      this.allComprobantes= bancos;
    });

    this.auth.getUnidad().subscribe((bancos: any) => {
      this.allUnidades= bancos;
    });

    this.auth.getUsoCfdi().subscribe((bancos: any) => {
      this.allUsoCfdi= bancos;
    });

    this.auth.getAllUsos().subscribe((bancos: any) => {
      this.allUsos= bancos;
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

  formsConcepts(){
    this.formConcepts = this.formBuilder.group(
      {
        lote: ['', Validators.required],
        quantity: ['', Validators.required],
        description: ['', Validators.required],
        claveSat: ['', Validators.required],
        unidad: ['', Validators.required],
        hammer: ['', Validators.required],
        valorUnitario:['', Validators.required],
        iva: ['', Validators.required]
      }
    )
  }

  disableFields(){
    this.formFactura.controls['subastaFactura'].disable();
    this.formFactura.controls['emisorFactura'].disable();
    this.formFactura.controls['fechaParticipacionF'].disable();
    this.formFactura.controls['fechaFactura'].disable();
  }

  addConcepts(){
    
  }

}
