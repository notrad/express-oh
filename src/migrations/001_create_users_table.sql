CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    roles TEXT[] NOT NULL DEFAULT '{user}',
    created_at TIMESTAMP WITH TIME ZONE CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX users_email_idx ON users(email);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Sample values 
INSERT INTO users (name, email, password_hash, roles) VALUES
(
    'John Doe',
    'john@example.com',
    '$2b$10$YourHashedPasswordHere123',
    '{user}'
),
(
    'Jane Admin',
    'jane@example.com',
    '$2b$10$YourHashedPasswordHere456',
    '{user,admin}'
),
(
    'Bob User',
    'bob@example.com',
    '$2b$10$YourHashedPasswordHere456',
    '{user}'
);