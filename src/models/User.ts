import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";

// 定義 User Model
export class User extends Model {
  declare user_id: number;        // 主鍵
  declare google_id: string | null; // Google OAuth 專用 ID（可能為 null）
  declare username: string | null;  // 本地登入帳號（可能為 null）
  declare email: string | null;     // Email（Google 或本地註冊）
  declare password: string | null;  // 密碼（Google 登入用戶可能為 null）
  declare role: "admin" | "student"; // 使用者角色
  declare name: string | null;      // 顯示名稱
  declare created_at: Date;         // 建立時間
}

// 初始化 User Model
User.init(
  {
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    google_id: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: true, // 傳統帳號可以不用
    },
    username: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: true, // Google 帳號可能沒有 username
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: true, // 有些舊資料可能沒有 email
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true, // Google 登入不需要密碼
    },
    role: {
      type: DataTypes.ENUM("admin", "student"),
      allowNull: false,
      defaultValue: "student", // 預設新帳號都是學生
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "Users",
    timestamps: false, // 你資料表裡沒有 updated_at，所以先關閉
  }
);
