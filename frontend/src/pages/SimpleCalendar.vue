<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "@/services/api";

const courses = ref<any[]>([]);
const loading = ref(true);
const currentView = ref("month");

async function loadCourses() {
  try {
    loading.value = true;
    let endpoint = "/courses";
    
    if (currentView.value === "today") {
      endpoint = "/courses/today";
    } else if (currentView.value === "week") {
      endpoint = "/courses/week";
    } else if (currentView.value === "month") {
      endpoint = "/courses/month";
    }

    const res = await api.get(endpoint);
    courses.value = res.data;
    console.log("📅 載入課程:", res.data);
  } catch (err) {
    console.error("❌ 載入課程失敗:", err);
  } finally {
    loading.value = false;
  }
}

function changeView(view: string) {
  currentView.value = view;
  loadCourses();
}

onMounted(() => {
  loadCourses();
});
</script>

<template>
  <div class="calendar-page">
    <h1>📅 課程日曆</h1>
    
    <!-- 視圖切換按鈕 -->
    <div class="view-buttons">
      <button 
        @click="changeView('today')" 
        :class="{ active: currentView === 'today' }"
      >
        今日
      </button>
      <button 
        @click="changeView('week')" 
        :class="{ active: currentView === 'week' }"
      >
        本週
      </button>
      <button 
        @click="changeView('month')" 
        :class="{ active: currentView === 'month' }"
      >
        本月
      </button>
    </div>

    <!-- 載入狀態 -->
    <div v-if="loading" class="loading">載入中...</div>

    <!-- 課程列表 -->
    <div v-else class="courses-grid">
      <div v-if="courses.length === 0" class="no-courses">
        📭 目前沒有課程
      </div>
      
      <div 
        v-for="course in courses" 
        :key="course.course_id" 
        class="course-card"
      >
        <h3>{{ course.title }}</h3>
        <p>🕐 {{ new Date(course.start_time).toLocaleString() }}</p>
        <p>👨‍🏫 {{ course.Instructor?.name || '未指定' }}</p>
        <p>🏫 {{ course.Classroom?.name || '未指定' }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-page {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1rem;
}

.view-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 2rem;
}

.view-buttons button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

.view-buttons button.active {
  background: #1976d2;
  color: white;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.course-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.course-card h3 {
  margin: 0 0 0.5rem 0;
  color: #1976d2;
}

.course-card p {
  margin: 0.25rem 0;
  color: #666;
}

.no-courses {
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
}
</style>