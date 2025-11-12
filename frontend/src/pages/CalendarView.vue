<script setup lang="ts">
import { ref, onMounted, computed } from "vue"; 
// Vue Composition API：ref(響應式變數)、onMounted(元件載入後執行)、computed(計算屬性)

import api from "@/services/api"; 
// 匯入後端 API 呼叫模組

// ====== 狀態管理 ======
const courses = ref<any[]>([]); // 課程資料陣列
const loading = ref(true);      // 是否正在載入
const currentDate = ref(new Date()); // 當前顯示的月份日期

// ====== 工具函式：時間格式化 ======

// 格式化時間 (只顯示時:分)，並修正時區問題
function formatTime(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('zh-TW', { 
    hour: '2-digit', 
    minute: '2-digit',
    timeZone: 'Asia/Taipei' // 指定台北時區，避免 UTC 偏移
  });
}

// 格式化完整日期時間 (年/月/日 時:分)
function formatDateTime(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit', 
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Taipei'
  });
}

// --- 計算屬性：生成月曆天數 ---
const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const monthNum = currentDate.value.getMonth(); // number 用來比對
  const today = new Date();

  // 當月第一天與最後一天
  const firstDay = new Date(year, monthNum, 1);
  const lastDay = new Date(year, monthNum + 1, 0);

  // 計算月曆的開始日期
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const days = [];
  const currentDateObj = new Date(startDate);

  for (let i = 0; i < 42; i++) {
    // 取字串顯示用
    const y = currentDateObj.getFullYear();
    const mStr = String(currentDateObj.getMonth() + 1).padStart(2, '0');
    const dStr = String(currentDateObj.getDate()).padStart(2, '0');
    const dateStr = `${y}-${mStr}-${dStr}`;

    // 過濾出當天課程
    const dayCourses = courses.value.filter(course => {
      const courseDate = new Date(course.start_time);
      const cYear = courseDate.getFullYear();
      const cMonth = String(courseDate.getMonth() + 1).padStart(2, '0');
      const cDay = String(courseDate.getDate()).padStart(2, '0');
      const courseDateStr = `${cYear}-${cMonth}-${cDay}`;
      return courseDateStr === dateStr;
    });

    days.push({
      date: dateStr,
      day: currentDateObj.getDate(),
      isCurrentMonth: currentDateObj.getMonth() === monthNum, // ✅ 改用 number
      isToday: dateStr === `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`,
      courses: dayCourses
    });

    currentDateObj.setDate(currentDateObj.getDate() + 1);
  }

  return days;
});

// 顯示目前月份標題 (yyyy年 MM月)
const monthTitle = computed(() => {
  return currentDate.value.toLocaleDateString('zh-TW', { 
    year: 'numeric', 
    month: 'long' 
  });
});

// ====== 載入課程資料 ======
async function loadCourses() {
  try {
    loading.value = true;

    // 計算當前月的範圍
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth() + 1;

    console.log("🔍 載入月份:", `${year}-${month.toString().padStart(2, '0')}`);

    // 呼叫後端 API，取得所有課程
    const res = await api.get("/courses", {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });

    // 計算月曆範圍 (6 週 = 42 天)
    const startOfCalendar = new Date(year, month - 1, 1);
    startOfCalendar.setDate(startOfCalendar.getDate() - startOfCalendar.getDay());
    const endOfCalendar = new Date(startOfCalendar);
    endOfCalendar.setDate(endOfCalendar.getDate() + 41);

    // 過濾只保留在月曆範圍內的課程
    courses.value = res.data.filter((course: any) => {
      const courseDate = new Date(course.start_time);
      return courseDate >= startOfCalendar && courseDate <= endOfCalendar;
    });

    console.log("📅 載入課程:", {
      總數: res.data.length,
      當前月曆顯示: courses.value.length,
      時間範圍: `${startOfCalendar.toLocaleDateString()} ~ ${endOfCalendar.toLocaleDateString()}`,
      課程清單: courses.value.map(c => ({ 
        title: c.title, 
        date: new Date(c.start_time).toLocaleDateString() 
      }))
    });

  } catch (err) {
    console.error("❌ 載入課程失敗:", err);
  } finally {
    loading.value = false;
  }
}

// ====== 月份切換控制 ======
function prevMonth() {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
  loadCourses();
}

function nextMonth() {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
  loadCourses();
}

function goToday() {
  currentDate.value = new Date();
  loadCourses();
}

// ====== 元件掛載後自動載入課程 ======
onMounted(() => {
  loadCourses();
});
</script>

<template>
  <div class="calendar-page">
    <h1>📅 課程月曆</h1>
    
    <!-- 月曆控制 (切換月份、回到今天) -->
    <div class="calendar-controls">
      <button @click="prevMonth">‹ 上月</button>
      <h2>{{ monthTitle }}</h2>
      <button @click="nextMonth">下月 ›</button>
      <button @click="goToday" class="today-btn">今天</button>
    </div>

    <!-- 載入中狀態 -->
    <div v-if="loading" class="loading">載入中...</div>

    <!-- 月曆顯示 -->
    <div v-else class="calendar-container">
      <!-- 星期標題 -->
      <div class="weekday-header">
        <div class="weekday">日</div>
        <div class="weekday">一</div>
        <div class="weekday">二</div>
        <div class="weekday">三</div>
        <div class="weekday">四</div>
        <div class="weekday">五</div>
        <div class="weekday">六</div>
      </div>
      
      <!-- 日期格子 -->
      <div class="calendar-grid">
        <div 
          v-for="day in calendarDays" 
          :key="day.date"
          class="calendar-day"
          :class="{ 
            'other-month': !day.isCurrentMonth, // 標記非當月
            'today': day.isToday,              // 標記今天
            'has-courses': day.courses.length > 0 // 標記有課程
          }"
        >
          <!-- 日期號碼 -->
          <div class="day-number">{{ day.day }}</div>

          <!-- 課程清單 -->
          <div class="day-courses">
            <div 
              v-for="course in day.courses.slice(0, 2)" 
              :key="course.course_id"
              class="course-item"
              :title="`${course.title}\n時間: ${formatDateTime(course.start_time)} - ${formatTime(course.end_time)}\n老師: ${course.Instructor?.name || '未指定'}\n教室: ${course.Classroom?.name || '未指定'}`"
            >
              <div class="course-title">{{ course.title }}</div>
              <div class="course-details">
                <span class="course-time">{{ formatTime(course.start_time) }}-{{ formatTime(course.end_time) }}</span>
                <span class="course-room" v-if="course.Classroom?.name">🏫{{ course.Classroom.name }}</span>
              </div>
            </div>

            <!-- 若超過兩門課，顯示「更多」 -->
            <div v-if="day.courses.length > 2" class="more-courses">
              +{{ day.courses.length - 2 }} 更多
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ====== 基本樣式 ====== */
.calendar-page {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
}

/* 月曆控制列 */
.calendar-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.calendar-controls button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

.today-btn {
  background: #1976d2 !important;
  color: white !important;
}

.calendar-controls h2 {
  margin: 0;
  min-width: 200px;
  text-align: center;
}

/* 載入中樣式 */
.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

/* 月曆容器 */
.calendar-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
}

/* 星期標題 */
.weekday-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: #f5f5f5;
}

.weekday {
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  border-right: 1px solid #ddd;
}

.weekday:last-child {
  border-right: none;
}

/* 日期格子 */
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar-day {
  min-height: 140px;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 6px;
  background: white;
}

.calendar-day:nth-child(7n) {
  border-right: none;
}

/* 狀態標記 */
.calendar-day.other-month {
  background: #f9f9f9;
  color: #ccc;
}

.calendar-day.today {
  background: #e3f2fd;
}

.calendar-day.has-courses {
  background: #fff3e0;
}

.day-number {
  font-weight: bold;
  margin-bottom: 4px;
}

.today .day-number {
  color: #1976d2;
}

/* 課程項目 */
.course-item {
  background: #1976d2;
  color: white;
  padding: 3px 6px;
  margin: 2px 0;
  border-radius: 3px;
  font-size: 0.7rem;
  cursor: pointer;
  line-height: 1.2;
}

.course-title {
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 1px;
}

.course-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.65rem;
  opacity: 0.9;
}

.course-time {
  flex-shrink: 0;
}

.course-room {
  flex-shrink: 0;
  margin-left: 4px;
  background: rgba(255,255,255,0.2);
  padding: 1px 3px;
  border-radius: 2px;
  font-size: 0.6rem;
}

/* 更多課程 */
.more-courses {
  font-size: 0.7rem;
  color: #666;
  text-align: center;
  margin-top: 2px;
}
</style>
