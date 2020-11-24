DROP DATABASE IF EXISTS quote;
DROP USER IF EXISTS quote_user@localhost;

CREATE DATABASE quote CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER quote_user@localhost IDENTIFIED BY '749173@JmU!EdU';
GRANT ALL PRIVILEGES ON quote.* TO quote_user@localhost;

