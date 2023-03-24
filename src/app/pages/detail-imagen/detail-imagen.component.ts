import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common'

@Component({
  selector: 'app-detail-imagen',
  templateUrl: './detail-imagen.component.html',
  styleUrls: ['./detail-imagen.component.css']
})
export class DetailImagenComponent implements OnInit {
  cadena1:string = ''; cadena2:string = ''; cadena3:string = '';
  cadena4:string = ''; cadena5:string = ''; cadena6:string = '';
  novendidos:boolean = true;
  subasta:string = '';
  termino_html:string = '';
  subastaes:string = '';
  auctionsFindSpecificArr:any = [];
  auctionsFindSpecificSaleArr:any = [];
  subastados:string='';
  row_filter:string = '';
  constructor(private activatedRoute: ActivatedRoute, private auth:AuthService, private location: Location) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.subastaes = params['subasta'];
      this.termino_html = params['id'];
    });
    
    this.row_filter = sessionStorage.getItem('numFilter');

    this.auth.getDetailImg(this.termino_html).subscribe(auctionfindSpecificDB => {
      //console.log("**************************DETAIL");
      this.auctionsFindSpecificArr = auctionfindSpecificDB;
      //console.log(this.auctionsFindSpecificArr);
      //console.log("fin otro");
      //console.log(auctionfindSpecificDB);
    });


    this.auth.getDetailSaleImg(this.subastaes).subscribe(auctionfindSpecificSaleDB => {
      //console.log("Otro");
      //console.log("termino" + this.termino_html);
      console.log("--------------------------");
      console.log(auctionfindSpecificSaleDB);
      //console.log("no vendido" + this.novendidos);
      //console.log("--------------------------");
      this.auctionsFindSpecificSaleArr[0] = auctionfindSpecificSaleDB;
      this.subasta = this.auctionsFindSpecificSaleArr[0][0]['salelot'];
      //console.log(this.auctionsFindSpecificSaleArr[0][0]['typeset']);
      //console.log("subasta" + this.subasta);
      this.subastados = this.auctionsFindSpecificSaleArr[0][0]['salelot'];
      var cadena = this.auctionsFindSpecificSaleArr[0][0]['typeset'];
      let indice = cadena.split("<R>");

      //console.log("Extraída: ", indice[1]);
      this.cadena1 = indice[0];
      this.cadena2 = indice[1];
      this.cadena3 = indice[2];
      this.cadena4 = indice[3];
      this.cadena5 = indice[4];
      this.cadena6 = indice[5];
      //console.log("fin otro");
      //console.log(this.auctionsFindSpecificSaleArr);
      //console.log(auctionfindSpecificSaleDB);
      //this.loading = false;
      //this.favoritos = true;
    });

  }

  regresar(Forma: NgForm){
    this.location.back();
  }

}
