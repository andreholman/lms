CREATE TABLE IF NOT EXISTS branches (
    branch_id SERIAL PRIMARY KEY,
    branch_name VARCHAR(255) UNIQUE NOT NULL,
    address VARCHAR(255) UNIQUE NOT NULL,
    contact_number VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS items (
    item_id SERIAL PRIMARY KEY,
    ISBN VARCHAR(20) UNIQUE,
    title VARCHAR(255),
    author VARCHAR(255),
    publication_year SMALLINT,
    total_copies SMALLINT,
    available_copies SMALLINT
);

CREATE TABLE IF NOT EXISTS members (
    member_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    contact_number INT UNIQUE,
    outstanding_fines NUMERIC(6, 2) NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS borrowed (
    borrowing_id SERIAL PRIMARY KEY,
    item_id INT,
    member_id INT,
    borrow_date DATE,
    return_date DATE,
    FOREIGN KEY (item_id) REFERENCES items(item_id),
    FOREIGN KEY (member_id) REFERENCES members(member_id)
);

INSERT INTO branches (branch_name, address, contact_number) VALUES ('Detroit', '1155 Taylor St, Detroit, MI 48202', 2485401444);
INSERT INTO branches (branch_name, address, contact_number) VALUES ('Newport', '3 Moosehead Trail, Newport, ME 04953', 2073684242);
INSERT INTO branches (branch_name, address, contact_number) VALUES ('San Jose', '880 Tully Rd, San Jose, CA 95111', 4088083030);