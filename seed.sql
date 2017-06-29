-- Creates new rows containing data in all named columns --
-- Populate this database with around 10 different products. 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Collars", "Pet Supplies", 15.99 , 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("50-Gallon Deck Box", "Patio Furniture", 68.75 , 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Organic Shea Butter", "Health & Household", 13.25 , 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Firewood Rack", "Patio Furniture", 119.99 , 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Honey Ketchup", "Food & Grocery", 13.99 , 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chipotle Mayo", "Food & Grocery", 12.99 , 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coconut Wraps", "Food & Grocery", 14.99 , 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bird Food for Conure and Lovebird, 5lb", "Pet Supplies", 9.59 , 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Magnesium Dietary Supplement, 200 mg", "Health & Household", 13.15 , 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Natures Miracle Advanced Formula", "Pet Supplies", 46.99 , 15);


-- Updates quantity on item
UPDATE products
SET stock_quantity = 99;
WHERE product_name = "Dog Collars";