DROP TABLE IF EXISTS quote;
CREATE TABLE quote (
        id SERIAL PRIMARY KEY,
        author TEXT,
        message TEXT,
        is_deleted INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

