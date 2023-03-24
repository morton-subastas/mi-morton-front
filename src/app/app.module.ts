import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { ContratosComponent } from './pages/contratos/contratos.component';
import { ProximasComponent } from './pages/proximas/proximas.component';
import { FiltroPipe } from './pages/pipes/filtro.pipe';
import { DetailImagenComponent } from './pages/detail-imagen/detail-imagen.component';
import { FormateadoPipe } from './pages/pipes/formateado.pipe';
import { ReciboComponent } from './pages/recibo/recibo.component';
import { SafePipe } from './pipes/safe.pipe';
import { FechaPipe } from './pipes/fecha.pipe';
import { SubastaPipe } from './pipes/subasta.pipe';
import { LotePipe } from './pipes/lote.pipe';
import { PaletteComponent } from './pages/palette/palette.component';
import { FechaLargaPipe } from './pipes/fecha-larga.pipe';
import { FilterwordPipe } from './pipes/filterword.pipe';


@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    HomeComponent,
    LoginComponent,
    VentasComponent,
    HeaderComponent,
    FooterComponent,
    ContratosComponent,
    ProximasComponent,
    FiltroPipe,
    DetailImagenComponent,
    FormateadoPipe,
    ReciboComponent,
    SafePipe,
    FechaPipe,
    SubastaPipe,
    LotePipe,
    PaletteComponent,
    FechaLargaPipe,
    FilterwordPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
