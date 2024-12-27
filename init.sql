
DROP TABLE IF EXISTS `fish_names`;

CREATE TABLE `fish_names` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
);
--
-- Dumping data for table `fish_names`
--

LOCK TABLES `fish_names` WRITE;
/*!40000 ALTER TABLE `fish_names` DISABLE KEYS */;
INSERT INTO `fish_names` VALUES (1,'вобла'),(2,'горбуша'),(3,'карась'),(4,'карп'),(5,'колюшка'),(6,'краснопёрка'),(7,'лещ'),(8,'лосось'),(9,'мойва'),(10,'навага'),(11,'налим'),(12,'окунь'),(13,'осётр'),(14,'пескарь'),(15,'сельдь'),(16,'сибас'),(17,'скумбрии'),(18,'судак'),(19,'треска'),(20,'тунец'),(21,'форель'),(22,'хариус'),(23,'щука');
/*!40000 ALTER TABLE `fish_names` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fishes`
--

DROP TABLE IF EXISTS `fishes`;

CREATE TABLE `fishes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fish_name_id` int NOT NULL,
  `user_id` int NOT NULL,
  `type_id` int NOT NULL DEFAULT '1',
  `weight` decimal(6,3) NOT NULL,
  `cost_per_kg` decimal(10,2) NOT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_fishes_fish_name1_idx` (`fish_name_id`),
  KEY `fk_fishes_users1_idx` (`user_id`),
  KEY `fk_fishes_types1_idx` (`type_id`),
  CONSTRAINT `fk_fishes_fish_name1` FOREIGN KEY (`fish_name_id`) REFERENCES `fish_names` (`id`),
  CONSTRAINT `fk_fishes_types1` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_fishes_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fish_id` int NOT NULL,
  `user_id` int NOT NULL,
  `weight` decimal(6,3) NOT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`fish_id`,`user_id`),
  KEY `fk_purchases_users1_idx` (`user_id`),
  KEY `fk_purchases_fishes1_idx` (`fish_id`),
  CONSTRAINT `fk_purchases_fishes1` FOREIGN KEY (`fish_id`) REFERENCES `fishes` (`id`),
  CONSTRAINT `fk_purchases_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fish_id` int NOT NULL,
  `path` varchar(300) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_photos_fishes1_idx` (`fish_id`),
  CONSTRAINT `fk_photos_fishes1` FOREIGN KEY (`fish_id`) REFERENCES `fishes` (`id`)
);

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;

CREATE TABLE `requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(45) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_demands_users1_idx` (`user_id`),
  CONSTRAINT `fk_demands_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
);

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;

CREATE TABLE `types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
);


--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `photo` varchar(300) DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `password` varchar(300) NOT NULL,
  `place` varchar(300) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `number_UNIQUE` (`phone`)
);
