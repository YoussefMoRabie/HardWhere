CREATE DATABASE  IF NOT EXISTS `hardwhere` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hardwhere`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hardwhere
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accessories`
--

DROP TABLE IF EXISTS `accessories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accessories` (
  `pid` int NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`pid`),
  CONSTRAINT `accessories_product` FOREIGN KEY (`pid`) REFERENCES `product` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accessories`
--

LOCK TABLES `accessories` WRITE;
/*!40000 ALTER TABLE `accessories` DISABLE KEYS */;
INSERT INTO `accessories` VALUES (20,'Charger'),(21,'Charger');
/*!40000 ALTER TABLE `accessories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contains`
--

DROP TABLE IF EXISTS `contains`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contains` (
  `o_id` int NOT NULL,
  `p_id` int NOT NULL,
  `count` int DEFAULT NULL,
  PRIMARY KEY (`o_id`,`p_id`),
  KEY `contains_product_idx` (`p_id`),
  CONSTRAINT `contains_orders` FOREIGN KEY (`o_id`) REFERENCES `orders` (`oid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contains_product` FOREIGN KEY (`p_id`) REFERENCES `product` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contains`
--

LOCK TABLES `contains` WRITE;
/*!40000 ALTER TABLE `contains` DISABLE KEYS */;
/*!40000 ALTER TABLE `contains` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `ssn` int NOT NULL,
  `payment_method` varchar(45) DEFAULT 'Cash',
  PRIMARY KEY (`ssn`),
  KEY `ssn_idx` (`ssn`),
  CONSTRAINT `ssn_cust_users` FOREIGN KEY (`ssn`) REFERENCES `users` (`ssn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (2,'Cash'),(3,'Cash'),(4,'Cash'),(5,'Cash'),(7,'Cash'),(8,'Cash'),(9,'Cash'),(11,'Cash'),(12,'Cash'),(13,'Cash'),(14,'Cash'),(16,'Cash'),(19,'Cash'),(25,'Cash'),(26,'Cash'),(28,'Cash'),(29,'Cash'),(31,'Cash'),(32,'Cash'),(33,'Cash'),(36,'Cash'),(39,'Cash'),(40,'Cash'),(41,'Cash'),(43,'Cash'),(47,'Cash'),(48,'Cash'),(49,'Cash'),(50,'Cash'),(53,'Cash'),(55,'Cash'),(57,'Cash'),(59,'Cash'),(61,'Cash'),(62,'Cash'),(64,'Cash'),(65,'Cash'),(66,'Cash'),(69,'Cash'),(71,'Cash'),(74,'Cash'),(78,'Cash'),(80,'Cash'),(84,'Cash'),(85,'Cash'),(90,'Cash'),(91,'Cash'),(94,'Cash'),(97,'Cash'),(100,'Cash');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_cart`
--

DROP TABLE IF EXISTS `customer_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_cart` (
  `cust_ssn` int NOT NULL,
  `p_id` int NOT NULL,
  `qty` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`cust_ssn`,`p_id`),
  KEY `cart_product_idx` (`p_id`),
  CONSTRAINT `cart_customer` FOREIGN KEY (`cust_ssn`) REFERENCES `customer` (`ssn`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cart_product` FOREIGN KEY (`p_id`) REFERENCES `product` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_cart`
--

LOCK TABLES `customer_cart` WRITE;
/*!40000 ALTER TABLE `customer_cart` DISABLE KEYS */;
INSERT INTO `customer_cart` VALUES (2,7,2);
/*!40000 ALTER TABLE `customer_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `did` int NOT NULL,
  `d_name` varchar(45) DEFAULT NULL,
  `mgrssn` int DEFAULT NULL,
  PRIMARY KEY (`did`),
  UNIQUE KEY `d_name_UNIQUE` (`d_name`),
  KEY `manages_idx` (`mgrssn`),
  CONSTRAINT `manages` FOREIGN KEY (`mgrssn`) REFERENCES `users` (`ssn`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (0,'Storage managment',77),(1,'Salesmen',92),(2,'Customer support',63),(3,'Cleaning',44),(4,'Accounting',21);
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `ssn` int NOT NULL,
  `salary` int DEFAULT NULL,
  `working_shift` enum('day','night') DEFAULT NULL,
  `d_id` int DEFAULT NULL,
  PRIMARY KEY (`ssn`),
  KEY `works_for_idx` (`d_id`),
  KEY `ssn_users_employee_idx` (`ssn`),
  CONSTRAINT `ssn_users_employee` FOREIGN KEY (`ssn`) REFERENCES `users` (`ssn`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `works_for` FOREIGN KEY (`d_id`) REFERENCES `department` (`did`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (6,4252,'day',4),(10,3414,'night',3),(15,3658,'night',2),(17,4682,'day',1),(18,3645,'night',3),(20,4209,'day',3),(21,3750,'day',1),(22,4364,'night',3),(23,3689,'night',2),(24,4579,'night',4),(27,4782,'night',4),(30,4333,'night',0),(34,3776,'night',0),(35,3727,'night',3),(37,4029,'day',2),(38,4462,'night',3),(42,4893,'night',3),(44,4438,'day',1),(45,4153,'night',2),(46,4248,'night',4),(51,4908,'night',1),(52,3586,'day',1),(54,4869,'day',0),(56,3781,'day',3),(58,3272,'day',1),(60,4347,'night',4),(63,3673,'day',2),(67,3227,'day',1),(68,3491,'night',2),(70,4938,'night',3),(72,4873,'day',0),(73,4410,'night',0),(75,4786,'night',4),(76,3776,'night',0),(77,3362,'day',2),(79,3944,'day',4),(81,3602,'day',0),(82,3445,'day',3),(83,4126,'night',2),(86,3037,'night',1),(87,3165,'day',4),(88,4034,'day',3),(89,4604,'night',1),(92,3819,'day',1),(93,4912,'night',1),(95,4551,'night',3),(96,3891,'day',3),(98,4336,'day',0),(99,3029,'night',0);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `cust_ssn` int NOT NULL,
  `p_id` int NOT NULL,
  PRIMARY KEY (`cust_ssn`,`p_id`),
  KEY `p_id_idx` (`p_id`),
  CONSTRAINT `favorites_customer` FOREIGN KEY (`cust_ssn`) REFERENCES `customer` (`ssn`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `favorites_product` FOREIGN KEY (`p_id`) REFERENCES `product` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (2,8);
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `cust_ssn` int NOT NULL AUTO_INCREMENT,
  `p_id` int NOT NULL,
  `rating` decimal(3,1) DEFAULT NULL,
  `comment` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`cust_ssn`,`p_id`),
  KEY `feedback_product_idx` (`p_id`),
  CONSTRAINT `feedback_customer` FOREIGN KEY (`cust_ssn`) REFERENCES `customer` (`ssn`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `feedback_product` FOREIGN KEY (`p_id`) REFERENCES `product` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `headphones`
--

DROP TABLE IF EXISTS `headphones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `headphones` (
  `pid` int NOT NULL,
  `frequency` int DEFAULT NULL,
  PRIMARY KEY (`pid`),
  CONSTRAINT `headphones_pid` FOREIGN KEY (`pid`) REFERENCES `product` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `headphones`
--

LOCK TABLES `headphones` WRITE;
/*!40000 ALTER TABLE `headphones` DISABLE KEYS */;
INSERT INTO `headphones` VALUES (12,10000),(13,15000);
/*!40000 ALTER TABLE `headphones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labtops`
--

DROP TABLE IF EXISTS `labtops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `labtops` (
  `pid` int NOT NULL,
  `processor` varchar(45) DEFAULT NULL,
  `ram` int DEFAULT NULL,
  `gpu` varchar(45) DEFAULT NULL,
  `screen` float DEFAULT NULL,
  PRIMARY KEY (`pid`),
  CONSTRAINT `laptops_product` FOREIGN KEY (`pid`) REFERENCES `product` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labtops`
--

LOCK TABLES `labtops` WRITE;
/*!40000 ALTER TABLE `labtops` DISABLE KEYS */;
INSERT INTO `labtops` VALUES (1,'11th gen intel i3',16,'RTX 2060',15.6),(6,'11th gen intel i3',8,'integrated',15.6),(7,'intel celeron N4000',4,'UHD Graphics 600',14),(8,'Intel Core i5-1155G7',16,'Intel Iris Xe Graphics',15.6),(9,'Intel Core i5-1135G7',15,'Integrated',15.6),(10,'intel celeron N4020',4,'Integrated',14),(11,'intel 10th gen core i7',16,'GTX 1660ti',15.6);
/*!40000 ALTER TABLE `labtops` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mobiles`
--

DROP TABLE IF EXISTS `mobiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mobiles` (
  `pid` int NOT NULL,
  `processor` varchar(45) DEFAULT NULL,
  `ram` int DEFAULT NULL,
  `screen` float DEFAULT NULL,
  PRIMARY KEY (`pid`),
  CONSTRAINT `mobiles_product` FOREIGN KEY (`pid`) REFERENCES `product` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mobiles`
--

LOCK TABLES `mobiles` WRITE;
/*!40000 ALTER TABLE `mobiles` DISABLE KEYS */;
INSERT INTO `mobiles` VALUES (14,'Google Tensor',8,8),(15,'Multi g70',6,6),(16,'Apple A16',7,6.1);
/*!40000 ALTER TABLE `mobiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `oid` int NOT NULL AUTO_INCREMENT,
  `price` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `cust_ssn` int DEFAULT NULL,
  `sc_id` int DEFAULT NULL,
  PRIMARY KEY (`oid`),
  KEY `bought_by_idx` (`cust_ssn`),
  KEY `shipped_by_idx` (`sc_id`),
  CONSTRAINT `bought_by` FOREIGN KEY (`cust_ssn`) REFERENCES `customer` (`ssn`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `shipped_by` FOREIGN KEY (`sc_id`) REFERENCES `shipping_company` (`scid`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `pid` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(45) DEFAULT NULL,
  `price` int unsigned DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `count` int unsigned DEFAULT '0',
  `has_offer` bit(1) DEFAULT NULL,
  `new_price` int unsigned DEFAULT NULL,
  `su_id` int DEFAULT NULL,
  `st_id` int DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `p_value` decimal(3,1) DEFAULT '0.0',
  `img_link` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`pid`),
  KEY `supplied_by_idx` (`su_id`),
  KEY `stored_in_idx` (`st_id`),
  CONSTRAINT `stored_in` FOREIGN KEY (`st_id`) REFERENCES `storages` (`stid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `supplied_by` FOREIGN KEY (`su_id`) REFERENCES `suppliers` (`suid`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Acer Aspire 5 A515',270,'#d8d0d0',10,NULL,NULL,3,1,NULL,NULL,1.5,'https://m.media-amazon.com/images/I/71pvhTrmZDL._AC_UY327_FMwebp_QL65_.jpg'),(6,'Lenovo Ideapad 3',400,'#505e51',10,NULL,NULL,1,1,NULL,NULL,3.5,'https://m.media-amazon.com/images/I/61QGMX0Qy6L._AC_UY327_FMwebp_QL65_.jpg'),(7,'HP Stream 2021',290,'#d7a3a3',9,NULL,NULL,10,2,NULL,NULL,4.0,'https://m.media-amazon.com/images/I/71tXLOE7wIL._AC_UY327_FMwebp_QL65_.jpg'),(8,'HP Envy x360',649,'#857a7a',10,_binary '',559,10,2,'2022-12-29','2022-12-29',3.5,'https://m.media-amazon.com/images/I/51ptff9owyL._AC_SY450_.jpg'),(9,'Dell Inspiron 3511',522,'#000000',20,_binary '',400,9,3,'2022-12-29','2022-12-29',3.5,'https://m.media-amazon.com/images/I/71qXJFhJuhL._AC_SY355_.jpg'),(10,'Asus L410 MA-DB02',169,'#272020',30,_binary '',100,4,3,'2022-12-29','2022-12-31',1.0,'https://m.media-amazon.com/images/I/61FadZ-MCaL._AC_UY327_FMwebp_QL65_.jpg'),(11,'Lenovo Legion 5',1000,'#000000',50,NULL,NULL,1,4,NULL,NULL,1.0,'https://www.lenovo.com/medias/lenovo-laptop-legion-5-15-intel-series-hero.png?context=bWFzdGVyfHJvb3R8OTYzMTl8aW1hZ2UvcG5nfGhhZi9oOTkvMTQyMjIyMzM5OTMyNDYucG5nfDY2M2UyNzBmMzViOWJjZDM0OGQyMDI2NjhkM2Y1ZDc2MTI3NTU0OTczMDZjNDBlN2JlZDMwMGM3YjViMjExYTE'),(12,'Bose QuietComfort 45',239,'#000000',20,_binary '\0',200,7,6,'2022-12-29','2022-12-31',3.5,'https://m.media-amazon.com/images/I/51JbsHSktkL._AC_SX355_.jpg'),(13,'Sony MDR-ZX310AP',66,'#e60f0f',15,NULL,NULL,11,6,NULL,NULL,1.5,'https://m.media-amazon.com/images/I/61G+BAgApoL._AC_UY327_FMwebp_QL65_.jpg'),(14,'Google Pixel 6a ',399,'#45b090',20,NULL,NULL,6,8,NULL,NULL,1.0,'https://m.media-amazon.com/images/I/61dNAU6PgxL._AC_SY355_.jpg'),(15,'SAMSUNG Galaxy S21',597,'#000000',9,_binary '',495,8,7,'2022-12-29','2022-12-31',1.5,'https://m.media-amazon.com/images/I/61ZNIHIEUqL._AC_SX679_.jpg'),(16,'Apple iPhone XR',230,'#d41c1c',20,NULL,NULL,2,7,NULL,NULL,3.0,'https://m.media-amazon.com/images/I/51QG+K5RQtL._AC_SX425_.jpg'),(17,'Samsung m5 series',249,'#000000',12,NULL,NULL,8,7,NULL,NULL,1.0,'https://m.media-amazon.com/images/I/81+uK5QM8+L._AC_UY327_FMwebp_QL65_.jpg'),(18,'LG 24LF454B',145,'#000000',9,NULL,NULL,7,7,NULL,NULL,2.5,'https://m.media-amazon.com/images/I/81IHNg9G5qL._AC_UY327_FMwebp_QL65_.jpg'),(19,'LG 24LQ519S',176,'#433838',10,NULL,NULL,7,6,NULL,NULL,1.0,'https://m.media-amazon.com/images/I/91JWZTKW-rL._AC_UY327_FMwebp_QL65_.jpg'),(20,'iPhone charger 3 pack 10ft',10,'#ded9d9',21,NULL,NULL,2,7,NULL,NULL,3.5,'https://m.media-amazon.com/images/I/71hnUhUJJVL._AC_UY327_FMwebp_QL65_.jpg'),(21,'Apple Wireless Charger ANYLINCON',30,'#483965',15,NULL,NULL,2,5,NULL,NULL,3.0,'https://m.media-amazon.com/images/I/61+CVXTrs9L._AC_UY327_FMwebp_QL65_.jpg');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `screens`
--

DROP TABLE IF EXISTS `screens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `screens` (
  `pid` int NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  `resolution` varchar(45) DEFAULT NULL,
  `is_smart` enum('Yes','No') DEFAULT NULL,
  PRIMARY KEY (`pid`),
  CONSTRAINT `screens_product` FOREIGN KEY (`pid`) REFERENCES `product` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `screens`
--

LOCK TABLES `screens` WRITE;
/*!40000 ALTER TABLE `screens` DISABLE KEYS */;
INSERT INTO `screens` VALUES (17,'AMOLED','1080p','Yes'),(18,'LED','720p','No'),(19,'OLED','720p','Yes');
/*!40000 ALTER TABLE `screens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_company`
--

DROP TABLE IF EXISTS `shipping_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping_company` (
  `scid` int NOT NULL AUTO_INCREMENT,
  `sc_name` varchar(45) DEFAULT NULL,
  `cost` int DEFAULT NULL,
  `delivery_time` int DEFAULT NULL,
  PRIMARY KEY (`scid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_company`
--

LOCK TABLES `shipping_company` WRITE;
/*!40000 ALTER TABLE `shipping_company` DISABLE KEYS */;
INSERT INTO `shipping_company` VALUES (1,'AP Moller-Maersk Group',100,1),(2,'Cosco',84,7),(3,'CMA CGM Group',87,4),(4,'Hapag-Lloyd',40,3),(5,'ONE (Ocean Network Express)',79,4),(6,'Amazon Fresh',22,5),(7,'Shipt',85,4),(8,'Instacart',87,9),(9,'Boxed',87,4),(10,'Evergreen',47,10);
/*!40000 ALTER TABLE `shipping_company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storages`
--

DROP TABLE IF EXISTS `storages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storages` (
  `stid` int NOT NULL AUTO_INCREMENT,
  `st_address` varchar(45) DEFAULT NULL,
  `max_capacity` int DEFAULT NULL,
  `currently_used` int DEFAULT NULL,
  PRIMARY KEY (`stid`),
  UNIQUE KEY `st_address` (`st_address`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storages`
--

LOCK TABLES `storages` WRITE;
/*!40000 ALTER TABLE `storages` DISABLE KEYS */;
INSERT INTO `storages` VALUES (1,'6168 Warner Point',290,20),(2,'9720 Scott Street',160,19),(3,'550 Algoma Crossing',894,50),(4,'886 4th Lane',976,50),(5,'74 Farmco Crossing',127,15),(6,'5702 Susan Court',854,45),(7,'18841 Nelson Point',287,71),(8,'334 Roth Court',447,20),(9,'4 Emmet Lane',478,0),(10,'8285 Summer Ridge Parkway',127,0);
/*!40000 ALTER TABLE `storages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `suid` int NOT NULL AUTO_INCREMENT,
  `su_name` varchar(45) DEFAULT NULL,
  `su_address` varchar(45) DEFAULT NULL,
  `su_phone` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`suid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (1,'Lenovo','6 Lawn Pass','+86 683 473 0807'),(2,'Apple','0423 Hermina Park','+66 713 741 8805'),(3,'Acer','407 Little Fleur Center','+20 118 580 1863'),(4,'Asus','55 Petterle Way','+20 152 175 5020'),(5,'Microsoft','25 Larry Crossing','+20 115 672 9972'),(6,'Google','542 Holy Cross Hill','+20 116 736 3354'),(7,'LG','7049 Crownhardt Crossing','+20 103 210 3412'),(8,'Samsung','535 Maple Wood Court','+20 106 715 7381'),(9,'Dell','3151 Pawling Pass','+20 122 137 7278'),(10,'HP','33 Esch Crossing','+20 113 896 1189'),(11,'Sony','52 Anwar-el sadat street','+201125841567');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `ssn` int NOT NULL AUTO_INCREMENT,
  `f_name` varchar(45) DEFAULT NULL,
  `l_name` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `authority` enum('manager','customer','employee') DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ssn`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Youssef','Hagag','856-880-7697','36014 Dryden Center','1','manager','1'),(2,'Mahmoud','Sobhy','729-435-1949','9 Utah Parkway','2','customer','2'),(3,'Kit','Wilshere','611-230-5133','2513 Roxbury Crossing','kwilshere2@hud.gov','customer','yg5A5qF'),(4,'Bernette','Vasilyevski','786-258-0726','41833 American Ash Crossing','bvasilyevski3@illinois.edu','customer','FFeB7x8VBz'),(5,'Leeann','Bever','727-130-8512','2 Green Center','lbever4@accuweather.com','customer','rIOW0sp3F'),(6,'Alena','Pavelin','975-814-3251','1763 Springs Avenue','3','employee','3'),(7,'Danni','Naisbet','610-719-6499','57214 Badeau Plaza','dnaisbet6@livejournal.com','customer','DzgvOgRNjRFP'),(8,'Gerladina','Kayzer','843-681-8788','836 Brentwood Pass','gkayzer7@ebay.com','customer','FvoY24OA7Yjk'),(9,'Daisy','Janaszewski','764-765-7403','76 Orin Lane','djanaszewski8@hostgator.com','customer','BhX77HRSxV'),(10,'Winnah','Ortiger','260-564-4613','39733 Emmet Hill','wortiger9@ustream.tv','employee','1jqhgPE'),(11,'Rosalinda','Verson','250-918-4366','04771 Southridge Center','rversona@lulu.com','customer','HxwKPcQR7Qt'),(12,'Florina','Perkis','431-596-8245','1 Meadow Valley Point','fperkisb@mail.ru','customer','b2SVpQKKFw8'),(13,'Jean','Straneo','746-632-5690','773 Mcguire Center','jstraneoc@acquirethisname.com','customer','Nz77gQQ'),(14,'Nola','Begg','283-229-4397','017 Arapahoe Circle','nbeggd@ucsd.edu','customer','2HbFlZgW6'),(15,'Dev','Dagg','207-237-5091','2 Hollow Ridge Hill','ddagge@meetup.com','employee','JBT41SmU'),(16,'Emmalynne','Landall','444-219-0781','67140 Ludington Center','elandallf@latimes.com','customer','e912Z5AXRK'),(17,'Egor','Erley','191-668-0543','81944 Village Center','eerleyg@google.co.jp','employee','ev0nKwgSnn'),(18,'Tann','Been','625-444-2150','02795 Superior Parkway','tbeenh@usgs.gov','employee','KyDqoxyy'),(19,'Ortensia','Hopewell','728-317-8712','9992 Maywood Drive','ohopewelli@hexun.com','customer','7EfLjUrVeG'),(20,'Tobe','Driffield','457-754-8732','901 Lake View Center','tdriffieldj@hugedomains.com','employee','jvhBhHzCW'),(21,'Shirlee','Sanchiz','100-856-2097','20212 Oneill Terrace','ssanchizk@multiply.com','employee','PzPxcQl'),(22,'Marion','Carrel','546-557-5898','61 Cardinal Point','mcarrell@123-reg.co.uk','employee','In2ybuWy'),(23,'Whitman','McCart','671-753-9335','5959 Nelson Point','wmccartm@ning.com','employee','XJqGuRm'),(24,'Griffin','Guidelli','911-676-3917','2 Lake View Terrace','gguidellin@friendfeed.com','employee','xpkV0Q9Sg'),(25,'Elysia','Strooband','296-995-0024','7453 Dennis Park','estroobando@blinklist.com','customer','JEziEVh'),(26,'Oona','Garnul','304-303-6808','2 La Follette Park','ogarnulp@wufoo.com','customer','tTmWAWtxRY5'),(27,'Arleta','Eggerton','719-282-4750','04 Myrtle Avenue','aeggertonq@japanpost.jp','employee','a2irVY5cZ'),(28,'August','Rodgier','601-513-9153','86852 Meadow Vale Plaza','arodgierr@china.com.cn','customer','lWHAPNMGhBq'),(29,'Matty','Janosevic','934-193-1328','13 Golf Course Lane','mjanosevics@usnews.com','customer','CI1sy2PZ'),(30,'Giacinta','Savile','417-449-6335','82 Straubel Parkway','gsavilet@de.vu','employee','98lagEZHkZ7'),(31,'Lian','Chart','642-258-0942','29 Harper Hill','lchartu@pcworld.com','customer','bqxs6enFJ'),(32,'Jackelyn','Reisen','371-781-7785','0752 Northfield Court','jreisenv@pbs.org','customer','0JQPynYLKkwc'),(33,'Doris','Filippello','758-876-2076','706 Mosinee Way','dfilippellow@jimdo.com','customer','UST40kP'),(34,'Richart','Stabbins','833-728-1492','2085 Bowman Circle','rstabbinsx@geocities.jp','employee','enIuJt0'),(35,'Angy','Loisi','782-932-4594','2 Briar Crest Pass','aloisiy@nbcnews.com','employee','h3aqAMh'),(36,'Darrin','O\'Lenechan','344-678-8926','124 Packers Trail','dolenechanz@mac.com','customer','5xrDzuwuQQ'),(37,'Gratiana','Abazi','163-418-2862','67 Ramsey Trail','gabazi10@usnews.com','employee','n6NoPcjiHYU'),(38,'Rhodie','Gowar','426-624-9556','3 Harper Terrace','rgowar11@army.mil','employee','csuD3pZxvxuI'),(39,'Tisha','Goozee','510-418-6678','04 Cardinal Junction','tgoozee12@topsy.com','customer','G30IYYE6Y'),(40,'Blondie','Tunnicliffe','418-969-9963','0 Sundown Avenue','btunnicliffe13@vinaora.com','customer','ZpeSb3x'),(41,'Courtenay','Grugerr','790-164-5171','4734 Gina Place','cgrugerr14@goo.gl','customer','MPzNkGTqv'),(42,'Olvan','Kielty','500-509-6540','8749 Del Sol Park','okielty15@topsy.com','employee','8JMOA2Lk'),(43,'Bridgette','Cruickshanks','352-100-0779','504 Onsgard Hill','bcruickshanks16@lulu.com','customer','NmkZ2l8lwnl'),(44,'Allison','Fairebrother','393-933-6746','78747 Mesta Road','afairebrother17@berkeley.edu','employee','r8hfCuHmu'),(45,'Alessandra','Liebrecht','761-905-3269','94 Stone Corner Way','aliebrecht18@meetup.com','employee','7rTQeJDN'),(46,'Idette','Duchant','360-986-3761','80049 Rowland Court','iduchant19@weibo.com','employee','cti6PfYVu0f'),(47,'Timotheus','Drowsfield','778-110-5167','17715 Merrick Crossing','tdrowsfield1a@techcrunch.com','customer','7rcqd4su'),(48,'Lou','Itscovitz','805-864-2430','1209 Lakewood Drive','litscovitz1b@biglobe.ne.jp','customer','TCTjRAkuh'),(49,'Galina','Killwick','621-409-7117','1 Macpherson Trail','gkillwick1c@github.com','customer','FmP489'),(50,'Audrye','Caffery','551-571-3130','346 Norway Maple Crossing','acaffery1d@360.cn','customer','IoHzVr'),(51,'Abe','Habbema','153-924-7114','498 Independence Way','ahabbema1e@tmall.com','employee','OMxJ4jp4UEa'),(52,'Nataline','Josephson','693-547-9335','179 Oakridge Way','njosephson1f@jimdo.com','employee','e8213btBB'),(53,'Lockwood','Lowne','122-593-8175','9 Killdeer Point','llowne1g@amazon.co.jp','customer','ueRLObat'),(54,'Joline','Cleveland','470-209-0999','59 Grasskamp Court','jcleveland1h@house.gov','employee','D2AmCEWHr'),(55,'Rosetta','Reckhouse','668-169-2071','6 Havey Center','rreckhouse1i@nps.gov','customer','klPsVw7fG'),(56,'Bart','Stigger','371-278-0973','0090 Union Street','bstigger1j@newsvine.com','employee','8uw8wpubESPR'),(57,'Sephira','Jalland','780-648-7291','6102 Twin Pines Plaza','sjalland1k@artisteer.com','customer','iK8J7q'),(58,'Dale','La Croce','465-208-5928','90 Loeprich Parkway','dlacroce1l@guardian.co.uk','employee','lsqqg1CS'),(59,'Ella','Rappa','734-212-7357','7374 Porter Way','erappa1m@vistaprint.com','customer','YUbwhF4tn94'),(60,'Bail','Kramer','785-823-0606','66901 Jana Place','bkramer1n@va.gov','employee','lRATOKmwsM'),(61,'Burton','Buggs','885-461-4209','79 Browning Point','bbuggs1o@loc.gov','customer','PGDx4myBcoVP'),(62,'Cyndi','Callendar','522-720-6793','8570 Kings Hill','ccallendar1p@t.co','customer','cb1mHsM'),(63,'Tobey','Gosnay','106-392-3815','50 Lunder Circle','tgosnay1q@tripadvisor.com','employee','e1gIRW58FndF'),(64,'Becki','De la Perrelle','830-253-3986','2 Mayer Junction','bdelaperrelle1r@shareasale.com','customer','NXQFhd0Y6lYP'),(65,'Tim','Killerby','568-405-7912','54848 Ilene Pass','tkillerby1s@oakley.com','customer','CpbPagi'),(66,'Lucille','Coners','317-150-1719','40237 Corben Parkway','lconers1t@discuz.net','customer','aAoHlOftq'),(67,'Gardener','Gurney','606-494-1053','32 East Parkway','ggurney1u@elpais.com','employee','8I0Yv5'),(68,'Theo','Chipchase','892-192-5189','2 Pearson Center','tchipchase1v@gov.uk','employee','02XHXWFoG7'),(69,'Merrill','Coupar','751-562-2144','1 Washington Circle','mcoupar1w@jimdo.com','customer','aLdMcxTjSR'),(70,'Cilka','Benditt','208-778-0815','044 Chive Way','cbenditt1x@utexas.edu','employee','Wl3vWg'),(71,'Ted','Sherreard','449-861-2921','67339 Brickson Park Court','tsherreard1y@wikimedia.org','customer','vYweerYhm3'),(72,'Lizette','Babar','241-319-6273','0052 Iowa Road','lbabar1z@soundcloud.com','employee','04Wz0DFnYjH'),(73,'Lonnard','Althrop','504-331-0314','24 Northwestern Crossing','lalthrop20@yolasite.com','employee','wzHbX7xN5vi0'),(74,'Sosanna','Rosterne','575-270-7907','837 Vermont Place','srosterne21@twitter.com','customer','gpBm5Nvkm'),(75,'Genevra','Gounel','371-808-8317','50494 Holy Cross Lane','ggounel22@people.com.cn','employee','j0VD59UcKDr'),(76,'Anthiathia','Biswell','102-803-4134','11140 Almo Pass','abiswell23@digg.com','employee','EZ2LsHjP'),(77,'Bevin','Vassar','930-230-7453','7459 Melody Trail','bvassar24@toplist.cz','employee','S69acCG'),(78,'Marianne','Feaster','597-829-1704','32 Raven Avenue','mfeaster25@taobao.com','customer','iKWHioXY'),(79,'Leon','Pollendine','960-694-0414','80072 Rutledge Lane','lpollendine26@virginia.edu','employee','1t6AQf'),(80,'Ravid','Neachell','712-997-6123','48093 Express Pass','rneachell27@businesswire.com','customer','d3JhPuJJdja'),(81,'Minna','Iacopini','718-220-0703','82750 Mosinee Trail','miacopini28@oakley.com','employee','HHR1sVQMKRrd'),(82,'Jud','Kevane','729-454-0435','267 Bay Circle','jkevane29@bing.com','employee','EnvuK39bkS7'),(83,'Goldi','Magnar','684-237-0846','901 Larry Crossing','gmagnar2a@cnbc.com','employee','jl3y19sV0i'),(84,'Aluino','Lambis','773-147-6264','305 Veith Trail','alambis2b@stumbleupon.com','customer','WBR1xTV0XFyz'),(85,'Jayson','Kettlestringes','704-875-7051','33 Granby Plaza','jkettlestringes2c@so-net.ne.jp','customer','fBMb3Zlir'),(86,'Victoir','Bullier','270-788-5826','6 Nevada Pass','vbullier2d@jalbum.net','employee','h1EsyiaP'),(87,'Glenden','Jansik','233-410-9403','5838 Comanche Court','gjansik2e@comsenz.com','employee','1NHI893492e'),(88,'Garvy','Elt','790-990-3783','4522 7th Crossing','gelt2f@geocities.jp','employee','9QwpGZBPCa'),(89,'Mortimer','Keith','528-617-7784','16817 Almo Park','mkeith2g@netlog.com','employee','fSjxGYht'),(90,'Cissy','Daice','457-123-1575','95 Jenna Drive','cdaice2h@is.gd','customer','w7qVX0'),(91,'Dosi','Pauling','253-421-2657','2574 Mifflin Avenue','dpauling2i@dailymotion.com','customer','VJlV88B'),(92,'Taryn','Bindin','222-790-1089','0 Oxford Trail','tbindin2j@cocolog-nifty.com','employee','SRtzaWkgA0U'),(93,'Sydel','De Francisci','210-422-1758','26 Debs Way','sdefrancisci2k@usda.gov','employee','s7RFST00SJ'),(94,'Immanuel','Rizziello','778-526-2565','42289 Bellgrove Terrace','irizziello2l@bloglines.com','customer','iAkotGVpP2U'),(95,'Robin','Spradbery','512-748-2990','157 Meadow Valley Road','rspradbery2m@booking.com','employee','l5E0kWILa'),(96,'Sherrie','Howel','704-782-9922','2 Sullivan Way','showel2n@independent.co.uk','employee','d7tjIcb7R'),(97,'Pattin','Droogan','771-216-2652','42 Reindahl Court','pdroogan2o@chronoengine.com','customer','G1NoLDsQpq'),(98,'Shawnee','Hellyar','808-578-9610','0 Springview Hill','shellyar2p@liveinternet.ru','employee','fZCERu'),(99,'Anstice','Good','476-139-5446','70 Logan Trail','agood2q@issuu.com','employee','G2vwRt'),(100,'Dot','Finlan','463-186-9794','414 Carberry Alley','dfinlan2r@comcast.net','customer','OHTAbVp');
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

-- Dump completed on 2022-12-29 10:53:23
