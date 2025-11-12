<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

// 登出功能
function handleLogout() {
  auth.clearAuth(); // ✅ 清空 token & user
  router.push("/login"); // ✅ 回到登入頁
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-left">
      <h2>ClassSystem</h2>
    </div>
    <div class="navbar-right" v-if="auth.user">
      <span class="user-info">
        {{ auth.user.name }}（{{ auth.user.role }}）
      </span>
      <button class="logout-btn" @click="handleLogout">登出</button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #1976d2;
  color: white;
}

.navbar-left h2 {
  margin: 0;
}

.user-info {
  margin-right: 1rem;
}

.logout-btn {
  background: #e53935;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  color: white;
}

.logout-btn:hover {
  background: #c62828;
}
</style>
