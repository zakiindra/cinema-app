-- SELECT Queries

-- 1. Get all movies with their details
SELECT * FROM movie;

-- 2. Get all shows for a specific movie
SELECT s.*, m.title 
FROM show s
JOIN movie m ON s.movie_id = m.id
WHERE m.id = 1;

-- 3. Get all available seats for a specific show
SELECT s.* 
FROM seat s
WHERE s.theater_id = (SELECT theater_id FROM show WHERE id = 1)
AND s.id NOT IN (
    SELECT t.seat_id 
    FROM ticket t
    JOIN booking b ON t.booking_id = b.id
    WHERE b.show_id = 1 AND b.status != 'CANCELED'
);

-- 4. Get all bookings for a specific user
SELECT b.*, m.title, s.start_time, s.end_time
FROM booking b
JOIN show s ON b.show_id = s.id
JOIN movie m ON s.movie_id = m.id
WHERE b.user_id = 1;

-- 5. Get all featured movies
SELECT m.* 
FROM movie m
JOIN featured_movie fm ON m.id = fm.movie_id
WHERE CURRENT_DATE BETWEEN fm.start_date AND fm.end_date;

-- 6. Get all active promotions
SELECT * 
FROM promotion
WHERE CURRENT_DATE BETWEEN start_date AND end_date;

-- 7. Get customer details with their bookings count
SELECT c.*, cp.first_name, cp.last_name, COUNT(b.id) as booking_count
FROM customer c
LEFT JOIN customer_profile cp ON c.id = cp.user_id
LEFT JOIN booking b ON c.id = b.user_id
GROUP BY c.id, cp.id;

-- 8. Get all tickets for a specific booking
SELECT t.*, s.row_number, s.seat_number
FROM ticket t
JOIN seat s ON t.seat_id = s.id
WHERE t.booking_id = 1;

-- 9. Get total revenue for each movie
SELECT m.title, SUM(b.total_amount) as total_revenue
FROM booking b
JOIN show s ON b.show_id = s.id
JOIN movie m ON s.movie_id = m.id
WHERE b.status = 'CONFIRMED'
GROUP BY m.id, m.title;

-- 10. Get the most popular movie (by number of bookings)
SELECT m.title, COUNT(b.id) as booking_count
FROM movie m
JOIN show s ON m.id = s.movie_id
JOIN booking b ON s.id = b.show_id
WHERE b.status = 'CONFIRMED'
GROUP BY m.id, m.title
ORDER BY booking_count DESC
LIMIT 1;