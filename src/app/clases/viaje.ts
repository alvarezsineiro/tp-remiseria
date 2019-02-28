import {Vehiculo} from './vehiculo';
import {Remisero} from './remisero';
export class Viaje {
    constructor(public id: number,
    public remisero: Remisero,
    public vehiculo: Vehiculo,
    public legajoCliente:number,
    public latDesde: number,
    public latHasta: number,
    public lngDesde: number,
    public lngHasta: number,
    public duracion: number,
    public distancia: number,
    public precio: number,
    public cantidad: number,
    public comodidad: string,
    public medioDePago: string,
    public estado: number,
    public horario: string){
        this.id = id;
        this.remisero = remisero;
        this.vehiculo = vehiculo;
        this.legajoCliente = legajoCliente;
        this.latDesde = latDesde;
        this.latHasta = latHasta;
        this.lngDesde = lngDesde;
        this.lngHasta = lngHasta;
        this.duracion = duracion;
        this.distancia = distancia;
        this.precio = precio;
        this.cantidad = cantidad;
        this.comodidad = comodidad;
        this.medioDePago = medioDePago;
        this.estado = estado;
        this.horario = horario;
    }
}
