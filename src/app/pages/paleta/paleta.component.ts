import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-paleta',
  templateUrl: './paleta.component.html',
  styleUrls: ['./paleta.component.css']
})
export class PaletaComponent implements OnInit {
  resultado:any;
  isPresencial:boolean = false;
  isAusencia:boolean = false;
  isSubasta:boolean = true;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.getAuctions().subscribe((actionsDB:any) => {
      console.log("RESPUESTA_PROXIMAS");
      console.log(actionsDB);
      this.resultado = actionsDB;
    });
  }

  accionPresencial(){
    this.isPresencial = true;
    this.isAusencia = false;
    this.isSubasta = false;
    console.log("Accion Presencial");
  }

  accionAusencia(){
    this.isPresencial = false;
    this.isAusencia = true;
    console.log("Accion Ausencia");
  }

  accionRegresar(){
    this.isPresencial = false;
    this.isAusencia = false;
    this.isSubasta = true;
  }
}
