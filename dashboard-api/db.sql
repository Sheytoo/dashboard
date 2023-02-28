DROP TABLE IF EXISTS subscription, users_roles, widget_type, user, widget, role, service;

CREATE TABLE IF NOT EXISTS service
(
    id          INT          NOT NULL AUTO_INCREMENT,
    name        VARCHAR(255) UNIQUE NOT NULL,
    label       VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    image_url   VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS role
(
    id   INT          NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS user
(
    id       INT          NOT NULL AUTO_INCREMENT,
    email    VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name  VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS subscription
(
    user_id    INT NOT NULL,
    service_id INT NOT NULL,
    PRIMARY KEY (user_id, service_id),
    CONSTRAINT fk_subscription_user_id FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE,
    CONSTRAINT fk_subscription_service_id FOREIGN KEY (service_id) REFERENCES service (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS users_roles
(
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT fk_users_roles_user_id FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE,
    CONSTRAINT fk_users_roles_role_id FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS widget_type
(
    id         INT          NOT NULL AUTO_INCREMENT,
    name       VARCHAR(255) NOT NULL UNIQUE,
    label      VARCHAR(255) NOT NULL,
    service_id INT          NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_widget_type_service_id FOREIGN KEY (service_id) REFERENCES service (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS widget
(
    id         INT  NOT NULL AUTO_INCREMENT,
    type_id    INT  NOT NULL,
    user_id    INT  NOT NULL,
    parameters JSON NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_widget_type_id FOREIGN KEY (type_id) REFERENCES widget_type (id) ON DELETE CASCADE,
    CONSTRAINT fk_widget_user_id FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
);

INSERT INTO service (id, name, label, description, image_url)
VALUES (1, 'weather', 'Weather', 'A full-featured service for weather to have access to all weather data you need.', 'https://www.giuseppemaccario.com/wp-content/uploads/2020/05/OpenWeather-Logo.jpg'),
       (2, 'steam', 'Steam', 'A full-featured service for Steam to have access to all Steam data you need.', 'https://cdn.arstechnica.net/wp-content/uploads/2019/09/steam_logo_splash.png'),
       (3, 'crypto', 'Crypto Currency', 'A full-featured service for Crypto currency to have access to all Crypto data you need.', 'https://i.postimg.cc/G9wRT2QT/coingecko-ooks-coin-1.png'),
       (4, 'flight', 'Flight', 'A full-featured service for flights to have access to all flight data you need.', 'https://aerodatabox.com/wp-content/uploads/2022/05/Color-logo-no-background-300x300.png');

INSERT INTO role (name)
VALUES ('ROLE_USER'),
       ('ROLE_ADMIN');

INSERT INTO user (email, first_name, last_name, password)
VALUES ('user@localhost.me', 'User', 'User','$2y$10$0UXJGi2VIFSZacEIfGunmeKMkCyLiCKA3Hibc/OYEU/mUwFq8ZLGq'),
       ('admin@localhost.me', 'Admin', 'Admin', '$2y$10$0UXJGi2VIFSZacEIfGunmeKMkCyLiCKA3Hibc/OYEU/mUwFq8ZLGq'),
       ('nathan.blind-heitz@epitech.eu', 'Nathan', 'BLIND HEITZ','$2y$10$0UXJGi2VIFSZacEIfGunmeKMkCyLiCKA3Hibc/OYEU/mUwFq8ZLGq');

INSERT INTO users_roles (user_id, role_id)
VALUES (1, 1),
       (2, 1),
       (2, 2),
       (3, 1),
       (3, 2);

INSERT INTO widget_type (id, name, label, service_id)
VALUES (1, 'current_weather_city', 'Current weather for city', 1),
       (2, 'forecast_weather_city', 'Forecast weather for city', 1),
       (3, 'last_played_game', 'Steam last game played', 2),
       (4, 'lookup_steam_id', 'Steam ID lookup', 2),
       (5, 'current_crypto_price', 'Current crypto currency price', 3),
       (6, 'flight_status', 'Flight status for flight', 4);

INSERT INTO subscription (user_id, service_id)
VALUES (3, 1),
       (3, 2),
       (3, 3),
       (3, 4);

INSERT INTO widget (type_id, user_id, parameters)
VALUES (1, 3, '{"city": "Strasbourg", "refresh_interval": 30}'),
       (2, 3, '{"city": "Strasbourg", "refresh_interval": 30}'),
       (2, 3, '{"city": "Tokyo", "refresh_interval": 30}'),
       (3, 3, '{"steam_id": "76561198234875460", "refresh_interval": 300}'),
       (4, 3, '{"refresh_interval": 300}'),
       (3, 3, '{"steam_id": "76561198166534407", "refresh_interval": 300}'),
       (6, 3, '{"flight_number": "AFR66", "date": "2022-11-17", "refresh_interval": 600}'),
       (6, 3, '{"flight_number": "DAL265", "date": "2022-11-14", "refresh_interval": 600}'),
       (5, 3, '{"crypto_currency": "bitcoin", "currency": "eur", "days": 3, "refresh_interval": 20}'),
       (5, 3, '{"crypto_currency": "ethereum", "currency": "usd", "days": 6, "refresh_interval": 20}'),
       (5, 3, '{"crypto_currency": "dogecoin", "currency": "eur", "days": 15, "refresh_interval": 20}');

