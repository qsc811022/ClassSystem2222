<template>
  <nav class="navigation">
    <div class="nav-brand">
      <h2>📚 L305-JS轉職班課程表</h2>
    </div>
    
    <div class="nav-links" v-if="auth.isAuthenticated">
      <router-link to="/courses" class="nav-link">課程列表</router-link>
      <router-link to="/calendar" class="nav-link">課程日曆</router-link>
      <router-link v-if="auth.isAdmin" to="/admin" class="nav-link admin-link">🔧 管理面板</router-link>
    </div>
    
    <div class="nav-user" v-if="auth.user">
      <span class="user-info">
        👤 {{ auth.user.name }} ({{ auth.user.role }})
      </span>
      <button class="logout-btn" @click="logout">登出</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

function logout() {
  auth.logout();
  router.push("/login");
  console.log("✅ 已登出");
}
</script>

<style scoped>
.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #6fb6fd;
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-brand h2 {
  margin: 0;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: rgba(255,255,255,0.2);
}

.nav-user {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  font-size: 0.9rem;
}

.logout-btn {
  background: #e53935;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  font-size: 0.9rem;
}

.logout-btn:hover {
  background: #c62828;
}

.admin-link {
  background: rgba(255, 193, 7, 0.2);
  font-weight: bold;
}

.admin-link:hover {
  background: rgba(255, 193, 7, 0.3) !important;
}
</style>