-- DATEBASE smart-stock

-- 1)
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único da categoria
  name VARCHAR(100) NOT NULL,        -- Nome da categoria (ex: Eletrônicos, Roupas)
  description TEXT,                  -- Descrição opcional da categoria
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP -- Data de criação do registro
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2)
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,                             -- Identificador único do produto
  name VARCHAR(150) NOT NULL,                                    -- Nome do produto
  description TEXT,                                               -- Descrição detalhada do produto
  sku VARCHAR(50) UNIQUE,                                         -- Código interno (Stock Keeping Unit)
  barcode VARCHAR(50),                                            -- Código de barras do produto
  category_id INT,                                                -- ID da categoria (relacionamento com categories)
  brand VARCHAR(100),                                             -- Marca do produto
  price DECIMAL(10,2) NOT NULL,                                   -- Preço de venda
  discount_price DECIMAL(10,2),                                   -- Preço com desconto (opcional)
  stock INT NOT NULL DEFAULT 0,                                   -- Quantidade disponível em estoque
  weight DECIMAL(10,3),                                           -- Peso do produto (kg)
  width DECIMAL(10,2),                                            -- Largura (cm)
  height DECIMAL(10,2),                                           -- Altura (cm)
  length DECIMAL(10,2),                                           -- Comprimento (cm)
  image_url VARCHAR(255),                                         -- URL da imagem principal do produto
  is_active TINYINT(1) DEFAULT 1,                                 -- Status do produto (1 = ativo, 0 = inativo)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,                  -- Data de criação do produto
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Data da última atualização
  INDEX idx_products_name (name),                                 -- Índice para otimizar buscas por nome
  INDEX idx_products_category (category_id),                      -- Índice para buscas por categoria
  INDEX idx_products_barcode (barcode),                           -- Índice para buscas por código de barras
  CONSTRAINT fk_products_category FOREIGN KEY (category_id)       -- Chave estrangeira que conecta à tabela categories
    REFERENCES categories(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
