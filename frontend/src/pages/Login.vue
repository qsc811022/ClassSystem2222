<script setup lang="ts">
import { ref } from "vue";
import api from "@/services/api";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const email = ref("");
const password = ref("");
const auth = useAuthStore();
const router = useRouter();

// Login.vue
async function handleLogin() {
  try {
    // 🔧 驗證輸入
    if (!email.value || !password.value) {
      alert("請輸入 email 和密碼");
      return;
    }

    console.log("🔍 嘗試登入:", { email: email.value, password: "***" });
    
    const res = await api.post("/auth/login", { 
      email: email.value, 
      password: password.value 
    });

    console.log("✅ 登入成功:", res.data);

    // ✅ 保存 token & user
    auth.setToken(res.data.token);
    auth.setUser(res.data.user);
    
    console.log("💾 用戶資料已保存:", auth.user);

    // ✅ 登入成功後跳轉
    router.push("/courses");
  } catch (err: any) {
    console.error("❌ 登入失敗:", err);
    console.error("❌ 錯誤詳情:", err.response?.data);
    
    const errorMsg = err.response?.data?.error || "登入失敗，請檢查帳號密碼";
    alert(errorMsg);
  }
}
function handleGoogleLogin() {
  // 導向後端 Google OAuth http://192.168.35.113:5555
  window.location.href = "http://localhost:5555/api/auth/google";
}

function handleFacebookLogin() {
  window.location.href = "http://localhost:5555/api/auth/facebook";
}
onMounted(() => {
  try {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");
    const name = url.searchParams.get("name");
    const email = url.searchParams.get("email");
    const role = url.searchParams.get("role");
    const error = url.searchParams.get("error");

    console.log("🔍 URL 參數:", { token: !!token, name, email, role, error });

    // 🔧 處理 OAuth 登入錯誤
    if (error === "auth_failed") {
      alert("登入失敗，請再試一次");
      window.history.replaceState({}, document.title, "/login");
      return;
    }

    // 🔧 處理成功的 OAuth 登入
    if (token) {
      console.log("✅ OAuth 登入成功", { name, email, role });
      
      // 存到 Pinia
      auth.setToken(token);
      auth.setUser({ 
        name: name || "未知用戶", 
        email: email || "", 
        role: role || "student" 
      });

      console.log("💾 已存儲用戶資料:", auth.user);

      // 清理 URL
      window.history.replaceState({}, document.title, "/login");

      // 等待一下再跳轉
      setTimeout(() => {
        console.log("🚀 跳轉到課程頁面");
        router.push("/courses");
      }, 100);
    }
  } catch (err) {
    console.error("❌ onMounted 錯誤:", err);
    alert("登入處理失敗，請重新登入");
  }
});

</script>

<template>
  <div class="login-container">
    <h1>登入系統</h1>

    <!-- Email/Password 登入 -->
    <div class="form-box">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="handleLogin">登入</button>
    </div>

    <div class="divider">或</div>
    <div class="social-login">
    <!-- Google 登入 -->
    <button class="google-btn" @click="handleGoogleLogin">
      <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" />
      使用 Google 登入
    </button>

    <!-- Facebook 登入 -->
    <button class="facebook-btn" @click="handleFacebookLogin">
      <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
      使用 Facebook 登入
    </button>


    </div>

    
    <!-- ✅ 註冊導向 -->
    <p class="register-link">
      還沒有帳號？
      <router-link to="/register">去註冊</router-link>
    </p>
  </div>

</template>

<style scoped>
.register-link {
  margin-top: 1rem;
  font-size: 0.9rem;
}
.register-link a {
  color: #1976d2;
  text-decoration: none;
  font-weight: bold;
}
.register-link a:hover {
  text-decoration: underline;
}
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
}

h1 {
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.form-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

button {
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}
.social-login {
  display: flex;

  gap: 20px;
}

.google-btn {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
}

.google-btn img {
  width: 20px;
  height: 20px;
}

.facebook-btn {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #1877f2;
  color: white;
  border: none;
  padding: 5px;
  border-radius: 6px;
  cursor: pointer;
}

.facebook-btn img {
  width: 20px;
  height: 20px;
  filter: brightness(0) invert(1);
}

.divider {
  margin: 1rem 0;
  font-size: 0.9rem;
  color: #888;
}
</style>
