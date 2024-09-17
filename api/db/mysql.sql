-- User table
CREATE TABLE IF NOT EXISTS `user` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;
CREATE INDEX idx_user_username ON `user` (username);
CREATE INDEX idx_user_email ON `user` (email);

-- User profile table
CREATE TABLE IF NOT EXISTS user_profile (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone_number VARCHAR(20),
    birth_date DATE,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES `user` (id)
) ENGINE=InnoDB;
CREATE INDEX idx_user_profile_user_id ON user_profile (user_id);

-- Movie table
CREATE TABLE IF NOT EXISTS movie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INT NOT NULL,
    release_date DATE,
    genre VARCHAR(50),
    rating VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;
CREATE INDEX idx_movie_title ON movie (title);
CREATE INDEX idx_movie_release_date ON movie (release_date);
CREATE INDEX idx_movie_genre ON movie (genre);

-- Theater table
CREATE TABLE IF NOT EXISTS theater (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location TEXT,
    total_seats INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;
CREATE INDEX idx_theater_name ON theater (name);

-- Showtime table
CREATE TABLE IF NOT EXISTS showtime (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT NOT NULL,
    theater_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movie (id),
    FOREIGN KEY (theater_id) REFERENCES theater (id)
) ENGINE=InnoDB;
CREATE INDEX idx_showtime_movie_id ON showtime (movie_id);
CREATE INDEX idx_showtime_theater_id ON showtime (theater_id);
CREATE INDEX idx_showtime_start_time ON showtime (start_time);

-- Featured movie table
CREATE TABLE IF NOT EXISTS featured_movie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movie (id)
) ENGINE=InnoDB;
CREATE INDEX idx_featured_movie_movie_id ON featured_movie (movie_id);
CREATE INDEX idx_featured_movie_date_range ON featured_movie (start_date, end_date);

-- Promotion table
CREATE TABLE IF NOT EXISTS promotion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    discount_type VARCHAR(20),
    value DECIMAL(5, 2),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;
CREATE INDEX idx_promotion_code ON promotion (code);
CREATE INDEX idx_promotion_date_range ON promotion (start_date, end_date);

-- Payment method table
CREATE TABLE IF NOT EXISTS payment_method (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    method_type VARCHAR(50) NOT NULL,
    details JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES `user` (id)
) ENGINE=InnoDB;
CREATE INDEX idx_payment_method_user_id ON payment_method (user_id);
CREATE INDEX idx_payment_method_type ON payment_method (method_type);

-- Booking table
CREATE TABLE IF NOT EXISTS booking (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    showtime_id INT NOT NULL,
    payment_method_id INT NOT NULL,
    promotion_id INT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES `user` (id),
    FOREIGN KEY (showtime_id) REFERENCES showtime (id),
    FOREIGN KEY (payment_method_id) REFERENCES payment_method (id),
    FOREIGN KEY (promotion_id) REFERENCES promotion (id)
) ENGINE=InnoDB;
CREATE INDEX idx_booking_user_id ON booking (user_id);
CREATE INDEX idx_booking_showtime_id ON booking (showtime_id);
CREATE INDEX idx_booking_payment_method_id ON booking (payment_method_id);
CREATE INDEX idx_booking_promotion_id ON booking (promotion_id);
CREATE INDEX idx_booking_created_at ON booking (created_at);
CREATE INDEX idx_booking_status ON booking (status);

-- Seat table
CREATE TABLE IF NOT EXISTS seat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    theater_id INT NOT NULL,
    row_number VARCHAR(5) NOT NULL,
    seat_number VARCHAR(5) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY (theater_id, row_number, seat_number),
    FOREIGN KEY (theater_id) REFERENCES theater (id)
) ENGINE=InnoDB;
CREATE INDEX idx_seat_theater_id ON seat (theater_id);

-- Booked seat table
CREATE TABLE IF NOT EXISTS booked_seat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    seat_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY (booking_id, seat_id),
    FOREIGN KEY (booking_id) REFERENCES booking (id),
    FOREIGN KEY (seat_id) REFERENCES seat (id)
) ENGINE=InnoDB;
CREATE INDEX idx_booked_seat_booking_id ON booked_seat (booking_id);
CREATE INDEX idx_booked_seat_seat_id ON booked_seat (seat_id);