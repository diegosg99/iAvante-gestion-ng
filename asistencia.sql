-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-03-2023 a las 14:35:56
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `asistencia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `dni` varchar(12) NOT NULL,
  `name` varchar(30) NOT NULL,
  `surname` varchar(60) DEFAULT NULL,
  `email` varchar(60) NOT NULL,
  `phone` int(9) NOT NULL,
  `details` varchar(400) DEFAULT NULL,
  `course` varchar(30) NOT NULL,
  `rights` tinyint(1) DEFAULT NULL,
  `entry` varchar(40) DEFAULT NULL,
  `exit_date` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`dni`, `name`, `surname`, `email`, `phone`, `details`, `course`, `rights`, `entry`, `exit_date`) VALUES
('03096815A', 'Marta', 'Albalate Ramón', 'mariaalbalate@gmail.com', 638269023, 'Frutas del bosque', '3GI02511823004', 0, '2023-03-06 13:54:57', NULL),
('05324456W', 'Nerissa', 'Alvarez Alvarez', 'nerissa@gmail.com', 667334229, 'Muy buen curso', '3GI02511823004', 0, '2023-03-07 11:46:23', NULL),
('17893452L', 'Juanito', 'Morales de la Sierra', 'juanitomorales@gmail.com', 663878220, 'Con un poco de pan', '3SD09011823008', NULL, NULL, NULL),
('37881294L', 'Fredy Alberto', 'Arevalo Henriquez', 'thanatos@gmail.com', 676767584, 'Me gustaría un curso de tanatopraxia jaja saludos', '3TC07910023056', 1, '2023-03-07 12:11:07', NULL),
('50625993A', 'Consuelo', 'Aranda Martínez', '', 657453426, '', '3SD09011823008', 1, '2023-03-06 14:06:48', NULL),
('77585672W', 'Alejandro', 'Alvarez Maxíasia', 'diegosilva@gmail.com', 695918615, 'El material es muy bueno y los docentes saben de lo que hablan.', '3TC07910023056', 1, '2023-03-10 14:35:16', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `id` varchar(100) NOT NULL,
  `code` varchar(30) NOT NULL,
  `name` varchar(150) NOT NULL,
  `tutor` varchar(30) NOT NULL,
  `room` int(11) DEFAULT NULL,
  `day` varchar(50) DEFAULT NULL,
  `documentationUrl` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id`, `code`, `name`, `tutor`, `room`, `day`, `documentationUrl`) VALUES
('d6d7-1702-560d-5100', '3TC07910023056', 'Imagen Espectral en Tomografía Computarizada', '1231X', 13, 'Tue Mar 14 2023 01:00:00 GMT+0100 (hora estándar d', 'https://elenfermerodelpendiente.files.wordpress.com/2014/01/manual-de-procedimientos_generales_enfermeria_huvr.pdf'),
('30ad-16e3-ef61-ef25', '3SD09011823008', 'Ecografía de cuello y musculo esquelética en Atención Primaria', '1324L', 10, 'Tue Apr 11 2023 02:00:00 GMT+0200 (hora de verano ', 'https://ia800901.us.archive.org/0/items/librosEDS/librotibetanovidaymuerte.pdf'),
('497f-8088-6824-d7ea', '3GI02511823004', 'Formación para ginecólogos en escenarios simulados', '6657Y', 6, 'Wed Apr 05 2023 02:00:00 GMT+0200 (hora de verano ', 'http://bibliotecadigital.ilce.edu.mx/Colecciones/ObrasClasicas/_docs/TaoTeKing_LaoTse.pdf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursosold`
--

CREATE TABLE `cursosold` (
  `code` varchar(20) NOT NULL,
  `name` varchar(60) NOT NULL,
  `start` varchar(60) NOT NULL,
  `end` varchar(40) NOT NULL,
  `preStart` varchar(40) DEFAULT NULL,
  `preEnd` varchar(40) DEFAULT NULL,
  `endDate` varchar(40) NOT NULL,
  `place` varchar(30) NOT NULL,
  `province` varchar(30) NOT NULL,
  `solicitudes` int(11) NOT NULL,
  `enrollments` int(11) NOT NULL,
  `realized` int(11) NOT NULL,
  `passed` int(11) NOT NULL,
  `acreditation` varchar(10) NOT NULL,
  `expedientNum` varchar(10) NOT NULL,
  `creditNum` int(11) NOT NULL,
  `daysToClose` int(11) NOT NULL,
  `closeState` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cursosold`
--

INSERT INTO `cursosold` (`code`, `name`, `start`, `end`, `preStart`, `preEnd`, `endDate`, `place`, `province`, `solicitudes`, `enrollments`, `realized`, `passed`, `acreditation`, `expedientNum`, `creditNum`, `daysToClose`, `closeState`) VALUES
('2BG00511833071', 'Curso de cirugías craneales', 'Pepe Canela', '12', '2023-01-11 12:00:00', NULL, '0', '', '', 0, 0, 0, 0, '0', '0', 0, 0, '0'),
('3CT00111823001', 'Curso internacional de coordinación de transplantes', 'Ramiro Mejías', '21', '2023-02-21 15:00:00', NULL, '0', '', '', 0, 0, 0, 0, '0', '0', 0, 0, '0'),
('3SD09011823008', 'Ecografía de cuello y musculo esquelética en Atención Primar', 'Sat Feb 25 2023 01:00:00 GMT+0100 (hora estándar de Europa c', 'Sat Mar 11 2023 01:00:00 GMT+0100 (hora ', 'Sat Mar 11 2023 01:00:00 GMT+0100 (hora ', 'Sat Mar 11 2023 01:00:00 GMT+0100 (hora ', 'null', 'Centro de Simulación Clínica A', 'Granada', 28, 28, 0, 0, 'NO', 'null', 0, 0, 'No Finalizado'),
('3TC07910023056', 'Imagen Espectral en Tomografía Computarizada', 'Mon Feb 27 2023 01:00:00 GMT+0100 (hora estándar de Europa c', 'Mon Mar 13 2023 01:00:00 GMT+0100 (hora ', 'null', 'null', 'null', 'Plataforma de teleformación IA', 'Formación Virtual', 15, 15, 0, 0, 'NO', 'null', 0, 0, 'No Finalizado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docentes`
--

CREATE TABLE `docentes` (
  `id` varchar(100) DEFAULT NULL,
  `name` varchar(40) DEFAULT NULL,
  `surname` varchar(80) DEFAULT NULL,
  `dni` varchar(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` int(11) NOT NULL,
  `courseCode` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`dni`),
  ADD KEY `course` (`course`);

--
-- Indices de la tabla `cursosold`
--
ALTER TABLE `cursosold`
  ADD PRIMARY KEY (`code`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
