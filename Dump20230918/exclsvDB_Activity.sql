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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-18 20:44:32
