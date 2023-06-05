import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalogo-monedas',
  templateUrl: './catalogo-monedas.component.html',
  styleUrls: ['./catalogo-monedas.component.css']
})
export class CatalogoMonedasComponent implements OnInit {

  allMonedas:any

  constructor(private auth:AuthService, private router:Router, private activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.auth.getMonedas().subscribe((monedas: any) => {
      this.allMonedas= monedas;
      console.log(this.allMonedas);
    });
  }

}
