// 🔧 測試登入 API
import axios from "axios";

async function testLogin() {
  try {
    console.log("🔍 測試登入 API...");
    
    const response = await axios.post("http://localhost:3000/api/auth/login", {
      email: "test@example.com",
      password: "123456"
    });
    
    console.log("✅ 登入成功!");
    console.log("🎫 Token:", response.data.token);
    console.log("👤 User:", response.data.user);
    
  } catch (error) {
    console.error("❌ 登入失敗:");
    console.error("Status:", error.response?.status);
    console.error("Error:", error.response?.data);
  }
}

testLogin();