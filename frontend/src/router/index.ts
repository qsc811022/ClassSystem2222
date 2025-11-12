import { createRouter, createWebHistory } from "vue-router";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import CourseList from "@/pages/CourseList.vue";
import { useAuthStore } from "@/store/auth";
import CalendarView from "@/pages/CalendarView.vue";
import AdminDashboard from "@/pages/AdminDashboard.vue";

const routes = [
  { path: "/", redirect: "/courses" },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/courses", component: CourseList },
  { path: "/calendar", component: CalendarView },
  { path: "/admin", component: AdminDashboard }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ 路由守衛
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  
  // 🔧 未登入用戶訪問受保護頁面
  if (!auth.isAuthenticated && to.path !== "/login" && to.path !== "/register") {
    console.log("🚫 未登入，重定向到登入頁");
    return next("/login");
  }
  
  // 🔧 已登入用戶訪問登入/註冊頁
  if (auth.isAuthenticated && (to.path === "/login" || to.path === "/register")) {
    console.log("✅ 已登入，重定向到課程頁");
    return next("/courses");
  }
  
  next();
});

export default router;