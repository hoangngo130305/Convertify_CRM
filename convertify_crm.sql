-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 17, 2026 at 03:52 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `convertify_crm`
--

-- --------------------------------------------------------

--
-- Table structure for table `api_campaign`
--

CREATE TABLE `api_campaign` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(200) NOT NULL,
  `content_instruction` longtext NOT NULL,
  `price_per_review` decimal(10,2) NOT NULL,
  `quantity_target` int(11) NOT NULL,
  `quantity_done` int(11) NOT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `client_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `api_campaignreview`
--

CREATE TABLE `api_campaignreview` (
  `id` bigint(20) NOT NULL,
  `content` longtext NOT NULL,
  `proof_image` varchar(100) DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `reject_reason` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `campaign_id` bigint(20) NOT NULL,
  `ctv_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `api_user`
--

CREATE TABLE `api_user` (
  `id` bigint(20) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `role` varchar(20) NOT NULL,
  `balance` decimal(15,2) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `facebook_id` varchar(255) DEFAULT NULL,
  `avatar_url` longtext DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `api_user`
--

INSERT INTO `api_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `is_staff`, `is_active`, `date_joined`, `role`, `balance`, `phone`, `google_id`, `facebook_id`, `avatar_url`, `full_name`, `email`) VALUES
(1, '!HkQUH7DHYjtlrRyIaY6OwjHhm0413JyuUJIEWHPf', NULL, 0, 'phamhoangminh220399', '', '', 0, 1, '2026-01-09 12:32:38.285122', 'CLIENT', 0.00, NULL, '112418987950753041861', NULL, 'https://lh3.googleusercontent.com/a/ACg8ocK4xQZ6ywAiAMy8Z5FfzA7oC1XTvCxkN45ETFr00wcd83fHWA=s96-c', 'Minh', 'phamhoangminh220399@gmail.com'),
(2, '!1rckR31REZbGXLdUYKWo3LQjnphxqmzIaZapq9Bx', NULL, 0, 'hngo98339', '', '', 0, 1, '2026-01-09 12:33:42.644825', 'CLIENT', 0.00, NULL, NULL, '1521449135813779', 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1521449135813779&height=50&width=50&ext=1770554023&hash=AT_fy11n8jUJhBCAGIwNGoLx', 'Hoàng Ngô', 'hngo98339@gmail.com'),
(3, 'pbkdf2_sha256$600000$HDlakEW6MgoDzHStqPSTT9$CpmD0REKP9tQg0glSpQMJqpD5sLL8RsxLg1Y0RCQ5Zo=', NULL, 1, 'admin', '', '', 1, 1, '2026-01-12 10:18:13.034263', 'CLIENT', 0.00, NULL, NULL, NULL, NULL, NULL, 'admin@gmail.com'),
(4, '!BUS43IYzqzXWAeXQA47BNkdLC8DJHvkKhlnCWtki', NULL, 0, 'hoangngoaz8799', '', '', 0, 1, '2026-01-12 15:30:01.079683', 'CLIENT', 0.00, NULL, '101683390648249770762', NULL, 'https://lh3.googleusercontent.com/a/ACg8ocLa23Etwqtc6rbK1CZiHAOljrCy2aRxCwxjvbY2-T8Nr00_mY_ccQ=s96-c', 'Hoàng Ngô Đình', 'hoangngoaz8799@gmail.com'),
(5, 'pbkdf2_sha256$600000$xJT4MD8OAcP4LJr49k4xeA$RmmYwZqT0Ox+CE9XWFK6MS0UTSAJcHovGGTqn8kUlu8=', NULL, 1, 'admin1', '', '', 1, 1, '2026-01-17 01:47:44.268862', 'CLIENT', 0.00, NULL, NULL, NULL, NULL, NULL, 'admin1@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `api_user_groups`
--

CREATE TABLE `api_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `api_user_user_permissions`
--

CREATE TABLE `api_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add content type', 4, 'add_contenttype'),
(14, 'Can change content type', 4, 'change_contenttype'),
(15, 'Can delete content type', 4, 'delete_contenttype'),
(16, 'Can view content type', 4, 'view_contenttype'),
(17, 'Can add session', 5, 'add_session'),
(18, 'Can change session', 5, 'change_session'),
(19, 'Can delete session', 5, 'delete_session'),
(20, 'Can view session', 5, 'view_session'),
(21, 'Can add user', 6, 'add_user'),
(22, 'Can change user', 6, 'change_user'),
(23, 'Can delete user', 6, 'delete_user'),
(24, 'Can view user', 6, 'view_user'),
(25, 'Can add campaign', 7, 'add_campaign'),
(26, 'Can change campaign', 7, 'change_campaign'),
(27, 'Can delete campaign', 7, 'delete_campaign'),
(28, 'Can view campaign', 7, 'view_campaign'),
(29, 'Can add registration', 8, 'add_registration'),
(30, 'Can change registration', 8, 'change_registration'),
(31, 'Can delete registration', 8, 'delete_registration'),
(32, 'Can view registration', 8, 'view_registration'),
(33, 'Can add campaign review', 9, 'add_campaignreview'),
(34, 'Can change campaign review', 9, 'change_campaignreview'),
(35, 'Can delete campaign review', 9, 'delete_campaignreview'),
(36, 'Can view campaign review', 9, 'view_campaignreview');

-- --------------------------------------------------------

--
-- Table structure for table `convertify_auth`
--

CREATE TABLE `convertify_auth` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `login_username` varchar(100) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `convertify_auth`
--

INSERT INTO `convertify_auth` (`id`, `email`, `login_username`, `password_hash`, `full_name`, `created_at`, `updated_at`) VALUES
(1, 'nguyenvana@gmail.com', 'vana_dev', 'pbkdf2_sha256$260000$xyz123...hashed...', 'Nguyễn Văn A', '2026-01-12 10:25:08', '2026-01-12 10:25:08'),
(2, 'tranbib@yahoo.com', 'bibi_99', 'pbkdf2_sha256$260000$abc456...hashed...', 'Trần Thị Bi', '2026-01-12 10:25:08', '2026-01-12 10:25:08'),
(3, 'user@example.com', 'string', 'pbkdf2_sha256$600000$oYMvpAZQRx5RxERqwmcI0J$XTApdPAMEPU9ymtnrtYXHqUt5Z5sYV/gpPWMpJLxA/g=', NULL, '2026-01-12 03:41:32', '2026-01-12 04:01:13'),
(4, 'hoangngoAZ8799@gmail.com', 'fffff', 'pbkdf2_sha256$600000$XOveQi3gpPMtYqrvYXeMSO$9z5eIfawtZEuLwlQLPfsomUS1hSdjiTPSEi5QTpchEg=', NULL, '2026-01-12 08:18:31', '2026-01-12 08:18:31'),
(5, 'linhhhhhhhhhhhhh@gmail.comd', 'ggggggggggggggggggggggggggg', 'pbkdf2_sha256$600000$qjpKdVU5jgQXd1x3Ss51Sy$VF00QlxxyLN0F0BqHvxN46wiclYWjsESdxtY/LhXv98=', NULL, '2026-01-12 08:30:41', '2026-01-12 08:30:41'),
(6, 'hngo98339@gmail.com', '12443', 'pbkdf2_sha256$600000$ukjZoCTYaRX6kwzKKa5g9O$VMMYwCzCoxhoI+dKVo1IkP1quvWsyMdE49CSCIkb/b4=', NULL, '2026-01-12 08:31:37', '2026-01-12 08:31:37'),
(7, 'phamhoangminh220399@gmail.com', 'fffffffffffs', 'pbkdf2_sha256$600000$Cms9O4rxBqQ4024C57X13B$5zzRv8N0anLuVX8W2DFWe2YwLGGOlx0kp54MVjLYXLU=', NULL, '2026-01-12 19:05:27', '2026-01-12 19:05:27'),
(8, 'hngo98rrrrrrrrrrrrrrrrrrrr339@gmail.com', NULL, NULL, NULL, '2026-01-16 19:36:53', '2026-01-16 19:36:53'),
(9, 'luuuuuuu@gmail.com', NULL, NULL, NULL, '2026-01-16 19:50:10', '2026-01-16 19:50:10');

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(7, 'api', 'campaign'),
(9, 'api', 'campaignreview'),
(8, 'api', 'registration'),
(6, 'api', 'user'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'contenttypes', 'contenttype'),
(5, 'sessions', 'session');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2026-01-09 11:33:27.555972'),
(2, 'contenttypes', '0002_remove_content_type_name', '2026-01-09 11:33:27.618226'),
(3, 'auth', '0001_initial', '2026-01-09 11:33:27.897121'),
(4, 'auth', '0002_alter_permission_name_max_length', '2026-01-09 11:33:27.966410'),
(5, 'auth', '0003_alter_user_email_max_length', '2026-01-09 11:33:27.972664'),
(6, 'auth', '0004_alter_user_username_opts', '2026-01-09 11:33:27.979373'),
(7, 'auth', '0005_alter_user_last_login_null', '2026-01-09 11:33:27.986475'),
(8, 'auth', '0006_require_contenttypes_0002', '2026-01-09 11:33:27.990152'),
(9, 'auth', '0007_alter_validators_add_error_messages', '2026-01-09 11:33:27.995043'),
(10, 'auth', '0008_alter_user_username_max_length', '2026-01-09 11:33:28.002021'),
(11, 'auth', '0009_alter_user_last_name_max_length', '2026-01-09 11:33:28.008217'),
(12, 'auth', '0010_alter_group_name_max_length', '2026-01-09 11:33:28.019307'),
(13, 'auth', '0011_update_proxy_permissions', '2026-01-09 11:33:28.024443'),
(14, 'auth', '0012_alter_user_first_name_max_length', '2026-01-09 11:33:28.029729'),
(15, 'api', '0001_initial', '2026-01-09 11:33:28.465870'),
(16, 'admin', '0001_initial', '2026-01-09 11:33:28.581439'),
(17, 'admin', '0002_logentry_remove_auto_add', '2026-01-09 11:33:28.589753'),
(18, 'admin', '0003_logentry_add_action_flag_choices', '2026-01-09 11:33:28.599410'),
(19, 'sessions', '0001_initial', '2026-01-09 11:33:28.628084');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `registrations`
--

CREATE TABLE `registrations` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(254) NOT NULL,
  `note` longtext DEFAULT NULL,
  `created_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registrations`
--

INSERT INTO `registrations` (`id`, `name`, `email`, `note`, `created_at`) VALUES
(1, 'hoangngo', 'linh@gmail.comd', 'dddd', '2026-01-09 11:42:41.769070'),
(2, 'hello', 'linhhhhhhhhhhhhh@gmail.comd', 'dd', '2026-01-09 12:32:50.182617'),
(3, 'minh', 'phamhoangminh220399@gmail.com', 'ok', '2026-01-10 02:21:50.415233'),
(4, 'vyyyy', 'linhvy@gmail.com', 'đ', '2026-01-12 08:16:01.052359'),
(5, 'hoanf nge', 'dddf@gmail.com', 'dddddddddddddddddddd', '2026-01-12 15:30:19.074164'),
(6, 'khaile', 'hahnh@gmai.com', 'ww', '2026-01-17 02:41:08.454353');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `api_campaign`
--
ALTER TABLE `api_campaign`
  ADD PRIMARY KEY (`id`),
  ADD KEY `api_campaign_client_id_bc510e23_fk_api_user_id` (`client_id`);

--
-- Indexes for table `api_campaignreview`
--
ALTER TABLE `api_campaignreview`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `api_campaignreview_campaign_id_ctv_id_cbcc438a_uniq` (`campaign_id`,`ctv_id`),
  ADD KEY `api_campaignreview_ctv_id_1d41aeb0_fk_api_user_id` (`ctv_id`);

--
-- Indexes for table `api_user`
--
ALTER TABLE `api_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `google_id` (`google_id`),
  ADD UNIQUE KEY `facebook_id` (`facebook_id`);

--
-- Indexes for table `api_user_groups`
--
ALTER TABLE `api_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `api_user_groups_user_id_group_id_9c7ddfb5_uniq` (`user_id`,`group_id`),
  ADD KEY `api_user_groups_group_id_3af85785_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `api_user_user_permissions`
--
ALTER TABLE `api_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `api_user_user_permissions_user_id_permission_id_a06dd704_uniq` (`user_id`,`permission_id`),
  ADD KEY `api_user_user_permis_permission_id_305b7fea_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `convertify_auth`
--
ALTER TABLE `convertify_auth`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `login_username` (`login_username`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_api_user_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `registrations`
--
ALTER TABLE `registrations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `api_campaign`
--
ALTER TABLE `api_campaign`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `api_campaignreview`
--
ALTER TABLE `api_campaignreview`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `api_user`
--
ALTER TABLE `api_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `api_user_groups`
--
ALTER TABLE `api_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `api_user_user_permissions`
--
ALTER TABLE `api_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `convertify_auth`
--
ALTER TABLE `convertify_auth`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `registrations`
--
ALTER TABLE `registrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `api_campaign`
--
ALTER TABLE `api_campaign`
  ADD CONSTRAINT `api_campaign_client_id_bc510e23_fk_api_user_id` FOREIGN KEY (`client_id`) REFERENCES `api_user` (`id`);

--
-- Constraints for table `api_campaignreview`
--
ALTER TABLE `api_campaignreview`
  ADD CONSTRAINT `api_campaignreview_campaign_id_5b77ca79_fk_api_campaign_id` FOREIGN KEY (`campaign_id`) REFERENCES `api_campaign` (`id`),
  ADD CONSTRAINT `api_campaignreview_ctv_id_1d41aeb0_fk_api_user_id` FOREIGN KEY (`ctv_id`) REFERENCES `api_user` (`id`);

--
-- Constraints for table `api_user_groups`
--
ALTER TABLE `api_user_groups`
  ADD CONSTRAINT `api_user_groups_group_id_3af85785_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `api_user_groups_user_id_a5ff39fa_fk_api_user_id` FOREIGN KEY (`user_id`) REFERENCES `api_user` (`id`);

--
-- Constraints for table `api_user_user_permissions`
--
ALTER TABLE `api_user_user_permissions`
  ADD CONSTRAINT `api_user_user_permis_permission_id_305b7fea_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `api_user_user_permissions_user_id_f3945d65_fk_api_user_id` FOREIGN KEY (`user_id`) REFERENCES `api_user` (`id`);

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_api_user_id` FOREIGN KEY (`user_id`) REFERENCES `api_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
