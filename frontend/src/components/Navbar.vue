<!-- src/components/Navbar.vue -->

<template>
  <nav class="navbar">
    <h2>📘 課程系統</h2>

    <div class="nav-links">
      <!-- 學生 or 管理員 都能看到 -->
      <router-link to="/courses">課程清單</router-link>
      <router-link to="/calendar">📅 課程月曆</router-link>

      <!-- 右上角使用者資訊 -->
      <span v-if="auth.user">
        {{ auth.user.name }} ({{ auth.user.role }})
      </span>
      <button v-if="auth.user" @click="logout">登出</button>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

function logout() {
  auth.logout();       // ✅ 清空 token & user
  router.push("/login"); // ✅ 回到登入頁
  console.log("✅ 已登出");
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: #1976d2;
  color: white;
}

.nav-links {
  display: flex;
  gap: 15px;
  align-items: center;
}

a {
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

button {
  background: #e53935;
  border: none;
  padding: 5px 10px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  opacity: 0.8;
}
</style>