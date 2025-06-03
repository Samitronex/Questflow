-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-06-2025 a las 22:10:22
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `questflowdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `achievements`
--

CREATE TABLE `achievements` (
  `id` bigint(20) NOT NULL,
  `name` varchar(200) NOT NULL,
  `icon` varchar(200) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coins_transactions`
--

CREATE TABLE `coins_transactions` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `amount` int(11) NOT NULL,
  `transaction_type` varchar(50) DEFAULT NULL,
  `reference` varchar(100) DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `groups`
--

CREATE TABLE `groups` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `groups`
--

INSERT INTO `groups` (`id`, `name`) VALUES
(1, 'Alpha Team'),
(2, 'Beta Team'),
(3, 'Mi Empresa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `missions`
--

CREATE TABLE `missions` (
  `id` bigint(20) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `xp_reward` int(11) NOT NULL,
  `coins_reward` int(11) NOT NULL,
  `difficulty` varchar(20) NOT NULL,
  `due_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `missions`
--

INSERT INTO `missions` (`id`, `title`, `description`, `xp_reward`, `coins_reward`, `difficulty`, `due_date`) VALUES
(11, 'Programar QuestFlow', '', 10, 5, 'EASY', '2025-05-27'),
(12, 'Arreglar El AdminPanel QuestFlow', '', 10, 5, 'EASY', '2025-05-27'),
(13, 'Diseñar el FrontEnd', '', 10, 5, 'EASY', '2025-05-27'),
(14, 'mision facil', '', 10, 5, 'EASY', '2025-05-27'),
(16, 'mision media', '', 25, 15, 'MEDIUM', '2025-05-27'),
(17, 'Mision Dificil', '', 50, 30, 'HARD', '2025-05-27'),
(18, 'Terminar Questflow', '', 25, 15, 'MEDIUM', '2025-06-03'),
(19, 'Mision de prueba Facil', '', 10, 5, 'EASY', '2025-06-03'),
(20, 'Mision para ganar dinero.', '', 50, 30, 'HARD', '2025-06-10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mission_completions`
--

CREATE TABLE `mission_completions` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `mission_id` bigint(20) NOT NULL,
  `completed_at` datetime NOT NULL DEFAULT current_timestamp(),
  `work_description` text DEFAULT NULL,
  `attachment_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rankings`
--

CREATE TABLE `rankings` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `username` varchar(255) NOT NULL,
  `coins_total` int(11) NOT NULL,
  `xp_total` int(11) NOT NULL,
  `rank_position` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rewards`
--

CREATE TABLE `rewards` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `cost` int(11) NOT NULL,
  `stock` int(11) DEFAULT NULL,
  `discount_pct` int(11) DEFAULT NULL,
  `salary_boost` int(11) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rewards`
--

INSERT INTO `rewards` (`id`, `name`, `description`, `cost`, `stock`, `discount_pct`, `salary_boost`, `created_at`, `updated_at`) VALUES
(10, 'Primera Recompensa Creada en QuestFlow', 'Primera Recompensa Creada en QuestFlow', 10, NULL, NULL, NULL, '2025-06-03 19:32:24.000000', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('ADMIN','USER') NOT NULL,
  `coins` int(11) NOT NULL DEFAULT 0,
  `weekly_title` varchar(255) NOT NULL,
  `weekly_tasks` int(11) NOT NULL DEFAULT 0,
  `level` int(11) NOT NULL DEFAULT 1,
  `xp` int(11) NOT NULL DEFAULT 0,
  `xp_to_next` int(11) NOT NULL DEFAULT 100,
  `guild_rank` int(11) NOT NULL DEFAULT 0,
  `guild_size` int(11) NOT NULL DEFAULT 1,
  `avatar_class` varchar(255) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `role`, `coins`, `weekly_title`, `weekly_tasks`, `level`, `xp`, `xp_to_next`, `guild_rank`, `guild_size`, `avatar_class`, `created_at`, `updated_at`) VALUES
(17, 'admin', '$2a$10$ph.qTo3z0ppjt3eYj7lZL.uyJVU65OV41cnL2n8m9Gd4CuZs7TFa2', 'admin@questflow.com', 'ADMIN', 0, 'Maestro', 0, 1, 0, 100, 0, 1, 'Guerrero', '2025-05-20 00:22:05.000000', '2025-05-20 00:22:05.000000'),
(18, 'SamiAsesino', '$2a$10$0jB4esbfCyGTcOKg2AYuxe5YOz4kShSy5igF3kVwmACHs/5URIp6m', 'SamiAsesino@gmail.com', 'USER', 0, 'Aprendiz', 0, 1, 0, 100, 0, 1, 'Asesino', '2025-05-20 00:22:39.000000', '2025-05-20 00:22:39.000000'),
(19, 'Samimago', '$2a$10$OopS0OGkGJOySgBsbbzNF.1lzy4CT8Zf4tyEaVcpK7TxE/XxNe7HC', 'Samimago@gmail.com', 'USER', 75, 'Aprendiz', 0, 1, 195, 100, 0, 1, 'Mago', '2025-05-20 03:29:27.000000', '2025-06-03 19:32:46.000000'),
(20, 'Sami', '$2a$10$z0NsswITCM2oDpMj7BELYOCtZtf9WnGE5QfU5yPA0zgvclcHP/JmS', 'Samimassis2002@gmail.com', 'USER', 55, 'Aprendiz', 0, 1, 95, 100, 0, 1, 'Guerrero', '2025-05-27 01:47:19.000000', '2025-05-27 06:35:13.000000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_groups`
--

CREATE TABLE `user_groups` (
  `user_id` bigint(20) NOT NULL,
  `group_id` bigint(20) NOT NULL,
  `assigned_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_missions`
--

CREATE TABLE `user_missions` (
  `user_id` bigint(20) NOT NULL,
  `mission_id` bigint(20) NOT NULL,
  `assigned_at` datetime NOT NULL DEFAULT current_timestamp(),
  `attachment_url` varchar(255) DEFAULT NULL,
  `work_description` text DEFAULT NULL,
  `status` enum('ASSIGNED','COMPLETED') NOT NULL DEFAULT 'ASSIGNED',
  `completed_at` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_missions`
--

INSERT INTO `user_missions` (`user_id`, `mission_id`, `assigned_at`, `attachment_url`, `work_description`, `status`, `completed_at`) VALUES
(18, 11, '2025-05-20 04:51:34', NULL, NULL, 'ASSIGNED', NULL),
(19, 11, '2025-05-20 05:38:41', NULL, 'asdsad', 'ASSIGNED', '2025-05-20 03:41:39.000000'),
(19, 13, '2025-05-20 05:30:07', '/uploads/f9a751e3-3574-4699-baa3-cc758f5181c9.jpg', 'asdasd', 'ASSIGNED', '2025-05-20 03:38:58.000000'),
(19, 14, '2025-05-20 05:59:45', NULL, 'sdfdsf', 'ASSIGNED', '2025-05-20 04:00:28.000000'),
(19, 16, '2025-05-20 05:59:49', NULL, 'asdasd', 'ASSIGNED', '2025-05-20 04:00:39.000000'),
(19, 17, '2025-05-20 05:59:52', NULL, 'asdasd', 'ASSIGNED', '2025-05-20 04:00:48.000000'),
(19, 20, '2025-06-03 20:20:41', NULL, NULL, 'ASSIGNED', '2025-06-03 18:21:31.000000'),
(20, 14, '2025-05-27 08:03:30', NULL, NULL, 'ASSIGNED', '2025-05-27 06:03:49.000000'),
(20, 17, '2025-05-27 08:03:35', NULL, NULL, 'ASSIGNED', '2025-05-27 06:03:55.000000'),
(20, 18, '2025-05-27 03:48:50', '/uploads/0d92854c-e657-44dd-ae74-15382fec426e.png', 'asdasdasd', 'ASSIGNED', '2025-05-27 01:49:27.000000'),
(20, 19, '2025-05-27 08:34:09', '/uploads/5e4ba787-4096-481c-ae30-5dfa65d23b27.jpg', 'He completado esta mision Facil ', 'ASSIGNED', '2025-05-27 06:35:13.000000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_rankings`
--

CREATE TABLE `user_rankings` (
  `user_id` bigint(20) NOT NULL,
  `level` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `xp_total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_rewards`
--

CREATE TABLE `user_rewards` (
  `user_id` bigint(20) NOT NULL,
  `reward_id` bigint(20) NOT NULL,
  `redeemed_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_reward_redemptions`
--

CREATE TABLE `user_reward_redemptions` (
  `user_id` bigint(20) NOT NULL,
  `reward_id` bigint(20) NOT NULL,
  `redeemed_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user_reward_redemptions`
--

INSERT INTO `user_reward_redemptions` (`user_id`, `reward_id`, `redeemed_at`) VALUES
(19, 10, '2025-06-03 19:32:46.000000');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `achievements`
--
ALTER TABLE `achievements`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `coins_transactions`
--
ALTER TABLE `coins_transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `missions`
--
ALTER TABLE `missions`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mission_completions`
--
ALTER TABLE `mission_completions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `mission_id` (`mission_id`);

--
-- Indices de la tabla `rankings`
--
ALTER TABLE `rankings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `rewards`
--
ALTER TABLE `rewards`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `user_groups`
--
ALTER TABLE `user_groups`
  ADD PRIMARY KEY (`user_id`,`group_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Indices de la tabla `user_missions`
--
ALTER TABLE `user_missions`
  ADD PRIMARY KEY (`user_id`,`mission_id`),
  ADD KEY `mission_id` (`mission_id`);

--
-- Indices de la tabla `user_rankings`
--
ALTER TABLE `user_rankings`
  ADD PRIMARY KEY (`user_id`);

--
-- Indices de la tabla `user_rewards`
--
ALTER TABLE `user_rewards`
  ADD PRIMARY KEY (`user_id`,`reward_id`),
  ADD KEY `reward_id` (`reward_id`);

--
-- Indices de la tabla `user_reward_redemptions`
--
ALTER TABLE `user_reward_redemptions`
  ADD PRIMARY KEY (`user_id`,`reward_id`),
  ADD KEY `reward_id` (`reward_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `achievements`
--
ALTER TABLE `achievements`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `coins_transactions`
--
ALTER TABLE `coins_transactions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `groups`
--
ALTER TABLE `groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `missions`
--
ALTER TABLE `missions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `mission_completions`
--
ALTER TABLE `mission_completions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rankings`
--
ALTER TABLE `rankings`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `rewards`
--
ALTER TABLE `rewards`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `coins_transactions`
--
ALTER TABLE `coins_transactions`
  ADD CONSTRAINT `coins_transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `mission_completions`
--
ALTER TABLE `mission_completions`
  ADD CONSTRAINT `mission_completions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `mission_completions_ibfk_2` FOREIGN KEY (`mission_id`) REFERENCES `missions` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `rankings`
--
ALTER TABLE `rankings`
  ADD CONSTRAINT `rankings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `user_groups`
--
ALTER TABLE `user_groups`
  ADD CONSTRAINT `user_groups_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_groups_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `user_missions`
--
ALTER TABLE `user_missions`
  ADD CONSTRAINT `user_missions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_missions_ibfk_2` FOREIGN KEY (`mission_id`) REFERENCES `missions` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `user_rewards`
--
ALTER TABLE `user_rewards`
  ADD CONSTRAINT `user_rewards_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_rewards_ibfk_2` FOREIGN KEY (`reward_id`) REFERENCES `rewards` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `user_reward_redemptions`
--
ALTER TABLE `user_reward_redemptions`
  ADD CONSTRAINT `user_reward_redemptions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_reward_redemptions_ibfk_2` FOREIGN KEY (`reward_id`) REFERENCES `rewards` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
