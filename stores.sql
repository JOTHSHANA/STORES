-- Adminer 4.8.1 MySQL 8.3.0 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `resources`;
CREATE TABLE `resources` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `icon_path` varchar(511) NOT NULL,
  `path` varchar(255) NOT NULL,
  `order_by` int NOT NULL,
  `status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

TRUNCATE `resources`;
INSERT INTO `resources` (`id`, `name`, `icon_path`, `path`, `order_by`, `status`) VALUES
(1,	'dashboard',	'\" \"',	'/dashboard',	1,	'1'),
(2,	'Purchase Bill',	'\" \"',	'/purchase',	2,	'1');

DROP TABLE IF EXISTS `role_resources`;
CREATE TABLE `role_resources` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `resources_id` int NOT NULL,
  `status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  KEY `resources_id` (`resources_id`),
  CONSTRAINT `role_resources_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `role_resources_ibfk_2` FOREIGN KEY (`resources_id`) REFERENCES `resources` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

TRUNCATE `role_resources`;
INSERT INTO `role_resources` (`id`, `role_id`, `resources_id`, `status`) VALUES
(1,	1,	1,	'1'),
(2,	2,	1,	'1'),
(3,	2,	2,	'1'),
(4,	3,	1,	'1'),
(5,	3,	2,	'1');

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

TRUNCATE `roles`;
INSERT INTO `roles` (`id`, `name`, `status`) VALUES
(1,	'faculty',	'1'),
(2,	'm_team',	'1'),
(3,	'admin',	'1');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `gmail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

TRUNCATE `users`;
INSERT INTO `users` (`id`, `role_id`, `name`, `gmail`, `status`) VALUES
(1,	1,	'abc',	'abc@gmail.com',	'1'),
(2,	2,	'jothshana',	'jothshana@gmail.com',	'1'),
(3,	3,	'priyan',	'priyan@gmail.com',	'1'),
(4,	3,	'Priyan',	'bpriyan18082004@gmail.com',	'1'),
(5,	2,	'Jothshana',	'jothshana.cs22@bitsathy.ac.in',	'1');

-- 2024-04-30 04:21:14
