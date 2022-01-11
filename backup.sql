-- MariaDB dump 10.19  Distrib 10.6.5-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: rn_fashion
-- ------------------------------------------------------
-- Server version	10.6.5-MariaDB-1:10.6.5+maria~focal

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quantity` int(11) NOT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f091e86a234693a49084b4c2c86` (`user_id`),
  KEY `FK_dccd1ec2d6f5644a69adf163bc1` (`product_id`),
  CONSTRAINT `FK_dccd1ec2d6f5644a69adf163bc1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_f091e86a234693a49084b4c2c86` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (73,4,'4112c417-d10f-43d1-894a-6cdeb793980a',59,'m','CLASSIC POLO SHIRT KK-1-a282.jpg'),(74,1,'4112c417-d10f-43d1-894a-6cdeb793980a',60,'m','KREMLIN Mythology V-a9b9.jpg');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'baju'),(2,'celana'),(3,'jaket'),(4,'sepatu'),(5,'aksesoris');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item_status`
--

DROP TABLE IF EXISTS `order_item_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_item_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `isAvailable` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item_status`
--

LOCK TABLES `order_item_status` WRITE;
/*!40000 ALTER TABLE `order_item_status` DISABLE KEYS */;
INSERT INTO `order_item_status` VALUES (1,'pending',1),(2,'in process',1),(3,'denied',0),(4,'cancelled',0),(5,'shipping',1);
/*!40000 ALTER TABLE `order_item_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_title` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `quantity` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `size` varchar(255) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `seller_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_47dcedd318024359904428ee524` (`status_id`),
  KEY `FK_145532db85752b29c57d2b7b1f1` (`order_id`),
  CONSTRAINT `FK_145532db85752b29c57d2b7b1f1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_47dcedd318024359904428ee524` FOREIGN KEY (`status_id`) REFERENCES `order_item_status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (76,'KREMLIN Mythology',18.24,1,35,'KREMLIN Mythology V-a9b9.jpg','2022-01-10 14:04:21.671006','m',1,'f70de2f6-5de2-49f4-86a8-5ffeb2a8bc74');
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_status`
--

DROP TABLE IF EXISTS `order_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `isAvailable` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_status`
--

LOCK TABLES `order_status` WRITE;
/*!40000 ALTER TABLE `order_status` DISABLE KEYS */;
INSERT INTO `order_status` VALUES (1,'pending',1),(2,'verified',1),(3,'denied',0);
/*!40000 ALTER TABLE `order_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `user_id` varchar(36) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `shipping_fee` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a922b820eeef29ac1c6800e826a` (`user_id`),
  KEY `FK_03a801095cb90cf148e474cfcb7` (`status_id`),
  CONSTRAINT `FK_03a801095cb90cf148e474cfcb7` FOREIGN KEY (`status_id`) REFERENCES `order_status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_a922b820eeef29ac1c6800e826a` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (35,'2022-01-10 14:04:21.661360','1320e375-e431-42cc-be01-1a42ce1403b0',1,12,'Jl. bla bla bla');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'create_product'),(2,'read_product'),(3,'update_product'),(4,'delete_product'),(5,'confirm_order');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_categories`
--

DROP TABLE IF EXISTS `product_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_categories` (
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`product_id`,`category_id`),
  KEY `IDX_8748b4a0e8de6d266f2bbc877f` (`product_id`),
  KEY `IDX_9148da8f26fc248e77a387e311` (`category_id`),
  CONSTRAINT `FK_8748b4a0e8de6d266f2bbc877f6` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_9148da8f26fc248e77a387e3112` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_categories`
--

LOCK TABLES `product_categories` WRITE;
/*!40000 ALTER TABLE `product_categories` DISABLE KEYS */;
INSERT INTO `product_categories` VALUES (59,1),(60,1),(61,1),(62,3),(63,3),(64,3),(65,5),(66,5),(67,5),(68,5),(69,1),(70,2),(71,2),(72,2),(73,2),(74,4),(75,4);
/*!40000 ALTER TABLE `product_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imgPath` varchar(255) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_4f166bb8c2bfcef2498d97b4068` (`product_id`),
  CONSTRAINT `FK_4f166bb8c2bfcef2498d97b4068` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (42,'CLASSIC POLO SHIRT KK-1-a282.jpg',59),(43,'CLASSIC POLO SHIRT KK-2-4a80.jpg',59),(44,'KREMLIN Mythology V-a9b9.jpg',60),(45,'KREMLIN Mythology V-7351.jpg',60),(46,'KREMLIN Mythology V-3e5e.jpg',60),(47,'KREMLIN Mythology V-1fec.jpg',60),(48,'KREMLIN Mythology V-b3c7.jpg',60),(49,'KREMLIN Mythology V-b352.jpg',60),(50,'polo-shirt-1-228d.jpg',61),(51,'polo-shirt-2-6ba3.jpg',61),(52,'polo-shirt-3-2628.jpg',61),(53,'polo-shirt-4-57b7.jpg',61),(54,'JAKET COACH PRIA WATERPROOF JAKET MOTOR ANTI AIR JAKET TASLAN-1-612b.jpg',62),(55,'JAKET COACH PRIA WATERPROOF JAKET MOTOR ANTI AIR JAKET TASLAN-2-aefc.jpg',62),(56,'JAKET COACH PRIA WATERPROOF JAKET MOTOR ANTI AIR JAKET TASLAN-3-3639.jpg',62),(57,'Jaket Varsity Jaket Baseball-1-6111.jpg',63),(58,'Jaket Varsity Jaket Baseball-2-3ce6.jpg',63),(59,'VIBES - WIREPEACE - COACH JACKET-4-cf39.jpg',64),(60,'VIBES - WIREPEACE - COACH JACKET-3-7794.jpg',64),(61,'VIBES - WIREPEACE - COACH JACKET-2-c7be.jpg',64),(62,'VIBES - WIREPEACE - COACH JACKET-1-95f4.jpg',64),(63,'VIBES - WIREPEACE - COACH JACKET-b1049.jpg',64),(64,'animous-polo-cap-basic-3141.jpg',65),(65,'animous-polo-cap-basic2-5d107.jpg',65),(66,'animous-polo-cap-basic3-d88c.jpg',65),(67,'animous-polo-cap-basic4-e64a.jpg',65),(68,'animous-polo-cap-basic5-7b4e.jpg',65),(69,'DALMI OFFICIAL - FANCY GOLD HOOP-2-6b09.jpg',66),(70,'DALMI OFFICIAL - FANCY GOLD HOOP-1-8fac.jpg',66),(71,'Kalung Mutiara-3-5253.jpg',67),(72,'Kalung Mutiara-2-6729.jpg',67),(73,'Kalung Mutiara-1-aa19.jpg',67),(74,'Sonia Earrings - Anting Crystal by Her Jewellery-3-9615.jpg',68),(75,'Sonia Earrings - Anting Crystal by Her Jewellery-2-5de6.jpg',68),(76,'Sonia Earrings - Anting Crystal by Her Jewellery-1-bf3f.jpg',68),(77,'Cotton On - Wahsed black-3-b9d5.jpg',69),(78,'Cotton On - Wahsed black-2-e340.jpg',69),(79,'Cotton On - Wahsed black-1-31ad.jpg',69),(80,'Houseofcuff Celana Chino Panjang-1-ad0e.jpg',70),(81,'Houseofcuff Celana Chino Panjang-2-af102.jpg',70),(82,'Houseofcuff Celana Chino Panjang-3-c555.jpg',70),(83,'Kepomp Celana Jogger Sweatpants Tracking Pants Hitam Unisex-3-dbf2.jpg',71),(84,'Kepomp Celana Jogger Sweatpants Tracking Pants Hitam Unisex-2-cb25.jpg',71),(85,'Kepomp Celana Jogger Sweatpants Tracking Pants Hitam Unisex-1-71108.jpg',71),(86,'KIZARU Boardshort Pants - Hitam-3-043e.jpg',72),(87,'KIZARU Boardshort Pants - Hitam-2-7906.jpg',72),(88,'KIZARU Boardshort Pants - Hitam-1-5ecb.jpg',72),(89,'M231 Celana Pendek Pria Zipper Abu-4-1779.jpg',73),(90,'M231 Celana Pendek Pria Zipper Abu-3-db71.jpg',73),(91,'M231 Celana Pendek Pria Zipper Abu-2-8c8c.jpg',73),(92,'M231 Celana Pendek Pria Zipper Abu-1-69eb.jpg',73),(93,'Nike Joyride Run White Black Red-3-8ea5.jpg',74),(94,'Nike Joyride Run White Black Red-2-7f76.jpg',74),(95,'Nike Joyride Run White Black Red-1-d874.jpg',74),(96,'nike air force 1 low medium-3-1b61.jpg',75),(97,'nike air force 1 low medium-2-6104b.jpg',75),(98,'nike air force 1 low medium-1-bde7.jpg',75);
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_sizes`
--

DROP TABLE IF EXISTS `product_sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_sizes` (
  `product_id` int(11) NOT NULL,
  `size_id` int(11) NOT NULL,
  PRIMARY KEY (`product_id`,`size_id`),
  KEY `IDX_b6d94a689dd115cdf01589b961` (`product_id`),
  KEY `IDX_b77c486737027396bcfdc0897b` (`size_id`),
  CONSTRAINT `FK_b6d94a689dd115cdf01589b9615` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_b77c486737027396bcfdc0897bf` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_sizes`
--

LOCK TABLES `product_sizes` WRITE;
/*!40000 ALTER TABLE `product_sizes` DISABLE KEYS */;
INSERT INTO `product_sizes` VALUES (59,1),(59,2),(59,3),(60,1),(60,2),(60,5),(61,1),(61,3),(62,1),(62,3),(63,1),(63,3),(64,1),(64,4);
/*!40000 ALTER TABLE `product_sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` double NOT NULL,
  `stock` int(11) NOT NULL,
  `seller_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_425ee27c69d6b8adc5d6475dcfe` (`seller_id`),
  CONSTRAINT `FK_425ee27c69d6b8adc5d6475dcfe` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (59,'Classic Polo Shirt KK',NULL,18.24,25,'f70de2f6-5de2-49f4-86a8-5ffeb2a8bc74'),(60,'KREMLIN Mythology',NULL,18.24,24,'f70de2f6-5de2-49f4-86a8-5ffeb2a8bc74'),(61,'Polo Shirt',NULL,13.25,30,'f70de2f6-5de2-49f4-86a8-5ffeb2a8bc74'),(62,'JAKET COACH PRIA WATERPROOF',NULL,25.5,30,'f4833f89-56dd-427d-bf8e-18de39668292'),(63,'Jaket Varsity Baseball','Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nUt commodo metus et scelerisque blandit. Vestibulum eget molestie nunc. Cras elementum justo ut ligula vehicula pellentesque. Suspendisse molestie interdum convallis. Donec eu aliquam magna. Suspendisse sed tortor condimentum arcu malesuada ultrices sit amet non enim. Nam aliquam commodo libero in ultrices. Aenean vitae tellus turpis. Suspendisse ac ultrices nisi. Morbi mattis consequat orci, nec elementum risus egestas sit amet. Mauris ac imperdiet neque. Nullam nec vestibulum risus. Aliquam consectetur nulla sit amet orci tempor, at rhoncus quam rhoncus. Ut scelerisque mi turpis, sagittis aliquet nulla pellentesque eu. Nam sit amet est sit amet nulla convallis euismod non id velit. Quisque in dui sapien. ',23.2,13,'f4833f89-56dd-427d-bf8e-18de39668292'),(64,'VIBES WIREPEACE','Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nUt commodo metus et scelerisque blandit. Vestibulum eget molestie nunc. Cras elementum justo ut ligula vehicula pellentesque. Suspendisse molestie interdum convallis. Donec eu aliquam magna. Suspendisse sed tortor condimentum arcu malesuada ultrices sit amet non enim. Nam aliquam commodo libero in ultrices. Aenean vitae tellus turpis. Suspendisse ac ultrices nisi. Morbi mattis consequat orci, nec elementum risus egestas sit amet. Mauris ac imperdiet neque. Nullam nec vestibulum risus. Aliquam consectetur nulla sit amet orci tempor, at rhoncus quam rhoncus. Ut scelerisque mi turpis, sagittis aliquet nulla pellentesque eu. Nam sit amet est sit amet nulla convallis euismod non id velit. Quisque in dui sapien. ',30,18,'f4833f89-56dd-427d-bf8e-18de39668292'),(65,'animous polo cap basic','Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nUt commodo metus et scelerisque blandit. Vestibulum eget molestie nunc. Cras elementum justo ut ligula vehicula pellentesque. Suspendisse molestie interdum convallis. Donec eu aliquam magna. Suspendisse sed tortor condimentum arcu malesuada ultrices sit amet non enim. Nam aliquam commodo libero in ultrices. Aenean vitae tellus turpis. Suspendisse ac ultrices nisi. Morbi mattis consequat orci, nec elementum risus egestas sit amet. Mauris ac imperdiet neque. Nullam nec vestibulum risus. Aliquam consectetur nulla sit amet orci tempor, at rhoncus quam rhoncus. Ut scelerisque mi turpis, sagittis aliquet nulla pellentesque eu. Nam sit amet est sit amet nulla convallis euismod non id velit. Quisque in dui sapien. ',5,24,'a40ff54f-65ba-45fc-b710-410b6869e537'),(66,'FANCY GOLD HOOP','Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nUt commodo metus et scelerisque blandit. Vestibulum eget molestie nunc. Cras elementum justo ut ligula vehicula pellentesque. Suspendisse molestie interdum convallis. Donec eu aliquam magna. Suspendisse sed tortor condimentum arcu malesuada ultrices sit amet non enim. Nam aliquam commodo libero in ultrices. Aenean vitae tellus turpis. Suspendisse ac ultrices nisi. Morbi mattis consequat orci, nec elementum risus egestas sit amet. Mauris ac imperdiet neque. Nullam nec vestibulum risus. Aliquam consectetur nulla sit amet orci tempor, at rhoncus quam rhoncus. Ut scelerisque mi turpis, sagittis aliquet nulla pellentesque eu. Nam sit amet est sit amet nulla convallis euismod non id velit. Quisque in dui sapien. ',29.5,18,'a40ff54f-65ba-45fc-b710-410b6869e537'),(67,'Kalung Mutiara','Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nUt commodo metus et scelerisque blandit. Vestibulum eget molestie nunc. Cras elementum justo ut ligula vehicula pellentesque. Suspendisse molestie interdum convallis. Donec eu aliquam magna. Suspendisse sed tortor condimentum arcu malesuada ultrices sit amet non enim. Nam aliquam commodo libero in ultrices. Aenean vitae tellus turpis. Suspendisse ac ultrices nisi. Morbi mattis consequat orci, nec elementum risus egestas sit amet. Mauris ac imperdiet neque. Nullam nec vestibulum risus. Aliquam consectetur nulla sit amet orci tempor, at rhoncus quam rhoncus. Ut scelerisque mi turpis, sagittis aliquet nulla pellentesque eu. Nam sit amet est sit amet nulla convallis euismod non id velit. Quisque in dui sapien. ',17.5,32,'a40ff54f-65ba-45fc-b710-410b6869e537'),(68,'Sonia Earrings - Anting Crystal','Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nUt commodo metus et scelerisque blandit. Vestibulum eget molestie nunc. Cras elementum justo ut ligula vehicula pellentesque. Suspendisse molestie interdum convallis. Donec eu aliquam magna. Suspendisse sed tortor condimentum arcu malesuada ultrices sit amet non enim. Nam aliquam commodo libero in ultrices. Aenean vitae tellus turpis. Suspendisse ac ultrices nisi. Morbi mattis consequat orci, nec elementum risus egestas sit amet. Mauris ac imperdiet neque. Nullam nec vestibulum risus. Aliquam consectetur nulla sit amet orci tempor, at rhoncus quam rhoncus. Ut scelerisque mi turpis, sagittis aliquet nulla pellentesque eu. Nam sit amet est sit amet nulla convallis euismod non id velit. Quisque in dui sapien. ',28.5,24,'a40ff54f-65ba-45fc-b710-410b6869e537'),(69,'Cotton On - Wahsed black','Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nUt commodo metus et scelerisque blandit. Vestibulum eget molestie nunc. Cras elementum justo ut ligula vehicula pellentesque. Suspendisse molestie interdum convallis. Donec eu aliquam magna. Suspendisse sed tortor condimentum arcu malesuada ultrices sit amet non enim. Nam aliquam commodo libero in ultrices. Aenean vitae tellus turpis. Suspendisse ac ultrices nisi. Morbi mattis consequat orci, nec elementum risus egestas sit amet. Mauris ac imperdiet neque. Nullam nec vestibulum risus. Aliquam consectetur nulla sit amet orci tempor, at rhoncus quam rhoncus. Ut scelerisque mi turpis, sagittis aliquet nulla pellentesque eu. Nam sit amet est sit amet nulla convallis euismod non id velit. Quisque in dui sapien. ',8.54,27,'8347119c-9dd1-4aef-8e2a-84365825bba3'),(70,'Houseofcuff Celana Chino Panjang','Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nUt commodo metus et scelerisque blandit. Vestibulum eget molestie nunc. Cras elementum justo ut ligula vehicula pellentesque. Suspendisse molestie interdum convallis. Donec eu aliquam magna. Suspendisse sed tortor condimentum arcu malesuada ultrices sit amet non enim. Nam aliquam commodo libero in ultrices. Aenean vitae tellus turpis. Suspendisse ac ultrices nisi. Morbi mattis consequat orci, nec elementum risus egestas sit amet. Mauris ac imperdiet neque. Nullam nec vestibulum risus. Aliquam consectetur nulla sit amet orci tempor, at rhoncus quam rhoncus. Ut scelerisque mi turpis, sagittis aliquet nulla pellentesque eu. Nam sit amet est sit amet nulla convallis euismod non id velit. Quisque in dui sapien. ',12.52,26,'8347119c-9dd1-4aef-8e2a-84365825bba3'),(71,'Kepomp Celana Jogger Sweatpants','Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nUt commodo metus et scelerisque blandit. Vestibulum eget molestie nunc. Cras elementum justo ut ligula vehicula pellentesque. Suspendisse molestie interdum convallis. Donec eu aliquam magna. Suspendisse sed tortor condimentum arcu malesuada ultrices sit amet non enim. Nam aliquam commodo libero in ultrices. Aenean vitae tellus turpis. Suspendisse ac ultrices nisi. Morbi mattis consequat orci, nec elementum risus egestas sit amet. Mauris ac imperdiet neque. Nullam nec vestibulum risus. Aliquam consectetur nulla sit amet orci tempor, at rhoncus quam rhoncus. Ut scelerisque mi turpis, sagittis aliquet nulla pellentesque eu. Nam sit amet est sit amet nulla convallis euismod non id velit. Quisque in dui sapien. ',32.5,26,'8347119c-9dd1-4aef-8e2a-84365825bba3'),(72,'KIZARU Boardshort Pants - Hitam','Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nUt commodo metus et scelerisque blandit. Vestibulum eget molestie nunc. Cras elementum justo ut ligula vehicula pellentesque. Suspendisse molestie interdum convallis. Donec eu aliquam magna. Suspendisse sed tortor condimentum arcu malesuada ultrices sit amet non enim. Nam aliquam commodo libero in ultrices. Aenean vitae tellus turpis. Suspendisse ac ultrices nisi. Morbi mattis consequat orci, nec elementum risus egestas sit amet. Mauris ac imperdiet neque. Nullam nec vestibulum risus. Aliquam consectetur nulla sit amet orci tempor, at rhoncus quam rhoncus. Ut scelerisque mi turpis, sagittis aliquet nulla pellentesque eu. Nam sit amet est sit amet nulla convallis euismod non id velit. Quisque in dui sapien. ',9.45,23,'8347119c-9dd1-4aef-8e2a-84365825bba3'),(73,'Celana Pendek Pria Zipper Abu','Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nUt commodo metus et scelerisque blandit. Vestibulum eget molestie nunc. Cras elementum justo ut ligula vehicula pellentesque. Suspendisse molestie interdum convallis. Donec eu aliquam magna. Suspendisse sed tortor condimentum arcu malesuada ultrices sit amet non enim. Nam aliquam commodo libero in ultrices. Aenean vitae tellus turpis. Suspendisse ac ultrices nisi. Morbi mattis consequat orci, nec elementum risus egestas sit amet. Mauris ac imperdiet neque. Nullam nec vestibulum risus. Aliquam consectetur nulla sit amet orci tempor, at rhoncus quam rhoncus. Ut scelerisque mi turpis, sagittis aliquet nulla pellentesque eu. Nam sit amet est sit amet nulla convallis euismod non id velit. Quisque in dui sapien. ',7.5,42,'8347119c-9dd1-4aef-8e2a-84365825bba3'),(74,'Nike Joyride Run White Black Red','Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nUt commodo metus et scelerisque blandit. Vestibulum eget molestie nunc. Cras elementum justo ut ligula vehicula pellentesque. Suspendisse molestie interdum convallis. Donec eu aliquam magna. Suspendisse sed tortor condimentum arcu malesuada ultrices sit amet non enim. Nam aliquam commodo libero in ultrices. Aenean vitae tellus turpis. Suspendisse ac ultrices nisi. Morbi mattis consequat orci, nec elementum risus egestas sit amet. Mauris ac imperdiet neque. Nullam nec vestibulum risus. Aliquam consectetur nulla sit amet orci tempor, at rhoncus quam rhoncus. Ut scelerisque mi turpis, sagittis aliquet nulla pellentesque eu. Nam sit amet est sit amet nulla convallis euismod non id velit. Quisque in dui sapien. ',32.5,20,'8347119c-9dd1-4aef-8e2a-84365825bba3'),(75,'nike air force 1 low medium-1','Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nUt commodo metus et scelerisque blandit. Vestibulum eget molestie nunc. Cras elementum justo ut ligula vehicula pellentesque. Suspendisse molestie interdum convallis. Donec eu aliquam magna. Suspendisse sed tortor condimentum arcu malesuada ultrices sit amet non enim. Nam aliquam commodo libero in ultrices. Aenean vitae tellus turpis. Suspendisse ac ultrices nisi. Morbi mattis consequat orci, nec elementum risus egestas sit amet. Mauris ac imperdiet neque. Nullam nec vestibulum risus. Aliquam consectetur nulla sit amet orci tempor, at rhoncus quam rhoncus. Ut scelerisque mi turpis, sagittis aliquet nulla pellentesque eu. Nam sit amet est sit amet nulla convallis euismod non id velit. Quisque in dui sapien. ',25.5,30,'8347119c-9dd1-4aef-8e2a-84365825bba3');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_permissions` (
  `role_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `IDX_178199805b901ccd220ab7740e` (`role_id`),
  KEY `IDX_17022daf3f885f7d35423e9971` (`permission_id`),
  CONSTRAINT `FK_17022daf3f885f7d35423e9971e` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_178199805b901ccd220ab7740ec` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

LOCK TABLES `role_permissions` WRITE;
/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
INSERT INTO `role_permissions` VALUES (2,1),(3,1),(3,2),(3,3),(3,4);
/*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'user'),(2,'seller'),(3,'admin');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sizes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,'s'),(2,'m'),(3,'l'),(4,'xl'),(5,'xxl');
/*!40000 ALTER TABLE `sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_favorites`
--

DROP TABLE IF EXISTS `user_favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_favorites` (
  `product_id` int(11) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  PRIMARY KEY (`product_id`,`user_id`),
  KEY `IDX_450f345c2e8eb1b4b38a6bc6be` (`product_id`),
  KEY `IDX_5238ce0a21cc77dc16c8efe3d3` (`user_id`),
  CONSTRAINT `FK_450f345c2e8eb1b4b38a6bc6be4` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_5238ce0a21cc77dc16c8efe3d36` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_favorites`
--

LOCK TABLES `user_favorites` WRITE;
/*!40000 ALTER TABLE `user_favorites` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_likes`
--

DROP TABLE IF EXISTS `user_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_likes` (
  `product_id` int(11) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  PRIMARY KEY (`product_id`,`user_id`),
  KEY `IDX_dc0279f29713e728eb03de13ed` (`product_id`),
  KEY `IDX_7392cc61e4d0e57d0c02fafdc7` (`user_id`),
  CONSTRAINT `FK_7392cc61e4d0e57d0c02fafdc72` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_dc0279f29713e728eb03de13ed7` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_likes`
--

LOCK TABLES `user_likes` WRITE;
/*!40000 ALTER TABLE `user_likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `img` varchar(255) NOT NULL DEFAULT 'users/img/profile-default.jpg',
  `password` varchar(255) NOT NULL,
  `rt_hash` varchar(255) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`),
  KEY `FK_a2cecd1a3531c0b041e29ba46e1` (`role_id`),
  CONSTRAINT `FK_a2cecd1a3531c0b041e29ba46e1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('1320e375-e431-42cc-be01-1a42ce1403b0','Alfan Almunawar','buyer2@gmail.com','Jl. bla bla bla','users/img/profile-default.jpg','$2b$10$.AMZlimKcSRatY5dSdb.f..pvZHOaAyhvURxVMM6Pn/pB0a/WoPxi','$2b$10$Aalx9OK0/QJDdHBycRSmSeuoglitN/TDXIbJfduO6fHbOsQdJtI.O',1),('1ddb88d8-0b83-4e4e-befe-09f551013370','Akun Admin','admin@gmail.com',NULL,'users/img/profile-default.jpg','$2b$10$V8TvOtsfXDb0TJwU6aWFLupBLn3dFBaC7UcmDjUnMvIKnvfhuVw3m','$2b$10$s3AJdhqc7eC91e3LvHtWyOWrJRCdB47XDz0l./5hqoGYrxoxGoXv.',3),('4112c417-d10f-43d1-894a-6cdeb793980a','Akun Buyer','buyer@gmail.com','Jl. kek','users/img/profile-default.jpg','$2b$10$6IJshX0B9iSH.UbT409OKeTJr9VdQ/2gFMqb0CuhLos1bu2qErFjW',NULL,1),('8347119c-9dd1-4aef-8e2a-84365825bba3','Akun Seller4','seller4@gmail.com',NULL,'users/img/profile-default.jpg','$2b$10$2AGDcTR9os.rRT/FELrf1.HIJb3WPdu6iNZ0x.dVwESXtgQVozswq','$2b$10$St0t0GgrQq2fAEe4EtOBxOx6YMwyupGShHtabLIx6IgppfgQIAvei',2),('a40ff54f-65ba-45fc-b710-410b6869e537','Akun seller 3','seller3@gmail.com',NULL,'users/img/profile-default.jpg','$2b$10$QtgPCi0d5sN5FjxsgVzxO.uu9gIOY7mtEWACePg.4gDwBCan53QPS','$2b$10$n5gdZVoA.DW4wXD4iLQb0u.O7QtcirTS3ahrLCoY3oUL3yqbucdXm',2),('f4833f89-56dd-427d-bf8e-18de39668292','Akun Seller2','seller2@gmail.com',NULL,'users/img/profile-default.jpg','$2b$10$rHJdOEIwzb7Js5hBToBChe3l.A.tCtyRjoUdGng0gEZiIzcQzQdzC','$2b$10$An1tpAYnX5NwTS3bcmLRDemKcU24nSgnjI6hLJT2hfuJeusWAjOAG',2),('f70de2f6-5de2-49f4-86a8-5ffeb2a8bc74','Akun Seller','seller@gmail.com','jl. asdasd','users/img/profile-default.jpg','$2b$10$d8B1YBFYc1Gyp/4vbJzxweev788DPfFLcW9FWyNWW5fZxfIp3FfGC','$2b$10$oBsI5xi1verQpeZjkwR7KeIenU.tfbI6RotWm9e4WOjpXNYdc5Yvy',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-11  4:05:34
