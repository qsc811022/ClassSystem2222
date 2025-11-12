Course Management System

Overview

This is a course management system designed to manage classrooms, instructors, and courses, with a calendar view for students to check daily, weekly, or monthly course schedules. The system supports two roles: Admin (manages data) and Student (views course schedules).

Features





Admin Features:





Add, edit, or delete classrooms.



Add, edit, or delete instructors.



Add, edit, or delete courses with associated classrooms and instructors.



Student Features:





View a calendar displaying courses for the current week or month.



View today's courses with details (course title, time, classroom, instructor).



Calendar View:





Displays courses scheduled for today, this week, or this month.



Role-Based Access:





Admins have full management capabilities.



Students have read-only access to course schedules.

Database Structure

The system uses a MySQL database with the following 4 tables:





Classrooms





classroom_id (INT, PK, Auto-Increment): Unique identifier for classrooms.



name (VARCHAR(100)): Classroom name (e.g., "Room A").



capacity (INT): Maximum capacity of the classroom.



created_at (TIMESTAMP): Record creation time.



Instructors





instructor_id (INT, PK, Auto-Increment): Unique identifier for instructors.



name (VARCHAR(100)): Instructor's name.



email (VARCHAR(100)): Instructor's email (optional).



created_at (TIMESTAMP): Record creation time.



Courses





course_id (INT, PK, Auto-Increment): Unique identifier for courses.



title (VARCHAR(200)): Course title.



classroom_id (INT, FK): References Classrooms(classroom_id).



instructor_id (INT, FK): References Instructors(instructor_id).



start_time (DATETIME): Course start time.



end_time (DATETIME): Course end time.



created_at (TIMESTAMP): Record creation time.



Users





user_id (INT, PK, Auto-Increment): Unique identifier for users.



username (VARCHAR(50), Unique): User login name.



password (VARCHAR(255)): Hashed password.



role (ENUM('admin', 'student')): User role.



name (VARCHAR(100)): User's full name.



created_at (TIMESTAMP): Record creation time.

Key SQL Queries





Create Tables:

CREATE TABLE Classrooms (
    classroom_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    capacity INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Instructors (
    instructor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'student') NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



View Today's Courses (e.g., for 2025-08-27):

SELECT 
    c.course_id,
    c.title,
    c.start_time,
    c.end_time,
    cl.name AS classroom,
    i.name AS instructor
FROM Courses c
LEFT JOIN Classrooms cl ON c.classroom_id = cl.classroom_id
LEFT JOIN Instructors i ON c.instructor_id = i.instructor_id
WHERE DATE(c.start_time) = '2025-08-27'
ORDER BY c.start_time;



View Weekly/Monthly Courses:





Weekly (e.g., 2025-08-25 to 2025-08-31):

SELECT 
    c.course_id,
    c.title,
    c.start_time,
    c.end_time,
    cl.name AS classroom,
    i.name AS instructor
FROM Courses c
LEFT JOIN Classrooms cl ON c.classroom_id = cl.classroom_id
LEFT JOIN Instructors i ON c.instructor_id = i.instructor_id
WHERE c.start_time BETWEEN '2025-08-25 00:00:00' AND '2025-08-31 23:59:59'
ORDER BY c.start_time;



Monthly (e.g., August 2025):

SELECT 
    c.course_id,
    c.title,
    c.start_time,
    c.end_time,
    cl.name AS classroom,
    i.name AS instructor
FROM Courses c
LEFT JOIN Classrooms cl ON c.classroom_id = cl.classroom_id
LEFT JOIN Instructors i ON c.instructor_id = i.instructor_id
WHERE c.start_time BETWEEN '2025-08-01 00:00:00' AND '2025-08-31 23:59:59'
ORDER BY c.start_time;

Installation





Set Up MySQL:





Install MySQL (version 8.0 or higher recommended).



Create a database: CREATE DATABASE course_management;



Run the table creation SQL scripts provided above.



Backend Setup (Optional, if building an application):





Use a backend framework (e.g., Node.js with Express, Python with Flask/Django).



Connect to the MySQL database using appropriate drivers (e.g., mysql2 for Node.js, PyMySQL for Python).



Implement API endpoints for:





Admin: CRUD operations for Classrooms, Instructors, Courses.



Student: Read-only access to Courses with joins to Classrooms and Instructors.



Frontend Setup:





Use a calendar library (e.g., FullCalendar) for the calendar view.



Display today's courses in a list or table format.



Implement role-based authentication (check Users.role).



Dependencies:





MySQL



Backend: Node.js/Python (optional)



Frontend: JavaScript with FullCalendar, or a framework like React

Usage





Admin:





Log in with an admin account (role = 'admin').



Add classrooms (e.g., "Room A", capacity 30).



Add instructors (e.g., "張老師", email).



Schedule courses with title, classroom, instructor, and time.



Example SQL for adding data:

INSERT INTO Classrooms (name, capacity) VALUES ('Room A', 30);
INSERT INTO Instructors (name, email) VALUES ('張老師', 'zhang@example.com');
INSERT INTO Courses (title, classroom_id, instructor_id, start_time, end_time)
VALUES ('Math Basics', 1, 1, '2025-08-27 10:00:00', '2025-08-27 12:00:00');



Student:





Log in with a student account (role = 'student').



View today's courses (title, time, classroom, instructor).



Use the calendar to browse weekly or monthly course schedules.

Technical Notes





Database: MySQL with foreign key constraints for data integrity.



Security:





Store passwords in Users table as hashed values (e.g., using bcrypt).



Implement role-based access control in the application layer.



Calendar: Use FullCalendar or similar for interactive course display.



Scalability:





Add indexes on Courses.start_time for faster date-based queries.



Consider adding a CourseSchedules table for recurring courses if needed.

Future Enhancements





Add course categories or types (e.g., "Math", "Science").



Support recurring course schedules.



Allow students to filter courses by instructor or classroom.

License

MIT License