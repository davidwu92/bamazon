-- After the bamazon db is created, run this in MYSQL to initialize our inventory.

USE bamazon_db;
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Refrigerator', 'Kitchen Appliances', 234.99, 10),
('Toaster', 'Kitchen Appliances', 34.56, 25),
('Microwave', 'Kitchen Appliances', 45.67, 82),
('Television', 'Electronics', 357.99, 3),
('USB Keyboard', 'Electronics', 12.34, 40),
('USB Mouse', 'Electronics', 12.55, 45),
('Bamazon Becho', 'Electronics', 879.99, 230),
('Undershirt', 'Clothing', 1.49, 300),
('Christmas Socks', 'Clothing', 8.99, 541),
('Sweater', 'Clothing', 23.99, 124)