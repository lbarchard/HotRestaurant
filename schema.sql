CREATE DATABASE HotRestaurantDB;

USE HotRestaurantDB;

CREATE TABLE tables (
  reservation_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  phone_number INT(10) NOT NULL,
  email VARCHAR(100) NOT NULL,
  reservation_type VARCHAR(20) NOT NULL DEFAULT 'wait-list',
  PRIMARY KEY (reservation_id));

