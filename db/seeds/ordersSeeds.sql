INSERT INTO orders (user_id, order_time, order_completed, order_status, total_cost)
VALUES
(1, Now(), true, 'accepted', 25),
(2, Now(), true, 'accepted', 5),
(1, Now(), false, 'accepted', 55)
