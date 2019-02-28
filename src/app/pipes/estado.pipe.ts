import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado'
})
export class EstadoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var val = "";
    switch(value){
      case "1":
      val = "En espera de contrato";
      break;
      case "2":
      val = "Disponible";
      break;
      case "3":
      val = "Suspendido";
      break;
      case 1:
      val = "En espera de contrato";
      break;
      case 2:
      val = "Disponible";
      break;
      case 3:
      val = "Suspendido";
      break;
    }
    return val;
  }

}
