import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalogo-bancos',
  templateUrl: './catalogo-bancos.component.html',
  styleUrls: ['./catalogo-bancos.component.css']
})
export class CatalogoBancosComponent implements OnInit {
  allBancos:any

  constructor(private auth:AuthService, private router:Router, private activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.auth.getBancos().subscribe((bancos: any) => {
      this.allBancos= bancos;
      console.log(this.allBancos);
      
      //console.log(auctionfindSpecificSaleDB);
      //console.log("************************COMPRAS");
      //console.log(auctionfindSpecificSaleDB);

    });
  }

}
