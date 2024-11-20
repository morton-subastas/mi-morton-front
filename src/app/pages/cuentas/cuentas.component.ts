import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {

  num_cliente:any;
  card:any;
  clientNum:any;
  cards:any;
  totalCards:any;

  constructor(private activatedRoute: ActivatedRoute, private auth:AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.num_cliente = params['cliente'];
    });

    this.getCards();
  }

  getCards(){
    this.auth.getCards(localStorage.getItem('cliente')).subscribe((resp:any)=>{
      if(resp.status==200){
        this.cards = resp.data;
        this.totalCards = this.cards.length;
      }
    })
  }

  openModal(){
    ($('#cardModal') as any).modal('show')
  }

  saveCard(){
    this.card = (<HTMLInputElement>document.getElementById('new-card')).value;
    this.clientNum = localStorage.getItem('cliente');
    this.auth.saveCard(this.clientNum,this.card).subscribe((resp:any) => {
      if(resp.status==200){
        this.getCards();
        ($('#cardModal') as any).modal('hide');
        (<HTMLInputElement>document.getElementById('new-card')).value = '';
        ($('#successModal') as any).modal('show');
      }else{
        ($('#errorModal') as any).modal('show');
      }
    })
  }

  deleteCard(idCard:any){
    this.auth.deleteCard(idCard).subscribe((resp:any)=>{
      console.log(resp);
      if(resp.status==200){
        ($('#successModal') as any).modal('show');
        this.getCards();
      }else{
        ($('#errorModal') as any).modal('show');
      }
    })
  }

}
