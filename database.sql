CREATE DATABASE earbor;

CREATE TABLE admin(
    admin_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);