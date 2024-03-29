-- Creating the bamazon db: Run this in MySQL in order to use the app.
DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products(
	item_id INTEGER AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(256) NOT NULL,
  department_name VARCHAR(256) NOT NULL,
  price DECIMAL(60, 2) NOT NULL,
  stock_quantity INTEGER (10) NOT NULL,
  PRIMARY KEY (item_id)
);