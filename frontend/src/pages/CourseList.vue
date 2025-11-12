<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "@/services/api"; // axios instance
import { useAuthStore } from "@/store/auth";

const auth = useAuthStore();
const courses = ref<any[]>([]);
const loading = ref(true);
const error = ref("");

// 🔧 格式化時間函數
function formatDateTime(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit', 
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Taipei'  // 🔧 關鍵：強制使用台北時區
  });
}

function formatTime(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('zh-TW', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Taipei'
  });
}

async function fetchCourses() {
  try {
    const res = await api.get("/courses", {
      headers: { Authorization: `Bearer ${auth.token}` }, // ✅ 帶上 JWT
    });
    courses.value = res.data;
  } catch (err) {
    error.value = "讀取課程失敗";
    console.error(err);
  } finally {
    loading.value = false;
  }
}

onMounted(fetchCourses);
</script>

<template>
  <div class="courses-page">
    <h1>課程清單</h1>

    <div v-if="loading">載入中...</div>
    <div v-else-if="error">{{ error }}</div>

    <ul v-else>
      <li v-for="course in courses" :key="course.course_id" class="course-item">
        <div class="course-header">
          <strong class="course-title">{{ course.title }}</strong>
          <span class="course-id">#{{ course.course_id }}</span>
        </div>
        
        <div class="course-info">
          <div class="info-row">
            🕐 <strong>時間：</strong>{{ formatDateTime(course.start_time) }} ~ {{ formatTime(course.end_time) }}
          </div>
          
          <div class="info-row">
            👨‍🏫 <strong>老師：</strong>{{ course.Instructor?.name ?? "未指定" }}
          </div>
          
          <div class="info-row" v-if="course.Classroom?.name">
            🏫 <strong>教室：</strong>{{ course.Classroom.name }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.courses-page {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}

.course-item {
  border: 1px solid #ddd;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: box-shadow 0.2s;
}

.course-item:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.course-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.course-title {
  font-size: 1.2rem;
  color: #1976d2;
}

.course-id {
  font-size: 0.9rem;
  color: #666;
  background: #f5f5f5;
  padding: 2px 8px;
  border-radius: 12px;
}

.course-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-row {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: #333;
}

.info-row strong {
  margin-right: 0.5rem;
  color: #555;
}
</style>
