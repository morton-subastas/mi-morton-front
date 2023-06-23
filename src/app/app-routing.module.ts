import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent} from './pages/home/home.component'
import { AuthGuard } from './guards/auth.guard';
import { ReciboComponent } from './pages/recibo/recibo.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { ContratosComponent } from './pages/contratos/contratos.component';
import { ProximasComponent } from './pages/proximas/proximas.component';
import { PaletaComponent } from './pages/paleta/paleta.component';
import { DetailImagenComponent } from './pages/detail-imagen/detail-imagen.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PendientesComponent } from './pages/pendientes/pendientes.component';
import { CatalogosFacturacionModule } from './pages/catalogos-facturacion/catalogos-facturacion.module';
import { IndexCatalagosComponent } from './pages/index-catalagos/index-catalagos.component';
//import { MonedasComponent } from './pages/catalogos-facturacion/monedas/monedas.component';
import { CatalogoBancosComponent } from './pages/catalogo-bancos/catalogo-bancos.component';
import { CatalogoMonedasComponent } from './pages/catalogo-monedas/catalogo-monedas.component';
import { ReciboVentaComponent } from './pages/recibo-venta/recibo-venta.component';
import { FacturaComponent } from './pages/factura/factura.component';
import { DetalleLoteVentaComponent } from './pages/detalle-lote-venta/detalle-lote-venta.component';
import { PagoComponent } from './pages/pago/pago.component';
import { PagoSatisfactorioComponent } from './pages/pago/pago-satisfactorio/pago-satisfactorio.component';
import { PagoInsatisfactorioComponent } from './pages/pago/pago-insatisfactorio/pago-insatisfactorio.component';
import { RecuperarContraseniaComponent } from './pages/recuperar-contrasenia/recuperar-contrasenia.component';
import { FacturaUnConceptoComponent } from './pages/factura/factura-un-concepto/factura-un-concepto.component';
const routes: Routes = [

  /* { path: 'catalogos', 
  loadChildren: () => import('./pages/catalogos-facturacion/catalogos-facturacion-routing.module').then(m => CatalogosFacturacionModule) } , */
  { path: 'contratos'    , component: ContratosComponent },
  { path: 'home'    , component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'imagenD', component: DetailImagenComponent },
  { path: 'login'   , component: LoginComponent },
  { path: 'paleta'    , component: PaletaComponent },
  { path: 'proximas'    , component: ProximasComponent },
  { path: 'recibo', component: ReciboComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'ventas'    , component: VentasComponent },
  { path: 'pendientes', component: PendientesComponent}, 
  { path: 'index-catalogos', component:IndexCatalagosComponent },
  { path: 'monedas', component:CatalogoMonedasComponent },
  { path: 'bancos', component:CatalogoBancosComponent },
  { path: 'recibo-venta', component:ReciboVentaComponent},
  { path: 'factura', component:FacturaComponent},
  { path: 'detalle-lote-venta', component: DetalleLoteVentaComponent},
  { path: 'pago', component:PagoComponent },
  { path: 'satisfactorio', component:PagoSatisfactorioComponent},
  { path: 'insatisfactorio', component:PagoInsatisfactorioComponent},
  { path: 'recuperar-contrasenia', component:RecuperarContraseniaComponent },
  { path: 'factura-un-concepto', component: FacturaUnConceptoComponent},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
