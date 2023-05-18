CREATE EXTENSION pgcrypto;
CREATE TYPE role_user_enum AS ENUM('user', 'administrator');
CREATE TYPE status_user_enum AS ENUM('active', 'unactive', 'pending');
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role role_user_enum NOT NULL,
    status status_user_enum NOT NULL,
    email VARCHAR(255) NOT NULL,
    recuperation_code VARCHAR(255) NULL,
    verification_code VARCHAR(255) NULL,
    created_at timestamp  NULL default current_timestamp,
    updated_at timestamp  NULL default current_timestamp
);
