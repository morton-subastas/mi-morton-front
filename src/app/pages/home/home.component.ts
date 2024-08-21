import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {  NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { PaginationInstance } from 'ngx-pagination';
import { PagingConfig } from 'src/app/models/usuario/pagingConfig';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tableSizes: any = [3, 6, 9, 12];

  config: PaginationInstance = {
    itemsPerPage: 10,
    currentPage: 1,
  };
  
  currentPage:number  = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  tableSize: number[] = [10, 20, 50, 100];

  pagingConfig: PagingConfig = {} as PagingConfig;
  dtOptions: DataTables.Settings = {}
  dtTrigger : Subject<any> = new Subject<any>(); 
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
  totalShopping: any;
  textoFiltro!:string;
  constructor(private auth:AuthService, private router:Router, private activatedRouter:ActivatedRoute) { }

  ngOnInit() {
    this.getAllElements();
  }

  numberWithCommas(x: any) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  factura(){
    this.router.navigateByUrl('/factura');
  }

  getAllElements(){
    this.activatedRouter.params.subscribe(params =>{
      this.cliente_num = params['cliente'];
      if ((this.cliente_num == '') || (this.cliente_num == undefined)){
        this.cliente_num = localStorage.getItem('cliente')!;
      }
    });

    this.cliente_num != localStorage.getItem('cliente');
      this.trae_data != localStorage.getItem('valorCompras');
      if (this.trae_data){
        this.dataCompras2 = localStorage.getItem('dataCompras');
        this.ActivoSpinner = false;
        this.DontShowTable = true;
        this.auctionsFindSpecificArr = JSON.parse(this.dataCompras2);
        this.total = this.auctionsFindSpecificArr.length;
      }else{
        this.auth.getComprasToRFC(this.cliente_num).subscribe((auctionfindSpecificSaleDB: any) => {
          this.ActivoSpinner = false;
          this.DontShowTable = true;
          this.pagingConfig.totalItems= auctionfindSpecificSaleDB.length
          this.auctionsFindSpecificArr = auctionfindSpecificSaleDB;
          this.totalShopping = this.auctionsFindSpecificArr;
          auctionfindSpecificSaleDB.forEach((element:any) => {
              if(element.estate=='Por pagar'){
                this.auth.getAmountDebt(element.invno).subscribe((debtAmount:any) => {
                    element['debtAmount'] = debtAmount[0].debt;
                })
              }
              else{
                element['debtAmount'] = 0;
              }
          });
        });
      }
  }

  changeAuctName(saleName:any){
    if(saleName.toLocaleLowerCase().includes('descubrimiento') || saleName.toLocaleLowerCase().includes('oportunidades')){
      return "Subasta de los Sabados"
    }else{
      return saleName
    }
  }

}
