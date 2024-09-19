
CREATE TABLE IF NOT EXISTS customer (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE
);
CREATE INDEX idx_user_username ON customer(username);
CREATE INDEX idx_user_email ON customer(email);


CREATE TABLE IF NOT EXISTS customer_profile (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES customer(id),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone_number VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE
);
CREATE INDEX idx_customer_profile_customer_id ON customer_profile(customer_id);


CREATE TABLE IF NOT EXISTS movie (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration_minutes INTEGER NOT NULL,
    release_date DATE,
    genre VARCHAR(50),
    rating VARCHAR(10),
    trailer_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE
);
CREATE INDEX idx_movie_title ON movie(title);
CREATE INDEX idx_movie_release_date ON movie(release_date);
CREATE INDEX idx_movie_genre ON movie(genre);


CREATE TABLE IF NOT EXISTS theater (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    num_seats INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE

);
CREATE INDEX idx_theater_name ON theater(name);


CREATE TABLE IF NOT EXISTS show (
    id SERIAL PRIMARY KEY,
    movie_id INTEGER NOT NULL REFERENCES movie(id),
    theater_id INTEGER NOT NULL REFERENCES theater(id),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE
);
CREATE INDEX idx_show_movie_id ON show(movie_id);
CREATE INDEX idx_show_theater_id ON show(theater_id);
CREATE INDEX idx_show_start_time ON show(start_time);


CREATE TABLE IF NOT EXISTS featured_movie (
    id SERIAL PRIMARY KEY,
    movie_id INTEGER NOT NULL REFERENCES movie(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE

);
CREATE INDEX idx_featured_movie_movie_id ON featured_movie(movie_id);
CREATE INDEX idx_featured_movie_date_range ON featured_movie(start_date, end_date);

-- Promotion table
CREATE TABLE IF NOT EXISTS promotion (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    discount_type VARCHAR(20), -- PERCENT, AMOUNT
    discount_value DECIMAL(5, 2),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE

);
CREATE INDEX idx_promotion_code ON promotion(code);
CREATE INDEX idx_promotion_date_range ON promotion(start_date, end_date);


CREATE TABLE IF NOT EXISTS credit_card (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customer(id),
    card_type varchar(20),
    name varchar(255)
    card_number VARCHAR(20),
    cvv VARCHAR(3),
    expiration_date DATE,
    billing_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE
);
CREATE INDEX idx_credit_card_user_id ON credit_card(user_id);
CREATE INDEX idx_credit_card_type ON credit_card(method_type);


CREATE TABLE IF NOT EXISTS booking (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES customer(id),
    show_id INTEGER NOT NULL REFERENCES show(id),
    credit_card_id INTEGER NOT NULL REFERENCES credit_card(id),
    promotion_id INTEGER REFERENCES promotion(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL, -- CREATED, CONFIRMED, CANCELED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE
);
CREATE INDEX idx_booking_user_id ON booking(user_id);
CREATE INDEX idx_booking_show_id ON booking(show_id);
CREATE INDEX idx_booking_credit_card_id ON booking(credit_card_id);
CREATE INDEX idx_booking_promotion_id ON booking(promotion_id);
CREATE INDEX idx_booking_date ON booking(booking_date);
CREATE INDEX idx_booking_status ON booking(status);


CREATE TABLE IF NOT EXISTS seat (
    id SERIAL PRIMARY KEY,
    theater_id INTEGER NOT NULL REFERENCES theater(id),
    row_number VARCHAR(5) NOT NULL,
    seat_number VARCHAR(5) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    UNIQUE (theater_id, row_number, seat_number)
);
CREATE INDEX idx_seat_theater_id ON seat(theater_id);


CREATE TABLE IF NOT EXISTS ticket (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER NOT NULL REFERENCES booking(id),
    seat_id INTEGER NOT NULL REFERENCES seat(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    UNIQUE (booking_id, seat_id)
);
CREATE INDEX idx_ticket_booking_id ON ticket(booking_id);
CREATE INDEX idx_ticket_seat_id ON ticket(seat_id);