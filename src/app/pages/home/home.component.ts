import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {  NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ActivoSpinner:boolean = true;
  DontShowTable:boolean = false;
  cliente_num:string = '';
  MuestraDatos:boolean = false;
  auctionsFindSpecificArr:any = [];
  public page: number = 0;
  searchItem: string = '';
  total:number = 0;
  desactivaNextPage: boolean = true;
  desactivaPrevious: boolean = false;
  diferenciaNext: number = 0;
  numFilter: number = 0;
  suma: number = 0;
  prueba: string = '';
  dataCompras2:any = [];
  trae_data: string = '';
  row_filter:string = '';
  row_filterN:number = 0;
  constructor(private auth:AuthService, private router:Router, private activatedRouter:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params =>{
      //console.log("llega activet");
      this.cliente_num = params['cliente'];
      if ((this.cliente_num == '') || (this.cliente_num == undefined)){
        this.cliente_num = localStorage.getItem('cliente')!;
      }
    });

    this.cliente_num != localStorage.getItem('cliente');
    //console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFf");

    /*
    this.prueba = localStorage.getItem('valorCompras');
    console.log("PRUEBA" + this.prueba);
    if (this.prueba == null){
      */

      //this.dataCompras2 = this.read_token();
      //console.log("localStorage.....");
      this.trae_data != localStorage.getItem('valorCompras');
      //console.log(this.trae_data);
      //console.log("FINlocalStorage.....");

      if (this.trae_data){
        //console.log("SIN API");
        this.dataCompras2 = localStorage.getItem('dataCompras');
        this.ActivoSpinner = false;
        this.DontShowTable = true;
        this.MuestraDatos = true;
        //console.log(JSON.parse(this.dataCompras2));
        this.auctionsFindSpecificArr = JSON.parse(this.dataCompras2);
        
        this.total = this.auctionsFindSpecificArr.length;
          //console.log("TOTAL" + this.total);
        if(this.total < 10){
          this.MuestraDatos = false;
        }

      }else{
        console.log('Entro a la peticion');

        this.auth.getComprasToRFC(this.cliente_num).subscribe((auctionfindSpecificSaleDB: any) => {
          this.ActivoSpinner = false;
          this.DontShowTable = true;
          this.MuestraDatos = true;
          //console.log(auctionfindSpecificSaleDB);
          //console.log("************************COMPRAS");
          //console.log(auctionfindSpecificSaleDB);
          this.auctionsFindSpecificArr = auctionfindSpecificSaleDB;
          console.log('Valor de la peticion auctionfindSpecificSaleDB:', auctionfindSpecificSaleDB);
          
          if (this.auctionsFindSpecificArr.length > 10){
            console.log('Es mayor a 10');
            this.suma = 10;
            this.total = this.auctionsFindSpecificArr.length;
          }
          else {
            this.total = this.auctionsFindSpecificArr.length;
            this.suma = this.auctionsFindSpecificArr.length
            //console.log("TOTAL" + this.total);
            if(this.total < 10){
              this.MuestraDatos = false;
            }
          }
        });
        //console.log("CON API {" + this.cliente_num + "}");
        /* this.auth.getComprasToRFC(this.cliente_num).subscribe(auctionfindSpecificSaleDB => {
          this.ActivoSpinner = false;
          this.DontShowTable = true;
          this.MuestraDatos = true;
          //console.log(auctionfindSpecificSaleDB);
          //console.log("************************COMPRAS");
          //console.log(auctionfindSpecificSaleDB);
          this.auctionsFindSpecificArr = auctionfindSpecificSaleDB;
          this.suma = 10;
          this.total = this.auctionsFindSpecificArr.length;
          //console.log("TOTAL" + this.total);
          if(this.total < 10){
            this.MuestraDatos = false;
          }
        });

        this.getReciepts(); */

      }
    /*
      }else{
      console.log("else...2");
      this.dataCompras2 = JSON.parse(localStorage.getItem('dataCompras'));
      //console.log("DATA" + this.dataCompras2);
      this.auctionsFindSpecificArr =  this.dataCompras2;
      console.log(this.auctionsFindSpecificArr);
      this.suma = 10;
          this.total = this.auctionsFindSpecificArr.length;
          console.log("TOTAL" + this.total);
          if(this.total < 10){
            this.MuestraDatos = false;
          }
    }*/
    //console.log("+++++++++++++");
    this.row_filter != sessionStorage.getItem('numFilter');
    this.row_filterN = parseInt(this.row_filter);

    //console.log(this.row_filter);
    //console.log(this.row_filterN);
    if(this.row_filterN > 0){
      //console.log("con numero");
      this.numFilter = this.row_filterN;
      this.suma = this.numFilter;
      //console.log("suma");
      //console.log(this.suma);
    }

  }

  getReciepts(){
    this.auth.getRecieptByCustomer(this.cliente_num).subscribe((auctionfindSpecificSaleDB: any) => {
      this.ActivoSpinner = false;
      this.DontShowTable = true;
      this.MuestraDatos = true;
      //console.log(auctionfindSpecificSaleDB);
      //console.log("************************COMPRAS");
      //console.log(auctionfindSpecificSaleDB);
      this.auctionsFindSpecificArr = auctionfindSpecificSaleDB;
      this.suma = 10;
      this.total = this.auctionsFindSpecificArr.length;
      //console.log("TOTAL" + this.total);
      if(this.total < 10){
        this.MuestraDatos = false;
      }
    });
  }
  
  nextPage(){
    this.desactivaPrevious = true;
        if (this.page < this.total ){
          console.log(this.suma);
          this.numFilter = Number(this.numFilter)
          this.page += this.numFilter;
          this.suma += this.numFilter;
        }
        this.diferenciaNext = this.total - this.page;
        if ( (this.diferenciaNext < 10)){
          this.desactivaNextPage = false;
        }
  }

  previousPage(){
    console.log('this.numFilter;',this.numFilter);
    this.desactivaNextPage = true;
    if (this.page > 0){
      this.page -= this.numFilter;
      this.suma -= this.numFilter;
    }
    //console.log("-----------------");
    //console.log("PREVIUS" + this.page);
    if(this.page == 0){
      this.desactivaPrevious = false;
    }
  }

  onSearchLote(searchR: string){
    this.searchItem = searchR;
    //console.log(this.searchItem);
  }

  saveNumber( Forma: NgForm){
    sessionStorage.setItem('numFilter', Forma.value['numFilter']);
    this.numFilter = Forma.value['numFilter'];
    this.numFilter = Number(this.numFilter)
    console.log('this.numFilter',this.numFilter);
    //console.log("NUMEROS");
    //console.log("numFilter" + this.numFilter);

    if (this.numFilter){
      this.suma = this.numFilter;
      if(this.numFilter > this.total){
        this.desactivaPrevious = false;
        this.desactivaNextPage = false;
      }
    }
  }

  numberWithCommas(x: any) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  factura(){
    this.router.navigateByUrl('/factura');
  }

}
