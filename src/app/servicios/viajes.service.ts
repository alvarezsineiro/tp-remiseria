import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Viaje } from '../clases/viaje';
import { Remisero } from '../clases/remisero';
import { Vehiculo } from '../clases/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  constructor(public miHttp: HttpService) { }
  RegistrarViaje(vehiculo: Viaje): Promise<number> {
    let result: Promise<number> = this.miHttp.entregarViaje('CargarViaje', vehiculo)
      .then(datos => {
        return datos.respuesta;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }
  ActualizarViaje(vehiculo: Viaje): Promise<any> {
    let result: Promise<any> = this.miHttp.actualizarViaje('ActualizarViaje', vehiculo)
      .then(datos => {
        return datos.respuesta;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }
  ActualizarViaje2(vehiculo: Viaje): Promise<any> {
    let result: Promise<any> = this.miHttp.actualizarViaje2('ActualizarViaje2', vehiculo)
      .then(datos => {
        return datos.respuesta;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }
  listarViajesClientePromesa(legajo): Promise<Array<Viaje>> {
    let promesa: Promise<Array<Viaje>> = new Promise((resolve, reject) => {
      this.miHttp.dameTodasLasPromesasClienteViajes('TraerViajesCliente', legajo)
        .then(datos => {
          console.log(datos);
          let miArray: Array<Viaje> = new Array<Viaje>();
          for (let unDato of datos) {
            let remisero: Remisero = new Remisero(unDato.legajoRemisero,null,null,null,null,null,unDato.FotoRemisero,null,null,null,null);
            let vehiculo: Vehiculo = new Vehiculo(unDato.idVehiculo,null,null,null,unDato.FotoVehiculo,null,null);
            let viaje = new Viaje(unDato.viajeId, remisero, vehiculo,
              unDato.legajoCliente, unDato.latDesde, unDato.latHasta, unDato.lngDesde, unDato.lngHasta,
              unDato.duracion, unDato.distancia, unDato.precio, unDato.cantidadPasajeros, unDato.comodidad, unDato.medioDePago, unDato.estado, unDato.horario);
            miArray.push(viaje);
          }
          resolve(miArray);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }
  listarViajesRemiseroPromesa(legajo): Promise<Array<any>> {
    let promesa: Promise<Array<any>> = new Promise((resolve, reject) => {
      this.miHttp.dameTodasLasPromesasRemiseroViajes('TraerViajesRemisero', legajo)
        .then(datos => {
          console.log(datos);
          let miArray: Array<any> = new Array<any>();
          for (let unDato of datos) {
            let viaje: any = new Viaje(unDato.viajeId, null, null,
              unDato.legajoCliente, unDato.latDesde, unDato.latHasta, unDato.lngDesde, unDato.lngHasta,
              unDato.duracion, unDato.distancia, unDato.precio, unDato.cantidadPasajeros, unDato.comodidad, unDato.medioDePago, unDato.estado, unDato.horario);
            viaje.FotoCliente = unDato.FotoCliente;
            miArray.push(viaje);
          }
          resolve(miArray);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }
  listarViajesPromesa(): Promise<Array<any>> {
    let promesa: Promise<Array<any>> = new Promise((resolve, reject) => {
      this.miHttp.dameTodasLasPromesasViajes('TraerViajes')
        .then(datos => {
          console.log(datos);
          let miArray: Array<any> = new Array<any>();
          for (let unDato of datos) {
            let remisero: Remisero = new Remisero(unDato.legajoRemisero,null,null,null,null,null,unDato.FotoRemisero,null,null,null,null);
            let vehiculo: Vehiculo = new Vehiculo(unDato.idVehiculo,null,null,null,unDato.FotoVehiculo,null,null);
            let viaje : any= new Viaje(unDato.viajeId, remisero, vehiculo,
              unDato.legajoCliente, unDato.latDesde, unDato.latHasta, unDato.lngDesde, unDato.lngHasta,
              unDato.duracion, unDato.distancia, unDato.precio, unDato.cantidadPasajeros, unDato.comodidad, unDato.medioDePago, unDato.estado, unDato.horario);
            viaje.FotoCliente = unDato.FotoCliente;
            miArray.push(viaje);
          }
          resolve(miArray);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }
  traerInformes(mes:number,anio:number): Promise<Array<any>> 
  {
    let promesa: Promise<Array<any>> = new Promise((resolve, reject) => {
      this.miHttp.traerDatos('TraerDatos',mes,anio)
        .then(datos => {
          resolve(datos.respuesta);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }
}
