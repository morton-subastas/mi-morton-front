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



  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() {
    this.cliente_num = localStorage.getItem('cliente');

    this.auth.getContratosToRFC(this.cliente_num).subscribe(res => {
      //console.log(auctionfindSpecificSaleDB);
      //console.log("************************");

     // console.log(auctionfindSpecificSaleDB);
     // this.auctionsFindSpecificArr = auctionfindSpecificSaleDB;
      this.contractData = res;

      this.groupArr= this.contractData.reduce((r,{receipt})=>{
        if(!r.some(o=>o.receipt==receipt)){
          r.push({receipt,groupItem:this.contractData.filter(v=>v.receipt==receipt)});
          }
          return r;
        },[]);


    });

  }

}
