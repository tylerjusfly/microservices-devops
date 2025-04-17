CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Insert a test user (password: test123)
INSERT INTO users (email, password)
VALUES ('test@example.com', '$2b$10$zfv6Wd0M2txoJQ8FEQAoGecEcN/xg37pglhUu/PUUWa/JmSK5sR5a');
