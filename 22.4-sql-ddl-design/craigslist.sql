DROP DATABASE IF EXISTS craigslist;

CREATE DATABASE craigslist;

\c craigslist

CREATE TABLE regions (
    id SERIAL PRIMARY KEY,
    region_name TEXT NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    preferred_region_id INTEGER REFERENCES regions ON DELETE SET NULL
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES user ON DELETE CASCADE,
    location TEXT NOT NULL,
    region_id INTEGER NOT NULL REFERENCES regions ON DELETE CASCADE,
    title TEXT NOT NULL,
    post_text TEXT,
    category_id INTEGER REFERENCES categories ON DELETE SET NULL
);


