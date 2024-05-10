-- Adminer 4.8.1 MySQL 8.3.0 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

CREATE TABLE `date_completion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `task` int NOT NULL,
  `rp_app_advance` datetime DEFAULT NULL,
  `rp_app_stores` datetime DEFAULT NULL,
  `rp_app_acc` datetime DEFAULT NULL,
  `pteam_app` datetime DEFAULT NULL,
  `stores_app` datetime DEFAULT NULL,
  `stores_app_products` datetime DEFAULT NULL,
  `stores_status_bill` datetime DEFAULT NULL,
  `acc_app_pay` datetime DEFAULT NULL,
  `pteam_partial_task` datetime DEFAULT NULL,
  `pteam_task_close` datetime DEFAULT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `task` (`task`),
  CONSTRAINT `date_completion_ibfk_1` FOREIGN KEY (`task`) REFERENCES `tasks` (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

TRUNCATE `date_completion`;

CREATE TABLE `date_day` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dates` date NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `dates` (`dates`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

TRUNCATE `date_day`;

CREATE TABLE `resources` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `icon_path` varchar(511) NOT NULL,
  `path` varchar(255) NOT NULL,
  `order_by` int NOT NULL,
  `status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

TRUNCATE `resources`;
INSERT INTO `resources` (`id`, `name`, `icon_path`, `path`, `order_by`, `status`) VALUES
(1,	'Explore',	'\"\"',	'/explore',	2,	'1'),
(2,	'My Tasks',	'\"\"',	'/mytasks',	1,	'1'),
(3,	'Approvals',	'\"\"',	'/approvals',	3,	'1'),
(4,	'All Tasks',	'\"\"',	'/alltasks',	4,	'1'),
(5,	'Holidays',	'\"\"',	'/holidays',	5,	'1'),
(6,	'History',	'\"\"',	'/history',	6,	'1');

CREATE TABLE `role_resources` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `resources_id` int NOT NULL,
  `status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  KEY `resources_id` (`resources_id`),
  CONSTRAINT `role_resources_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `role_resources_ibfk_2` FOREIGN KEY (`resources_id`) REFERENCES `resources` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

TRUNCATE `role_resources`;
INSERT INTO `role_resources` (`id`, `role_id`, `resources_id`, `status`) VALUES
(1,	1,	1,	'1'),
(2,	1,	3,	'1'),
(3,	1,	6,	'1'),
(4,	2,	1,	'1'),
(5,	2,	2,	'1'),
(6,	2,	3,	'1'),
(7,	2,	4,	'1'),
(8,	2,	5,	'1'),
(9,	2,	6,	'1'),
(10,	3,	1,	'1'),
(11,	3,	2,	'1'),
(12,	3,	3,	'1'),
(13,	3,	4,	'1'),
(14,	3,	4,	'1'),
(15,	3,	5,	'1'),
(16,	3,	6,	'1'),
(17,	4,	1,	'1'),
(18,	4,	3,	'1'),
(19,	4,	4,	'1'),
(20,	4,	6,	'1'),
(21,	5,	1,	'1'),
(22,	5,	3,	'1'),
(23,	5,	4,	'1'),
(24,	5,	6,	'1'),
(25,	6,	1,	'1'),
(26,	6,	3,	'1'),
(27,	6,	4,	'1'),
(28,	6,	5,	'1'),
(29,	6,	6,	'1');

CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

TRUNCATE `roles`;
INSERT INTO `roles` (`id`, `name`, `status`) VALUES
(1,	'req_person',	'1'),
(2,	'm_team',	'1'),
(3,	'admin',	'1'),
(4,	'stores',	'1'),
(5,	'purchase team',	'1'),
(6,	'accounts',	'1');

CREATE TABLE `task_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `status` enum('1','2') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

TRUNCATE `task_type`;
INSERT INTO `task_type` (`id`, `type`, `status`) VALUES
(1,	'Person',	'1'),
(2,	'Product',	'1');

CREATE TABLE `tasks` (
  `task_id` int NOT NULL AUTO_INCREMENT,
  `req_person` int NOT NULL,
  `task_type` int NOT NULL,
  `product_details` varchar(255) NOT NULL,
  `amount` float NOT NULL DEFAULT '0',
  `advance_amount` float NOT NULL DEFAULT '0',
  `remaining_amount` float NOT NULL DEFAULT '0',
  `quantity` int NOT NULL DEFAULT '0',
  `received_qty` int NOT NULL DEFAULT '0',
  `required_qty` int NOT NULL DEFAULT '0',
  `task_date` datetime DEFAULT NULL,
  `status` enum('0','1','2','3','4','5','6','7') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1',
  PRIMARY KEY (`task_id`),
  KEY `req_person` (`req_person`),
  KEY `task_type` (`task_type`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`req_person`) REFERENCES `users` (`id`),
  CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`task_type`) REFERENCES `task_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='0- delayed, 1- intiated, 2- stores -> req.person , 3- stores->p team, 4- p team -> acc, 5- m team , 6 - admin';

TRUNCATE `tasks`;

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
(1,	1,	'Naveen',	'naveen.cs22@bitsathy.ac.in',	'1'),
(2,	2,	'jothshana',	'jothshana123@gmail.com',	'1'),
(3,	6,	'Priyadarshan',	'priyadarshan.cs22@bitsathy.ac.in',	'1'),
(4,	4,	'Priyan',	'bpriyan18082004@gmail.com',	'1'),
(5,	3,	'Jothshana',	'jothshana.cs22@bitsathy.ac.in',	'1'),
(6,	5,	'Sabareesh',	'sabareesh.cs22@bitsathy.ac.in',	'1');

-- 2024-05-06 11:12:57
