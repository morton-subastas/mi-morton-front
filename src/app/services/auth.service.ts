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
    //console.log("service" + authdata);
    //console.log("E" + authdata.email);
    //console.log("C" + authdata.password);
    //return this.http.get(`${this.url}?busca_usuario=1&email=` + authdata.email);
    return this.http.get(this.url+'?busca_usuario=1&email=' + authdata.email +'&contra=' + authdata.password+'').pipe(map( (resp:any) => {
      //console.log("Entro en map()");
      console.log('Valor de resp----------------- ', resp)
      this.saveToken(resp['id_token'], resp['cliente'], resp['nombre'], resp['user_id']);
      return resp;
    })
  );
  }

  recoveryPassword(usuario: UsuarioModel){
    console.log('Usuario: ', usuario);
    const headers = {'Autorization': 'Bearer my-token', 'My-Custom-Header':'foobar'}
    const authdata ={
      cliente: usuario.cliente,
      password: usuario.password
    }

    return this.http.post<any>('http://localhost:8443/PHP/recoverPassword.php', authdata,{ headers });
    /* return this.http.post('http://localhost:8443/recoverPassword.php', authdata).pipe(map( (resp:any)=>{
      return resp;
    })) */

  

    /* return this.http.post('http://localhost:8080/PHP/recoverPassword.php', authdata,requestOptions ).pipe(map( (resp:any)=>{
      return resp;
    })) */
  }

  

  nuevo_usuario(usuario: UsuarioModel){
    const authdata = {
      nombre: usuario.nombre,
      email : usuario.email,
      password : usuario.password,
      cliente: usuario.cliente
    }

    //return this.http.post(`${this.url}`, authdata);            //WITHOUT TOKEN

    //map =read the answer of http
    authdata.cliente = authdata.cliente.padStart(8);
    return this.http.post(`${this.url}`, authdata).pipe(map( (resp:any) => {
        //console.log("Entro en: map()");
        //console.log(resp);
        //console.log("---------------");
        //this.saveToken(resp['idToken']);
        this.saveToken(resp['id_token'], resp['cliente'], resp['nombre'], resp['user_id']);
        return resp;
      })
    );
  }

  postPaymentPhp(data: any){
    console.log('data', data);
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

    if (this.userToken.length < 2){
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
    //return this.userToken.length > 2;
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
            this.saveTokenData(this.dataCompras);
            //console.log("FIN__");
            return res;
          })
        );

    }

/*
    getComprasToRFC(custno:string){


      this.prueba = localStorage.getItem('valorCompras');
      console.log("********COMPRAS");
      console.log(this.prueba);
      console.log("********FINCOMPRAS");

      if (this.prueba == null){
        console.log("entro API");
        return this.http.get('https://mimorton.com:8444/getComprasMiMorton/' + custno+'')
        .pipe(
          map ( (res:any ) => {
            console.log("__COMPRAS");
            this.dataCompras = res;
            console.log(this.dataCompras);
            this.saveTokenData(this.dataCompras);
            console.log("FIN__");
            return res;
          })
        );
      }else{
        console.log("else.....");
        //this.dataCompras2 = this.read_token();
        this.dataCompras2 = localStorage.getItem('dataCompras');
        console.log("DATA" + this.dataCompras2);
        //return this.dataCompras2;
        return this.dataCompras2;
      }

    }

*/
    getVentasToRFC(custno:string){
      return this.http.get('https://mimorton.com:8444/getVentasMiMorton/' + custno+'');
      /*
      .pipe(
        map ( (res:any ) => {
          return res;
        }),
        catchError ( (err) => this.handlerError(err))
      );
      */

    }

    getDetailImg(busqueda: string){
      return this.http.get('https://mimorton.com:8444/getDetailMiMorton/' + busqueda + '').pipe(
        map ( (auctionfindDB:any ) => {
          return auctionfindDB;
        })
      );
      //return this.http.get('https://mimorton.com:8443/estadoCuenta?oper=getDetail&id=' + busqueda + '');
    }
    getDetailSaleImg(subasta:string, termino: string){
      console.log("-----------------API------------------------");
      console.log("subasta" + subasta);
      console.log("termino" + termino);
      return this.http.get('https://mimorton.com:8444/getDetailSaleMiMorton2/'+ termino + '/'+termino+'/'+ subasta).pipe(
        map ( (auctionfindDB:any ) => {
          return auctionfindDB;
        })
      );
      //return this.http.get('https://mimorton.com:8443/estadoCuenta?oper=getDetailSale&subasta='+ subasta +'&id=' + busqueda + '');
    }

    getDetailLot(receipt: any, lot:any){
      console.log(`El valor de recript: ${receipt} y de lot: ${lot}`);
      return this.http.get(`https://mimorton.com:8444/getDetailByLot/${receipt}/${lot}`).pipe(
        map ((result:any)=>{
          return result        
        })
      );  
    }

    getDetailSale(subasta:string, termino: string){
      console.log("-----------------API------------------------");
      console.log("subasta" + subasta);
      console.log("termino" + termino);
      return this.http.get('https://mimorton.com:8444/getDetailSales/'+ termino + '/'+termino+'/'+ subasta).pipe(
        map ( (auctionfindDB:any ) => {
          console.log("p");
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
}

