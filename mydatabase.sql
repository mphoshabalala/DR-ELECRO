CREATE TABLE customer(
    customer_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(225) NOT NULL, 
    customer_gmail TEXT(1000) NOT NULL,
    customer_password VARCHAR(225) NOT NULL,
    customer_confirm_password VARCHAR(225) NOT NULL
);

CREATE TABLE item(
    item_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    item_name VARCHAR(255) NOT NULL,
    item_description TEXT(1000) NOT NULL,
    item_price VARCHAR(255) NOT NULL
);

CREATE TABLE cart(
    cart_id INT NOT NULL AUTO_INCREMENT,
    item_id INT NOT NULL,
    customer_id INT NOT NULL,
    FOREIGN KEY (item_id) REFERENCES item(item_id),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);


CREATE TABLE comment(
    comment_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    comment TEXT(1000) NOT NULL,
    customer_id INT NOT NULL,
    purchase_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    FOREIGN KEY (purchase_id) REFERENCES purchase(purchase_id)
);

CREATE TABLE purchase(
    purchase_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    item_id INT NOT NULL,
    customer_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    FOREIGN KEY (item_id) REFERENCES item(item_id)
);