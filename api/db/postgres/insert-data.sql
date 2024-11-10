insert into movie (created_at, description, duration_minutes, genre, id, poster_url, rating, release_date, title, trailer_url, directors, producers, casts, updated_at) values ('2024-09-22 15:04:08', 'A thief who enters the dreams of others to steal secrets from their subconscious.', 148, 'Sci-Fi', 1, 'https://i.ebayimg.com/00/s/MTYwMFgxMDk3/z/LlUAAOSwm8VUwoRL/$_57.JPG?set_id=880000500F', 'PG-13', '2010-07-16', 'Inception', 'https://www.youtube.com/embed/YoHD9XEInc0?controls=0&autoplay=1', 'Dummy Directors', 'Dummy Producers', 'Fake casts', '2024-09-22 15:04:08');
insert into movie (created_at, description, duration_minutes, genre, id, poster_url, rating, release_date, title, trailer_url, directors, producers, casts, updated_at) values ('2024-09-22 15:12:08', 'Pechi is a 2024 Indian Tamil-language horror film written and directed by Ramachandran B. The film stars Gayathrie, Bala Saravanan, with Dev Ramnath and Preethi Nedumaran in supporting roles.', 110, 'Horror', 2, 'https://m.media-amazon.com/images/M/MV5BNzk1NTljYTAtMDUxMS00MGNiLThlZjYtNzY0MWE3YjM4MDQzXkEyXkFqcGc@._V1_.jpg', 'UA', '2024-08-02', 'Pechi', 'https://www.youtube.com/embed/a5R4qsAxIOM?controls=0&autoplay=1', 'Dummy Directors', 'Dummy Producers', 'Fake casts', '2024-09-22 15:12:08');
insert into movie (created_at, description, duration_minutes, genre, id, poster_url, rating, release_date, title, trailer_url, directors, producers, casts, updated_at) values ('2024-09-22 15:17:25', 'Andy Singer, an out-of-work actor now struggling as a New York City realtor, finds his world crashing down around him when his estranged 10-year-old daughter, Anna, shows up unannounced on his doorstep in the middle of his eviction.', 91, 'Comedy', 3, 'https://m.media-amazon.com/images/M/MV5BODA2MDI2YzUtNzFkZS00MTQyLTg2YmQtZTBhMTk4ODRkMGU0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 'PG-13', '2024-09-27', 'Notice to Quit', 'https://www.youtube.com/embed/iYlG7QTg7TU?controls=0&autoplay=1', 'Dummy Directors', 'Dummy Producers', 'Fake casts', '2024-09-22 15:17:25');

-- INSERT INTO customer (username, email, password)
-- VALUES ('john_doe', 'john@example.com', 'hashed_password_here');


-- INSERT INTO customer_profile (customer_id, first_name, last_name, phone_number, address)
-- VALUES (1, 'John', 'Doe', '1234567890', '123 Main St, City, Country');


-- INSERT INTO movie (title, description, duration_minutes, release_date, genre, rating, trailer_url) 
-- VALUES ('Inception', 'A thief who enters the dreams of others to steal secrets from their subconscious.', 148, '2010-07-16', 'Sci-Fi', 'PG-13', 'https://www.youtube.com/watch?v=YoHD9XEInc0');


-- INSERT INTO theater (name, num_seats) 
-- VALUES ('Grand Cinema', 200);


-- INSERT INTO show (movie_id, theater_id, start_time, end_time, price) 
-- VALUES (1, 1, '2023-05-01 19:00:00+00', '2023-05-01 21:28:00+00', 12.50);


-- INSERT INTO featured_movie (movie_id, start_date, end_date) 
-- VALUES (1, '2023-05-01', '2023-05-31');


-- INSERT INTO promotion (code, description, discount_type, discount_value, start_date, end_date) 
-- VALUES ('SUMMER10', '10% off for summer season', 'PERCENT', 10.00, '2023-06-01', '2023-08-31');


-- INSERT INTO credit_card (customer_id, card_type, name, card_number, cvv, expiration_date, billing_address) 
-- VALUES (1, 'VISA', 'John Doe', '4111111111111111', '123', '2025-12-31', '123 Main St, City, Country');


-- INSERT INTO booking (customer_id, show_id, credit_card_id, promotion_id, total_amount, status)
-- VALUES (1, 1, 1, 1, 11.25, 'CONFIRMED');


-- INSERT INTO seat (theater_id, row_number, seat_number) 
-- VALUES (1, 'A', '1');


-- INSERT INTO ticket (booking_id, seat_id) 
-- VALUES (1, 1);

-- User types
insert into user_type (id, name) values (1, 'ADMIN');
insert into user_type (id, name) values (2, 'CUSTOMER');


-- Admin user  (Encrypted password is: "thisisadmin")
insert into app_user (id, active, email, encrypted_password, user_type_id) values (1, true, 'adm@movie.com', '$2a$10$UTiUhKKaqrczVxgl579HZeb9n6lDgKKoUD/pkd5.znq7LVEj7ZjTi', 1);


-- Customer user (encrypted password is: "thisiscustomer")
insert into app_user (id, active, email, encrypted_password, user_type_id) values (2, true, 'cust@mail.com', '$2a$10$yiAJ/RSiXvj9H6NIDtVVzOV0UwvNeSCdOxz7oAdcPT4Z1sSQcxKlO', 2);
insert into customer_profile (id, user_id, first_name, last_name, phone_number, address, subscribe_promo, created_at, updated_at) values (1, 2, 'Rick', 'Movie', '7420010026', '420 East Broad Street, Athens 30605 Apt 112', 'false', '2024-11-07 15:04:08', '2024-11-07 15:04:08');
