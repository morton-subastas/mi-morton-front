import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataTableDirective } from 'angular-datatables';
import { PaginationInstance } from 'ngx-pagination';
import { PagingConfig } from 'src/app/models/usuario/pagingConfig';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-deudas',
  templateUrl: './deudas.component.html',
  styleUrls: ['./deudas.component.css']
})
export class DeudasComponent implements OnInit {

  num_cliente:any;
  debts:any = [];

  constructor(private activatedRoute: ActivatedRoute, private auth:AuthService) { }

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      this.num_cliente = params['cliente'];
    });

    this.getDebts();
  }

  getDebts(){
    this.auth.getDebts(localStorage.getItem('cliente')).subscribe((resp:any)=>{
        this.debts = resp;
        console.log(this.debts);
        
    })
  }

  numberWithCommas(x: any) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

}
