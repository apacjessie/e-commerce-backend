CREATE DATABASE  IF NOT EXISTS `exclsvDB` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `exclsvDB`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: exclsvDB
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.22.04.2

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
-- Table structure for table `Activity`
--

DROP TABLE IF EXISTS `Activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Activity` (
  `activity_id` int NOT NULL,
  `activity_message` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Activity`
--

LOCK TABLES `Activity` WRITE;
/*!40000 ALTER TABLE `Activity` DISABLE KEYS */;
INSERT INTO `Activity` VALUES (15949,'Admin modify a product with an id of 1','2023-05-26 19:59:17'),(21933,'Admin add a product with an id of 531493','2023-06-21 21:34:17'),(22383,'Admin update the stock of product with an id of 356786','2023-05-26 23:23:37'),(23025,'Admin update the stock of product with an id of 1','2023-05-25 17:00:30'),(28279,'Admin delete a product with an id of 821148','2023-06-24 16:44:09'),(32560,'Admin add a product with an id of 747258','2023-05-27 17:50:21'),(32682,'Admin add a product with an id of 356786','2023-05-26 23:22:53'),(37646,'Admin update the stock of product with an id of 747258','2023-05-27 17:53:04'),(40520,'Admin update the stock of product with an id of 821148','2023-06-24 16:43:43'),(42078,'Admin add a product with an id of 104478','2023-05-27 15:07:44'),(42391,'Admin delete a product with an id of 572875','2023-06-23 23:04:30'),(57351,'Admin update the stock of product with an id of 1','2023-05-25 00:07:24'),(63764,'Admin update the stock of product with an id of 1','2023-05-26 20:01:54'),(65035,'Admin modify a product with an id of 821148','2023-06-24 16:30:19'),(68638,'Admin modify a product with an id of 747258','2023-05-27 17:52:14'),(78549,'Admin add a product with an id of 825263','2023-05-26 20:00:05'),(80256,'Admin delete a product with an id of 531493','2023-06-21 21:37:33'),(82516,'Admin add a product with an id of 821148','2023-06-24 16:28:53'),(83112,'Admin modify a product with an id of 1','2023-05-26 19:59:39'),(83894,'Admin update the stock of product with an id of 836989','2023-05-25 20:25:31'),(84029,'Admin modify a product with an id of 356786','2023-05-26 23:24:39'),(93043,'Admin add a product with an id of 572875','2023-06-23 23:02:36');
/*!40000 ALTER TABLE `Activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Address`
--

DROP TABLE IF EXISTS `Address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Address` (
  `address_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `address_name` varchar(255) DEFAULT NULL,
  `address_value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`address_id`),
  KEY `user_id_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Address`
--

LOCK TABLES `Address` WRITE;
/*!40000 ALTER TABLE `Address` DISABLE KEYS */;
INSERT INTO `Address` VALUES (483577,798638,'home address','Blk 11 Lot 23 Dreamland Heights Barangay United bayanihan, City Of San Pedro Laguna, 4023');
/*!40000 ALTER TABLE `Address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Favorites`
--

DROP TABLE IF EXISTS `Favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Favorites` (
  `favorite_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`favorite_id`),
  KEY `product_id_idx` (`product_id`),
  KEY `user_id_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Favorites`
--

LOCK TABLES `Favorites` WRITE;
/*!40000 ALTER TABLE `Favorites` DISABLE KEYS */;
INSERT INTO `Favorites` VALUES (25878,798638,7),(68597,798638,56),(86693,798638,8);
/*!40000 ALTER TABLE `Favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Order_items`
--

DROP TABLE IF EXISTS `Order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Order_items` (
  `item_id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `item_qty` int DEFAULT NULL,
  `item_price` decimal(10,0) DEFAULT NULL,
  `item_size` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`item_id`),
  KEY `product_id_idx` (`product_id`),
  KEY `order_id_idx` (`order_id`),
  CONSTRAINT `order_id` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`order_id`),
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `Products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Order_items`
--

LOCK TABLES `Order_items` WRITE;
/*!40000 ALTER TABLE `Order_items` DISABLE KEYS */;
INSERT INTO `Order_items` VALUES (4115089,1320804,20,1,120,'large','2023-06-24 08:21:00','2023-06-24 08:21:00'),(7484627,1803669,56,1,250,'small','2023-06-23 08:16:04','2023-06-23 08:16:04'),(9326251,1890605,56,1,250,'small','2023-06-24 08:48:56','2023-06-24 08:48:56');
/*!40000 ALTER TABLE `Order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Orders` (
  `order_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `tracking_id` int DEFAULT NULL,
  `order_total` decimal(10,0) DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `order_status` varchar(45) DEFAULT NULL,
  `shipping_address` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
INSERT INTO `Orders` VALUES (1320804,625865,51143687,120,'2023-06-24 08:21:00','pending','Blk 11 Lot 23 Dreamland Heights Barangay United bayanihan, City Of San Pedro Laguna, 4023','2023-06-24 08:21:00','2023-06-24 08:21:00'),(1803669,101975,90219019,250,'2023-06-23 08:16:04','pending','Blk 11 Lot 23 Dreamland Heights Barangay United Bayanihan, City Of San Pedro Laguna, 4023','2023-06-23 08:16:04','2023-06-23 08:16:04'),(1890605,948460,71572992,250,'2023-06-24 08:48:56','pending','asdasd Barangay asdasd, City Of Biñan Laguna, 423','2023-06-24 08:48:56','2023-06-24 08:48:56');
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Products`
--

DROP TABLE IF EXISTS `Products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `product_category` varchar(255) NOT NULL,
  `product_gender` varchar(255) NOT NULL,
  `product_image` varchar(255) NOT NULL,
  `product_price` decimal(10,2) NOT NULL,
  `product_rate` decimal(2,1) NOT NULL,
  `product_rate_count` int DEFAULT '0',
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=836990 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Products`
--

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` VALUES (1,'EXCLSV White T-shirt','tshirts','men','http://localhost:3000/images/products/men/tshirts/1.png',59.99,0.5,1),(2,'EXCLSV Black Long sleeves T-shirt','tshirts','men','http://localhost:3000/images/products/men/tshirts/2.png',70.00,0.0,0),(3,'EXCLSV Grey T-shirt','tshirts','men','http://localhost:3000/images/products/men/tshirts/3.png',50.00,0.0,0),(4,'Long sleeves Baseball T-shirt','tshirts','men','http://localhost:3000/images/products/men/tshirts/4.png',80.00,0.0,0),(5,'White tight fit premium T-shirt','tshirts','men','http://localhost:3000/images/products/men/tshirts/5.png',75.00,0.0,0),(6,'EXCLSV Yellow T-shirt','tshirts','men','http://localhost:3000/images/products/men/tshirts/6.png',45.00,0.0,0),(7,'EXCLSV Red Polo-shirt','tshirts','men','http://localhost:3000/images/products/men/tshirts/7.png',100.00,4.0,1),(8,'EXCLSV Black Om logo T-shirt','tshirts','men','http://localhost:3000/images/products/men/tshirts/8.png',60.00,0.0,0),(9,'EXCLSV Red T-shirt','tshirts','men','http://localhost:3000/images/products/men/tshirts/9.png',55.00,0.0,0),(10,'EXCLSV Blue premium T-shirt','tshirts','men','http://localhost:3000/images/products/men/tshirts/10.png',59.99,0.0,0),(11,'EXCLSV White Polo-shirt','tshirts','men','http://localhost:3000/images/products/men/tshirts/11.png',100.00,0.0,0),(12,'EXCLSV Yellow T-shirt','tshirts','men','http://localhost:3000/images/products/men/tshirts/12.png',50.00,0.0,0),(13,'White Short-sleeves Shirt','shirts','men','http://localhost:3000/images/products/men/shirts/0.png',125.00,5.0,1),(14,'Light blue Logn-sleeves Shirt','shirts','men','http://localhost:3000/images/products/men/shirts/1.png',125.00,0.0,0),(15,'Light grey Long-sleeves Shirt','shirts','men','http://localhost:3000/images/products/men/shirts/2.png',130.00,0.0,0),(16,'Light blue Long-sleeves checkered Shirt','shirts','men','http://localhost:3000/images/products/men/shirts/3.png',125.00,0.0,0),(17,'Red and Blue Short-sleeves checkered Shirt','shirts','men','http://localhost:3000/images/products/men/shirts/4.png',120.00,0.0,0),(18,'White Long-sleeves Shirt','shirts','men','http://localhost:3000/images/products/men/shirts/5.png',150.00,0.0,0),(19,'Crimson Short-sleeves Shirt','shirts','men','http://localhost:3000/images/products/men/shirts/6.png',130.00,0.0,0),(20,'Orange and blue Long-sleeves Shirt','shirts','men','http://localhost:3000/images/products/men/shirts/7.png',120.00,0.0,0),(21,'Dark slate blue Long-sleeves Shirt','shirts','men','http://localhost:3000/images/products/men/shirts/8.png',200.00,0.0,0),(22,'Light grey Sweater','sweaters','men','http://localhost:3000/images/products/men/sweaters/0.png',125.00,0.0,0),(23,'Black Sweater','sweaters','men','http://localhost:3000/images/products/men/sweaters/1.png',125.00,0.0,0),(24,'Blue Sweater','sweaters','men','http://localhost:3000/images/products/men/sweaters/2.png',125.00,0.0,0),(25,'Red Sweater','sweaters','men','http://localhost:3000/images/products/men/sweaters/3.png',150.00,0.0,0),(26,'Black Logo Sweater','sweaters','men','http://localhost:3000/images/products/men/sweaters/4.png',160.00,0.0,0),(27,'Black and White Sweater','sweaters','men','http://localhost:3000/images/products/men/sweaters/5.png',150.00,0.0,0),(28,'Red and Grey Sweater','sweaters','men','http://localhost:3000/images/products/men/sweaters/6.png',125.00,0.0,0),(29,'Grey South85 Hoodie','sweaters','men','http://localhost:3000/images/products/men/sweaters/7.png',130.00,0.0,0),(30,'Black and White striped Sweater','sweaters','men','http://localhost:3000/images/products/men/sweaters/8.png',130.00,0.0,0),(31,'Yellow Sweater','sweaters','men','http://localhost:3000/images/products/men/sweaters/9.png',140.00,0.0,0),(32,'Grey Hoodie','sweaters','men','http://localhost:3000/images/products/men/sweaters/10.png',135.00,0.0,0),(33,'Leather Jacket','jackets','men','http://localhost:3000/images/products/men/jackets/0.png',850.00,0.0,0),(34,'Green Hood Parka','jackets','men','http://localhost:3000/images/products/men/jackets/1.png',2000.00,0.0,0),(35,'Blue Jeans Jacket','jackets','men','http://localhost:3000/images/products/men/jackets/2.png',700.00,0.0,0),(36,'Yellow Puffer Jacket','jackets','men','http://localhost:3000/images/products/men/jackets/3.png',800.00,0.0,0),(37,'Black Jeans Jacket','jackets','men','http://localhost:3000/images/products/men/jackets/4.png',600.00,0.0,0),(38,'Green Parka','jackets','men','http://localhost:3000/images/products/men/jackets/5.png',1500.00,0.0,0),(39,'Multi-color Puffer Jacket','jackets','men','http://localhost:3000/images/products/men/jackets/6.png',1500.00,0.0,0),(40,'Blue Puffer Jacket','jackets','men','http://localhost:3000/images/products/men/jackets/7.png',900.00,0.0,0),(41,'Red Windbreaker','jackets','men','http://localhost:3000/images/products/men/jackets/8.png',2000.00,0.0,0),(42,'Black Puffer Jacket','jackets','men','http://localhost:3000/images/products/men/jackets/9.png',1000.00,0.0,0),(43,'Light Blue Sports Jacket','jackets','men','http://localhost:3000/images/products/men/jackets/10.png',1000.00,0.0,0),(44,'Grey Coat','jackets','men','http://localhost:3000/images/products/men/jackets/11.png',1500.00,0.0,0),(45,'Blue and Red summer Top','tshirts','women','http://localhost:3000/images/products/women/tshirts/0.png',90.00,0.0,0),(46,'Grey Baseball T-shirt','tshirts','women','http://localhost:3000/images/products/women/tshirts/1.png',50.00,0.0,0),(47,'Rocket logo Blue T-shirt','tshirts','women','http://localhost:3000/images/products/women/tshirts/2.png',25.00,0.0,0),(48,'Red Crop-Top','tshirts','women','http://localhost:3000/images/products/women/tshirts/3.png',65.00,0.0,0),(49,'EXCLSV Red V-neck T-shirt','tshirts','women','http://localhost:3000/images/products/women/tshirts/4.png',60.00,0.0,0),(50,'EXCLSV White V-neck T-shirt','tshirts','women','http://localhost:3000/images/products/women/tshirts/5.png',60.00,0.0,0),(51,'Green loose-fitting Shirt','tshirts','women','http://localhost:3000/images/products/women/tshirts/6.png',75.00,0.0,0),(52,'EXCLSV Red Crop-Top','tshirts','women','http://localhost:3000/images/products/women/tshirts/7.png',65.00,0.0,0),(53,'Pink Off Shoulder Crop-Top','tshirts','women','http://localhost:3000/images/products/women/tshirts/8.png',65.00,0.0,0),(54,'Purple Sport T-shirt','tshirts','women','http://localhost:3000/images/products/women/tshirts/9.png',60.00,0.0,0),(55,'Yellow and Pink Mid Dress','dress','women','http://localhost:3000/images/products/women/dresses/0.png',300.00,0.0,0),(56,'Pink Dress','dress','women','http://localhost:3000/images/products/women/dresses/1.png',250.00,4.5,1),(57,'Yellow Long Dress','dress','women','http://localhost:3000/images/products/women/dresses/2.png',350.00,0.0,0),(58,'Red Long Dress','dress','women','http://localhost:3000/images/products/women/dresses/3.png',500.00,5.0,1),(59,'Red Short Dress','dress','women','http://localhost:3000/images/products/women/dresses/4.png',235.00,0.0,0),(60,'Red Medium Dress','dress','women','http://localhost:3000/images/products/women/dresses/5.png',270.00,0.0,0),(61,'Yellow Sweater','sweaters','women','http://localhost:3000/images/products/women/sweaters/0.png',150.00,0.0,0),(62,'Orange Zip-up Hoodie','sweaters','women','http://localhost:3000/images/products/women/sweaters/1.png',180.00,0.0,0),(63,'Black Loose Sweater','sweaters','women','http://localhost:3000/images/products/women/sweaters/2.png',160.00,0.0,0),(64,'Red Knit Sweater','sweaters','women','http://localhost:3000/images/products/women/sweaters/3.png',165.00,0.0,0),(65,'Grey Short Turtle-neck Sweater','sweaters','women','http://localhost:3000/images/products/women/sweaters/4.png',180.00,0.0,0),(66,'Beige Long Turtle-neck Sweater','sweaters','women','http://localhost:3000/images/products/women/sweaters/5.png',170.00,0.0,0),(67,'Brown Hoodie','sweaters','women','http://localhost:3000/images/products/women/sweaters/6.png',180.00,0.0,0),(68,'Red Hoodie','sweaters','women','http://localhost:3000/images/products/women/sweaters/7.png',250.00,0.0,0),(69,'Black Flower print Sweater','sweaters','women','http://localhost:3000/images/products/women/sweaters/8.png',155.00,0.0,0),(70,'Orange Sports Jacket','jackets','women','http://localhost:3000/images/products/women/jackets/0.png',1500.00,0.0,0),(71,'Blue Coat','jackets','women','http://localhost:3000/images/products/women/jackets/1.png',3500.00,0.0,0),(72,'Beige Coat','jackets','women','http://localhost:3000/images/products/women/jackets/2.png',2000.00,0.0,0),(73,'Light Blue Jeans Jacket','jackets','women','http://localhost:3000/images/products/women/jackets/3.png',350.00,0.0,0),(74,'Red Coat','jackets','women','http://localhost:3000/images/products/women/jackets/4.png',3000.00,0.0,0),(75,'White Windbreaker','jackets','women','http://localhost:3000/images/products/women/jackets/5.png',2500.00,0.0,0),(76,'Light Orange Puffer Jacket','jackets','women','http://localhost:3000/images/products/women/jackets/6.png',2650.00,0.0,0),(77,'Yellow Coat','jackets','women','http://localhost:3000/images/products/women/jackets/7.png',1000.00,0.0,0),(78,'Black Parka','jackets','women','http://localhost:3000/images/products/women/jackets/8.png',1500.00,0.0,0),(79,'White Hood Parka','jackets','women','http://localhost:3000/images/products/women/jackets/9.png',1800.00,0.0,0),(80,'Green Fluffy Parka','jackets','women','http://localhost:3000/images/products/women/jackets/10.png',500.00,0.0,0);
/*!40000 ALTER TABLE `Products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reviews`
--

DROP TABLE IF EXISTS `Reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reviews` (
  `review_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `review_text` varchar(225) DEFAULT NULL,
  `review_rating` decimal(2,1) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reviews`
--

LOCK TABLES `Reviews` WRITE;
/*!40000 ALTER TABLE `Reviews` DISABLE KEYS */;
INSERT INTO `Reviews` VALUES (364587,798638,56,'asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd',4.5,'2023-05-27 17:43:47'),(377568,798638,7,'I recently purchased this product, and I must say, it\'s become one of my favorite wardrobe staples. The combination of the vibrant red color and the sleek black lining adds a touch of sophistication to this classic piece.',4.0,'2023-05-19 17:45:23'),(778055,798638,1,'I hate this product. I do not recommend this product to anyone. I rate it 0 if it\'s possible so here\'s the 0.5 instead.',0.5,'2023-05-20 00:36:05'),(940326,798638,58,'Ayo love this dress so much so that he wanted to buy more. ',5.0,'2023-05-20 10:26:07');
/*!40000 ALTER TABLE `Reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Stocks`
--

DROP TABLE IF EXISTS `Stocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Stocks` (
  `stock_id` int NOT NULL,
  `product_id` int NOT NULL,
  `stock_small` int DEFAULT '0',
  `stock_medium` int DEFAULT '0',
  `stock_large` int DEFAULT '0',
  `stock_xl` int DEFAULT '0',
  PRIMARY KEY (`stock_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Stocks`
--

LOCK TABLES `Stocks` WRITE;
/*!40000 ALTER TABLE `Stocks` DISABLE KEYS */;
INSERT INTO `Stocks` VALUES (10087,56,4,10,10,10),(10972,20,8,10,10,10),(11314,68,10,10,10,10),(11498,54,10,10,10,10),(11842,2,10,10,10,10),(12005,13,10,10,10,10),(12818,36,8,10,10,10),(13437,76,10,10,10,10),(13693,49,10,10,10,10),(15791,55,9,10,10,10),(17015,4,10,10,10,10),(17039,33,10,10,10,10),(19411,40,10,10,10,10),(19745,52,10,10,10,10),(21284,64,10,10,10,10),(22385,79,10,10,10,10),(23204,75,10,10,10,10),(23984,70,10,10,10,10),(25211,26,10,10,10,10),(25946,19,10,10,10,10),(26057,42,10,10,10,10),(29044,35,10,10,10,10),(29974,58,9,10,10,10),(31379,74,10,10,10,10),(35767,46,10,10,10,10),(35970,27,10,10,10,10),(37746,32,10,10,10,10),(37920,38,10,10,10,10),(39429,34,10,10,10,10),(40233,59,10,10,10,10),(41186,66,10,10,10,10),(41765,65,10,10,10,10),(42215,41,10,10,10,10),(42685,3,10,10,10,10),(44019,7,10,10,10,10),(46469,61,10,10,10,10),(46810,29,10,10,10,10),(50414,44,10,10,10,10),(51466,39,10,10,10,10),(52004,8,10,10,10,10),(52237,5,10,10,10,10),(52852,80,10,10,10,10),(53273,15,10,10,10,10),(53692,51,10,10,10,10),(58700,10,10,10,10,10),(58917,72,10,10,10,10),(63263,48,10,10,10,10),(63533,45,10,10,10,10),(64138,22,10,10,10,10),(64233,11,10,10,10,10),(64476,71,10,10,10,10),(64556,50,10,10,10,10),(64836,12,10,10,10,10),(66032,25,10,10,10,10),(66262,28,10,10,10,10),(68624,47,10,10,10,10),(68878,73,10,10,10,10),(71456,78,10,10,10,10),(72376,16,10,10,10,10),(72856,67,10,10,10,10),(73554,69,10,10,10,10),(75119,43,10,10,10,10),(75488,31,10,10,10,10),(76745,23,10,10,10,10),(79625,37,10,10,10,10),(83145,57,10,10,10,10),(86033,30,10,10,10,10),(86349,1,10,10,10,10),(87162,24,10,10,10,10),(87788,77,10,10,10,10),(88014,14,10,10,10,10),(88543,17,10,10,10,10),(90721,21,10,10,10,10),(91788,53,10,10,10,10),(92487,63,10,10,10,10),(93982,18,10,10,10,10),(95942,9,10,10,10,10),(96873,62,10,10,10,10),(97507,6,10,10,10,10),(99248,60,10,10,10,10);
/*!40000 ALTER TABLE `Stocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_fullname` varchar(255) NOT NULL,
  `user_email` varchar(45) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_address` varchar(255) NOT NULL,
  `user_mobile` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=948461 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (101975,'APAC, JESSIE V','apacjessie@gmail.com','$2b$10$F4YEXg04VAfyJl1uYDxkCeQidwoxIkQ9pmGY5pDeaokQdEZ/l9TXy','Blk 11 Lot 23 Dreamland Heights Barangay United Bayanihan, City Of San Pedro Laguna, 4023','99976586794','2023-06-23 08:04:59','2023-06-23 08:04:59'),(334469,'APAC, JESSIE V','berna@gmail.com','$2b$10$I3wvtVPHrcOIPMS8SSdTeOe5w/ApmA/WGpif1JR6qj6NMuFA63UjG','National road 106 Barangay Putatan, City Of Muntinlupa Metro Manila, 402','09357534129','2023-06-23 15:00:00','2023-06-23 15:00:00'),(625865,'APAC, JESSIE V','','$2b$10$IBKu.i9uMZ.tl9Oacxd3aO4WRxLH0t9xf5TEOENX9u0gCOVtM5rxK','Blk 11 Lot 23 Dreamland Heights Barangay United bayanihan, City Of San Pedro Laguna, 4023','09357534129','2023-06-24 08:21:00','2023-06-24 08:21:00'),(948460,'ASD, ASD ASD','','$2b$10$REDPVTpEhPF96twoPwUzsu0ss0xchZLuj/cP3l4NR7tmJLnGPGYxO','asdasd Barangay asdasd, City Of Biñan Laguna, 423','12312313','2023-06-24 08:48:56','2023-06-24 08:48:56');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'exclsvDB'
--
/*!50003 DROP PROCEDURE IF EXISTS `Bulk` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Bulk`()
BEGIN
  DECLARE i INT DEFAULT 1;
  
  WHILE i <= 80 DO
    -- Perform your tasks within the loop
    -- For example, print the current value of the counter
    INSERT INTO Stocks (stock_id, product_id, stock_small, stock_medium, stock_large, stock_xl)
    VALUES (FLOOR(RAND() * (99999 - 10000 + 1) + 10000), i, 10, 10, 10, 10);
    
    -- Increment the counter
    SET i = i + 1;
  END WHILE;
  
  -- Close any open result sets to avoid "command out of sync" error
  DEALLOCATE PREPARE STMT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-18 20:43:46
