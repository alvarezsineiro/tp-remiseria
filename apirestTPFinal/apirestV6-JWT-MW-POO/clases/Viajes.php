<?php
class Viajes
{
    public $id;
    public $latDesde;
 	public $lngDesde;
  	public $latHasta;
    public $lngHasta;
    public $vehiculo;
    public $remisero;
    public $cliente;
    public $estado;
    public $comodidad;
    public $medioPago;
    public $duracion;
    public $distancia;
    public $precio;
    public $cantidad;
    public $horario;

    public function InsertarViajeParametros(){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into viajes(id,legajoCliente,latDesde,latHasta,lngDesde,lngHasta,duracion,
         distancia,cantidadPasajeros,comodidad,precio,medioDePago,legajoRemisero,idVehiculo,estado,horario)
        values(null,:legajoCliente,:latDesde,:latHasta,:lngDesde,:lngHasta,:duracion,
         :distancia,:cantidadPasajeros,:comodidad,:precio,:medioDePago,0,0,1,:horario)");
        $consulta->bindValue(':legajoCliente',$this->cliente);
        $consulta->bindValue(':latDesde',$this->latDesde);
        $consulta->bindValue(':latHasta',$this->latHasta);
        $consulta->bindValue(':lngDesde', $this->lngDesde);
        $consulta->bindValue(':lngHasta',$this->lngHasta);
        $consulta->bindValue(':duracion',$this->duracion);
        $consulta->bindValue(':distancia',$this->distancia);
        $consulta->bindValue(':cantidadPasajeros',$this->cantidad);
        $consulta->bindValue(':comodidad',$this->comodidad);
        $consulta->bindValue(':precio',$this->precio);
        $consulta->bindValue(':medioDePago',$this->medioPago);
        $consulta->bindValue(':horario',$this->horario);
        $consulta->execute();		
        return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }
    public static function todosLosViajesCliente($legajo)
    {       
        
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
            // WHERE legajoCliente = '$legajo'");
            // WHERE legajoCliente = '$legajo'");
            $consulta =$objetoAccesoDato->RetornarConsulta("SELECT V.id as viajeId,V.latDesde,V.lngDesde,V.latHasta,V.lngHasta,V.estado,V.duracion,V.distancia,V.precio,V.horario,V.cantidadPasajeros,V.medioDePago,
            V.comodidad,V.legajoCliente,V.legajoRemisero,V.idVehiculo,U.foto as FotoRemisero,VH.foto as FotoVehiculo
            FROM viajes as V
            LEFT JOIN usuarios2 as U ON U.legajo = V.legajoRemisero
            LEFT JOIN vehiculos as VH ON VH.id = V.idVehiculo  
            WHERE legajoCliente = '$legajo'");
			// $consulta =$objetoAccesoDato->RetornarConsulta("SELECT *
            // FROM viajes as V
            // WHERE legajoCliente = '$legajo'");
            $consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Viajes");		
    }
    public static function todosLosViajesRemisero($legajo)
    {
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("SELECT V.id as viajeId,V.latDesde,V.lngDesde,V.latHasta,V.lngHasta,V.estado,V.duracion,V.distancia,V.precio,V.horario,V.cantidadPasajeros,V.medioDePago,
            V.comodidad,V.legajoCliente,C.foto as FotoCliente
            FROM viajes as V
            LEFT JOIN usuarios2 as C ON C.legajo = V.legajoCliente
            WHERE legajoRemisero = '$legajo'");
            $consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Viajes");		
    }
    public static function todosLosViajes()
    {
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("SELECT V.id as viajeId,V.latDesde,V.lngDesde,V.latHasta,V.lngHasta,V.estado,V.duracion,V.distancia,V.precio,V.horario,V.cantidadPasajeros,V.medioDePago,
            V.comodidad,V.legajoCliente,V.legajoRemisero,V.idVehiculo,U.foto as FotoRemisero,C.foto as FotoCliente,VH.foto as FotoVehiculo
            FROM viajes as V
            LEFT JOIN usuarios2 as U ON U.legajo = V.legajoRemisero
            LEFT JOIN usuarios2 as C ON C.legajo = V.legajoCliente
            LEFT JOIN vehiculos as VH ON VH.id = V.idVehiculo  
            WHERE 1");
            $consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Viajes");		
    }
    
}
?>