import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ViajesService } from '../../servicios/viajes.service';
import { VerificarService } from '../../servicios/verificar.service';
import { HttpService } from '../../servicios/http.service';
import { Viaje } from '../../clases/viaje';
import swal from 'sweetalert';

@Component({
  selector: 'app-lista-viajes',
  templateUrl: './lista-viajes.component.html',
  styleUrls: ['./lista-viajes.component.css']
})
export class ListaViajesComponent implements OnInit {

  listaViajes: Array<Viaje> = [];
  listaTotal: Array<Viaje> = [];
  legajo: number;
  miViaje: Viaje;
  mostrar = false;
  dir = undefined;
  motivo: string = "";

  gif = false;
  repetidor: any;

  localidadDesde: string = "";
  calleDesde: string = "";
  numeroDesde: string = "";
  localidadHasta: string = "";
  calleHasta: string = "";
  numeroHasta: string = "";
  direccionDesde: string = "";
  direccionHasta: string = "";

  latD: number = 0;
  latH: number = 0;
  lngD: number = 0;
  lngH: number = 0;

  captchas = [
    {
      img: "captcha1.png",
      value: "Mr blocked"
    },
    {
      img: "captcha2.png",
      value: "upxbpjh"
    },
    {
      img: "captcha3.png",
      value: "smwm"
    }
  ];
  captcha: any = {};
  captch: string = "";
  captchConfirm: boolean = false;

  horarioSeleccion;
  estadoSeleccion = "0";

  constructor(private router: Router, public http: HttpService, public ViajesServicio: ViajesService, public verificarService: VerificarService) {
    this.miViaje = new Viaje(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  }
  confirmarCaptcha() {
    if (this.captch == this.captcha.value)
      this.captchConfirm = true;
    else {
      swal({
        title: "Captcha incorrecto",
        icon: "warning",
      });
      this.captcha = this.captchas[Math.floor((Math.random() * 3) + 1) - 1];
    }
  }
  public llamaServicePromesa() {
    this.ViajesServicio.listarViajesClientePromesa(this.legajo).then(
      (listadoPromesa) => {
        this.listaViajes = listadoPromesa;
        this.listaTotal = listadoPromesa;
      }
    );
  }
  buscar(){
    var lista :Array<Viaje> = []
    this.listaViajes = [];
    if(this.estadoSeleccion != "0" || (this.horarioSeleccion != null && this.horarioSeleccion != ""))
    {
      for(let i = 0;i<this.listaTotal.length;i++)
      { 
        if(this.estadoSeleccion != "0" && (this.horarioSeleccion == null || this.horarioSeleccion == "")){
          if(this.listaTotal[i].estado.toString() == this.estadoSeleccion)
            lista.push(this.listaTotal[i]);
        }
        if(this.estadoSeleccion == "0" && (this.horarioSeleccion != null || this.horarioSeleccion != "")){
          var dataR = this.horarioSeleccion.split("-");
          var dataB = this.listaTotal[i].horario.split("-");
          if(dataR[0] == dataB[0] && dataR[1] == dataB[1] && dataR[2] == dataB[2].split(" ")[0])
            lista.push(this.listaTotal[i]);
        }
        if(this.estadoSeleccion != "0" && (this.horarioSeleccion != null && this.horarioSeleccion != "")){
          var dataR = this.horarioSeleccion.split("-");
          var dataB = this.listaTotal[i].horario.split("-");
          if(dataR[0] == dataB[0] && dataR[1] == dataB[1] && dataR[2] == dataB[2].split(" ")[0] && this.listaTotal[i].estado.toString() == this.estadoSeleccion)
            lista.push(this.listaTotal[i]);
        }
        
      }
      this.listaViajes = lista;
    }
    else{
      this.listaViajes = this.listaTotal;
    }
  }
  Ver(viaje: Viaje) {
    this.miViaje = new Viaje(viaje.id, null, null, viaje.legajoCliente, viaje.latDesde, viaje.latHasta, viaje.lngDesde, viaje.lngHasta, viaje.duracion, viaje.distancia, viaje.precio, viaje.cantidad
      , viaje.comodidad, viaje.medioDePago, viaje.estado, viaje.horario);
    this.miViaje.horario = this.miViaje.horario.replace(" ", "T");
    this.mostrar = true;
    this.trazarRuta();
  }
  Trazar() {
    this.direccionDesde = this.localidadDesde + "-" + this.calleDesde.replace(/\s/g, "-") + "-" + this.numeroDesde;
    this.direccionHasta = this.localidadHasta + "-" + this.calleHasta.replace(/\s/g, "-") + "-" + this.numeroHasta;
    this.http.httpGetRuta(this.direccionDesde, this.direccionHasta)
      .then(data => {
        this.miViaje.latDesde = data.origin.lat;
        this.miViaje.lngDesde = data.origin.lng;
        this.miViaje.latHasta = data.destination.lat;
        this.miViaje.lngHasta = data.destination.lng;
        this.miViaje.duracion = Math.round(data.duration.value);
        this.miViaje.distancia = Math.round(data.distance.value);
        this.miViaje.precio = ((this.miViaje.distancia * 2) / 100);
        this.trazarRuta();
      });
  }
  trazarRuta() {
    this.latD = parseFloat(this.miViaje.latDesde.toString());
    this.latH = parseFloat(this.miViaje.latHasta.toString());
    this.lngD = parseFloat(this.miViaje.lngDesde.toString());
    this.lngH = parseFloat(this.miViaje.lngHasta.toString());
    this.dir = {
      destination: { lat: this.latH, lng: this.lngH },
      origin: { lat: this.latD, lng: this.lngD },
      travelMode: 'DRIVING',
      transitOptions: {
        departureTime: new Date('2018/03/20 12:00'),
        modes: ['BUS']
      }
    }
  }
  Actualizar() {
    //Horario actual
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1; //hoy es 0!
    var yyyy = hoy.getFullYear();
    var h = hoy.getHours();
    //Horario registrado
    var horarioRegistrado = this.miViaje.horario.split('-');
    var anio = parseInt(horarioRegistrado[0]);
    var mes = parseInt(horarioRegistrado[1]);
    var dia = parseInt(horarioRegistrado[2].split('T')[0]);
    var hora = parseInt(horarioRegistrado[2].split('T')[1].split(':')[0])

    if (yyyy == anio && mes >= mm) {
      if (mes == mm) {
        if (dia > dd) {
          this.gif = true;
          this.repetidor = setInterval(() => {
            this.ViajesServicio.ActualizarViaje(this.miViaje).then((datos) => {
              this.gif = false;
              clearInterval(this.repetidor);
              swal({
                title: datos,
                icon: "success",
              });
              this.llamaServicePromesa();
            });
          }, 3000);
        }
        else if (dia == dd) {
          if (hora > h) {
            this.gif = true;
            this.repetidor = setInterval(() => {
              this.ViajesServicio.ActualizarViaje(this.miViaje).then((datos) => {
                this.gif = false;
                clearInterval(this.repetidor);
                swal({
                  title: datos,
                  icon: "success",
                });
                this.llamaServicePromesa();
              });
            }, 3000);
          }
          else {
            swal({
              title: "Horario invalido",
              icon: "warning",
            });
          }
        }
        else {
          swal({
            title: "Horario invalido",
            icon: "warning",
          });
        }
      }
      else {
        this.gif = true;
        this.repetidor = setInterval(() => {
          this.ViajesServicio.ActualizarViaje(this.miViaje).then((datos) => {
            this.gif = false;
            clearInterval(this.repetidor);
            swal({
              title: datos,
              icon: "success",
            });
            this.llamaServicePromesa();
          });
        }, 3000);
      }
    }
    else {
      swal({
        title: "Horario invalido",
        icon: "warning",
      });
    }
  }
  cancelar(viaje: Viaje) {
    this.miViaje = viaje;
  }
  Cancelar() {
    this.miViaje.estado = 2;
    this.miViaje.comodidad = this.motivo;
    this.ViajesServicio.ActualizarViaje(this.miViaje).then((datos) => {
      swal({
        title: datos,
        icon: "success",
      });
      this.llamaServicePromesa();
    })
  }
  ngOnInit() {
    this.captcha = this.captchas[Math.floor((Math.random() * 3) + 1) - 1];
    let tokenjs = localStorage.getItem("Token");
    let token: any = tokenjs != null ? JSON.parse(tokenjs) : null;
    this.verificarService.recuperToken(token).then(
      (datos) => {
        this.legajo = datos.respuesta.legajo;
        this.llamaServicePromesa();
      });
  }

}
