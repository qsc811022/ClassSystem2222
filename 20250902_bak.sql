CREATE DATABASE  IF NOT EXISTS `classhub1` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `classhub1`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: classhub1
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `classrooms`
--

DROP TABLE IF EXISTS `classrooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classrooms` (
  `classroom_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `capacity` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`classroom_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classrooms`
--

LOCK TABLES `classrooms` WRITE;
/*!40000 ALTER TABLE `classrooms` DISABLE KEYS */;
INSERT INTO `classrooms` VALUES (4,'L305',30,'2025-09-01 11:40:19');
/*!40000 ALTER TABLE `classrooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `course_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `classroom_id` int DEFAULT NULL,
  `instructor_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`course_id`),
  KEY `classroom_id` (`classroom_id`),
  KEY `instructor_id` (`instructor_id`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`classroom_id`) REFERENCES `classrooms` (`classroom_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`instructor_id`) REFERENCES `instructors` (`instructor_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (3,'Node.js2','2025-09-01 01:00:00','2025-09-01 08:30:00',4,3,'2025-09-01 11:57:24'),(4,'Node.js2','2025-09-02 01:00:00','2025-09-02 08:30:00',4,3,'2025-09-01 12:24:08'),(5,'Node.js2','2025-09-03 01:00:00','2025-09-03 04:00:00',4,3,'2025-09-01 12:29:36'),(6,'Vue.js','2025-09-04 01:00:00','2025-09-04 08:30:00',4,4,'2025-09-01 12:33:09'),(7,'Vue.js','2025-09-05 01:00:00','2025-09-05 08:30:00',4,4,'2025-09-01 12:35:42'),(8,'Vue.js','2025-09-06 01:00:00','2025-09-06 08:30:00',4,4,'2025-09-01 12:39:10'),(9,'Vue.js','2025-09-08 01:00:00','2025-09-08 08:30:00',4,4,'2025-09-01 12:39:38'),(10,'網站規劃','2025-09-09 01:00:00','2025-09-09 04:00:00',4,5,'2025-09-01 12:43:29'),(11,'專題製作','2025-09-08 17:30:00','2025-09-09 08:30:00',4,9,'2025-09-01 12:44:14'),(12,'專題製作','2025-09-10 01:00:00','2025-09-10 08:30:00',4,9,'2025-09-01 12:52:43'),(13,'專題製作','2025-09-11 01:00:00','2025-09-11 08:30:00',4,9,'2025-09-01 12:53:54'),(14,'專題製作','2025-09-12 01:00:00','2025-09-12 04:00:00',4,9,'2025-09-01 12:55:01'),(15,'專題發表','2025-09-12 05:30:00','2025-09-12 08:30:00',4,9,'2025-09-01 12:55:46'),(16,'GIT','2025-09-15 01:00:00','2025-09-15 08:30:00',4,10,'2025-09-01 12:56:47'),(17,'Tailwind','2025-09-16 01:00:00','2025-09-16 08:30:00',4,6,'2025-09-01 12:58:34'),(18,'Tailwind','2025-09-17 01:00:00','2025-09-17 04:00:00',4,6,'2025-09-01 12:59:51'),(19,'Lab','2025-09-17 05:30:00','2025-09-17 08:30:00',4,9,'2025-09-01 13:04:11'),(20,'Tailwind','2025-09-18 01:00:00','2025-09-18 08:30:00',4,6,'2025-09-01 13:04:50'),(21,'Tailwind','2025-09-19 01:00:00','2025-09-19 04:00:00',4,6,'2025-09-01 13:05:59'),(22,'Lab','2025-09-19 05:30:00','2025-09-19 08:30:00',4,9,'2025-09-01 13:06:39'),(23,'網站視覺設計','2025-09-20 01:00:00','2025-09-20 08:30:00',4,7,'2025-09-01 13:08:30'),(24,'網站視覺設計','2025-09-22 01:00:00','2025-09-22 08:30:00',4,7,'2025-09-01 13:09:08'),(25,'網站視覺設計','2025-09-23 01:00:00','2025-09-23 08:30:00',4,7,'2025-09-01 13:12:01'),(26,'網站視覺設計','2025-09-24 01:00:00','2025-09-24 08:30:00',4,7,'2025-09-01 13:12:31'),(27,'Lab','2025-09-25 01:00:00','2025-09-25 04:00:00',4,9,'2025-09-01 13:14:14'),(28,'網站視覺-視覺','2025-09-25 05:30:00','2025-09-25 08:30:00',4,6,'2025-09-01 13:23:24'),(29,'React','2025-09-26 01:00:00','2025-09-26 08:30:00',4,8,'2025-09-01 13:24:35'),(30,'React','2025-09-30 01:00:00','2025-09-30 08:30:00',4,8,'2025-09-01 13:26:15'),(31,'React','2025-10-01 01:00:00','2025-10-01 08:30:00',4,8,'2025-09-01 13:27:11'),(32,'Lab','2025-10-02 01:00:00','2025-10-02 04:00:00',4,9,'2025-09-01 13:27:58'),(33,'網站視覺-視覺','2025-10-02 05:30:00','2025-10-02 08:30:00',4,6,'2025-09-01 13:28:55'),(34,'React','2025-10-03 01:00:00','2025-10-03 08:30:00',4,8,'2025-09-01 13:29:59');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructors`
--

DROP TABLE IF EXISTS `instructors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instructors` (
  `instructor_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`instructor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructors`
--

LOCK TABLES `instructors` WRITE;
/*!40000 ALTER TABLE `instructors` DISABLE KEYS */;
INSERT INTO `instructors` VALUES (1,'張老師','newmail@example.com','2025-08-27 12:54:01'),(3,'林新德','shinder.lin@gmail.com','2025-09-01 11:41:01'),(4,'林靜君','','2025-09-01 12:30:13'),(5,'王孝宏','','2025-09-01 12:30:27'),(6,'陳冠竹','','2025-09-01 12:30:43'),(7,'陳思方','','2025-09-01 12:31:17'),(8,'張至寧','','2025-09-01 12:31:35'),(9,'楊斐羽/王偉宸','','2025-09-01 12:31:56'),(10,'葉仲仁','','2025-09-01 12:56:13');
/*!40000 ALTER TABLE `instructors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `google_id` varchar(255) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','student') NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `google_id` (`google_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,'admin',NULL,'hashed_password_here','admin','系統管理員','2025-08-27 12:54:01'),(2,NULL,'student1',NULL,'hashed_password_here','student','小明','2025-08-27 12:54:01'),(3,'112017228324841961894',NULL,'zse811022@gmail.com',NULL,'student','104帳戶-劉敦桐','2025-08-28 11:41:32'),(4,'111257532557399630612',NULL,'qwertyuiop811022@gmail.com',NULL,'admin','LinkedIn帳戶-劉敦桐','2025-08-28 12:42:25'),(5,NULL,NULL,'tedliu@gmail.com','$2b$10$avPYKNoopgs5KnCMCPuscOH8zTiH6VClbzJ5V/.tikHythmumkJuO','student','tedliu','2025-08-31 23:04:22'),(6,NULL,NULL,'t@gmail.com','$2b$10$rwf2WJGJqiYFsWh4WFUske3fhyCsBwY/j0tfJx7SaTZ49e809KCJC','student','t','2025-09-01 09:58:44'),(7,NULL,NULL,'test@example.com','$2b$10$J.x5okLCR7ycgap8mRQk7.bkm4wN4weeoj6y14GPkXc2Tb9.dUdXi','student','測試用戶','2025-09-01 10:58:30'),(8,NULL,NULL,'tt@gmail.com','$2b$10$akQYxEtnC5W44L5wyZ2yhu094yDmzwW.4XyyO1YlCCo2WCRmDrtCG','student','tttt','2025-09-01 11:06:24'),(9,NULL,NULL,'admin@example.com','$2b$10$3dCU/BMSopAJoDl.u6/JCO2HUDpCXBbFHCvqLFW6T79Np19QPFph2','admin','系統管理員','2025-09-01 11:39:08');
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

-- Dump completed on 2025-09-02 20:04:08
