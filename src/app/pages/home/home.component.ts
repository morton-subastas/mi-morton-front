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
    this.pagingConfig = {
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage,
      totalItems: this.totalItems
    }

    this.getAllElements();

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onPageChange(event: any): void {
    this.config.currentPage = event;
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
      this.dtTrigger.next();
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

  applyFilter(filterValue: any) {
    console.log(filterValue);
    const filter = (filterValue.target as HTMLInputElement).value;
		this.auctionsFindSpecificArr.filter = filter.toLocaleLowerCase();
    filter === '' || filter.length === 1
			? ''
			: console.log(`${this.totalShopping.length} registros`);
  }

  filtrarTabla(textoFiltro: string) {
    this.auctionsFindSpecificArr = this.totalShopping.filter((item:any) => {
      const values = Object.values(item).map((value:any) => value.toString().toLowerCase());
      return values.some(value => value.includes(textoFiltro.toLowerCase()));
    });
  }
  
  onSearchLote(searchR: string){
    console.log('Test', searchR);
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

  getAllElements(){
    this.activatedRouter.params.subscribe(params =>{
      //console.log("llega activet");
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
        this.MuestraDatos = true;
        this.auctionsFindSpecificArr = JSON.parse(this.dataCompras2);
        this.total = this.auctionsFindSpecificArr.length;
        if(this.total < 10){
          this.MuestraDatos = false;
        }

      }else{
        console.log('Entro a la peticion');

        this.auth.getComprasToRFC(this.cliente_num).subscribe((auctionfindSpecificSaleDB: any) => {
          this.ActivoSpinner = false;
          this.DontShowTable = true;
          this.MuestraDatos = true;
          this.pagingConfig.totalItems= auctionfindSpecificSaleDB.length
          this.auctionsFindSpecificArr = auctionfindSpecificSaleDB;
          this.totalShopping = this.auctionsFindSpecificArr;

          console.log('Valor de la peticion auctionfindSpecificSaleDB:', auctionfindSpecificSaleDB);
          
          if (this.auctionsFindSpecificArr.length > 10){
            console.log('Es mayor a 10');
            this.suma = 10;
            this.total = this.auctionsFindSpecificArr.length;
          }
          else {
            this.total = this.auctionsFindSpecificArr.length;
            this.suma = this.auctionsFindSpecificArr.length
            if(this.total < 10){
              this.MuestraDatos = false;
            }
          }
        });
      }
    this.row_filter != sessionStorage.getItem('numFilter');
    this.row_filterN = parseInt(this.row_filter);
    if(this.row_filterN > 0){
      this.numFilter = this.row_filterN;
      this.suma = this.numFilter;
    }
  }

  onTableDataChange(event:any){
    this.pagingConfig.currentPage  = event;
    this.getAllElements();
  }
  onTableSizeChange(event:any): void {
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage = 1;
    this.getAllElements();
  }

}
