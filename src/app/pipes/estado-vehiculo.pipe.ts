import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoVehiculo'
})
export class EstadoVehiculoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var val = "";
    switch(value){
      case 1:
      val = "Disponible";
      break;
      case 2:
      val = "No disponible";
      break;
      case "1":
      val = "Disponible";
      break;
      case "2":
      val = "No disponible";
      break;
    }
    console.log(val);
    return val;
  }

}
