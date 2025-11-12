<script setup lang="ts">
import { ref } from "vue";
import api from "@/services/api";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();
const loading = ref(false);

async function handleRegister() {
  try {
    // 🔧 驗證輸入
    if (!name.value || !email.value || !password.value) {
      alert("請填寫所有欄位");
      return;
    }

    if (password.value.length < 6) {
      alert("密碼至少需要 6 個字元");
      return;
    }

    loading.value = true;
    console.log("🔍 嘗試註冊:", { name: name.value, email: email.value });
    
    const res = await api.post("/auth/register", {
      name: name.value,
      email: email.value,
      password: password.value,
      role: "student", // 預設學生
    });

    console.log("✅ 註冊成功:", res.data);
    alert("註冊成功！請使用帳號登入");
    router.push("/login");
  } catch (err: any) {
    console.error("❌ 註冊失敗:", err);
    console.error("❌ 錯誤詳情:", err.response?.data);
    
    const errorMsg = err.response?.data?.error || "註冊失敗";
    alert(errorMsg);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="register-container">
    <h1>註冊新帳號</h1>

    <div class="form-box">
      <input v-model="name" placeholder="姓名" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="密碼" />

      <button :disabled="loading" @click="handleRegister">
        {{ loading ? "註冊中..." : "註冊" }}
      </button>
    </div>

    <p>
      已經有帳號了？
      <router-link to="/login">去登入</router-link>
    </p>
  </div>
</template>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
.form-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 1rem;
}
input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
button {
  padding: 10px;
  border: none;
  border-radius: 6px;
  background: #4caf50;
  color: white;
  cursor: pointer;
}
button:disabled {
  background: #9e9e9e;
}
</style>
