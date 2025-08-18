-- Script de inicialização para H2 (desenvolvimento local)

-- Criar tabela de sequência para carros
CREATE TABLE IF NOT EXISTS carro_sequence (
    next_val BIGINT
);

-- Inserir valor inicial se a tabela estiver vazia
INSERT INTO carro_sequence (next_val) 
SELECT 1000 
WHERE NOT EXISTS (SELECT 1 FROM carro_sequence);

-- Criar tabela de sequência para marcas
CREATE TABLE IF NOT EXISTS marca_sequence (
    next_val BIGINT
);

-- Inserir valor inicial se a tabela estiver vazia
INSERT INTO marca_sequence (next_val) 
SELECT 1000 
WHERE NOT EXISTS (SELECT 1 FROM marca_sequence);

-- Criar tabela de sequência para modelos
CREATE TABLE IF NOT EXISTS modelo_sequence (
    next_val BIGINT
);

-- Inserir valor inicial se a tabela estiver vazia
INSERT INTO modelo_sequence (next_val) 
SELECT 1000 
WHERE NOT EXISTS (SELECT 1 FROM modelo_sequence);
