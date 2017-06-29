--Create a MySQL Database called bamazon.
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

-- Then create a Table inside of that database called products.
-- The products table should have each of the following columns:
-- item_id (unique id for each product)
-- product_name (Name of product)
-- department_name
-- price (cost to customer)
-- stock_quantity (how much of the product is available in stores)


CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100),
  department_name VARCHAR(45),
  price DECIMAL(7,2) default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);


