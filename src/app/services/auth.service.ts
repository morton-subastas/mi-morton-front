import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Pipe } from '@angular/core';
import { UsuarioModel } from '../models/usuario/usuario.model';
import {  map } from 'rxjs/operators';
//const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  
const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  //private url = 'https://masanchez.com.mx/ARGENTINA/PHP1/';
  // private url = 'http://localhost/PHP/';
  private url = 'https://infosubastas.mortonsubastas.com/PHP/';
  phpUrllocal = ''
  urlMultipagos = 'https://prepro.adquiracloud.mx/clb/endpoint/mortonSubastas'; 

  
  //private url = 'http://localhost/infosubastas/'
  baseUrllocal =''
  userToken: string = '';
  clienteToken: string = '';
  nombreToken: string = '';
  hasDataCompras:boolean =  false;
  dataCompras:any = [];
  dataCompras2:any = [];
  dataComprasres: any = [];
  //CREAR USUARIO
  baseUrl: any = 'https://mimorton.com:8444';
  baseLocal: any ='http://localhost:8443'
 
  //LOGIN USUARIO
  constructor(private http: HttpClient) {
    this.read_token();
  }

  /**********************************
  * ACCESO
  **********************************/
  

  logout(){
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModel){
    const authdata = {
      email : usuario.email,
      password : usuario.password
    }

    return this.http.post('https://infosubastas.mortonsubastas.com/PHP/login.php',JSON.stringify(authdata)).pipe(map( (resp:any) => {
      this.saveToken(resp['id_token'], resp['cliente'], resp['nombre'], resp['user_id']);
      return resp;
    })
  );
  }


  getAmountDebt(invno:any){
    return this.http.get('https://mimorton.com:8444/getAmountDebt/' + invno);
  }

  saveCard(client:any,card:any){
    const authdata={
      clientId: client,
      card: card
    }
    return this.http.post('https://mimorton.com/sabados/cards/saveCards.php', JSON.stringify(authdata));
  }

  deleteCard(idCard:any){
    const authdata={
      clientId: idCard
    }
    return this.http.post('https://mimorton.com/sabados/cards/deleteCard.php', JSON.stringify(authdata));
  }

  getCards(client:any){
    const authdata={
      clientId: client
    }
    return this.http.post('https://mimorton.com/sabados/cards/getCards.php', JSON.stringify(authdata));
  }

  recoveryPassword(usuario: UsuarioModel){
    const authdata ={
      cliente: usuario.cliente,
      password: usuario.password
    }

    return this.http.post('https://infosubastas.mortonsubastas.com/PHP/recoverPassword.php', JSON.stringify(authdata));

  }

  

  
/**
 * 
 * @param usuario 
 * @returns 
  select a.*,  c.*,  r.*,  i.*, s.*, cns.* ,r.bidder as bidder_ok, s.saleno as saleno_ok,  c.custno as numcus, 
    SUBSTRING(p.pictpath,4,LEN(p.pictpath)) as pictpath 
          from results r left join inventor i on r.refno = i.refno 
          left join typeset t on r.refno = t.refno 
          left join saledate s on s.saleno= i.saleno 
          left join pictures p on r.refno = p.refno 
          left join cusfil c on r.custno = c.custno 
          left join address a on c.custno = a.custno 
          left join cnsgbllg cns on c.custno = cnsgbllg.custno
          where  i.receipt = ' req.params.id2 '  // Descomentar
          and i.hammer != 0 
          -- where  i.receipt = req.params.id2 
          -- where  r.salelot like ' req.params.invno%' 
          -- and r.refno = ' req.params.id' 
          and p.pictname in (select top 1 pictname from pictures where refno = r.refno ) 
          and r.bidder in (select top 1 bidder from results where refno = i.refno order by bidder asc) 
          order by p.pictpath, r.bidder asc ;
 */

  nuevo_usuario(usuario: UsuarioModel){
    const authdata = {
      nombre: usuario.nombre,
      email : usuario.email,
      password : usuario.password,
      cliente: usuario.cliente
    }
    authdata.cliente = authdata.cliente.padStart(8);
    return this.http.post(`${this.url}`, authdata).pipe(map( (resp:any) => {
        this.saveToken(resp['id_token'], resp['cliente'], resp['nombre'], resp['user_id']);
        return resp;
      })
    );
  }

  postPaymentPhp(data: any){
    return this.http.post(`${this.baseLocal}/postPayment.php`, data)
  }


  multiPagos(data:any){
    console.log('Data ', data);
    const formData = new FormData();
    for (let key of Object.keys(data)) {
			formData.append(key, data[key]);
		} 
    return this.http.post(`${this.baseLocal}/postPayment`, data)
  }

  private saveToken(idToken: string, cliente: string, nombre: string, email: string){
      //console.log("saveToken");
      //console.log(idToken);
      //console.log(cliente);
      this.userToken = idToken;
      localStorage.setItem('token', idToken);
      localStorage.setItem('cliente', cliente);
      localStorage.setItem('nombre', nombre);
      localStorage.setItem('email', email)
      let hoy = new Date();
      hoy.setSeconds(3600);
      localStorage.setItem('expira', hoy.getTime().toString());
  }

  private saveTokenData(data: any){
      localStorage.setItem('dataCompras', JSON.stringify(data));
      localStorage.setItem('valorCompras', 'true');
      let hoy = new Date();
      hoy.setSeconds(3600);
      localStorage.setItem('expira', hoy.getTime().toString());
  }

  read_token(){
    if ( localStorage.getItem('token') ){
      this.userToken != localStorage.getItem('token');
      this.clienteToken != localStorage.getItem('cliente');
      this.nombreToken != localStorage.getItem('nombre');
      this.dataCompras = localStorage.getItem('dataCompras');
    }else{
      this.userToken = '';
      this.clienteToken = '';
      this.nombreToken = '';
      this.dataCompras = '';
    }

    return this.userToken, this.clienteToken, this.nombreToken, this.dataCompras;
  }

  its_authenticate(): boolean{
     if(!localStorage.getItem('token')){
        return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    
    expiraDate.setTime(expira);

    if (expiraDate > new Date()){
      return true;
    }else{
      return false;
    }
  }

  //return this.http.get('https://mimorton.com:8444/getComprasMiMorton/' + custno+'')

  getAuctions(){
    return this.http.get('https://www.mortonsubastas.com/subastas/calendario/index_M.php')
    .pipe(
      map ( (res:any ) => {
        return res;
      })
    );
  }
    /**********************************
  * SERVICIOS NODEJS
  **********************************/
     getContratosToRFC(custno:string){
      //console.log("https://mimorton.com:8444/getContratosMiMorton/"+custno+"-");
      return this.http.get('https://mimorton.com:8444/getContratosMiMorton/' + custno+'')
      .pipe(
        map ( (res:any ) => {
          return res;
        })
      );
    }

    prueba:string = '';

    getComprasToRFC(custno:string){


        //console.log("entro API -" + custno +"-");
        return this.http.get('https://mimorton.com:8444/getComprasMiMorton/' + custno+'')
        .pipe(
          map ( (res:any ) => {
            //console.log("__COMPRAS");
            this.dataCompras = res;
            //console.log(this.dataCompras);
            //console.log("FIN__");
            return res;
          })
        );

    }

    getNextAuctionDate(refno:string){
      return this.http.get('https://mimorton.com:8444/getNextAuctionLot/' + refno);
    }

    getNextAuctionByLot(refno:string,date:string){
      return this.http.get('https://mimorton.com:8444/getNextAuctionDateLot/' + refno + '/' +date);
    }

    getVentasToRFC(custno:string){
      return this.http.get('https://mimorton.com:8444/getVentasMiMorton/' + custno+'');
    }

    getVentasToRFCWS(custno:string){
      return this.http.get('https://mimorton.com:8444/getVentasMiMortonWS/' + custno+'');
    }

    getDetailImg(busqueda: string){
      return this.http.get('https://mimorton.com:8444/getDetailMiMorton/' + busqueda + '').pipe(
        map ( (auctionfindDB:any ) => {
          return auctionfindDB;
        })
      );
      //return this.http.get('https://mimorton.com:8443/estadoCuenta?oper=getDetail&id=' + busqueda + '');
    }
    getDetailSaleImg(receipt:string, noCliente: string, invno: string, saleSub:any){
      return this.http.get('https://mimorton.com:8444/getDetailSaleMiMorton2/'+ receipt + '/'+invno+'/'+ noCliente + '/' + {saleSub}).pipe(
        map ( (auctionfindDB:any ) => {
          return auctionfindDB;
        })
      );
      //return this.http.get('https://mimorton.com:8443/estadoCuenta?oper=getDetailSale&subasta='+ subasta +'&id=' + busqueda + '');
    }

    getDetailLot(receipt: any, lot:any, saleno:any){
      return this.http.get(`https://mimorton.com:8444/getDetailByLot/${receipt}/${lot}/${saleno}`).pipe(
        map ((result:any)=>{
          return result        
        })
      );  
    }

    getDetailSale(subasta:string, termino: string){
      return this.http.get('https://mimorton.com:8444/getDetailSales/'+ termino + '/'+termino+'/'+ subasta).pipe(
        map ( (auctionfindDB:any ) => {
          return auctionfindDB;
        })
      );
      //return this.http.get('https://mimorton.com:8443/estadoCuenta?oper=getDetailSale&subasta='+ subasta +'&id=' + busqueda + '');
    }

    getRecibo(recibo:string){
      return this.http.get('https://mimorton.com:8444/getRecibo/' + recibo + '').pipe(
        map ( (auctionfindDB:any ) => {
          return auctionfindDB;
        })
      );
    }

    getRecieptByCustomer(custno: any){
      return this.http.get(`${this.baseUrl}/getReceiptByCustomer/`+ custno+'').pipe(
        map((auctionfindDB: any) => {
          return auctionfindDB
        })
      );
    }

    getBancos(){
      return this.http.get(`${this.baseUrl}/getBancos`).pipe(
        map((auctionfindDB: any) => {
          return auctionfindDB
        })
      );
    }

    getMonedas(){
      return this.http.get(`${this.baseUrl}/getMonedas`).pipe(
        map((auctionfindDB: any) => {
          return auctionfindDB
        })
      );
    }

    getMetodos(){
      return this.http.get(`${this.baseUrl}/getMetodos`).pipe(
        map((auctionfindDB: any) => {
          return auctionfindDB
        })
      );
    }

    getFormaspago(){
      return this.http.get(`${this.baseUrl}/getFormasPago`).pipe(
        map((auctionfindDB: any) => {
          return auctionfindDB
        })
      );
    }
    
    getProductosServicios(){
      return this.http.get(`${this.baseUrl}/getProductosServicios`).pipe(
        map((auctionfindDB: any) => {
          return auctionfindDB
        })
      );
    }

    getLugarExpedicion(){
      return this.http.get(`${this.baseUrl}/getLugarExpedicion`).pipe(
        map((auctionfindDB: any) => {
          return auctionfindDB
        })
      );
    }

    getComprobantes(){
      return this.http.get(`${this.baseUrl}/getComprobantes`).pipe(
        map((auctionfindDB: any) => {
          return auctionfindDB
        })
      );
    }

    getUnidad(){
      return this.http.get(`${this.baseUrl}/getUnidad`).pipe(
        map((auctionfindDB: any) => {
          return auctionfindDB
        })
      );
    }

    getUsoCfdi(){
      return this.http.get(`${this.baseUrl}/getUsoCfdi`).pipe(
        map((auctionfindDB: any) => {
          return auctionfindDB
        })
      );
    }

    getAllUsos(){
      return this.http.get(`${this.baseUrl}/getAllUsos`).pipe(
        map((auctionfindDB: any) => {
          return auctionfindDB
        })
      );
    }

    getCardBank(card: any){
      return this.http.get(`${this.baseUrl}/getCardBank/`+ card).pipe(
        map((auctionfindDB: any) => {
          return auctionfindDB
        })
      );
    }
}

