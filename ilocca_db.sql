-- DROP DATABASE IF EXISTS `ilocca`;

-- USE `ilocca`;
-- CREATE TABLE users (
--   user_id INT NOT NULL AUTO_INCREMENT,
--   username VARCHAR(20) NOT NULL,
--   phone VARCHAR(20) NOT NULL,
--   user_pwd VARCHAR(20) NOT NULL,
--   createdAt TIMESTAMP,
--   PRIMARY KEY (user_id)
-- );

-- CREATE TABLE businesses (
--   business_id INT NOT NULL AUTO_INCREMENT,
--   title VARCHAR(50) NOT NULL,
--   business_desc VARCHAR(100) NOT NULL,
--   photo VARCHAR(100) NOT NULL,
--   rating INT DEFAULT 0 NOT NULL,
--   category VARCHAR(20) NOT NULL,
--   business_location VARCHAR(50) NOT NULL,
--   phone VARCHAR(20) NOT NULL,
--   business_owner VARCHAR(20) NOT NULL,
--   createdAt TIMESTAMP,
--   user_id INT,
--   PRIMARY KEY (business_id),
--   FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE RESTRICT
-- );




-- INSERT INTO users (username, phone, user_pwd) VALUES
-- ('kiprop', '+254 798556471', 'kiprop123'),
-- ('eric', '+254 798556471', 'eric123'),
-- ('ronalz', '+254 798556471', 'ronalz123'),
-- ('testuser', '+254 798556471', 'testuser123');


-- INSERT INTO businesses (title, business_desc, photo, category, business_location, phone, business_owner)
-- VALUES
-- ('comrade gas', 'We deliver the best gas in Athi Rive call now for orders', 'https://images.pexels.com/photos/2885993/pexels-photo-2885993.jpeg?auto=compress&cs=tinysrgb&w=400', 'housing', 'Daystar Athi River','+254 798 556471', 'kiprop'),
-- ('kiu fresh', 'We deliver water for free. Our water is affordable', 'https://images.pexels.com/photos/907865/pexels-photo-907865.jpeg?auto=compress&cs=tinysrgb&w=400', 'food&Drinks', 'Daystar Athi River','+254 798 556471', 'eric'),
-- ('Ronalz Candy', 'The best shop with affordable products at your convinience', 'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg?auto=compress&cs=tinysrgb&w=400', 'food&Drinks', 'Daystar Athi River','+254 798 556471', 'ronalz'),
-- ('test', 'test desc', 'https://images.pexels.com/photos/318236/pexels-photo-318236.jpeg?auto=compress&cs=tinysrgb&w=400', 'food&Drinks', 'test location','+254 798 556471', 'testuser');






















