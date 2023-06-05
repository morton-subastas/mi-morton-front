import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-index-catalagos',
  templateUrl: './index-catalagos.component.html',
  styleUrls: ['./index-catalagos.component.css']
})
export class IndexCatalagosComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  bancos(){
    this.router.navigateByUrl('/bancos');
  }

  monedas(){
    this.router.navigateByUrl('/monedas')
  }

}
