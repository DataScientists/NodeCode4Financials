-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: nodecode
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `APP_USER`
--

DROP TABLE IF EXISTS `APP_USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `APP_USER` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sso_id` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `state` varchar(30) NOT NULL,
  `user_profile_id` bigint(20) NOT NULL,
  `user_readonly` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `sso_id` (`sso_id`),
  KEY `FK_APP_USER_USER_PROFILE` (`user_profile_id`),
  CONSTRAINT `FK_APP_USER_USER_PROFILE` FOREIGN KEY (`user_profile_id`) REFERENCES `USER_PROFILE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `APP_USER`
--

LOCK TABLES `APP_USER` WRITE;
/*!40000 ALTER TABLE `APP_USER` DISABLE KEYS */;
INSERT INTO `APP_USER` VALUES (1,'admin','$2a$10$DvrQhzYrmVIUa2c8dQtSdOsmiE861DKiJ6VMMy4jDHbwUJXard3L6','admin','admin','int@yahoo.com','Active',1,0),(2,'member1','$2a$10$PJYSVEY3rhYdrGEG0McU4.47xd0ZBr7aiOpiVJw/TnAgVOyIGd73a','member1w','member1','member1@yahoo.com','Active',1,0),(3,'shopowner1','$2a$10$O5uor4vvJZ24YQGaObIy8uLc8c8yRE8qcD0zh7gRYhzTqG1oyyDvC','member2','member2','member2@yahoo.com','Active',1,0),(4,'member3','$2a$10$g3jTTLpLiWo4khl65LtmlO//BeerxUAURxoyNVmUq3JUmn35uFFiG','member3','member3','member3@yahoo.com','Active',1,0),(5,'member4','$2a$10$8LonPyFnEMa97DobtncO9eRDVzcvYdt57HXDpP4.zApksegM48GFm','member4','member4','member4@yahoo.com','Active',1,0),(6,'member5','$2a$10$Pf2zuKyRzw.13B3oJH.g6eoDbH4Zmo0YUCWVTNdDkwpJcSP3yBbsW','member4','member4','member4@yahoo.com','Active',1,0),(7,'client1','$2a$10$3LsrosCgsFgP.6nVeTydsu5Wlyah4IKfHrMFbXuQKeio3CCaoYpbG','Jimmies','','troy.sadkowsky@gmail.com','Active',2,0),(8,'client2','$2a$10$pMX2WlaAWFvKMltwXhgvXOfz5W6t3JQltVAc6aIc.S7Labj/Bf0dG','test','test','troy.sadkowsky@gmail.com','Active',2,0),(9,'w','$2a$10$DbTF8/.c9gkgB3zIqZDNNejETRy8Ay.8IZycI2Ac9Jr1gipB3ueIy','w','w','test@test.com','Active',2,0),(10,'stafff','$2a$10$BShICjRcj0g6NGRt8GAGROYeRZXRPLGkiQAKJ7p6jiEhRhDJ.nH6K','staff','staff','troy.sadkowsky@gmail.com','Active',3,0),(11,'Staff001','$2a$10$REzyjCYVsPAJVSTKOlB26eM78Opwd7ZfDoGgfGXSY/qpiJMI9vWi2','Louise','Sadkowsky','troy.sadkowsky@gmail.com','Active',3,0),(12,'client001','$2a$10$kSs8QcBsZ8hc.r.wr.28Kewnxraez8CT1FfQoqi5.WHPLjJowbEUO','Suncorp','Sadkowsky','troy.sadkowsky@gmail.com','Active',2,0);
/*!40000 ALTER TABLE `APP_USER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AUDIT_LOG`
--

DROP TABLE IF EXISTS `AUDIT_LOG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AUDIT_LOG` (
  `id` bigint(20) NOT NULL,
  `action` varchar(255) DEFAULT NULL,
  `arguments` tinyblob,
  `date` datetime DEFAULT NULL,
  `method` varchar(255) DEFAULT NULL,
  `user_type` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AUDIT_LOG`
--

LOCK TABLES `AUDIT_LOG` WRITE;
/*!40000 ALTER TABLE `AUDIT_LOG` DISABLE KEYS */;
INSERT INTO `AUDIT_LOG` VALUES (0,'Generic',_binary 'arg[1]=[org.springframework.security.authentication.UsernamePasswordAuthenticationToken@1f: Principal: Optional.of(staff001); Credentials: [PROTECTED]; Authenticated: false; Details: null; Not granted any authorities]','2017-05-08 22:54:55','DomainUsernamePasswordAuthenticationProvider-authenticate','','');
/*!40000 ALTER TABLE `AUDIT_LOG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AuditLog`
--

DROP TABLE IF EXISTS `AuditLog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AuditLog` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userName` varchar(1024) NOT NULL,
  `userRole` varchar(1024) DEFAULT NULL,
  `action` varchar(1024) DEFAULT NULL,
  `method` varchar(1024) DEFAULT NULL,
  `arguments` blob,
  `deleted` int(11) DEFAULT NULL,
  `lastUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AuditLog`
--

LOCK TABLES `AuditLog` WRITE;
/*!40000 ALTER TABLE `AuditLog` DISABLE KEYS */;
/*!40000 ALTER TABLE `AuditLog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MAINTENANCE_LOG`
--

DROP TABLE IF EXISTS `MAINTENANCE_LOG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MAINTENANCE_LOG` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `transaction_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` tinyint(1) DEFAULT '0',
  `project` varchar(2048) DEFAULT NULL,
  `travel_time` varchar(2048) DEFAULT NULL,
  `start_time` varchar(2048) DEFAULT NULL,
  `finish_time` varchar(2048) DEFAULT NULL,
  `staff_qty` bigint(20) DEFAULT '0',
  `total_hours` varchar(2048) DEFAULT NULL,
  `staff` varchar(2048) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_USER_DETAILS` (`user_id`),
  CONSTRAINT `FK_USER_DETAILS` FOREIGN KEY (`user_id`) REFERENCES `USER_DETAILS` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MAINTENANCE_LOG`
--

LOCK TABLES `MAINTENANCE_LOG` WRITE;
/*!40000 ALTER TABLE `MAINTENANCE_LOG` DISABLE KEYS */;
INSERT INTO `MAINTENANCE_LOG` VALUES (1,7,'2018-01-04 00:00:00',1,NULL,NULL,NULL,NULL,0,NULL,NULL),(2,7,'2017-04-13 00:00:00',0,NULL,NULL,NULL,NULL,0,NULL,NULL),(3,7,'2017-04-02 00:00:00',0,'123',NULL,'13:00',NULL,3,'15','Shane, Matt and Karly'),(4,7,'2185-01-02 00:00:00',0,'123',NULL,'13:00',NULL,3,'15','Shane, Matt and Karly'),(5,7,'2017-05-04 00:00:00',0,'1234','jjj',NULL,NULL,2,NULL,'staff staff'),(6,7,'2017-05-04 00:00:25',1,'1234','2',NULL,NULL,2,NULL,'staff staff');
/*!40000 ALTER TABLE `MAINTENANCE_LOG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MAINTENANCE_LOG_ACTIVITY`
--

DROP TABLE IF EXISTS `MAINTENANCE_LOG_ACTIVITY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MAINTENANCE_LOG_ACTIVITY` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `maintenance_log_id` bigint(20) NOT NULL,
  `activity_summary` varchar(2048) DEFAULT NULL,
  `last_update_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_MLOG_ACTIVITY_MLOG` (`maintenance_log_id`),
  CONSTRAINT `FK_MLOG_ACTIVITY_MLOG` FOREIGN KEY (`maintenance_log_id`) REFERENCES `MAINTENANCE_LOG` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MAINTENANCE_LOG_ACTIVITY`
--

LOCK TABLES `MAINTENANCE_LOG_ACTIVITY` WRITE;
/*!40000 ALTER TABLE `MAINTENANCE_LOG_ACTIVITY` DISABLE KEYS */;
/*!40000 ALTER TABLE `MAINTENANCE_LOG_ACTIVITY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Node`
--

DROP TABLE IF EXISTS `Node`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Node` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `parentId` bigint(20) DEFAULT NULL,
  `name` varchar(1024) DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `sequence` int(11) NOT NULL,
  `deleted` int(11) DEFAULT NULL,
  `inputValue` varchar(1024) DEFAULT NULL,
  `calculatedValue` varchar(1024) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `region` varchar(1024) DEFAULT NULL,
  `asOfDate` date DEFAULT NULL,
  `period` varchar(45) DEFAULT NULL,
  `lastUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_NodeToParent` (`parentId`),
  CONSTRAINT `FK_NodeToParent` FOREIGN KEY (`parentId`) REFERENCES `Node` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Node`
--

LOCK TABLES `Node` WRITE;
/*!40000 ALTER TABLE `Node` DISABLE KEYS */;
INSERT INTO `Node` VALUES (4,NULL,'BOP','',1,0,NULL,NULL,'Report',NULL,NULL,NULL,'2019-06-14 10:10:18'),(5,4,'Current Account','this is the description of current account',1,0,'-4197938590.94',NULL,'CALC','India','2018-09-30','Quarter','2019-06-14 10:29:57'),(11,4,'Current Account','',1,0,'828557408.54',NULL,'CALC','COTI','2018-09-30','Quarter','2019-06-14 10:31:27'),(12,5,'Credit',NULL,1,0,'12,652,679,398.58',NULL,'CREDIT','India','2018-09-30','Quarter','2019-06-14 10:33:07'),(13,5,'Debit',NULL,2,0,'16,850,617,989.52',NULL,'DEBIT','India','2018-09-30','Quarter','2019-06-14 10:33:07'),(14,11,'Credit',NULL,1,0,'5,124,643,894.08',NULL,'Credit','COTI','2018-09-30','Quarter','2019-06-14 10:35:10'),(15,11,'Debit',NULL,1,0,'4,296,086,485.54',NULL,'DEBIT','COTI','2018-09-30','Quarter','2019-06-14 10:35:10');
/*!40000 ALTER TABLE `Node` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Note`
--

DROP TABLE IF EXISTS `Note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Note` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nodeId` bigint(20) DEFAULT NULL,
  `name` varchar(1024) DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `deleted` int(11) DEFAULT NULL,
  `lastUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_NoteToNode` (`nodeId`),
  CONSTRAINT `FK_NoteToNode` FOREIGN KEY (`nodeId`) REFERENCES `Node` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Note`
--

LOCK TABLES `Note` WRITE;
/*!40000 ALTER TABLE `Note` DISABLE KEYS */;
/*!40000 ALTER TABLE `Note` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Role`
--

DROP TABLE IF EXISTS `Role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(1024) NOT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `deleted` int(11) DEFAULT NULL,
  `lastUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Role`
--

LOCK TABLES `Role` WRITE;
/*!40000 ALTER TABLE `Role` DISABLE KEYS */;
INSERT INTO `Role` VALUES (1,'ADMIN',NULL,NULL,'2019-06-14 06:04:42');
/*!40000 ALTER TABLE `Role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TransactionHistory`
--

DROP TABLE IF EXISTS `TransactionHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TransactionHistory` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fromMemberId` varchar(20) NOT NULL,
  `toMemberId` varchar(2048) NOT NULL,
  `lastUpdated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `amount` double DEFAULT '0',
  `status` varchar(256) DEFAULT NULL,
  `type` varchar(256) DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TransactionHistory`
--

LOCK TABLES `TransactionHistory` WRITE;
/*!40000 ALTER TABLE `TransactionHistory` DISABLE KEYS */;
INSERT INTO `TransactionHistory` VALUES (1,'2','3','2017-03-07 09:04:28',1000,'pending','normal','',0),(2,'1','2','2017-03-07 10:14:31',950,'confirmed','normal','',0),(6,'2','3',NULL,12,'pending','normal',NULL,0),(7,'3','1','2017-03-07 10:17:06',10000,'confirmed','normal',NULL,0),(8,'2','3',NULL,12,'pending','normal',NULL,0),(9,'2','3',NULL,100,'pending','normal',NULL,0),(10,'2','3',NULL,200,'pending','normal',NULL,0);
/*!40000 ALTER TABLE `TransactionHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER_DETAILS`
--

DROP TABLE IF EXISTS `USER_DETAILS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USER_DETAILS` (
  `id` bigint(20) NOT NULL,
  `address` varchar(2048) DEFAULT NULL,
  `client_id` varchar(2048) DEFAULT NULL,
  `balance` double DEFAULT '0',
  `last_updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER_DETAILS`
--

LOCK TABLES `USER_DETAILS` WRITE;
/*!40000 ALTER TABLE `USER_DETAILS` DISABLE KEYS */;
INSERT INTO `USER_DETAILS` VALUES (7,'28 Railway Pde',NULL,0,'2017-05-08 22:54:37'),(8,'28 Railway Pde',NULL,0,NULL),(9,'w',NULL,0,'2017-05-08 22:54:37'),(10,'28 Railway Pde',NULL,0,'2017-05-08 22:54:37'),(11,'28 Railway Pde',NULL,0,NULL),(12,'28 Railway Pde',NULL,0,NULL);
/*!40000 ALTER TABLE `USER_DETAILS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER_PROFILE`
--

DROP TABLE IF EXISTS `USER_PROFILE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USER_PROFILE` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `type` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER_PROFILE`
--

LOCK TABLES `USER_PROFILE` WRITE;
/*!40000 ALTER TABLE `USER_PROFILE` DISABLE KEYS */;
INSERT INTO `USER_PROFILE` VALUES (1,'ADMIN'),(2,'CLIENT'),(3,'STAFF');
/*!40000 ALTER TABLE `USER_PROFILE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userName` varchar(1024) NOT NULL,
  `password` varchar(1024) NOT NULL,
  `firstName` varchar(1024) NOT NULL,
  `lastName` varchar(1024) NOT NULL,
  `email` varchar(1024) NOT NULL,
  `state` varchar(1024) NOT NULL,
  `deleted` int(11) DEFAULT NULL,
  `lastUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userName` (`userName`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'admin','$2a$10$A3xIwkcNXV27bS2h1Ha7/uxLbvMLLk74k1JrkhhmZmD92P1O0Idz2','admin','P@ssw0rd','some@email.com','Active',NULL,'2019-06-14 06:04:42');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_Role`
--

DROP TABLE IF EXISTS `User_Role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User_Role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `users_id` bigint(20) NOT NULL,
  `roles_id` bigint(20) NOT NULL,
  `deleted` int(11) DEFAULT NULL,
  `lastUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Role`
--

LOCK TABLES `User_Role` WRITE;
/*!40000 ALTER TABLE `User_Role` DISABLE KEYS */;
INSERT INTO `User_Role` VALUES (1,1,1,NULL,'2019-06-14 06:04:42');
/*!40000 ALTER TABLE `User_Role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-14 20:35:41
