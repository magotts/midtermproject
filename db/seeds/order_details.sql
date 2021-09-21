INSERT INTO orders (user_id, order_time, total_cost, order_status)
VALUES
('2','2021-08-02 15:41:20',60,'new'),
('2','2021-08-02 15:50:20',50, 'accepted');

INSERT INTO order_details (foods_id, orders_id, quantity)
VALUES (1, 3, 5),
(2, 3, 1),
(3, 3, 2);
