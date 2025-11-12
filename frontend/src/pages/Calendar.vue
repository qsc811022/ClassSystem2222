<script setup lang="ts">
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ref, onMounted } from "vue";
import api from "@/services/api";

const events = ref<any[]>([]);

// 📌 根據 FullCalendar 的 view 切換 API
async function loadCourses(viewType: string) {
  try {
    let endpoint = "/courses/month"; // 預設：月
    if (viewType === "timeGridWeek") {
      endpoint = "/courses/week";
    } else if (viewType === "timeGridDay") {
      endpoint = "/courses/today";
    }

    const res = await api.get(endpoint);

    events.value = res.data.map((c: any) => ({
      id: c.course_id,
      title: `${c.title} (${c.Instructor?.name ?? "未指定"})`,
      start: c.start_time,
      end: c.end_time,
    }));
  } catch (err) {
    console.error("❌ 無法載入課程:", err);
  }
}

// 📌 FullCalendar 的事件：當視圖切換時觸發
function handleViewDidMount(arg: any) {
  console.log("🔄 視圖切換:", arg.view.type);
  loadCourses(arg.view.type);
}

// 📌 當日期範圍改變時觸發
function handleDatesSet(arg: any) {
  console.log("📅 日期範圍改變:", arg.view.type);
  loadCourses(arg.view.type);
}

// 📌 初始化
onMounted(() => {
  console.log("🚀 Calendar 組件載入");
  loadCourses("dayGridMonth");
});
</script>

<template>
  <div class="calendar-container">
    <h1>📅 課程日曆</h1>
    
    <FullCalendar
      :plugins="[dayGridPlugin, timeGridPlugin, interactionPlugin]"
      initialView="dayGridMonth"
      :events="events"
      :headerToolbar="{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }"
      height="auto"
      @viewDidMount="handleViewDidMount"
      @datesSet="handleDatesSet"
    />
  </div>
</template>

<style>
.calendar-container {
  max-width: 90%;
  margin: 20px auto;
}
</style>
