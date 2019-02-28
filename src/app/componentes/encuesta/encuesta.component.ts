import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { VerificarService } from '../../servicios/verificar.service';
import { EncuestaService } from '../../servicios/encuesta.service';
import { Encuesta } from '../../clases/encuesta';
import swal from 'sweetalert';
@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  miEncuesta: Encuesta;
  respuesta41: boolean = false;
  respuesta42: boolean = false;
  respuesta43: boolean = false;
  respuesta51: boolean = false;
  respuesta52: boolean = false;

  public gif = false;
  repetidor: any;

  constructor(public verificarService: VerificarService, public encuestaService: EncuestaService, private router: Router) {
    this.miEncuesta = new Encuesta(null, null, null, null, null, null, null, null, null, null);
    this.miEncuesta.pregunta1 = "Si";
    this.miEncuesta.pregunta2 = "Si";
    this.miEncuesta.pregunta3 = "Si";
    this.miEncuesta.pregunta4 = "";
    this.miEncuesta.pregunta5 = "";
    this.miEncuesta.pregunta6 = "Si";
    this.miEncuesta.pregunta7 = "1";
    this.miEncuesta.pregunta8 = "";
  }

  cambiarQueja() {
    if (this.respuesta41) {
      this.miEncuesta.pregunta4 = "Fue incomodo";
      if (this.respuesta42) {
        this.miEncuesta.pregunta4 += "-No se sintio seguro";
        if (this.respuesta43)
          this.miEncuesta.pregunta4 += "-Se paro durante el viaje";
      }
      else {
        if (this.respuesta43)
          this.miEncuesta.pregunta4 += "-Se paro durante el viaje";
      }
    }
    else {
      if (this.respuesta42) {
        this.miEncuesta.pregunta4 = "No se sintio seguro";
        if (this.respuesta43)
          this.miEncuesta.pregunta4 += "-Se paro durante el viaje";
      }
      else if (this.respuesta43)
        this.miEncuesta.pregunta4 = "Se paro durante el viaje";
      else
        this.miEncuesta.pregunta4 = "";
    }
  }
  cambiarWeb() {
    if (this.respuesta51) {
      this.miEncuesta.pregunta5 = "Buen estilo";
      if (this.respuesta52)
        this.miEncuesta.pregunta5 += "-Buena funcionalidad";
    }
    else {
      if (this.respuesta52)
        this.miEncuesta.pregunta5 = "Buena funcionalidad";
      else
        this.miEncuesta.pregunta5 = "";
    }
  }
  enviar() {
    this.gif = true;
    this.repetidor = setInterval(() => {
    this.encuestaService.guardarEncuesta(this.miEncuesta).then((datos: any) => {
      this.gif = false;
      clearInterval(this.repetidor);
      if (datos.respuesta != -1) {
        swal({
              title: "Encuesta guardada",
              icon: "success",
            });
        this.router.navigate(['/Principal']);
      }
      else{
        swal({
              title: "Usted ya realizo la encuesta",
              icon: "warning",
            });
        this.router.navigate(['/Principal']);
      }
    });
    }, 3000);
  }
  ngOnInit() {
    let tokenjs = localStorage.getItem("Token");
    let token: any = tokenjs != null ? JSON.parse(tokenjs) : null;
    this.verificarService.recuperToken(token).then(
      (datos) => {
        this.miEncuesta.idCliente = datos.respuesta.legajo;
      }
    );
  }

}
