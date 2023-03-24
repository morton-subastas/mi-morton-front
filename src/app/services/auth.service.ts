import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Pipe } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import {  map } from 'rxjs/operators';
import { count } from 'console';
import { logging } from 'protractor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private url = 'https://masanchez.com.mx/ARGENTINA/PHP1/';
  // private url = 'http://localhost/PHP/';
  private url = 'https://infosubastas.mortonsubastas.com/PHP/';
  userToken: string;
  clienteToken: string;
  nombreToken: string;
  hasDataCompras:boolean =  false;
  dataCompras:any = [];
  dataCompras2:any = [];
  dataComprasres: any = [];
  //CREAR USUARIO

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
    return this.http.get(this.url+'?busca_usuario=1&email=' + authdata.email +'&contra=' + authdata.password+'').pipe(map( resp => {
      //console.log("Entro en map()");
      this.saveToken(resp['id_token'], resp['cliente'], resp['nombre']);
      return resp;
    })
  );
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
    return this.http.post(`${this.url}`, authdata).pipe(map( resp => {
        //console.log("Entro en: map()");
        //console.log(resp);
        //console.log("---------------");
        //this.saveToken(resp['idToken']);
        this.saveToken(resp['id_token'], resp['cliente'], resp['nombre']);
        return resp;
      })
    );
  }

  private saveToken(idToken: string, cliente: string, nombre: string){
      //console.log("saveToken");
      //console.log(idToken);
      //console.log(cliente);
      this.userToken = idToken;
      localStorage.setItem('token', idToken);
      localStorage.setItem('cliente', cliente);
      localStorage.setItem('nombre', nombre);
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
      this.userToken = localStorage.getItem('token');
      this.clienteToken = localStorage.getItem('cliente');
      this.nombreToken = localStorage.getItem('nombre');
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

    /**********************************
  * SERVICIOS NODEJS
  **********************************/
     getContratosToRFC(custno:string){
      return this.http.get('https://mimorton.com:8444/getContratosMiMorton/' + custno+'')
      .pipe(
        map ( (res:any ) => {
          return res;
        })
      );
    }
    
    prueba:string;
     
    getComprasToRFC(custno:string){
      
      
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
    getDetailSaleImg(subasta:string){
      console.log("subasta" + subasta);
      return this.http.get('https://mimorton.com:8444/getDetailSaleMiMorton/'+ subasta + '').pipe(
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
}

