import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {
  cliente_num:string = '';
  auctionsFindSpecificArr:any = [];
  contractData = [];
  dataUser:any = {};
  groupArr:any;
  initialResult: any;
  groupByYar: any;
  allUnidades: any
  allFormasPago: any;
  allComprobantes:any
  salenoList: any;
  select: any;
  selectSubasta: any;
  selectLote: any;
  selectAnio: any;
  recieptList: any;
  optionsSelectors:any;
  contractList: any = [];
  subastaList : any = [];
  lotList: any;
  yearList: any = [
    {
      id:Number,
      value: Number
    }
  ];
  allYearList: any;
  

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() {
    this.cliente_num = localStorage.getItem('cliente')!;
    this.auth.getContratosToRFC(this.cliente_num).subscribe(res => {
      this.groupArr = res;
      this.initialResult = res;
      for(let i = 0; i < this.groupArr.length; i++){
          if(this.contractList.indexOf(this.groupArr[i].receipt) === -1){
            this.contractList.push(this.groupArr[i].receipt);
          }
      }

      for(let i=0; i < this.groupArr.length; i++){
        if(this.subastaList.indexOf(this.groupArr[i].saleno) === -1){
          this.subastaList.push(this.groupArr[i].saleno);
        }
      }

      this.allYearList= this.createArrayYear(this.groupArr);
    });
    
    this.auth.getComprobantes().subscribe((bancos: any) => {
      this.allComprobantes= bancos;
      console.log(this.allComprobantes);
    });
    /* this.auth.getContratosToRFC(this.cliente_num).subscribe(res => {
      //console.log(auctionfindSpecificSaleDB);
      console.log("************************");
      console.log(res);
     // console.log(auctionfindSpecificSaleDB);
     // this.auctionsFindSpecificArr = auctionfindSpecificSaleDB;
      this.contractData = res;
      this.groupArr = res;
      
      this.groupArr= this.contractData.reduce((r:any,{receipt})=>{
        console.log("A1)" + r);
        console.log("A2)" + receipt)
        if(!r.some((o:any)=>o.receipt==receipt)){
          console.log("B)" + r);
          console.log("B2)" + receipt);
          
          r.push(
            {receipt,
              groupItem:this.contractData.filter((v:any)=>v.receipt==receipt)});
              
          }
          return r;
        },[]);
    }); */

  }

  filterByYear(){
    
  }

  createArrayYear(object: any){
    console.log(this.groupArr);
    
    let year: any;
    for(let i = 0; i <object.length ; i++){
      year = this.getYear(object[i].edate);
      this.yearList.push({
        id: i, value: year
      })
    }
    this.yearList= this.yearList.slice(1)
    let unique = this.yearList.filter(
      (obj: any, index:any) =>
      this.yearList.findIndex((item:any) => item.value === obj.value) === index
    );
    console.log('unique: ', unique);
    unique = unique.sort(function (x:any, y:any) {
      return y.value - x.value;
    });
    return unique
  }



  getYear(date:any){
    let fulldate:any = new Date(date)
    fulldate = fulldate.getFullYear()
    return fulldate
  }

 /*  transformDate(date: any){
    let year:any = new Date(date)
    year = year.getFullYear();
    return year
  } */

  catchYear(event: any){
    console.log('event ', event.target.value );
    console.log('this.groupArr', this.groupArr);
    this.groupArr = this.initialResult.filter((item: any) =>{
      var d = new Date(item.edate);
      //alert(d.getFullYear());
      return d.getFullYear() == event.target.value
    })

    this.getListAuction()
  }

  getListAuction(){
    this.salenoList = this.groupArr.map((item: any) =>({
      id:item.id,
      value:item.saleno
    }));
    //this.salenoList = this.salenoList.slice(1)
    this.salenoList = this.salenoList.filter(
      (obj:any, index: any) => 
      this.salenoList.findIndex((item:any) => item.value === obj.value) === index
    )
    console.log(this.salenoList);
    
  }

  catchSaleno(event:any){
    console.log('event ', event.target.value );
    this.groupArr = this.initialResult;
    this.groupArr = this.groupArr.filter((item: any) =>{
      //console.log(item.saleno);
      
      return item.saleno == event.target.value;
    })
    console.log('this.groupArr', this.groupArr);
    //this.getRecieptList();
  }

  getRecieptList(){
    this.recieptList = this.groupArr.map((item: any)=>({
      id : item.id,
      value: item.receipt
    }));
    console.log(this.recieptList);
   // this.recieptList = this.recieptList.slice(1)
    this.recieptList = this.recieptList.filter(
      (obj:any, index: any) => 
      this.recieptList.findIndex((item:any) => item.value === obj.value) === index
    )
    
    
    //this.getLotList()
  }

  catchReciept(event:any){
    this.groupArr = this.initialResult;
    console.log('event ', event.target.value );
    this.groupArr = this.groupArr.filter((item: any) =>{
      return item.receipt == event.target.value;
    })
    this.getLotList();
  }

  resetArray(){
    this.groupArr = this.initialResult;
    this.select = document.querySelector('#contrato');
    this.select.selectedIndex = 0;
    this.selectSubasta = document.querySelector('#subasta');
    this.selectSubasta.selectedIndex = 0;
    this.selectLote = document.querySelector('#lote');
    this.selectLote.selectedIndex = 0;
    this.selectAnio = document.querySelector('#anio');
    this.selectAnio.selectedIndex = 0;
  }

  getLotList(){
    console.log('this.groupArr getList', this.groupArr);
    this.lotList = this.groupArr.map((item: any)=> ({
      id:item.id,
      value: item.lot
    }))
  }
  catchLot(event:any){
    this.groupArr = this.initialResult;
    console.log('event ', event.target.value );
    this.groupArr = this.groupArr.filter((item: any) =>{
      return item.lot == event.target.value;
    })
    console.log('catch lot function', this.groupArr);
  }

}
