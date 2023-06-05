import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-proximas',
  templateUrl: './proximas.component.html',
  styleUrls: ['./proximas.component.css']
})
export class ProximasComponent implements OnInit {
  resultado:any;
  constructor(private auth:AuthService) { }


  ngOnInit(): void {

    this.auth.getAuctions().subscribe((actionsDB:any) => {
      console.log("RESPUESTA_PROXIMAS");
      console.log(actionsDB);
      this.resultado = actionsDB;
    });
  }

}
