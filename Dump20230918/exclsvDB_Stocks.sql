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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-18 20:44:32
