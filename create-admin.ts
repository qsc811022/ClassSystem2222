// 🔧 創建管理員帳號的腳本 (TypeScript 版本)
import { User } from "./src/models/User.js";
import bcrypt from "bcryptjs";

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
  }
}

createAdmin();