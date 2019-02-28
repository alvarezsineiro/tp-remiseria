<?php
require_once 'Horario.php';
class HorarioApi extends Horario {

    
    public function BuscarRemisero($request, $response, $args) 
    {
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       $legajo= $ArrayDeParametros["legajo"];
       $Horario = HorarioApi::Buscar($legajo);
       $newresponse = $response->withJson($Horario, 200);  
       return $newresponse;
    }
    public function BuscarHorario($request, $response, $args) 
    {
        $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       $legajo= $ArrayDeParametros["legajo"];
       $Horario = HorarioApi::BuscarHora($legajo);
       $newresponse = $response->withJson($Horario, 200);  
       return $newresponse;
    }
    public function BuscarHorarioViaje($request, $response, $args) 
    {
        $objDelaRespuesta= new stdclass();
       
        $ArrayDeParametros = $request->getParsedBody();
        $horario= $ArrayDeParametros["horario"];
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM horarios
        INNER JOIN usuarios2 ON usuarios2.legajo = horarios.idremisero
        WHERE horarios.horaDesde <= '$horario' AND horarios.horaHasta >= '$horario' AND horarios.estado = 1");
        $consulta->execute();			
        $valor = $consulta->fetchAll(PDO::FETCH_CLASS, "Horario");

        $newresponse = $response->withJson($valor, 200);  
        return $newresponse;
    }
    public function VerificarHorario($request, $response, $args) 
    {
        $objDelaRespuesta= new stdclass();
       
        $ArrayDeParametros = $request->getParsedBody();
        $desde= $ArrayDeParametros["desde"];
        $hasta= $ArrayDeParametros["hasta"];
        $vehiculo= $ArrayDeParametros["vehiculo"];
        $remisero= $ArrayDeParametros["remisero"];

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT count(id)as cant FROM horarios
        WHERE idvehiculo = :vehiculo AND idremisero != :remisero  AND ((horaDesde <= '$desde' AND horaHasta > '$desde') OR(horaDesde < '$hasta' AND horaHasta >= '$hasta')
        OR(horaDesde >= '$desde' AND horaHasta <= '$hasta'))");
        //
        //$consulta->bindValue(':desde',$desde);
        //$consulta->bindValue(':hasta',$hasta);
        $consulta->bindValue(':vehiculo',$vehiculo);
        $consulta->bindValue(':remisero', $remisero);
        
        $consulta->execute();			
        $valor = $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");
        $newresponse = $response->withJson($valor, 200);  
        return $newresponse;
    }
    public function GuardarHorario($request, $response, $args)
    {
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       
       $id = $ArrayDeParametros["id"];
       $remisero = $ArrayDeParametros["remisero"];
       $vehiculo = $ArrayDeParametros['vehiculo'];
       $fechaDesde = $ArrayDeParametros['timeDesde'];
       $fechaHasta = $ArrayDeParametros['timeHasta'];
       
       if($id == "")
       {
        $id = null;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into horarios(id,idremisero,idvehiculo,horaDesde,horaHasta,estado)
        values(:id,:remisero,:vehiculo,:timeDesde,:timeHasta,1)");
        $consulta->bindValue(':id',$id);
        $consulta->bindValue(':remisero',$remisero);
        $consulta->bindValue(':vehiculo',$vehiculo);
        $consulta->bindValue(':timeDesde', $fechaDesde);
        $consulta->bindValue(':timeHasta', $fechaHasta);
        $consulta->execute();		
        $lastId = $objetoAccesoDato->RetornarUltimoIdInsertado();
       }
       else{
        $lastId = $id;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE horarios 
        SET idvehiculo=:vehiculo,horaDesde=:timeDesde,horaHasta=:timeHasta WHERE id = :id");
        $consulta->bindValue(':id',$id);
        $consulta->bindValue(':vehiculo',$vehiculo);
        $consulta->bindValue(':timeDesde', $fechaDesde);
        $consulta->bindValue(':timeHasta', $fechaHasta);
        $consulta->execute();	
       }
       $objDelaRespuesta->respuesta=$lastId;
       //$objDelaRespuesta->respuesta=$id;
       return $response->withJson($objDelaRespuesta, 200);
    }
}
?>