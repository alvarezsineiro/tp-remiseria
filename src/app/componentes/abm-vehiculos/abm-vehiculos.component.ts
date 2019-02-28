import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { VehiculosService } from '../../servicios/vehiculos.service';
import { VerificarService } from '../../servicios/verificar.service';
import { Vehiculo } from '../../clases/vehiculo';
import { UploadEvent, UploadFile } from 'ngx-file-drop';
import { FileSystemFileEntry, FileSystemEntryMetadata, FileSystemEntry, FileSystemDirectoryEntry } from '../../file-Drop/dom.types';
import swal from 'sweetalert';
@Component({
  selector: 'app-abm-vehiculos',
  templateUrl: './abm-vehiculos.component.html',
  styleUrls: ['./abm-vehiculos.component.css']
})
export class AbmVehiculosComponent implements OnInit {

  public listadoParaCompartir: Array<any>;
  miServicioVehiculos: VehiculosService;
  miServicioVerificacion: VerificarService;
  public miVehiculo: Vehiculo;
  public isvalid: boolean = false;
  resolved: boolean = false;

  public gif = false;
  gif2 = false;
  repetidor: any;

  resolvedCaptcha(result) {
    this.resolved = true;
  }

  public files: UploadFile[] = [];
  public file: File;
  public nombreFoto1: string = "";

  marca = new FormControl('', [
    Validators.required,
    Validators.minLength(4)
  ]);

  modelo = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);

  patente = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);

  registroForm: FormGroup = this.builder.group({
    marca: this.marca,
    patente: this.patente,
    modelo: this.modelo,
  });

  constructor(private router: Router, private builder: FormBuilder, VehiculosService: VehiculosService, VerificarService: VerificarService) {
    this.miServicioVehiculos = VehiculosService;
    this.miServicioVerificacion = VerificarService;
    this.miVehiculo = new Vehiculo(null, null, null, null, null, null, null);
    this.llamaServicePromesa();
  }
  public llamaServicePromesa() {
    this.miServicioVehiculos.listarVehiculosPromesa().then(
      (listadoPromesa) => {
        this.listadoParaCompartir = listadoPromesa;
        this.gif2 = false;
        clearInterval(this.repetidor);
      }
    );
  }
  agregar() {
    this.isvalid = true;
  }
  cancelar() {
    this.isvalid = false;
    this.miVehiculo = new Vehiculo(null, null, null, null, null, null, null);
  }
  Registrar() {
    this.gif2 = true;
    this.repetidor = setInterval(() => {
      this.miServicioVehiculos.RegistrarVehiculo(this.miVehiculo, this.file)
        .then((datos) => {
          this.gif2 = false;
          clearInterval(this.repetidor);
          //alert("Vehiculo registrado con éxito");
          swal({
                title: "Vehiculo registrado con éxito",
                icon: "success",
              });
          this.llamaServicePromesa();
          //this.router.navigate(['/Principal']);
        })
        .catch(
        (noSeEncontroUsuario) => { alert("Error en el sistema"); }
        );
    }, 3000);
  }
  ngOnInit() {
  }
  public dropped(event: UploadEvent) {
    this.gif = true;
    this.files = event.files;
    if (this.files[0].fileEntry.isFile) {
      const fileEntry = this.files[0].fileEntry as FileSystemFileEntry;

      fileEntry.file((file: File) => {
        this.nombreFoto1 = file.name;
        this.gif = false;
        this.file = file;
      });
    }
    else {
      alert("asadasdasd");
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
  Actualizar(event: any) {
    this.gif2 = true;
    this.repetidor = setInterval(() => {
      this.llamaServicePromesa();
    }, 3000);
  }
}
