import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { UsuariosService } from '../../servicios/usuarios.service';
import { VerificarService } from '../../servicios/verificar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  miServicioUsuario: UsuariosService;
  miServicioVerificacion: VerificarService;
  usuario = '';
  clave = '';
  logeando = true;
  mensaje = "";

  gif = false;
  repetidor: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    ServicioUsuario: UsuariosService,
    ServicioVerificacion: VerificarService) {
    this.miServicioUsuario = ServicioUsuario;
    this.miServicioVerificacion = ServicioVerificacion;
    localStorage.clear();

  }

  Entrar() {
    this.gif = true;
    this.repetidor = setInterval(()=>{ 
      this.miServicioUsuario.BuscarUsuario(this.usuario, this.clave)
      .then((datos) => {
        if (datos != null) {
          //localStorage.setItem("token",JSON.stringify(datos));
          //this.router.navigate(['/Principal']);
          this.gif = false;
          clearInterval(this.repetidor);
          this.crearToken(datos);
        }
        else {
          this.mensaje = "Problema al iniciar sesión, el usuario o la contraseña son incorrectos";
          this.gif = false;
        }
      })
      .catch(
      (noSeEncontroUsuario) => { alert("Datos incorrectos"); }
      );
    },5000);
    
  }

  crearToken(datos: any) {
    this.miServicioVerificacion.crearToken(datos).then((datos) => {
      if (datos == true)
        this.router.navigate(['/Principal']);
    })
  }
  Cargar(opcion: number) {
    if (opcion == 1) {
      this.usuario = "Encargado";
      this.clave = "12345";
    }
    if (opcion == 2) {
      this.usuario = "Cliente";
      this.clave = "12345";
    }
    if (opcion == 3) {
      this.usuario = "Remisero";
      this.clave = "12345";
    }
  }
  ngOnInit() {
  }

}
