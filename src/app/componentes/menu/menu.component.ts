import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { VerificarService } from '../../servicios/verificar.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  TIPO:string="";
  constructor(public verificarService:VerificarService,public router:Router) { }

  IR(destino:string)
  {
    this.router.navigate(['/'+destino]);
  }

  ngOnInit() {
    let tokenjs = localStorage.getItem("Token");
    let token:any = tokenjs!=null?JSON.parse(tokenjs):null;
    this.verificarService.recuperToken(token).then(
      (datos) => {
        this.TIPO = datos.respuesta.tipo;
      }
    );
  }

}
