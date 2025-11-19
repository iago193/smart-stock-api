-- DATEBASE smart-stock

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT NULL,
  sku VARCHAR(50) UNIQUE,
  barcode VARCHAR(50),
  category_id INT NULL,
  brand VARCHAR(100),
  price DECIMAL(10,2) NOT NULL,
  discount_price DECIMAL(10,2),
  stock INT DEFAULT 0,
  weight DECIMAL(10,3),
  width DECIMAL(10,2),
  height DECIMAL(10,2),
  length DECIMAL(10,2),
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_products_category FOREIGN KEY (category_id)
    REFERENCES categories(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);

CREATE TABLE product_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  url VARCHAR(255) UNIQUE NOT NULL,
  public_id VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT product_images_products_FK FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_barcode ON products(barcode);
CREATE INDEX idx_product_images_product_id ON product_images(product_id);


