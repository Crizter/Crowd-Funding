DROP TABLE  IF EXISTS users  CASCADE ; 


CREATE TABLE users (
    id serial primary key  ,
    name VARCHAR(45) NOT NULL, 
    email  VARCHAR(200) UNIQUE NOT NULL, 
    password VARCHAR(200) NOT NULL
) ; 

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    creator_id INT REFERENCES users(id) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    funding_goal NUMERIC(12,2) NOT NULL,
    amount_raised NUMERIC(12,2) DEFAULT 0,
    deadline TIMESTAMP NOT NULL,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



  CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    project_id  INT NOT NULL,
    user_id INT NOT NULL,
    transaction_amount DECIMAL(10, 2) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);



CREATE TABLE comments (
    id SERIAL PRIMARY KEY NOT NULL,
    creator_id INT REFERENCES users(id) NOT NULL,
    project_id INT REFERENCES projects(id) NOT NULL,
    comment VARCHAR(500) NOT NULL
);

