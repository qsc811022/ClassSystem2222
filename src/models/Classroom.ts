import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";

// 定義 Classroom Model
export class Classroom extends Model {
  declare classroom_id: number;
  declare name: string;
  declare capacity: number;
}

Classroom.init(
  {
    classroom_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true, // 可以允許 null（因為有些教室可能不設定容量）
    },
  },
  {
    sequelize,
    tableName: "Classrooms",
    timestamps: true,       // 會加 createdAt / updatedAt
    createdAt: "created_at",
    updatedAt: false,       // 只需要 created_at
  }
);
