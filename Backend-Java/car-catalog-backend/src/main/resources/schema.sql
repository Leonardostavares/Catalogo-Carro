-- Configurar sequência de IDs para começar em 1000
-- Isso garante que IDs gerados pelo sistema nunca conflitem com IDs das APIs externas

-- Para MySQL (JawsDB) - Criar sequência personalizada
CREATE TABLE IF NOT EXISTS carro_sequence (
    next_val BIGINT
);
INSERT INTO carro_sequence (next_val) VALUES (1000) ON DUPLICATE KEY UPDATE next_val = 1000;

-- Para PostgreSQL (se usado no futuro)
-- CREATE SEQUENCE IF NOT EXISTS carro_sequence START WITH 1000;

-- Para H2 (desenvolvimento local)
-- CREATE SEQUENCE IF NOT EXISTS carro_sequence START WITH 1000;
