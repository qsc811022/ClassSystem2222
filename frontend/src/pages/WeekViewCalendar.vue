<template>
  <div class="week-calendar">
    <h1>📅 課程週曆</h1>
    
    <!-- 控制按鈕 -->
    <div class="calendar-controls">
      <button @click="prevWeek">‹ 上週</button>
      <h2>{{ weekTitle }}</h2>
      <button @click="nextWeek">下週 ›</button>
      <button @click="goCurrentWeek" class="today-btn">本週</button>
      <button @click="loadCourses" class="refresh-btn">🔄 重新載入</button>
      <button @click="openImportDialog" class="import-btn">📂 匯入Excel</button>
      <button @click="toggleView" class="view-toggle-btn">
        {{ isMonthView ? '📊 週視圖' : '📅 月視圖' }}
      </button>
    </div>

    <!-- 載入狀態 -->
    <div v-if="loading" class="loading">載入中...</div>

    <!-- 週視圖表格 -->
    <div v-else class="week-table-container">
      <table class="week-table">
        <thead>
          <tr>
            <th class="week-col">週別</th>
            <th class="period-col">時段</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
          </tr>
          <tr class="date-row">
            <td></td>
            <td></td>
            <td v-for="day in weekDays" :key="day.date" class="date-cell">
              {{ day.dateStr }}
            </td>
          </tr>
        </thead>
        <tbody>
          <!-- 上午時段 -->
          <tr class="morning-row">
            <td rowspan="2" class="week-number">{{ currentWeekNumber }}</td>
            <td class="period-cell morning">上午</td>
            <td v-for="day in weekDays" :key="`morning-${day.date}`" 
                class="course-cell" 
                :class="{ 'has-course': getMorningCourse(day.date) }">
              <div v-if="getMorningCourse(day.date)" class="course-content">
                <div class="course-title">{{ getMorningCourse(day.date).title }}</div>
                <div class="course-time">{{ formatCourseTime(getMorningCourse(day.date)) }}</div>
              </div>
              <div v-else class="empty-slot">-</div>
            </td>
          </tr>
          
          <!-- 下午時段 -->
          <tr class="afternoon-row">
            <td class="period-cell afternoon">下午</td>
            <td v-for="day in weekDays" :key="`afternoon-${day.date}`" 
                class="course-cell"
                :class="{ 'has-course': getAfternoonCourse(day.date) }">
              <div v-if="getAfternoonCourse(day.date)" class="course-content">
                <div class="course-title">{{ getAfternoonCourse(day.date).title }}</div>
                <div class="course-time">{{ formatCourseTime(getAfternoonCourse(day.date)) }}</div>
              </div>
              <div v-else class="empty-slot">-</div>
            </td>
          </tr>
          
          <!-- 晚間時段 -->
          <tr class="evening-row">
            <td class="period-cell evening">晚間</td>
            <td v-for="day in weekDays" :key="`evening-${day.date}`" 
                class="course-cell"
                :class="{ 'has-course': getEveningCourse(day.date) }">
              <div v-if="getEveningCourse(day.date)" class="course-content">
                <div class="course-title">{{ getEveningCourse(day.date).title }}</div>
                <div class="course-time">{{ formatCourseTime(getEveningCourse(day.date)) }}</div>
              </div>
              <div v-else class="empty-slot">-</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 匯入對話框 -->
    <div v-if="showImportDialog" class="import-dialog-overlay" @click="closeImportDialog">
      <div class="import-dialog" @click.stop>
        <div class="dialog-header">
          <h3>📂 Excel課程匯入</h3>
          <button @click="closeImportDialog" class="close-btn">✕</button>
        </div>
        <div class="dialog-body">
          <CourseImport @import-success="handleImportSuccess" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import api from '@/services/api';
import CourseImport from './CourseImport.vue';

const courses = ref<any[]>([]);
const loading = ref(true);
const currentDate = ref(new Date());
const showImportDialog = ref(false);
const isMonthView = ref(false);

// 計算當前週的日期範圍
const weekDays = computed(() => {
  const startOfWeek = new Date(currentDate.value);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // 週一開始
  startOfWeek.setDate(diff);

  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const dayNum = String(date.getDate()).padStart(2, '0');
    
    days.push({
      date: date.toISOString().split('T')[0], // YYYY-MM-DD 格式
      dateStr: `${month}/${dayNum}`, // MM/DD 格式顯示
      dayName: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()],
      fullDate: date
    });
  }
  
  return days;
});

// 計算當前週數
const currentWeekNumber = computed(() => {
  const start = new Date(currentDate.value.getFullYear(), 0, 1);
  const diff = currentDate.value.getTime() - start.getTime();
  return Math.ceil((diff / (1000 * 60 * 60 * 24) + start.getDay() + 1) / 7);
});

// 週標題
const weekTitle = computed(() => {
  const startDate = weekDays.value[0].fullDate;
  const endDate = weekDays.value[6].fullDate;
  
  const startStr = `${startDate.getMonth() + 1}/${startDate.getDate()}`;
  const endStr = `${endDate.getMonth() + 1}/${endDate.getDate()}`;
  
  return `${startDate.getFullYear()}年 第${currentWeekNumber.value}週 (${startStr} - ${endStr})`;
});

// 獲取指定日期的上午課程
function getMorningCourse(date: string) {
  return courses.value.find(course => {
    const courseDate = new Date(course.start_time).toISOString().split('T')[0];
    const courseHour = new Date(course.start_time).getHours();
    return courseDate === date && courseHour >= 6 && courseHour < 12;
  });
}

// 獲取指定日期的下午課程
function getAfternoonCourse(date: string) {
  return courses.value.find(course => {
    const courseDate = new Date(course.start_time).toISOString().split('T')[0];
    const courseHour = new Date(course.start_time).getHours();
    return courseDate === date && courseHour >= 12 && courseHour < 17;
  });
}

// 獲取指定日期的晚間課程
function getEveningCourse(date: string) {
  return courses.value.find(course => {
    const courseDate = new Date(course.start_time).toISOString().split('T')[0];
    const courseHour = new Date(course.start_time).getHours();
    return courseDate === date && courseHour >= 17;
  });
}

// 格式化課程時間
function formatCourseTime(course: any) {
  if (!course) return '';
  
  const startTime = new Date(course.start_time);
  const endTime = new Date(course.end_time);
  
  const start = startTime.toLocaleTimeString('zh-TW', { 
    hour: '2-digit', 
    minute: '2-digit',
    timeZone: 'Asia/Taipei'
  });
  
  const end = endTime.toLocaleTimeString('zh-TW', { 
    hour: '2-digit', 
    minute: '2-digit',
    timeZone: 'Asia/Taipei'
  });
  
  return `${start}-${end}`;
}

// 載入課程數據
async function loadCourses() {
  try {
    loading.value = true;
    
    const res = await api.get("/courses", {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    
    // 過濾當前週的課程
    const startOfWeek = weekDays.value[0].fullDate;
    const endOfWeek = new Date(weekDays.value[6].fullDate);
    endOfWeek.setHours(23, 59, 59, 999);
    
    courses.value = res.data.filter((course: any) => {
      const courseDate = new Date(course.start_time);
      return courseDate >= startOfWeek && courseDate <= endOfWeek;
    });
    
    console.log('📅 週視圖載入課程:', courses.value.length);
    
  } catch (err) {
    console.error('❌ 載入課程失敗:', err);
  } finally {
    loading.value = false;
  }
}

// 週導航
function prevWeek() {
  currentDate.value = new Date(currentDate.value.setDate(currentDate.value.getDate() - 7));
  loadCourses();
}

function nextWeek() {
  currentDate.value = new Date(currentDate.value.setDate(currentDate.value.getDate() + 7));
  loadCourses();
}

function goCurrentWeek() {
  currentDate.value = new Date();
  loadCourses();
}

// 視圖切換
function toggleView() {
  isMonthView.value = !isMonthView.value;
  // 這裡可以emit事件給父組件來切換視圖
  emits('toggle-view', isMonthView.value);
}

// 匯入對話框
function openImportDialog() {
  showImportDialog.value = true;
}

function closeImportDialog() {
  showImportDialog.value = false;
}

function handleImportSuccess() {
  showImportDialog.value = false;
  loadCourses();
}

// 事件發射
const emits = defineEmits(['toggle-view']);

onMounted(() => {
  loadCourses();
});
</script>

<style scoped>
.week-calendar {
  max-width: 1400px;
  margin: 2rem auto;
  padding: 1rem;
}

.calendar-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.calendar-controls button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.calendar-controls button:hover {
  background: #f0f0f0;
}

.today-btn {
  background: #1976d2 !important;
  color: white !important;
}

.refresh-btn {
  background: #4caf50 !important;
  color: white !important;
}

.import-btn {
  background: #ff9800 !important;
  color: white !important;
}

.view-toggle-btn {
  background: #9c27b0 !important;
  color: white !important;
}

.calendar-controls h2 {
  margin: 0;
  min-width: 300px;
  text-align: center;
  font-size: 1.2rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.week-table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow-x: auto;
}

.week-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.week-table th,
.week-table td {
  border: 1px solid #ddd;
  text-align: center;
  vertical-align: middle;
}

.week-table th {
  background: #f5f5f5;
  padding: 12px 8px;
  font-weight: bold;
}

.week-col {
  width: 60px;
}

.period-col {
  width: 60px;
}

.date-row td {
  background: #e3f2fd;
  font-size: 0.8rem;
  padding: 6px;
  font-weight: bold;
}

.week-number {
  background: #fff3e0;
  font-size: 1.1rem;
  font-weight: bold;
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

.period-cell {
  background: #f9f9f9;
  font-weight: bold;
  padding: 12px 8px;
}

.period-cell.morning {
  color: #1976d2;
}

.period-cell.afternoon {
  color: #388e3c;
}

.period-cell.evening {
  color: #7b1fa2;
}

.course-cell {
  padding: 8px;
  height: 80px;
  min-width: 120px;
  position: relative;
}

.course-cell.has-course {
  background: #e3f2fd;
}

.course-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.course-title {
  font-weight: bold;
  margin-bottom: 4px;
  color: #1976d2;
  font-size: 0.85rem;
}

.course-time {
  font-size: 0.75rem;
  color: #666;
}

.empty-slot {
  color: #ccc;
  font-size: 1.2rem;
}

/* 匯入對話框樣式 */
.import-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.import-dialog {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #ddd;
  background: #f9f9f9;
}

.dialog-header h3 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background: #e0e0e0;
}

.dialog-body {
  padding: 0;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .week-table {
    font-size: 0.8rem;
  }
  
  .course-cell {
    min-width: 80px;
    height: 60px;
  }
  
  .course-title {
    font-size: 0.7rem;
  }
  
  .course-time {
    font-size: 0.65rem;
  }
  
  .calendar-controls {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .calendar-controls h2 {
    min-width: auto;
    font-size: 1rem;
  }
}
</style>