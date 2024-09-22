CREATE TABLE IF NOT EXISTS customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone_number VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE INDEX idx_user_username ON customer(username);
CREATE INDEX idx_user_email ON customer(email);

CREATE TABLE IF NOT EXISTS movie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration_minutes INT NOT NULL,
    release_date DATE,
    genre VARCHAR(50),
    rating VARCHAR(10),
  	poster_url TEXT,
    trailer_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE INDEX idx_movie_title ON movie(title);
CREATE INDEX idx_movie_release_date ON movie(release_date);
CREATE INDEX idx_movie_genre ON movie(genre);

CREATE TABLE IF NOT EXISTS theater (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    num_seats INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE INDEX idx_theater_name ON theater(name);

CREATE TABLE IF NOT EXISTS `show` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT NOT NULL,
    theater_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movie(id),
    FOREIGN KEY (theater_id) REFERENCES theater(id)
);
CREATE INDEX idx_show_movie_id ON `show`(movie_id);
CREATE INDEX idx_show_theater_id ON `show`(theater_id);
CREATE INDEX idx_show_start_time ON `show`(start_time);

CREATE TABLE IF NOT EXISTS featured_movie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movie(id)
);
CREATE INDEX idx_featured_movie_movie_id ON featured_movie(movie_id);
CREATE INDEX idx_featured_movie_date_range ON featured_movie(start_date, end_date);

CREATE TABLE IF NOT EXISTS promotion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    discount_type VARCHAR(20),
    discount_value DECIMAL(5, 2),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE INDEX idx_promotion_code ON promotion(code);
CREATE INDEX idx_promotion_date_range ON promotion(start_date, end_date);

CREATE TABLE IF NOT EXISTS credit_card (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    card_type VARCHAR(20),
    name VARCHAR(255),
    card_number VARCHAR(20),
    cvv VARCHAR(3),
    expiration_date DATE,
    billing_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customer(id)
);
CREATE INDEX idx_credit_card_customer_id ON credit_card(customer_id);

CREATE TABLE IF NOT EXISTS booking (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    show_id INT NOT NULL,
    credit_card_id INT NOT NULL,
    promotion_id INT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES customer(id),
    FOREIGN KEY (show_id) REFERENCES `show`(id),
    FOREIGN KEY (credit_card_id) REFERENCES credit_card(id),
    FOREIGN KEY (promotion_id) REFERENCES promotion(id)
);
CREATE INDEX idx_booking_user_id ON booking(user_id);
CREATE INDEX idx_booking_show_id ON booking(show_id);
CREATE INDEX idx_booking_credit_card_id ON booking(credit_card_id);
CREATE INDEX idx_booking_promotion_id ON booking(promotion_id);
CREATE INDEX idx_booking_status ON booking(status);

CREATE TABLE IF NOT EXISTS seat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    theater_id INT NOT NULL,
    seat_row VARCHAR(5) NOT NULL,
    seat_number VARCHAR(5) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY (theater_id, seat_row, seat_number),
    FOREIGN KEY (theater_id) REFERENCES theater(id)
);
CREATE INDEX idx_seat_theater_id ON seat(theater_id);

CREATE TABLE IF NOT EXISTS ticket (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    seat_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY (booking_id, seat_id),
    FOREIGN KEY (booking_id) REFERENCES booking(id),
    FOREIGN KEY (seat_id) REFERENCES seat(id)
);
CREATE INDEX idx_ticket_booking_id ON ticket(booking_id);
CREATE INDEX idx_ticket_seat_id ON ticket(seat_id);
