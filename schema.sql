DROP TABLE IF EXISTS aircrafts;
CREATE TABLE aircrafts
(
    id SERIAL PRIMARY KEY,
    registration_number VARCHAR(255),
    aircraft_type VARCHAR(255),
    squawk_code INT,   
    latitude FLOAT(40),
    longitude FLOAT(40),
    altitude INT
);

INSERT INTO aircrafts
VALUES
(
    1,
    'N857EF',
    'SR20',
    1200,
    33.975068,
    -113.90221544,
    25765
);