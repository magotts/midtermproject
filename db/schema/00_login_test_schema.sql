-- -- Drop and recreate Users table (Example)

-- DROP TABLE IF EXISTS users CASCADE;
-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY NOT NULL,
--   name VARCHAR(255) NOT NULL
-- );

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS foods CASCADE;
DROP TABLE IF EXISTS order_details CASCADE;
DROP TYPE IF EXISTS ord_status CASCADE;

CREATE TYPE ord_status AS ENUM ('new', 'accepted', 'declined');

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  -- admin BOOLEAN DEFAULT FALSE,
  phone_number VARCHAR(255),
  password VARCHAR(255),
  email VARCHAR(255),
  profile_image_url TEXT
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  order_time TIMESTAMP DEFAULT NOW(),
  total_cost INTEGER,
  order_completed BOOLEAN DEFAULT FALSE,
  order_status ord_status DEFAULT 'new',
  order_estimation INTEGER
);

CREATE TABLE foods (
   id INTEGER PRIMARY KEY NOT NULL,
   title VARCHAR(255),
   price FLOAT NOT NULL,
   stock INTEGER,
   description VARCHAR(255),
   image_url TEXT
);

CREATE TABLE order_details (
   id SERIAL PRIMARY KEY NOT NULL,
   foods_id INTEGER REFERENCES foods(id) NOT NULL,
   orders_id INTEGER REFERENCES orders(id) NOT NULL,
   quantity VARCHAR(255)
);
