CREATE DATABASE cosmeticos;

\c cosmeticos;

CREATE TABLE marcas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    localizacao VARCHAR(255) NOT NULL
);

CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    marca_id INT REFERENCES marcas(id)
);

INSERT INTO marcas (nome, localizacao) VALUES
('Natura', 'Cajamar'),
('Loccitane', 'Manosque'),
('Eudora', 'França'),
('Nivea', 'Hamburgo');

INSERT INTO produtos (nome, descricao, preco, marca_id) VALUES
('Creme Hidratante', 'Creme hidratante para o corpo', 49.90, 1),
('Perfume Floral', 'Perfume com notas florais', 89.90, 2),
('Sabonete Líquido', 'Sabonete líquido para as mãos', 29.90, 3),
('Protetor Solar', 'Protetor solar fator 30', 59.90, 4);