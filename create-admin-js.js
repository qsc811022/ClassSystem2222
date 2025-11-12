// 🔧 純 JavaScript 版本的管理員創建腳本
import { Sequelize, DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

// 載入環境變數
dotenv.config();

// 創建 Sequelize 連接
const sequelize = new Sequelize(
  process.env.DB_NAME || "classhub1",
  process.env.DB_USER || "Admin1", 
  process.env.DB_PASSWORD || "1qaz!QAZ",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false
  }
);

// 定義 User 模型
const User = sequelize.define("User", {
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM("admin", "student"),
    allowNull: false,
    defaultValue: "student",
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
}, {
  tableName: "Users",
  timestamps: false,
});

async function createAdmin() {
  try {
    console.log("🔍 檢查管理員帳號...");
    
    const adminEmail = "admin@example.com";
    const adminPassword = "admin123";
    
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });
    
    if (!existingAdmin) {
      console.log("🔧 創建管理員帳號...");
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      
      await User.create({
        email: adminEmail,
        password: hashedPassword,
        name: "系統管理員",
        role: "admin"
      });
      
      console.log("✅ 管理員帳號創建成功!");
      console.log(`📧 Email: ${adminEmail}`);
      console.log(`🔑 Password: ${adminPassword}`);
    } else {
      console.log("ℹ️ 管理員帳號已存在");
      console.log(`📧 Email: ${adminEmail}`);
    }
    
  } catch (error) {
    console.error("❌ 錯誤:", error);
  } finally {
    await sequelize.close();
  }
}

createAdmin();