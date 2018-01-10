/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : elesystem

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-01-10 11:37:02
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin_login
-- ----------------------------
DROP TABLE IF EXISTS `admin_login`;
CREATE TABLE `admin_login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `loginname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_login
-- ----------------------------
INSERT INTO `admin_login` VALUES ('1', '12345', '123');

-- ----------------------------
-- Table structure for dataadmin_login
-- ----------------------------
DROP TABLE IF EXISTS `dataadmin_login`;
CREATE TABLE `dataadmin_login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `loginname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dataadmin_login
-- ----------------------------
INSERT INTO `dataadmin_login` VALUES ('1', '123', '123');

-- ----------------------------
-- Table structure for ele_gonggao
-- ----------------------------
DROP TABLE IF EXISTS `ele_gonggao`;
CREATE TABLE `ele_gonggao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ele_gonggao
-- ----------------------------
INSERT INTO `ele_gonggao` VALUES ('1', '10月1日停水', '具体通知', '2018-01-02 16:52:37');
INSERT INTO `ele_gonggao` VALUES ('2', '1月1日放假', '1月1日放假啊', '2017-12-05 16:52:45');

-- ----------------------------
-- Table structure for ele_gzbx
-- ----------------------------
DROP TABLE IF EXISTS `ele_gzbx`;
CREATE TABLE `ele_gzbx` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `date` varchar(10) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `progress` varchar(255) DEFAULT NULL,
  `updatetime` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ele_gzbx
-- ----------------------------
INSERT INTO `ele_gzbx` VALUES ('1', 'yjj', 'home', '故障', '2017-12-12', '水龙头坏了', '处理中', '2017-12-28 17:48:02');
INSERT INTO `ele_gzbx` VALUES ('3', 'yjj', '1', '故障', '2017-01-01', '水龙头坏了', '已完成', '2017-12-28 17:48:03');
INSERT INTO `ele_gzbx` VALUES ('4', 'yjj', '1', '故障', '2017-11-11', '花洒', '已完成', '2017-12-28 17:48:03');
INSERT INTO `ele_gzbx` VALUES ('5', 'lth', '1', '其他', '2017-11-01', '厕所', '已完成', '2017-12-28 17:48:03');

-- ----------------------------
-- Table structure for ele_ly
-- ----------------------------
DROP TABLE IF EXISTS `ele_ly`;
CREATE TABLE `ele_ly` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ele_ly
-- ----------------------------
INSERT INTO `ele_ly` VALUES ('2', '123', '123', '1124124', '213412', '2017-12-28 17:39:09');
INSERT INTO `ele_ly` VALUES ('5', '123', '123', '1124124', '213412', '2017-12-28 17:39:09');
INSERT INTO `ele_ly` VALUES ('6', '123', '123', '1124124', '213412', '2017-12-28 17:39:09');
INSERT INTO `ele_ly` VALUES ('9', '123', '123', '1124124', '213412', '2017-12-28 17:39:09');
INSERT INTO `ele_ly` VALUES ('12', '123', '123', '1124124', '213412', '2017-12-28 17:39:09');
INSERT INTO `ele_ly` VALUES ('13', '123', '123', '1124124', '213412', '2017-12-28 17:39:09');
INSERT INTO `ele_ly` VALUES ('14', '123', '123', '1124124', '213412', '2017-12-28 17:39:09');
INSERT INTO `ele_ly` VALUES ('15', '123', '123', '1124124', '213412', '2017-12-28 17:39:09');

-- ----------------------------
-- Table structure for user_login
-- ----------------------------
DROP TABLE IF EXISTS `user_login`;
CREATE TABLE `user_login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `user_phone` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_type` varchar(255) DEFAULT NULL,
  `user_date` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_login
-- ----------------------------
INSERT INTO `user_login` VALUES ('18', '124124', '124214', '12412', '4124', '工业用户', '2017-12-09');
INSERT INTO `user_login` VALUES ('19', 'lth', '123', '13727521738', '2926685103@qq.com', '居民用户', '2017-12-07');
INSERT INTO `user_login` VALUES ('24', 'yjj', '123123', '13727521102', '2926685103@qq.com', '居民用电', '2018-01-02 ');

-- ----------------------------
-- Table structure for user_record
-- ----------------------------
DROP TABLE IF EXISTS `user_record`;
CREATE TABLE `user_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `date` varchar(10) DEFAULT NULL,
  `dianfei` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_record
-- ----------------------------
INSERT INTO `user_record` VALUES ('1', 'yjj', '2017-7', '222');

-- ----------------------------
-- Table structure for user_zd
-- ----------------------------
DROP TABLE IF EXISTS `user_zd`;
CREATE TABLE `user_zd` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `date` varchar(8) DEFAULT NULL,
  `yongdian` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_zd
-- ----------------------------
INSERT INTO `user_zd` VALUES ('1', 'yjj', '2017-12', '12');
INSERT INTO `user_zd` VALUES ('2', 'yjj', '2017-11', '11');
INSERT INTO `user_zd` VALUES ('32', 'lth', '2018-06', '123');
INSERT INTO `user_zd` VALUES ('38', '213', '2018-05', '123');
