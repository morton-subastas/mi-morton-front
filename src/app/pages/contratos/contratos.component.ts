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
  recieptList: any;
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
      this.groupArr = res
      this.initialResult = res
      console.log('this.groupArr ', res);
      this.allYearList= this.createArrayYear(this.groupArr);
    });
    console.log('this.groupArr: ', this.groupArr);
    
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
    let year: any;
    for(let i = 0; i <object.length ; i++){
      year = this.getYear(object[i].edate);
      this.yearList.push({
        id: i, value: year
      })
    }
    this.yearList= this.yearList.slice(1)
    const unique = this.yearList.filter(
      (obj: any, index:any) =>
      this.yearList.findIndex((item:any) => item.value === obj.value) === index
    );
    console.log('unique: ', unique);
    return unique
  }

  getYear(date:any){
    let fulldate:any = new Date(date)
    fulldate = fulldate.getFullYear()
    return fulldate
  }

  transformDate(date: any){
    let year:any = new Date(date)
    year = year.getFullYear();
    return year
  }

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
    }))
  }

  catchSaleno(event:any){
    console.log('event ', event.target.value );
    this.groupArr = this.groupArr.filter((item: any) =>{
      return item.saleno == event.target.value;
    })
    console.log('this.groupArr', this.groupArr);
    this.getRecieptList();
  }

  getRecieptList(){
    this.recieptList = this.groupArr.map((item: any)=>({
      id : item.id,
      value: item.receipt
    }));
    //this.getLotList()
  }

  catchReciept(event:any){
    console.log('event ', event.target.value );
    this.groupArr = this.groupArr.filter((item: any) =>{
      return item.receipt == event.target.value;
    })
    this.getLotList();
  }

  getLotList(){
    console.log('this.groupArr getList', this.groupArr);
    this.lotList = this.groupArr.map((item: any)=> ({
      id:item.id,
      value: item.lot
    }))
  }
  catchLot(event:any){
    console.log('event ', event.target.value );
    this.groupArr = this.groupArr.filter((item: any) =>{
      return item.lot == event.target.value;
    })
    console.log('this.groupArr', this.groupArr);
  }

}
