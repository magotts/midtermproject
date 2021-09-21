-- Users table seeds here (Example)
-- Created this to test the food items with manual keys (see order_details' fist value below)


INSERT INTO
  users (
    first_name,
    last_name,
    phone_number,
    password,
    email
  )
VALUES
  (
    'Alice',
    'Williams',
    '6472212345',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.',
    'alice.williams@gmail.com'
  );

INSERT INTO
  users (
    first_name,
    last_name,
    phone_number,
    password,
    email
  )
VALUES
  (
    'Kira',
    'Adams',
    '4162212345',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.',
    'kira.adams@gmail.com'
  );

INSERT INTO
  orders (user_id, order_time, total_cost, order_status)
VALUES
  ('1', '2021-08-02 15:41:20', 60, 'new'),
  ('2', '2021-08-02 15:50:20', 50, 'accepted'),
  ('1', '2021-08-02 15:53:20', 30, 'accepted'),
  ('2', '2021-08-02 15:54:20', 45, 'new'),
  ('1', '2021-07-26 10:02:20', 12, 'new');


INSERT INTO
  order_details (foods_id, orders_id, quantity)
VALUES
  ('1245', '1', 60),
  ('1436', '2', 50),
  ('1853', '1', 30),
  ('1935', '2', 45),
  ('1745', '1', 12)
