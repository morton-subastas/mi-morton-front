import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cliente_num:string = '';
  nombre:string = '';
  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() {
      this.cliente_num = localStorage.getItem('cliente')!;
      this.nombre = localStorage.getItem('nombre')!;
      //console.log("HEADER");
      //console.log(localStorage.getItem('cliente'));
      //console.log(localStorage.getItem('token'));
  }

  ventas(){
    this.router.navigateByUrl('/ventas');
  }

Compras(){
  this.router.navigateByUrl('/home');
}

Paleta(){
  this.router.navigateByUrl('/paleta');
}

Contratos(){
  this.router.navigateByUrl('/contratos');
}

Proximas(){
  this.router.navigateByUrl('/proximas');
}

salir(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
}

catalogos(){
  this.router.navigateByUrl('/index-catalogos')
}

pendientes(){
  this.router.navigateByUrl('/pendientes')
}

}
