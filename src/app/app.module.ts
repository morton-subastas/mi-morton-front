import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import localePy from '@angular/common/locales/es';
import { DataTablesModule } from 'angular-datatables';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { registerLocaleData } from '@angular/common';
import {SafePipe} from './pipes/safe.pipe';
import { FechaPipe } from './pipes/fecha.pipe';
import { SubastaPipe } from './pipes/subasta.pipe';
import { LotePipe } from './pipes/lote.pipe';
import { FechaLargaPipe } from './pipes/fecha-larga.pipe';
import { FilterwordPipe } from './pipes/filterword.pipe';
import { FiltroPipe } from './pipes/filtro.pipe';
import { ReciboComponent } from './pages/recibo/recibo.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { ContratosComponent } from './pages/contratos/contratos.component';
import { ProximasComponent } from './pages/proximas/proximas.component';
import { PaletaComponent } from './pages/paleta/paleta.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { DetailImagenComponent } from './pages/detail-imagen/detail-imagen.component';
import { PendientesComponent } from './pages/pendientes/pendientes.component';
import { CatalogoBancosComponent } from './pages/catalogo-bancos/catalogo-bancos.component';
import { IndexCatalagosComponent } from './pages/index-catalagos/index-catalagos.component';
import { CatalogoMonedasComponent } from './pages/catalogo-monedas/catalogo-monedas.component';
import { ReciboVentaComponent } from './pages/recibo-venta/recibo-venta.component';
import { FacturaComponent } from './pages/factura/factura.component';
import { ConceptosFacturaComponent } from './pages/conceptos-factura/conceptos-factura.component';
import { AgregarConceptosComponent } from './pages/factura/agregar-conceptos/agregar-conceptos.component';
import { DetalleLoteVentaComponent } from './pages/detalle-lote-venta/detalle-lote-venta.component';
import { PagoComponent } from './pages/pago/pago.component';
import { PagoSatisfactorioComponent } from './pages/pago/pago-satisfactorio/pago-satisfactorio.component';
import { PagoInsatisfactorioComponent } from './pages/pago/pago-insatisfactorio/pago-insatisfactorio.component';
import { RecuperarContraseniaComponent } from './pages/recuperar-contrasenia/recuperar-contrasenia.component';
import { FacturaUnConceptoComponent } from './pages/factura/factura-un-concepto/factura-un-concepto.component';

// importar locales
import localePy from '@angular/common/locales/es-PY';
import localePt from '@angular/common/locales/pt';
import localeEn from '@angular/common/locales/en';
import localeEsAr from '@angular/common/locales/es-AR';

// registrar los locales con el nombre que quieras utilizar a la hora de proveer
registerLocaleData(localePy, 'es');
registerLocaleData(localePt, 'pt');
registerLocaleData(localeEn, 'en');
registerLocaleData(localeEsAr, 'es-Ar');

@NgModule({
  declarations: [
    AppComponent ,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SafePipe,
    FechaPipe,
    SubastaPipe,
    LotePipe,
    FechaLargaPipe,
    FilterwordPipe,
    FiltroPipe,
    ReciboComponent,
    VentasComponent,
    ContratosComponent,
    ProximasComponent,
    PaletaComponent,
    RegistroComponent,
    DetailImagenComponent,
    PendientesComponent,
    CatalogoBancosComponent,
    IndexCatalagosComponent,
    CatalogoMonedasComponent,
    ReciboVentaComponent,
    FacturaComponent,
    ConceptosFacturaComponent,
    AgregarConceptosComponent,
    DetalleLoteVentaComponent,
    PagoComponent,
    PagoSatisfactorioComponent,
    PagoInsatisfactorioComponent,
    RecuperarContraseniaComponent,
    FacturaUnConceptoComponent

  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgxPaginationModule
  ],
  schemas:[
		CUSTOM_ELEMENTS_SCHEMA,
		NO_ERRORS_SCHEMA
	],
  exports: [
    HeaderComponent,
  ],
  providers: [ {provide: LOCALE_ID, useValue: 'es'}, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
