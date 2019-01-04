/*
 Navicat Premium Data Transfer

 Source Server         : MariaDb
 Source Server Type    : MariaDB
 Source Server Version : 100307
 Source Host           : localhost:3306
 Source Schema         : node_js

 Target Server Type    : MariaDB
 Target Server Version : 100307
 File Encoding         : 65001

 Date: 04/01/2019 10:46:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `age` int(11) NULL DEFAULT NULL,
  `comment` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `createdate` datetime(0) NULL DEFAULT NULL,
  `updatedate` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 85 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (2, 'Trần Bình Minh', 157, 'Project Manager', '2019-01-03 14:46:53', '2019-01-04 10:40:21');
INSERT INTO `users` VALUES (30, 'Thị Mẹt', 23, 'Tôi là thị màu', '2019-01-03 14:49:56', '2019-01-04 09:24:45');
INSERT INTO `users` VALUES (32, 'demo', 1000, 'Đừng hỏi vì sao Using Facebook React. ', '2019-01-03 15:03:32', '2019-01-03 15:38:00');
INSERT INTO `users` VALUES (33, 'demo', 1002, 'Đừng hỏi vì sao Using Facebook React. \nĐừng hỏi vì sao Using Facebook React. \nĐừng hỏi vì sao Using Facebook React. ', '2019-01-03 15:03:42', '2019-01-03 15:42:54');
INSERT INTO `users` VALUES (35, 'Nguyen van', 20, 'gggggggggg', '2019-01-03 15:42:50', '2019-01-03 15:46:59');
INSERT INTO `users` VALUES (36, 'khanhnv1', 19, 'Nguyen van khanh nv1', '2019-01-03 16:00:45', '2019-01-03 16:00:45');
INSERT INTO `users` VALUES (37, 'khanhnv2', 19, 'Nguyen van khanh nv2', '2019-01-03 16:00:51', '2019-01-03 16:00:51');
INSERT INTO `users` VALUES (38, 'khanhnv3', 19, 'Nguyen van khanh nv3', '2019-01-03 16:00:57', '2019-01-03 16:00:57');
INSERT INTO `users` VALUES (39, 'khanhnv4', 19, 'Nguyen van khanh nv4', '2019-01-03 16:01:03', '2019-01-03 16:01:03');
INSERT INTO `users` VALUES (40, 'khanhnv5', 19, 'Nguyen van khanh nv5', '2019-01-03 16:01:17', '2019-01-03 16:01:17');
INSERT INTO `users` VALUES (41, 'khanhnv6', 19, 'Nguyen van khanh nv6', '2019-01-03 16:01:25', '2019-01-03 16:01:25');
INSERT INTO `users` VALUES (42, 'khanhnv7', 19, 'Nguyen van khanh nv7', '2019-01-03 16:01:44', '2019-01-03 16:01:44');
INSERT INTO `users` VALUES (43, 'khanhnv8', 19, 'Nguyen van khanh nv8', '2019-01-03 16:01:53', '2019-01-03 16:01:53');
INSERT INTO `users` VALUES (44, 'khanhnv9', 19, 'Nguyen van khanh nv9', '2019-01-03 16:01:58', '2019-01-03 16:01:58');
INSERT INTO `users` VALUES (45, 'khanhnv10', 19, 'Nguyen van khanh nv10', '2019-01-03 16:02:07', '2019-01-03 16:02:07');
INSERT INTO `users` VALUES (46, 'khanhnv11', 11, 'khannv11', '2019-01-03 17:19:48', '2019-01-03 17:19:48');
INSERT INTO `users` VALUES (47, 'khanhnv12', 11, 'khannv12', '2019-01-03 17:19:54', '2019-01-03 17:19:54');
INSERT INTO `users` VALUES (48, 'khanhnv13', 11, 'khannv13', '2019-01-03 17:20:00', '2019-01-03 17:20:00');
INSERT INTO `users` VALUES (49, 'khanhnv14', 11, 'khannv14', '2019-01-03 17:20:07', '2019-01-03 17:20:07');
INSERT INTO `users` VALUES (50, 'khanhnv15', 11, 'khannv15', '2019-01-03 17:20:13', '2019-01-03 17:20:13');
INSERT INTO `users` VALUES (51, 'khanhnv16', 11, 'khannv16', '2019-01-03 17:20:22', '2019-01-03 17:20:22');
INSERT INTO `users` VALUES (52, 'khanhnv17', 11, 'khannv17', '2019-01-03 17:20:30', '2019-01-03 17:20:30');
INSERT INTO `users` VALUES (53, 'Nguyen van', 19, 'ggggggggggggggggggggggg', '2019-01-04 10:30:49', '2019-01-04 10:30:49');
INSERT INTO `users` VALUES (54, 'Nguyen van', 19, 'ggggggggggggggggggggggg', '2019-01-04 10:30:52', '2019-01-04 10:30:52');
INSERT INTO `users` VALUES (55, 'Nguyen van', 19, 'ggggggggggggggggggggggg', '2019-01-04 10:30:53', '2019-01-04 10:30:53');
INSERT INTO `users` VALUES (56, 'Nguyen van', 19, 'ggggggggggggggggggggggg', '2019-01-04 10:30:54', '2019-01-04 10:30:54');
INSERT INTO `users` VALUES (57, 'Nguyen van', 19, 'ggggggggggggggggggggggg', '2019-01-04 10:30:54', '2019-01-04 10:30:54');
INSERT INTO `users` VALUES (58, 'Nguyen van', 19, 'ggggggggggggggggggggggg', '2019-01-04 10:30:54', '2019-01-04 10:30:54');
INSERT INTO `users` VALUES (59, 'Nguyen van', 19, 'ggggggggggggggggggggggg', '2019-01-04 10:30:55', '2019-01-04 10:30:55');
INSERT INTO `users` VALUES (60, 'Nguyen van', 19, 'ggggggggggggggggggggggg', '2019-01-04 10:30:55', '2019-01-04 10:30:55');
INSERT INTO `users` VALUES (61, 'Nguyen van', 19, 'ggggggggggggggggggggggg', '2019-01-04 10:30:55', '2019-01-04 10:30:55');
INSERT INTO `users` VALUES (62, 'Nguyen van', 19, 'ggggggggggggggggggggggg', '2019-01-04 10:30:57', '2019-01-04 10:30:57');
INSERT INTO `users` VALUES (63, 'Nguyen van', 19, 'ggggggggggggggggggggggg', '2019-01-04 10:30:57', '2019-01-04 10:30:57');
INSERT INTO `users` VALUES (64, 'Nguyen van', 19, 'ggggggggggggggggggggggg', '2019-01-04 10:30:58', '2019-01-04 10:30:58');
INSERT INTO `users` VALUES (65, 'Nguyen van', 19, 'ggggggggggggggggggggggg', '2019-01-04 10:30:58', '2019-01-04 10:30:58');
INSERT INTO `users` VALUES (66, 'Nguyen van', 19, 'ggggggggggggggggggggggg', '2019-01-04 10:30:58', '2019-01-04 10:30:58');
INSERT INTO `users` VALUES (67, 'Nguyen van', 19, 'ggggggggggggggggggggggg', '2019-01-04 10:30:58', '2019-01-04 10:30:58');
INSERT INTO `users` VALUES (68, 'Nguyen van', 19, 'ggggggggggggggggggggggg', '2019-01-04 10:30:59', '2019-01-04 10:30:59');
INSERT INTO `users` VALUES (69, 'Nguyen van', 19, 'ggggggggggggggggggggggg', '2019-01-04 10:30:59', '2019-01-04 10:30:59');
INSERT INTO `users` VALUES (71, 'Nguyen van', 19, 'ggggggggggggggggggggggg', '2019-01-04 10:30:59', '2019-01-04 10:30:59');
INSERT INTO `users` VALUES (72, 'Nguyen van', 19, 'ggggggggggggggggggggggg', '2019-01-04 10:30:59', '2019-01-04 10:30:59');
INSERT INTO `users` VALUES (75, 'Nguyen van', 19, 'ggggggggggggggggggggggg', '2019-01-04 10:31:00', '2019-01-04 10:31:00');
INSERT INTO `users` VALUES (76, 'Nguyen van', 19, 'ggggggggggggggggggggggg', '2019-01-04 10:31:00', '2019-01-04 10:31:00');
INSERT INTO `users` VALUES (77, 'Nguyen van', 19, 'ggggggggggggggggggggggg', '2019-01-04 10:31:00', '2019-01-04 10:31:00');
INSERT INTO `users` VALUES (78, 'Nguyen van', 19, 'ggggggggggggggggggggggg', '2019-01-04 10:31:01', '2019-01-04 10:31:01');
INSERT INTO `users` VALUES (79, 'Nguyen van', 19, 'ggggggggggggggggggggggg', '2019-01-04 10:31:01', '2019-01-04 10:31:01');
INSERT INTO `users` VALUES (84, 'Nguyen van', 19, 'bbbbbbbbbbbb', '2019-01-04 10:43:21', '2019-01-04 10:43:21');

SET FOREIGN_KEY_CHECKS = 1;
