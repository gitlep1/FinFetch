DROP DATABASE IF EXISTS finfetch_db;
CREATE DATABASE finfetch_db;

\c finfetch_db;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS email_verification;
CREATE TABLE email_verification (
  id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  profileimg TEXT DEFAULT 'https://i.imgur.com/yJVGXuM.png',
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  theme TEXT DEFAULT 'default',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_online TIMESTAMP DEFAULT NOW()
);

DROP TABLE IF EXISTS profile_images;
CREATE TABLE profile_images (
  id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  delete_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

DROP TABLE IF EXISTS news;
CREATE TABLE news (
  id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);