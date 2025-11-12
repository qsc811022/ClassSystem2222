import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";

// 定義 Instructor Model
export class Instructor extends Model {
  declare instructor_id: number;
  declare name: string;
  declare email: string | null;
}

Instructor.init(
  {
    instructor_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true, // email 可以是 null
    },
  },
  {
    sequelize,
    tableName: "Instructors",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);
