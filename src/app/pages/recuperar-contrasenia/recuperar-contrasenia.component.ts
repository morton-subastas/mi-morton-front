import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../models/usuario/usuario.model';
@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.component.html',
  styleUrls: ['./recuperar-contrasenia.component.css']
})
export class RecuperarContraseniaComponent implements OnInit {
  usuario!: UsuarioModel;
  constructor(private auth: AuthService,  private router:Router) { }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();
  }

  onSubmit(form: NgForm){
    console.log('form', form);
    
    if(form.invalid){ console.log("no aparece"); return;}
    //console.log("usuario enviado");
    //console.log(this.usuario);
    //console.log(form);

    this.auth.recoveryPassword(this.usuario!).subscribe(
      (resp: any) =>{
        console.log(resp);
        console.log('Exito registro');
        console.log(resp["insert"]);
        if(resp["insert"]){
          this.router.navigateByUrl('/login');
        }
      }, (err:any) => {
        console.log(err.error.mensaje);
      }

    )
  }

}
