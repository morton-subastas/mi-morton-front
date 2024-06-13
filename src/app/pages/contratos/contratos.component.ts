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
  saledate:any;
  initialResult: any;
  groupByYar: any;
  allUnidades: any
  allFormasPago: any;
  DontShowTable:boolean = false;
  allComprobantes:any
  salenoList: any;
  select: any;
  selectSubasta: any;
  selectLote: any;
  selectAnio: any;
  recieptList: any;
  ActivoSpinner:boolean = true;
  message:any;
  optionsSelectors:any;
  contractList: any = [];
  subastaList : any = [];
  newDate : any;
  newAuction:any;
  lotList: any;
  flag : any;
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
    this.saledate = new Date().toJSON();
    this.auth.getContratosToRFC(this.cliente_num).subscribe(res => {
      this.ActivoSpinner = false;
      this.DontShowTable = true;
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
    let unique = this.yearList.filter(
      (obj: any, index:any) =>
      this.yearList.findIndex((item:any) => item.value === obj.value) === index
    );
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


  catchYear(event: any){
    this.select = document.querySelector('#contrato');
    this.select.selectedIndex = 0;
    this.selectSubasta = document.querySelector('#subasta');
    this.selectSubasta.selectedIndex = 0;
    this.selectLote = document.querySelector('#lote');
    this.selectLote.selectedIndex = 0;
    console.log('event ', event.target.value );
    this.groupArr = this.initialResult.filter((item: any) =>{
      var d = new Date(item.edate);
      return d.getFullYear() == event.target.value
    })
    this.getListAuction();
  }

  getListAuction(){
    this.salenoList = this.groupArr.map((item: any) =>({
      id:item.id,
      value:item.saleno,
      date: new Date(item.edate).toLocaleDateString()
    }));
    this.salenoList = this.salenoList.filter(
      (obj:any, index: any) => 
      this.salenoList.findIndex((item:any) => item.value === obj.value) === index
    )

  }

  catchSaleno(event:any){
    let DropdownList = (document.getElementById("anio")) as HTMLSelectElement;
    let sel = DropdownList.selectedIndex;
    let opt = DropdownList.options[sel];
    let CurValue = (<HTMLOptionElement>opt).value;
    this.groupArr = this.initialResult;
    this.groupArr = this.groupArr.filter((item: any) =>{
      var d = new Date(item.edate);
      return (item.saleno == event.target.value && d.getFullYear() == parseInt(CurValue))
    })
    this.getRecieptList();
  }

  getRecieptList(){
    this.recieptList = this.groupArr.map((item: any)=>({
      id : item.id,
      value: item.receipt
    }));
    this.recieptList = this.recieptList.filter(
      (obj:any, index: any) => 
      this.recieptList.findIndex((item:any) => item.value === obj.value) === index
    )
    this.getLotList()
  }

  catchReciept(event:any){
    let DropdownList = (document.getElementById("anio")) as HTMLSelectElement;
    let sel = DropdownList.selectedIndex;
    let opt = DropdownList.options[sel];
    let CurValue = (<HTMLOptionElement>opt).value;
    
    let DropDownSubasta = (document.getElementById("subasta")) as HTMLSelectElement;
    let selSubasta = DropDownSubasta.selectedIndex;
    let optSubasta = DropDownSubasta.options[selSubasta];
    let subastaValue = (<HTMLOptionElement>optSubasta).value;
    this.groupArr = this.initialResult;

    console.log('event ', event.target.value );
    this.groupArr = this.groupArr.filter((item: any) =>{
      var d = new Date(item.edate);
      return (item.receipt == event.target.value && d.getFullYear() == parseInt(CurValue) && item.saleno == subastaValue)
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
    let DropdownList = (document.getElementById("anio")) as HTMLSelectElement;
    let sel = DropdownList.selectedIndex;
    let opt = DropdownList.options[sel];
    let CurValue = (<HTMLOptionElement>opt).value;

    let DropDownSubasta = (document.getElementById("subasta")) as HTMLSelectElement;
    let selSubasta = DropDownSubasta.selectedIndex;
    let optSubasta = DropDownSubasta.options[selSubasta];
    let subastaValue = (<HTMLOptionElement>optSubasta).value;


    let DropDownContrato = (document.getElementById("contrato")) as HTMLSelectElement;
    let selContrato = DropDownContrato.selectedIndex;
    let optContrato = DropDownContrato.options[selContrato];
    let contratoValue = (<HTMLOptionElement>optContrato).value;
    this.groupArr = this.initialResult;


    console.log('event ', event.target.value );
    this.groupArr = this.groupArr.filter((item: any) =>{
      var d = new Date(item.edate);
      return (item.lot == event.target.value && d.getFullYear() == parseInt(CurValue) && item.receipt == contratoValue && item.saleno == subastaValue)

    })
  
  }


}
