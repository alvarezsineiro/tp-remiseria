<?php
class Usuario
{
	public $Usuario;
    public $legajo;
 	public $nombre;
  	public $apellido;
    public $tipo;
    public $contrasenia;
    public $fechaDeNacimiento;
    public $foto;
    public $estado;
    public $sexo;

	public static function TraerTodoLosUsuarios()
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuarios2");
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");		
    }
    public static function TraerTodosLosRemiseros()
    {
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("SELECT U.legajo,U.nombre,U.apellido,U.usuario,U.tipo,U.sexo,U.foto,U.estado,U.fechaDeNacimiento,V.id,V.modelo,V.marca,V.patente,V.foto as fotoVehiculo,V.estado as estadoVehiculo
            FROM usuarios2 as U
            LEFT JOIN usuariobyvehiculos AS UV ON UV.idremisero =  U.legajo
            LEFT JOIN vehiculos as V ON UV.idvehiculo = V.id
            WHERE U.tipo = 3");
            // $consulta =$objetoAccesoDato->RetornarConsulta("select * from usuarios2 
            // INNER JOIN vehiculos
            // Where tipo=3");
			
            $consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");		
    }
    public static function TraerUnUsuario($usuario,$pass)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuarios2
			Where usuario = :usuario AND contrasenia = :pass");
			$consulta->bindParam(':usuario',$usuario);
			$consulta->bindParam(':pass',$pass);
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");		
	}
    public static function Relacionar($usuario,$vehiculo)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO usuariobyvehiculos(id,idremisero,idvehiculo) VALUES (null,:usuario,:vehiculo)");
        $consulta->bindParam(':usuario',$usuario);
        $consulta->bindParam(':vehiculo',$vehiculo);
        $consulta->execute();	
        return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }		
    public function InsertarUsuarioParametros()
    {
               $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
               $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into usuarios2(legajo,nombre,apellido,usuario,sexo,contrasenia,tipo,fechadeNacimiento,foto,estado)
               values(null,:nombre,:apellido,:usuario,:sexo,:contrasenia,:tipo,:fechaDeNacimiento,:foto,:estado)");
               $consulta->bindValue(':nombre',$this->nombre);
               $consulta->bindValue(':apellido',$this->apellido);
               $consulta->bindValue(':usuario',$this->Usuario);
               $consulta->bindValue(':tipo', $this->tipo);
               $consulta->bindValue(':fechaDeNacimiento',$this->fechaDeNacimiento);
               $consulta->bindValue(':foto',$this->foto);
               $consulta->bindValue(':contrasenia',$this->contrasenia);
               $consulta->bindValue(':sexo',$this->sexo);
               $consulta->bindValue(':estado',$this->estado);
               $consulta->execute();		
               return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }
}
?>