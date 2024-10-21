CREATE TABLE IF NOT EXISTS customer (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone_number VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_customer_username ON customer(username);
CREATE INDEX IF NOT EXISTS idx_customer_email ON customer(email);


CREATE TABLE IF NOT EXISTS movie (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration_minutes INTEGER NOT NULL,
    release_date DATE,
    genre VARCHAR(50),
    rating VARCHAR(10),
    poster_url TEXT,
    trailer_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_movie_title ON movie(title);
CREATE INDEX IF NOT EXISTS idx_movie_release_date ON movie(release_date);
CREATE INDEX IF NOT EXISTS idx_movie_genre ON movie(genre);


CREATE TABLE IF NOT EXISTS theater (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    num_seats INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_theater_name ON theater(name);


CREATE TABLE IF NOT EXISTS show (
    id SERIAL PRIMARY KEY,
    movie_id INTEGER NOT NULL REFERENCES movie(id),
    theater_id INTEGER NOT NULL REFERENCES theater(id),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_show_movie_id ON show(movie_id);
CREATE INDEX IF NOT EXISTS idx_show_theater_id ON show(theater_id);
CREATE INDEX IF NOT EXISTS idx_show_start_time ON show(start_time);


CREATE TABLE IF NOT EXISTS promotion (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    promotion_value DECIMAL(5, 2),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
CREATE INDEX IF NOT EXISTS idx_promotion_code ON promotion(code);
CREATE INDEX IF NOT EXISTS idx_promotion_date_range ON promotion(start_date, end_date);


CREATE TABLE IF NOT EXISTS credit_card (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customer(id),
    card_type varchar(20),
    name varchar(255),
    card_number VARCHAR(20),
    cvv VARCHAR(3),
    expiration_date DATE,
    billing_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_credit_card_customer_id ON credit_card(customer_id);
CREATE INDEX IF NOT EXISTS idx_credit_card_number ON credit_card(card_number);
CREATE INDEX IF NOT EXISTS idx_credit_card_name ON credit_card(name);

CREATE TABLE IF NOT EXISTS booking (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customer(id),
    show_id INTEGER NOT NULL REFERENCES show(id),
    credit_card_id INTEGER NOT NULL REFERENCES credit_card(id),
    promotion_id INTEGER REFERENCES promotion(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL, -- CREATED, CONFIRMED, CANCELED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_booking_customer_id ON booking(customer_id);
CREATE INDEX IF NOT EXISTS idx_booking_show_id ON booking(show_id);
CREATE INDEX IF NOT EXISTS idx_booking_credit_card_id ON booking(credit_card_id);
CREATE INDEX IF NOT EXISTS idx_booking_promotion_id ON booking(promotion_id);
CREATE INDEX IF NOT EXISTS idx_booking_status ON booking(status);


CREATE TABLE IF NOT EXISTS seat (
    id SERIAL PRIMARY KEY,
    theater_id INTEGER NOT NULL REFERENCES theater(id),
    seat_row VARCHAR(5) NOT NULL,
    seat_number VARCHAR(5) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (theater_id, seat_row, seat_number)
);
CREATE INDEX IF NOT EXISTS idx_seat_theater_id ON seat(theater_id);


CREATE TABLE IF NOT EXISTS ticket (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER NOT NULL REFERENCES booking(id),
    seat_id INTEGER NOT NULL REFERENCES seat(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (booking_id, seat_id)
);
CREATE INDEX IF NOT EXISTS idx_ticket_booking_id ON ticket(booking_id);
CREATE INDEX IF NOT EXISTS idx_ticket_seat_id ON ticket(seat_id);
