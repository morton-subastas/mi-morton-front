import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recibo-venta',
  templateUrl: './recibo-venta.component.html',
  styleUrls: ['./recibo-venta.component.css']
})
export class ReciboVentaComponent implements OnInit {
  termino_html:string = '';
  subastaes:string = '';
  nombreSubasta: string = '';
  fechaSubasta: any;
  lugar: string = '';
  inv:string = '';
  items: any;
  imagene:string = '';
  descript:string='';
  paleta: string = '';
  hammer:number = 0.00;
  total_elements: number = 0;
  subtotal: number = 0;
  premium:number = 0;
  iva:number = 0;
  recibo:string='';
  contador: number = 0;
  total_sum:number = 0;
  date:any;
  lotDetail:any;
  vat: any;
  arr: any;
  isr: any;
  photo: any;
  imagen: any;
  saleno: any;
  commission: any;
  inssurance: any;
  reserve: any;
  lote: any;
  total:any;
  arrayToEmail:any = [];
  clientEmail:any;
  clientNum:any;

  constructor(private activatedRoute: ActivatedRoute, private auth:AuthService,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log('params', params);

      this.subastaes = params['subasta'];
      this.termino_html = params['id'];
      this.inv = params['iv'];
      this.inv = this.inv.trim()
      console.log('this.inv', this.inv);
      
      this.nombreSubasta = params['salename'];
      this.fechaSubasta = new Date(params['saleDate']);
      this.date = params['saleDate']
      this.fechaSubasta = this.fechaSubasta.toLocaleDateString()
      this.lugar = params['salelocale'];
    });
    this.auth.getDetailSale(this.inv, this.date).subscribe(result =>{
      //console.log('result', result);
      //this.items= result;
      const uniqueValues = this.removeDuplicates(result);
      this.items = uniqueValues; 
      console.log('uniqueValues', uniqueValues);
      this.paleta = result[0]['bidder'][0];
      this.hammer = result[0]['hammer'];
      this.imagene = result[0]['pictpath'];
      this.descript = result[0]['descript'][0];
      this.recibo = result[0]['invno'];
      this.total_elements = this.items.length;

      while (this.contador < this.total_elements){
        this.subtotal += this.items[this.contador]['hammer'];
        this.contador = this.contador + 1;
    }
      this.premium = this.subtotal * 0.20;
      this.iva = this.premium * 0.16;
      this.total_sum = this.subtotal + this.premium + this.iva;
      this.clientEmail = localStorage.getItem('email');
      this.clientNum = localStorage.getItem('cliente');

      this.auth.getDetailLot(this.inv,result[0]['lot'] ).subscribe((object: any) => {
        this.lotDetail = object;
        console.log(this.lotDetail);
        this.validateTerm(this.lotDetail)
      });

    })
  }

  validateTerm(lotDetail: any){
    console.log('lotdetail: ',lotDetail.termsname);
    if(lotDetail.termsname == 'Especial  ' ){
      console.log('')
      this.calculateEspecialAmount(lotDetail)
    }
    else {
      this.calculateAmounts(lotDetail);
    }
  }

  calculateEspecialAmount(lotDetail: any){
    this.lote = lotDetail.lot;
    this.reserve = lotDetail.reserve;
    this.hammer = lotDetail.hammer;
    this.photo = this.validatePhoto(lotDetail.photonote);
    this.saleno = lotDetail.saleno;
    this.inssurance = this.hammer * (lotDetail.inspct/100) ;
    this.commission = this.hammer * (lotDetail.cms1/100);
    this.arr = this.calculateArr(lotDetail);
    this.isr = (this.hammer - this.inssurance - this.photo - this.commission - this.arr)* 0.08; 
    this.vat =  (this.inssurance + this.commission + this.photo) * 0.16; 
    this.total = this.hammer - this.inssurance - this.photo - this.commission - this.vat - this.arr - this.isr;
    this.arrayToEmail.push({
      "lot":this.lote,
      "reserve":this.reserve,
      "hammer":this.hammer,
      "photo":this.photo,
      "saleno":this.saleno,
      "inssurance":this.inssurance,
      "commission":this.commission,
      "arr":this.arr,
      "vat":this.vat,
      "total":this.total,
      "cliente":this.clientNum,
      "email":this.clientEmail,
      "isr":this.isr
    });
  }

  validatePhoto(photonote: any){  
    let convertPhoto: any;
    if (photonote == '' || photonote == undefined || photonote == 0){
      convertPhoto = 0;
    }
    else {
      convertPhoto = parseInt(photonote)
    }
    return convertPhoto;
  }

  calculateAmounts(lotDetail: any){
    console.log('seguro', lotDetail)
    this.lote = lotDetail.lot;
    this.reserve = lotDetail.reserve;
    this.hammer = lotDetail.hammer;
    this.photo = this.validatePhoto(lotDetail.photonote);
    this.saleno = lotDetail.saleno;
    this.inssurance = this.reserve * (lotDetail.inspct / 100 );
    this.commission = this.calculateCommision(this.hammer);
    this.arr = this.calculateArr(lotDetail);
    this.isr = (this.hammer - this.inssurance - this.photo - this.commission - this.arr)* 0.08; 
    this.vat =  (this.inssurance + this.commission + this.photo) * 0.16; 
    this.total = this.hammer - this.inssurance - this.photo - this.commission - this.vat - this.arr - this.isr;
    this.total = this.total.toFixed(2)
    this.total = this.total.toLocaleString();
    this.arrayToEmail.push({
      "lot":this.lote,
      "reserve":this.reserve,
      "hammer":this.hammer,
      "photo":this.photo,
      "saleno":this.saleno,
      "inssurance":this.inssurance,
      "commission":this.commission,
      "arr":this.arr,
      "vat":this.vat,
      "total":this.total,
      "cliente":this.clientNum,
      "email":this.clientEmail,
      "isr":this.isr
    });
  }

  calculateCommision(hammer: any){
    let commission;
    if (hammer >= 0 && hammer < 4999){
        commission = hammer * 0.20;
    }
    if (this.hammer >= 5000 && this.hammer < 99999){
        commission = hammer * 0.15;
    }
    if (this.hammer >= 100000 && this.hammer < 199999){
        commission = hammer * 0.12;
    }
    if (this.hammer >= 200000){
        commission = hammer * 0.10;
    }
    return commission
  }

  calculateArr(lotDetail: any){
    let arr;
      if(lotDetail.hammer !=0 && (lotDetail.itemstatus=='VEN' || lotDetail.itemstatus =='EAC') 
      && lotDetail.ddspct == -1){
          console.log('Si hay arr', lotDetail.lot)
          if(lotDetail.hammer >= 500001){
              arr = lotDetail.hammer * 0.015;
          }if(lotDetail.hammer >= 200001 && lotDetail.hammer <= 500000) {
              arr = lotDetail.hammer * 0.02;
          }
          if(lotDetail.hammer >= 50001 && lotDetail.hammer <= 200000){
              arr = this.hammer * 0.03;
          }
          if(lotDetail.hammer >= 1 && lotDetail.hammer <= 50000){
              arr= lotDetail.hammer * 0.04;
          }
          return arr
      }
      else {
          console.log('No hay arr')
          return arr = 0
      }
  }

  numberWithCommas(x: any) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  removeDuplicates(elements: any){
    console.log('elements: ', elements);
    const unique = [...new Map(elements.map((m:any) => [ m.lot, m ])).values()];
    console.log("unique", unique);
    return unique;
  }

  openDetail(event: any){
    console.log('El valor del evento es: ', event);
  }

  openModal(){
    ($('#invoiceModal') as any).modal('show');
  }

  sendEmailConstancia(){
    var file_data = $("#constancia").prop("files")[0];  
    if(file_data === undefined){
      ($('#attachModal') as any).modal('show');
    }else{
  
    var form_data = new FormData();       
    this.arrayToEmail = JSON.stringify(this.arrayToEmail);           
    form_data.append("file", file_data); 
    form_data.append("info", this.arrayToEmail);          
       let ajax = new XMLHttpRequest();
        ajax.open('POST', 'https://infosubastas.mortonsubastas.com/PHP/backend/sendEmailVenta.php');
        ajax.setRequestHeader("enctype","multipart/form-data");
        ajax.send(form_data);
        ajax.onreadystatechange = ():void => {
            if (ajax.readyState === 4 && ajax.status === 200) {
                console.log(ajax.responseText);
                ($('#successModal') as any).modal('show');
            }
        };    
      }
  }

  closeModal(){
    ($('#invoiceModal') as any).modal('hide');
    (<HTMLInputElement>document.getElementById('constancia')).value='';
  }

  openModalAttach(){
    ($('#attachModal') as any).modal('show');
  }

  closeModalAttach(){
    ($('#attachModal') as any).modal('hide');
  }

  closeModalSuccess(){
    ($('#successModal') as any).modal('hide');
    ($('#invoiceModal') as any).modal('hide');
    (<HTMLInputElement>document.getElementById('constancia')).value='';
  }

  closeModalError(){
    ($('#errorModal') as any).modal('hide');
    (<HTMLInputElement>document.getElementById('constancia')).value='';
  }

}
