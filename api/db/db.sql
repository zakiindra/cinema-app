
CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
);
CREATE INDEX idx_user_username ON "user"(username);
CREATE INDEX idx_user_email ON "user"(email);


CREATE TABLE IF NOT EXISTS user_profile (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES "user"(id),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone_number VARCHAR(20),
    birth_date DATE,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
);
CREATE INDEX idx_user_profile_user_id ON user_profile(user_id);


CREATE TABLE IF NOT EXISTS movie (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL,
    release_date DATE,
    genre VARCHAR(50),
    rating VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
);
CREATE INDEX idx_movie_title ON movie(title);
CREATE INDEX idx_movie_release_date ON movie(release_date);
CREATE INDEX idx_movie_genre ON movie(genre);

-- Theater table
CREATE TABLE IF NOT EXISTS theater (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location TEXT,
    total_seats INTEGER NOT NULL
);
CREATE INDEX idx_theater_name ON theater(name);

-- Showtime table
CREATE TABLE IF NOT EXISTS showtime (
    id SERIAL PRIMARY KEY,
    movie_id INTEGER NOT NULL REFERENCES movie(id),
    theater_id INTEGER NOT NULL REFERENCES theater(id),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);
CREATE INDEX idx_showtime_movie_id ON showtime(movie_id);
CREATE INDEX idx_showtime_theater_id ON showtime(theater_id);
CREATE INDEX idx_showtime_start_time ON showtime(start_time);

-- Featured movie table
CREATE TABLE IF NOT EXISTS featured_movie (
    id SERIAL PRIMARY KEY,
    movie_id INTEGER NOT NULL REFERENCES movie(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);
CREATE INDEX idx_featured_movie_movie_id ON featured_movie(movie_id);
CREATE INDEX idx_featured_movie_date_range ON featured_movie(start_date, end_date);

-- Promotion table
CREATE TABLE IF NOT EXISTS promotion (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    discount_type VARCHAR(20), -- PERCENT, AMOUNT
    value DECIMAL(5, 2),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);
CREATE INDEX idx_promotion_code ON promotion(code);
CREATE INDEX idx_promotion_date_range ON promotion(start_date, end_date);

-- Payment method table
CREATE TABLE IF NOT EXISTS payment_method (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES "user"(id),
    method_type VARCHAR(50) NOT NULL,
    details JSONB
);
CREATE INDEX idx_payment_method_user_id ON payment_method(user_id);
CREATE INDEX idx_payment_method_type ON payment_method(method_type);

-- Booking table
CREATE TABLE IF NOT EXISTS booking (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES "user"(id),
    showtime_id INTEGER NOT NULL REFERENCES showtime(id),
    payment_method_id INTEGER NOT NULL REFERENCES payment_method(id),
    promotion_id INTEGER REFERENCES promotion(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) NOT NULL -- CREATED, CONFIRMED, CANCELED
);
CREATE INDEX idx_booking_user_id ON booking(user_id);
CREATE INDEX idx_booking_showtime_id ON booking(showtime_id);
CREATE INDEX idx_booking_payment_method_id ON booking(payment_method_id);
CREATE INDEX idx_booking_promotion_id ON booking(promotion_id);
CREATE INDEX idx_booking_date ON booking(booking_date);
CREATE INDEX idx_booking_status ON booking(status);

-- Seat table
CREATE TABLE IF NOT EXISTS seat (
    id SERIAL PRIMARY KEY,
    theater_id INTEGER NOT NULL REFERENCES theater(id),
    row_number VARCHAR(5) NOT NULL,
    seat_number VARCHAR(5) NOT NULL,
    UNIQUE (theater_id, row_number, seat_number)
);
CREATE INDEX idx_seat_theater_id ON seat(theater_id);

-- Booked seat table
CREATE TABLE IF NOT EXISTS booked_seat (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER NOT NULL REFERENCES booking(id),
    seat_id INTEGER NOT NULL REFERENCES seat(id),
    UNIQUE (booking_id, seat_id)
);
CREATE INDEX idx_booked_seat_booking_id ON booked_seat(booking_id);
CREATE INDEX idx_booked_seat_seat_id ON booked_seat(seat_id);