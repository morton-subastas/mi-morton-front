import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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

    this.auth.getVentasToRFC(this.cliente_num).subscribe(dataVenvtas => {
      this.ActivoSpinner = false;
      this.DontShowTable = true;
      //console.log("DATAVENTAS************************");
      //console.log(dataVenvtas);
      //console.log(auctionfindSpecificSaleDB[0]);
      this.auctionsFindSpecificArr = dataVenvtas;
    });
  }


  numberWithCommas(x: any) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

}
