import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario/usuario.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioModel | undefined;

  constructor(private auth: AuthService,  private router:Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    //this.usuario.email = 'msanchez@mortonsubastas.com';

  }

  onSubmit(form: NgForm){

    if(form.invalid){ console.log("no aparece"); return;}
    //console.log("usuario enviado");
    //console.log(this.usuario);
    //console.log(form);

    this.auth.nuevo_usuario(this.usuario!).subscribe(
      resp =>{
        console.log(resp);
        console.log('Exito registro');
        console.log(resp["insert"]);
        if(resp["insert"]){
          this.router.navigateByUrl('/login');
        }
      }, (err) => {
        console.log(err.error.mensaje);
      }

    )
  }
}
