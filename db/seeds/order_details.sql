
-- order id 4
INSERT INTO order_details (foods_id, orders_id, quantity)
VALUES (1245, 4, 2),
(1436, 4, 2);

INSERT INTO orders (user_id, order_time, total_cost, order_status)
VALUES
('2', NOW(), 60, 'new'),


