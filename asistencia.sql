-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-03-2023 a las 15:05:22
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
  `entry` date DEFAULT NULL,
  `exit_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`dni`, `name`, `surname`, `email`, `phone`, `details`, `course`, `rights`, `entry`, `exit_date`) VALUES
('03096815A', 'Marta', 'Albalate Ramón', '', 0, NULL, '3CT00111823001', NULL, NULL, NULL),
('05324456W', 'Nerissa', 'Alvarez Alvarez', 'nerissa@gmail.com', 667334229, 'Muy buen curso', '3CT00111823001', 0, NULL, NULL),
('17893452L', 'Juanito', 'Morales de la Sierra', 'juanitomorales@gmail.com', 663878220, 'Con un poco de pan', '2BG00511833071', NULL, NULL, NULL),
('50625993A', 'Consuelo', 'Aranda Martínez', '', 657453426, '', '3CT00111823001', 1, NULL, NULL),
('77585672W', 'Alejandro', 'Alvarez Maxíasia', 'diegosilva@gmail.com', 695918615, '', '3CT00111823001', 1, NULL, NULL),
('B03250064', 'Fredy Alberto', 'Arevalo Henriquez', '', 676767584, '', '3CT00111823001', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `code` varchar(20) NOT NULL,
  `name` varchar(60) NOT NULL,
  `tutor` varchar(60) NOT NULL,
  `room` int(4) NOT NULL,
  `day` datetime NOT NULL,
  `documentation` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`code`, `name`, `tutor`, `room`, `day`, `documentation`) VALUES
('2BG00511833071', 'Curso de cirugías craneales', 'Pepe Canela', 12, '2023-01-11 12:00:00', NULL),
('3CT00111823001', 'Curso internacional de coordinación de transplantes', 'Ramiro Mejías', 21, '2023-02-21 15:00:00', NULL);

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
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`code`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
