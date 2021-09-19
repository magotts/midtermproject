INSERT INTO users (first_name, last_name, admin, phone_number, password, email, profile_image_url)
VALUES
('Yvette', 'Lim', true, 647-222-1111, 'password', 'hello@world.com', 'http://image.jpeg'),
('Raven', 'Kanken', false, 647-111-2222, 'password', 'aaa@aaa.com', 'http://image.jpeg');

INSERT INTO foods (title, price, stock, description, image_url)
VALUES
('Fried Chicken', 10, 20, 'Yummy tasty fried chicken!'), 'https://image.shutterstock.com/image-photo/cuisine-food-top-view-plate-260nw-287318021.jpg',
('Pearl Milktea', 5, 20, 'Strong milktea flavor.', 'https://thaipbs-world.s3.ap-southeast-1.amazonaws.com/thaipbsworld/wp-content/uploads/2019/07/12125756/bubble-milk-tea-1.jpg');

INSERT INTO orders (user_id, order_date, order_time, total_cost, order_completed, order_status)
VALUES
(1, GETDATE(), CURRENT_TIMESTAMP, 10, FALSE, FALSE),
(2, GETDATE(), CURRENT_TIMESTAMP, 25, FALSE, FALSE);

INSERT INTO order_details (users_id, foods_id, orders_id, quantity)
VALUES
(1, 1, 1, 1),
(2, 2, 2, 2);
