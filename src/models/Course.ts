import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";
import { Classroom } from "./Classroom.js";
import { Instructor } from "./Instructor.js";

// 定義 Course Model
export class Course extends Model {
  declare course_id: number;
  declare title: string;
  declare start_time: Date;
  declare end_time: Date;
  declare classroom_id: number | null;
  declare instructor_id: number | null;
}

Course.init(
  {
    course_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    classroom_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "Classrooms", key: "classroom_id" },
      onDelete: "SET NULL",
    },
    instructor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "Instructors", key: "instructor_id" },
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    tableName: "Courses",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

// 關聯：Course 屬於 Classroom 與 Instructor
Course.belongsTo(Classroom, { foreignKey: "classroom_id" });
Course.belongsTo(Instructor, { foreignKey: "instructor_id" });

// 如果要反查：
// Classroom.hasMany(Course, { foreignKey: "classroom_id" });
// Instructor.hasMany(Course, { foreignKey: "instructor_id" });
