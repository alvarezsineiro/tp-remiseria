-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-07-2018 a las 05:03:40
-- Versión del servidor: 10.1.24-MariaDB
-- Versión de PHP: 7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tp-remiseria`
--
CREATE DATABASE IF NOT EXISTS `tp-remiseria` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `tp-remiseria`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuestas`
--

CREATE TABLE `encuestas` (
  `id` int(11) NOT NULL,
  `pregunta1` varchar(50) NOT NULL,
  `pregunta2` varchar(50) NOT NULL,
  `pregunta3` varchar(50) NOT NULL,
  `pregunta4` varchar(100) NOT NULL,
  `pregunta5` varchar(100) NOT NULL,
  `pregunta6` varchar(100) NOT NULL,
  `pregunta7` varchar(50) NOT NULL,
  `pregunta8` varchar(100) NOT NULL,
  `idCliente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `encuestas`
--

INSERT INTO `encuestas` (`id`, `pregunta1`, `pregunta2`, `pregunta3`, `pregunta4`, `pregunta5`, `pregunta6`, `pregunta7`, `pregunta8`, `idCliente`) VALUES
(6, 'Si', 'MasoMenos', 'SiMenos', 'Fue incomodo', 'Buen estilo', 'So', '6', 'autos mas grandes', 2),
(7, 'No', 'No', 'SiMas', 'No se sintio seguro-Se paro durante el viaje', '', 'No', '2', '', 2),
(8, 'Si', 'Si', 'Si', '', 'Buen estilo-Buena funcionalidad', 'Si', '10', '', 2),
(9, 'No', 'No', 'No', '', 'Buen estilo', 'No', '1', '', 2),
(10, 'Si', 'MasoMenos', 'SiMenos', 'Se paro durante el viaje', 'Buen estilo-Buena funcionalidad', 'So', '6', '', 2),
(11, 'No', 'No', 'SiMas', 'Fue incomodo-Se paro durante el viaje', '', 'No', '1', '', 2),
(12, 'Si', 'Si', 'SiMenos', 'Se paro durante el viaje', 'Buen estilo-Buena funcionalidad', 'So', '6', '', 2),
(13, 'Si', 'MasoMenos', 'Si', 'Fue incomodo', 'Buena funcionalidad', 'So', '4', '', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios`
--

CREATE TABLE `horarios` (
  `id` int(11) NOT NULL,
  `idremisero` int(11) NOT NULL,
  `idvehiculo` int(11) NOT NULL,
  `horaDesde` time NOT NULL,
  `horaHasta` time NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `horarios`
--

INSERT INTO `horarios` (`id`, `idremisero`, `idvehiculo`, `horaDesde`, `horaHasta`, `estado`) VALUES
(9, 3, 3, '12:00:00', '19:15:00', 1),
(13, 20, 22, '10:00:00', '18:00:00', 1),
(14, 21, 8, '11:00:00', '17:00:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariobyvehiculos`
--

CREATE TABLE `usuariobyvehiculos` (
  `id` int(11) NOT NULL,
  `idremisero` int(11) NOT NULL,
  `idvehiculo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuariobyvehiculos`
--

INSERT INTO `usuariobyvehiculos` (`id`, `idremisero`, `idvehiculo`) VALUES
(13, 20, 22);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios2`
--

CREATE TABLE `usuarios2` (
  `legajo` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `sexo` varchar(10) NOT NULL,
  `contrasenia` varchar(50) NOT NULL,
  `tipo` int(11) NOT NULL,
  `fechadeNacimiento` date NOT NULL,
  `foto` varchar(100) NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios2`
--

INSERT INTO `usuarios2` (`legajo`, `nombre`, `apellido`, `usuario`, `sexo`, `contrasenia`, `tipo`, `fechadeNacimiento`, `foto`, `estado`) VALUES
(1, 'Rodrigo', 'Balabasquer', 'Rodrix', 'M', 'e393d0ff26f8f27bc2b05fa7e7681edd', 1, '1997-04-14', 'Rodrix.jpg', 4),
(2, 'Mauricio', 'Ogilve', 'Sonic', 'M', '29df02626bc704d42506183928d29f0e', 2, '1994-02-01', 'Sonic.png', 0),
(3, 'Mario', 'Mario', 'MarioBros', 'M', '7bf326ce4ba40e0d9b51c3131217fc81', 3, '1990-02-18', 'MarioBros.png', 2),
(20, 'Lionel', 'Messi', 'Messa', 'M', '6857edb67f6ef82c4eee2047b65e7524', 3, '1987-06-01', 'Messa.jpg', 2),
(21, 'Meteoro', 'Racer', 'MeteoroX', 'M', 'e10adc3949ba59abbe56e057f20f883e', 3, '2000-03-03', 'MeteoroX.jpg', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE `vehiculos` (
  `id` int(11) NOT NULL,
  `modelo` varchar(50) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `patente` varchar(50) NOT NULL,
  `foto` varchar(50) NOT NULL,
  `estado` int(11) NOT NULL,
  `duenio` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `vehiculos`
--

INSERT INTO `vehiculos` (`id`, `modelo`, `marca`, `patente`, `foto`, `estado`, `duenio`) VALUES
(3, '500X', 'FIAT', 'AVD654', 'AVD654.jpg', 1, 0),
(8, '500 Clasico', 'FIAT ', 'QWE206', 'QWE206.jpg', 1, 0),
(22, 'Prisma', 'Chevrolet', 'VFG542', 'VFG542.jpg', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `viajes`
--

CREATE TABLE `viajes` (
  `id` int(11) NOT NULL,
  `legajoCliente` int(11) NOT NULL,
  `latDesde` double NOT NULL,
  `latHasta` double NOT NULL,
  `lngDesde` double NOT NULL,
  `lngHasta` double NOT NULL,
  `duracion` int(11) NOT NULL,
  `distancia` double NOT NULL,
  `cantidadPasajeros` int(11) NOT NULL,
  `comodidad` varchar(50) NOT NULL,
  `precio` int(11) NOT NULL,
  `medioDePago` varchar(50) NOT NULL,
  `legajoRemisero` int(11) NOT NULL,
  `idVehiculo` int(11) NOT NULL,
  `estado` int(11) NOT NULL,
  `horario` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `viajes`
--

INSERT INTO `viajes` (`id`, `legajoCliente`, `latDesde`, `latHasta`, `lngDesde`, `lngHasta`, `duracion`, `distancia`, `cantidadPasajeros`, `comodidad`, `precio`, `medioDePago`, `legajoRemisero`, `idVehiculo`, `estado`, `horario`) VALUES
(6, 2, -34.7018561, -34.7130287, -58.38052289999999, -58.3792564, 5, 1753, 1, '', 35, 'efectivo', 0, 0, 2, '2018-06-21 14:00:00'),
(7, 2, -34.7018561, -34.7052613, -58.38052289999999, -58.38953129999999, 5, 1474, 1, 'Auto grande', 29, 'debito', 3, 3, 4, '2018-06-30 16:30:00'),
(9, 2, -34.7018561, -34.7130287, -58.38052289999999, -58.3792564, 5, 1753, 2, 'tengo otro compromiso', 35, 'efectivo', 0, 0, 2, '2018-07-05 18:00:00'),
(10, 2, -34.7004168, -34.7130287, -58.3877707, -58.3792564, 7, 2208, 1, 'No tenemos remiseros en ese horario', 44, 'efectivo', 0, 0, 2, '2018-07-03 07:00:00'),
(11, 2, -34.7018561, -34.7130287, -58.38052289999999, -58.3792564, 5, 1753, 1, 'por que me da la gana', 35, 'efectivo', 3, 3, 4, '2018-07-05 15:00:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `encuestas`
--
ALTER TABLE `encuestas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuariobyvehiculos`
--
ALTER TABLE `usuariobyvehiculos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios2`
--
ALTER TABLE `usuarios2`
  ADD PRIMARY KEY (`legajo`);

--
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `viajes`
--
ALTER TABLE `viajes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `encuestas`
--
ALTER TABLE `encuestas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT de la tabla `horarios`
--
ALTER TABLE `horarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT de la tabla `usuariobyvehiculos`
--
ALTER TABLE `usuariobyvehiculos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT de la tabla `usuarios2`
--
ALTER TABLE `usuarios2`
  MODIFY `legajo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT de la tabla `viajes`
--
ALTER TABLE `viajes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
