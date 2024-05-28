import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../models/usuario/usuario.model';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModel | undefined;
  DontShowData:boolean = false;
  cliente:string = '';


  //recordarme = false;

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();

    /*
    if(localStorage.getItem('email')){
        this.usuario.email = localStorage.getItem('email');
        this.recordarme = true;
    }
    */
  }

  login(form: NgForm){
    if(form.invalid){ 
      return;
    }
    this.auth.login(this.usuario!).subscribe((res:any) => {
      this.cliente = res['cliente'];

      /*
      if(this.recordarme){
        localStorage.setItem('email', this.usuario.email);
      }
      */
     this.usuario!.cliente = this.cliente;
      this.router.navigateByUrl('/home');
    }, (err) => {
      this.DontShowData = true;
      //console.log(err.error.mensaje);
    })
  }

}
