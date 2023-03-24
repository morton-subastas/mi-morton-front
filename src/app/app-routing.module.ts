import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { DetailImagenComponent } from './pages/detail-imagen/detail-imagen.component';
import { ReciboComponent} from './pages/recibo/recibo.component';
import { AuthGuard } from './guards/auth.guard';
import { VentasComponent } from './pages/ventas/ventas.component';
import { ContratosComponent } from './pages/contratos/contratos.component';
import { ProximasComponent } from './pages/proximas/proximas.component';
import { PaletteComponent} from './pages/palette/palette.component';

const routes: Routes = [
  { path: 'home'    , component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'ventas'    , component: VentasComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'imagenD', component: DetailImagenComponent },
  { path: 'recibo', component: ReciboComponent },
  { path: 'contratos'    , component: ContratosComponent },
  { path: 'proximas'    , component: ProximasComponent },
  { path: 'paleta'    , component: PaletteComponent },
  { path: 'login'   , component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
