import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { ErrorComponent } from './componentes/error/error.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ViajeComponent } from './componentes/viaje/viaje.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AbmRemiserosComponent } from './componentes/abm-remiseros/abm-remiseros.component';
import { ListadoRemiserosComponent } from './componentes/listado-remiseros/listado-remiseros.component';
import { AbmVehiculosComponent } from './componentes/abm-vehiculos/abm-vehiculos.component';
import { ListadoVehiculosComponent } from './componentes/listado-vehiculos/listado-vehiculos.component';
import { ExponentialStrengthPipe} from './exponential-strength.pipe';

import { RouterModule, Routes } from '@angular/router';
import { RuteoModule } from './ruteo/ruteo.module';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings} from 'ng-recaptcha';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import {HttpService} from './servicios/http.service';
import {UsuariosService} from './servicios/usuarios.service';
import {VehiculosService} from './servicios/vehiculos.service';
import {ViajesService} from './servicios/viajes.service';
import {EncuestaService} from './servicios/encuesta.service';
import {VerificarService} from './servicios/verificar.service';


import { FileDropModule } from 'ngx-file-drop';
import { AgmCoreModule } from '@agm/core';           
import { AgmDirectionModule } from 'agm-direction';
import { HorariosComponent } from './componentes/horarios/horarios.component';
import { ListaViajesComponent } from './componentes/lista-viajes/lista-viajes.component';
import { GestorViajesComponent } from './componentes/gestor-viajes/gestor-viajes.component';
import { PreloadImagenComponent } from './componentes/preload-imagen/preload-imagen.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { GraficosComponent } from './componentes/graficos/graficos.component';
import { InformesComponent } from './componentes/informes/informes.component';
import { SexoPipe } from './pipes/sexo.pipe';
import { EstadoPipe } from './pipes/estado.pipe';
import { EstadoVehiculoPipe } from './pipes/estado-vehiculo.pipe';
import { ColorDirective } from './directiva/color.directive';
import { ColorVehiculoDirective } from './directiva/color-vehiculo.directive';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    MenuComponent,
    PrincipalComponent,
    LoginComponent,
    RegistroComponent,
    AbmRemiserosComponent,
    ListadoRemiserosComponent,
    AbmVehiculosComponent,
    ListadoVehiculosComponent,
    ViajeComponent,
    HorariosComponent,
    ListaViajesComponent,
    GestorViajesComponent,
    PreloadImagenComponent,
    ExponentialStrengthPipe,
    EncuestaComponent,
    GraficosComponent,
    InformesComponent,
    SexoPipe,
    EstadoPipe,
    EstadoVehiculoPipe,
    ColorDirective,
    ColorVehiculoDirective
  ],
  imports: [
    BrowserModule,
    RuteoModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FileDropModule,
    ChartsModule,
    AgmCoreModule.forRoot({ 
      apiKey: 'AIzaSyA3KKoeuXANsYY9u67GSzA6IxJEJG7OFjg',
    }),
    AgmDirectionModule,
    RecaptchaModule.forRoot(),
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {siteKey: '6LfpD18UAAAAAF5G961BFO14n0GnyW1GkubRzcU9'} as RecaptchaSettings, 
    },
    UsuariosService,
    VehiculosService,
    ViajesService,EncuestaService,HttpService,
    VerificarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
