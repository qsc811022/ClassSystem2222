-- 教室表
CREATE TABLE Classrooms (
    classroom_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    capacity INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 講師表
CREATE TABLE Instructors (
    instructor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 課程表
CREATE TABLE Courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    classroom_id INT,
    instructor_id INT,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (classroom_id) REFERENCES Classrooms(classroom_id) ON DELETE SET NULL,
    FOREIGN KEY (instructor_id) REFERENCES Instructors(instructor_id) ON DELETE SET NULL
);

-- 使用者表
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- 假設密碼已加密
    role ENUM('admin', 'student') NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users
ADD COLUMN google_id VARCHAR(255) UNIQUE NULL AFTER user_id,
ADD COLUMN email VARCHAR(255) UNIQUE NULL AFTER username;

ALTER TABLE Users MODIFY COLUMN username VARCHAR(50) NULL;
ALTER TABLE Users MODIFY COLUMN password VARCHAR(255) NULL;
ALTER TABLE Users ADD COLUMN facebook_id VARCHAR(255) UNIQUE NULL AFTER google_id;

