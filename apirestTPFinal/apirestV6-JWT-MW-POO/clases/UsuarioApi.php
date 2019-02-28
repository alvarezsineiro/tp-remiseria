<?php
require_once 'Usuario.php';
class UsuarioApi extends Usuario 
{
    public function TraerTodos($request, $response, $args) {
        $todosLosRemiseros=Usuario::TraerTodosLosRemiseros();
        $newresponse = $response->withJson($todosLosRemiseros, 200);  
        return $newresponse;
    }
    public function CargarUno($request, $response, $args) {
       
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       
       $nombre = $ArrayDeParametros["nombre"];
       $apellido = $ArrayDeParametros["apellido"];
       $tipo = $ArrayDeParametros['tipo'];
       $fechaDeNacimiento = $ArrayDeParametros['fechaDeNacimiento'];
       //$foto = $ArrayDeParametros['foto'];
       $Usuario = $ArrayDeParametros['usuario'];
       $contrasenia = $ArrayDeParametros['contrasenia'];
       $sexo = $ArrayDeParametros['sexo'];
       $estado = $ArrayDeParametros['estado'];

       //$destino="../../remiseria/src/assets/usuarios/";
       $destino="../../assets/usuarios/";
       $archivos = $request->getUploadedFiles();
       $nombreAnterior=$archivos['foto']->getClientFilename();
       $extension= explode(".", $nombreAnterior);
       $extension=array_reverse($extension);
       $NombreFoto = $Usuario.'.'.$extension[0];
       $archivos['foto']->moveTo($destino.$NombreFoto);


       $miUsuario = new Usuario();
       $miUsuario->nombre=$nombre;
       $miUsuario->tipo=$tipo;
       $miUsuario->fechaDeNacimiento=$fechaDeNacimiento;
       $miUsuario->foto=$NombreFoto;
       $miUsuario->Usuario=$Usuario;
       $miUsuario->apellido = $apellido;
       $miUsuario->contrasenia=md5($contrasenia);
       $miUsuario->sexo = $sexo;
       $miUsuario->estado = $estado;
       
       $ultimoLegajo =  $miUsuario->InsertarUsuarioParametros();

       $objDelaRespuesta->respuesta=$ultimoLegajo;
       //$objDelaRespuesta->respuesta=$miUsuario;
       return $response->withJson($objDelaRespuesta, 200);
   }
   public function UsuarioVehiculo($request, $response, $args){
       $objDelaRespuesta= new stdclass();
       $ArrayDeParametros = $request->getParsedBody();
       $usuario= $ArrayDeParametros["usuario"];
       $vehiculo = $ArrayDeParametros["vehiculo"];
       Usuario::Relacionar($usuario,$vehiculo);
       $objDelaRespuesta->respuesta= $ArrayDeParametros;
       return $response->withJson($objDelaRespuesta, 200);
   }
   public function TraerUno($request, $response, $args) 
    {
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       $usuario= $ArrayDeParametros["usuario"];
       $contrasenia = $ArrayDeParametros['contrasenia'];
       $pass = md5($contrasenia);
       $User = Usuario::TraerUnUsuario($usuario,$pass);
       //$User =Usuario::TraerTodoLosUsuarios();
       $newresponse = $response->withJson($User, 200);  
       return $newresponse;
    }
   public function CargarFoto($request, $response, $args)
   {    
        $objDelaRespuesta= new stdclass();
        $destino="./fotos/";
        
        $ArrayDeParametros = $request->getParsedBody();
        $archivos = $request->getUploadedFiles();
        $nombreAnterior=$archivos['foto']->getClientFilename();
        $extension= explode(".", $nombreAnterior)  ;
        $extension=array_reverse($extension);

        $archivos['foto']->moveTo($destino.$nombreAnterior);
        
        //$objDelaRespuesta->respuesta=$destino.$nombreAnterior;
        $objDelaRespuesta->respuesta = $archivos;
        return $response->withJson($objDelaRespuesta, 200);
   }
   public function CrearToken($request, $response, $args)
   {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $token= AutentificadorJWT::CrearToken($ArrayDeParametros); 
        $objDelaRespuesta->respuesta = $token;
        return $response->withJson($objDelaRespuesta, 200);
   }
   public function VerificarToken($request, $response, $args)
   {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $token = $ArrayDeParametros["Token"];
        try 
        {
            //$token="";
            AutentificadorJWT::verificarToken($token);
            $objDelaRespuesta->esValido=true;
            $objDelaRespuesta->respuesta = "Token valido";      
        }
        catch (Exception $e) {      
            //guardar en un log
            $objDelaRespuesta->respuesta=$e->getMessage();
            $objDelaRespuesta->esValido=false;     
        }
        return $response->withJson($objDelaRespuesta, 200);
   }
   public function RecuperarToken($request, $response, $args)
   {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $token = $ArrayDeParametros["Token"];
        $data = AutentificadorJWT::ObtenerData($token);
        $objDelaRespuesta->respuesta = $data;
        return $response->withJson($objDelaRespuesta, 200);
   }
   public function DesabilitarUsuario($request, $response, $args)
   {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $legajo = $ArrayDeParametros["Legajo"];
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuarios2 SET estado=3 WHERE Legajo = :legajo");
        $consulta->bindParam(':legajo',$legajo);
        $consulta->execute();	
        
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE horarios SET estado=2 WHERE idremisero = :legajo");
        $consulta->bindParam(':legajo',$legajo);
        $consulta->execute();

        $objDelaRespuesta->respuesta="Empleado suspendido éxitosamente.";
        return $response->withJson($objDelaRespuesta, 200);
   }
   public function HabilitarUsuario($request, $response, $args)
   {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $legajo = $ArrayDeParametros["Legajo"];
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuarios2 SET estado=2 WHERE Legajo = :legajo");
        $consulta->bindParam(':legajo',$legajo);
        $consulta->execute();	
        
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE horarios SET estado=1 WHERE idremisero = :legajo");
        $consulta->bindParam(':legajo',$legajo);
        $consulta->execute();

        $objDelaRespuesta->respuesta="Empleado reabilitado éxitosamente.";
        return $response->withJson($objDelaRespuesta, 200);
   }
   public function ContratarUsuario($request, $response, $args)
   {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $legajo = $ArrayDeParametros["Legajo"];
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuarios2 SET estado=2 WHERE Legajo = :legajo");
        $consulta->bindParam(':legajo',$legajo);
        $consulta->execute();	
        
        $objDelaRespuesta->respuesta="Empleado reabilitado éxitosamente.";
        return $response->withJson($objDelaRespuesta, 200);
   }

   public function ObtenerRuta($request, $response, $args)
   {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $url = $ArrayDeParametros["ruta"];
        
        $xml = file_get_contents($url);	
        
        return $xml;
   }
}
?>