CREATE TABLE category (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    category_id BIGINT
);


CREATE TABLE product (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price BIGINT NOT NULL,
    rating BIGINT,
    category_id BIGINT REFERENCES category(id),
    count BIGINT,
    image_url VARCHAR(255)
);



CREATE TABLE customers (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    full_name VARCHAR(255) NOT NULL,
    email TEXT NOT NULL,
    phone_number VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    address TEXT,
    registration_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE orders (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    customer_id BIGINT REFERENCES customers(id),
    address TEXT,
    order_status TEXT
);




CREATE TABLE order_items (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    order_id BIGINT REFERENCES orders(id),
    product_id BIGINT REFERENCES product(id),
    quantity BIGINT NOT NULL,
    price BIGINT NOT NULL
);




CREATE TABLE contract_type (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    type VARCHAR(255),
    duration BIGINT,
    percentage DECIMAL(5,2)
);





CREATE TABLE contract (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    customer_id BIGINT REFERENCES customers(id),
    order_id BIGINT REFERENCES orders(id),
    monthly_payment BIGINT,
    contract_type_id BIGINT REFERENCES contract_type(id),
    contract_status VARCHAR(50),
    starting_payment_percent DECIMAL(5,2),
    total_payment BIGINT
);




CREATE TABLE payments (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    customer_id BIGINT REFERENCES customers(id),
    total_price DECIMAL(15,2) NOT NULL,
    contract_id BIGINT REFERENCES contract(id)
);
