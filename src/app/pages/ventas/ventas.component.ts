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

    this.cliente_num = localStorage.getItem('cliente')!;

    this.auth.getVentasToRFC(this.cliente_num).subscribe(dataVenvtas => {
      this.ActivoSpinner = false;
      this.DontShowTable = true;
      this.auctionsFindSpecificArr = dataVenvtas;
      this.numSubasta = this.auctionsFindSpecificArr.saleno;
    });
  }

  numberWithCommas(x: any) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  changeAuctName(saleName:any){
    if(saleName.toLocaleLowerCase().includes('descubrimiento') || saleName.toLocaleLowerCase().includes('oportunidades')){
      return "Subasta de los Sabados"
    }else{
      return saleName
    }
  }

}
