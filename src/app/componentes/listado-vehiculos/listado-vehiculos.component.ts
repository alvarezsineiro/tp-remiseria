import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { Vehiculo } from '../../clases/vehiculo';
import { VehiculosService} from '../../servicios/vehiculos.service'

@Component({
  selector: 'app-listado-vehiculos',
  templateUrl: './listado-vehiculos.component.html',
  styleUrls: ['./listado-vehiculos.component.css']
})
export class ListadoVehiculosComponent implements OnInit {
  @Output() cambio: EventEmitter<any>= new EventEmitter<any>();  
  @Input()
  public listaVehiculo: Array<Vehiculo> = [];
  public miServicioVehiculo: VehiculosService;
  constructor(ServicioVehiculo:VehiculosService) {
    this.miServicioVehiculo = ServicioVehiculo;
   }
  Habilitar(id: string) { 
    this.miServicioVehiculo.Habilitar(id).then((datos) =>{
      if(datos)
      {
        this.cambio.emit();
      }
    })
  }
  Desabilitar(id: string) {
    this.miServicioVehiculo.Desabilitar(id).then((datos) =>{
      if(datos)
      {
        this.cambio.emit();
      }
    })
   }
  ngOnInit() {
  }

}
