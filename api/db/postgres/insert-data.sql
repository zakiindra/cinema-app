INSERT INTO customer (username, email, password)
VALUES ('john_doe', 'john@example.com', 'hashed_password_here');


INSERT INTO customer_profile (customer_id, first_name, last_name, phone_number, address)
VALUES (1, 'John', 'Doe', '1234567890', '123 Main St, City, Country');


INSERT INTO movie (title, description, duration_minutes, release_date, genre, rating, trailer_url) 
VALUES ('Inception', 'A thief who enters the dreams of others to steal secrets from their subconscious.', 148, '2010-07-16', 'Sci-Fi', 'PG-13', 'https://www.youtube.com/watch?v=YoHD9XEInc0');


INSERT INTO theater (name, num_seats) 
VALUES ('Grand Cinema', 200);


INSERT INTO show (movie_id, theater_id, start_time, end_time, price) 
VALUES (1, 1, '2023-05-01 19:00:00+00', '2023-05-01 21:28:00+00', 12.50);


INSERT INTO featured_movie (movie_id, start_date, end_date) 
VALUES (1, '2023-05-01', '2023-05-31');


INSERT INTO promotion (code, description, discount_type, discount_value, start_date, end_date) 
VALUES ('SUMMER10', '10% off for summer season', 'PERCENT', 10.00, '2023-06-01', '2023-08-31');


INSERT INTO credit_card (customer_id, card_type, name, card_number, cvv, expiration_date, billing_address) 
VALUES (1, 'VISA', 'John Doe', '4111111111111111', '123', '2025-12-31', '123 Main St, City, Country');


INSERT INTO booking (customer_id, show_id, credit_card_id, promotion_id, total_amount, status)
VALUES (1, 1, 1, 1, 11.25, 'CONFIRMED');


INSERT INTO seat (theater_id, row_number, seat_number) 
VALUES (1, 'A', '1');


INSERT INTO ticket (booking_id, seat_id) 
VALUES (1, 1);
