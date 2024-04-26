import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  ActivoSpinner:boolean = true;
  DontShowTable:boolean = false;

  cliente_num:string = '';
  auctionsFindSpecificArr:any = [];
  refnoInfo:any = [];
  numSubasta:any;

  constructor(private auth:AuthService, private router:Router,  private activatedRouter:ActivatedRoute) { }

  ngOnInit() {
    //console.log("VENTAS");

    /*
    this.activatedRouter.params.subscribe(params =>{
      console.log("llega activet");
      this.cliente_num = params['cliente'];
    });
*/

this.cliente_num = localStorage.getItem('cliente')!;

    this.auth.getVentasToRFCWS(this.cliente_num).subscribe(dataVenvtas => {
      this.ActivoSpinner = false;
      this.DontShowTable = true;
      this.auctionsFindSpecificArr = dataVenvtas;
      this.numSubasta = this.auctionsFindSpecificArr.saleno;
      console.log(this.auctionsFindSpecificArr);
      return;
      
      this.auctionsFindSpecificArr.forEach((element:any,index:any) => {
          let formattedDate = element.saledate.split("T");
          if(element.estatus == 'Vendido'){
            element['proxima'] = '';
          }else{
            this.auth.getNextAuctionByLot(element.refno, formattedDate[0]).subscribe(dataInfo=>{
              this.refnoInfo = dataInfo;
              if(this.refnoInfo.length == 0){
                  element['proxima'] = 'Pendiente para próxima subasta';
              }else{
                  element['proxima'] = 'Se agrego a subasta' + this.refnoInfo.event;
              }
            })
          }
      });

      console.log(this.auctionsFindSpecificArr);
      
    
      
    });
  }

  


  numberWithCommas(x: any) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

}
