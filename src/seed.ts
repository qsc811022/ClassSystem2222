import { sequelize } from "./config/sequelize.js";
import { User } from "./models/User.js";
import { Classroom } from "./models/Classroom.js";
import { Instructor } from "./models/Instructor.js";
import { Course } from "./models/Course.js";

async function seed() {
  try {
    await sequelize.sync({ force: true });
    console.log("🔄 Database synced. Inserting seed data...");

    // Users
    const admin = await User.create({
      username: "admin",
      password: "hashed_password_here",
      role: "admin",
      name: "系統管理員",
    });
    console.log("✅ Admin user created:", admin.username);

    const student = await User.create({
      username: "student1",
      password: "hashed_password_here",
      role: "student",
      name: "小明",
    });
    console.log("✅ Student user created:", student.username);

    // Classroom
    const classroom = await Classroom.create({
      name: "Room A",
      capacity: 30,
    });
    console.log("✅ Classroom created:", classroom.name);

    // Instructor
    const instructor = await Instructor.create({
      name: "張老師",
      email: "zhang@example.com",
    });
    console.log("✅ Instructor created:", instructor.name);

    // Course
    const course = await Course.create({
      title: "Math Basics",
      classroom_id: classroom.classroom_id,
      instructor_id: instructor.instructor_id,
      start_time: new Date("2025-08-27T10:00:00"),
      end_time: new Date("2025-08-27T12:00:00"),
    });
    console.log("✅ Course created:", course.title);

    console.log("🎉 Seed data inserted successfully!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await sequelize.close();
  }
}

seed();
