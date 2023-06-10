import { Component, OnInit } from '@angular/core';
import { Validators,FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
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
    })
    console.log('***************************************** ',this.recieve);
    this.formFacturaF();
    
    this.auth.getMonedas().subscribe((monedas: any) => {
      this.allMonedas= monedas;
      console.log(this.allMonedas);
    });
    this.formFactura.controls['emisorFactura'].disable();
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

  formFacturaF(){
    this.formFactura = this.formBuilder.group({
      folioFactura:  ['', Validators.required], 
      fechaFactura: ['', Validators.required],
      horaFactura:  ['', Validators.required],
      subastaFactura:  ['', Validators.required],
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
