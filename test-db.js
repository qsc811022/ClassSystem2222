// 🔧 測試資料庫連接和創建測試用戶
import { User } from "./src/models/User.js";
import bcrypt from "bcryptjs";

async function testDB() {
  try {
    console.log("🔍 檢查資料庫連接...");
    
    // 檢查現有用戶
    const users = await User.findAll();
    console.log("📊 現有用戶數量:", users.length);
    
    if (users.length > 0) {
      console.log("👥 現有用戶:");
      users.forEach(user => {
        console.log(`- ${user.email} (${user.role}) - 密碼: ${user.password ? '有' : '無'}`);
      });
    }
    
    // 創建測試用戶
    const testEmail = "test@example.com";
    const testPassword = "123456";
    
    const existingUser = await User.findOne({ where: { email: testEmail } });
    
    if (!existingUser) {
      console.log("🔧 創建測試用戶...");
      const hashedPassword = await bcrypt.hash(testPassword, 10);
      
      await User.create({
        email: testEmail,
        password: hashedPassword,
        name: "測試用戶",
        role: "student"
      });
      
      console.log("✅ 測試用戶創建成功!");
      console.log(`📧 Email: ${testEmail}`);
      console.log(`🔑 Password: ${testPassword}`);
    } else {
      console.log("ℹ️ 測試用戶已存在");
    }
    
  } catch (error) {
    console.error("❌ 錯誤:", error);
  }
}

testDB();