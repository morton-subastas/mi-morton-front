import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModule } from 'src/app/app.module';
import { CatalogosFacturacionRoutingModule } from './catalogos-facturacion-routing.module';
import { UsosComponent } from './usos/usos.component';
import { MetodosPagosComponent } from './metodos-pagos/metodos-pagos.component';
import { UnidadesComponent } from './unidades/unidades.component';
import { LugaresExpedicionComponent } from './lugares-expedicion/lugares-expedicion.component';
import { FormasPagoComponent } from './formas-pago/formas-pago.component';
import { TiposComprobantesComponent } from './tipos-comprobantes/tipos-comprobantes.component';
import { MonedasComponent } from './monedas/monedas.component';
import { ConceptosServiciosComponent } from './conceptos-servicios/conceptos-servicios.component';
import { IndexCatalogosComponent } from './index-catalogos/index-catalogos.component';
//import { HeaderComponent } from '../header/header.component';

@NgModule({
  imports: [
    AppModule,
    CommonModule,
    CatalogosFacturacionRoutingModule
  ],
  declarations: [
    UsosComponent,
    MetodosPagosComponent,
    UnidadesComponent,
    LugaresExpedicionComponent,
    FormasPagoComponent,
    TiposComprobantesComponent,
    MonedasComponent,
    ConceptosServiciosComponent,
    IndexCatalogosComponent,
    //HeaderComponent
  ],
  
})
export class CatalogosFacturacionModule { }
