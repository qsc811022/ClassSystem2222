<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";
import api from "@/services/api";

const auth = useAuthStore();
const router = useRouter();

// 檢查是否為管理員
if (!auth.isAdmin) {
  router.push("/courses");
}

const activeTab = ref("classrooms");
const classrooms = ref<any[]>([]);
const instructors = ref<any[]>([]);
const courses = ref<any[]>([]);

// 表單數據
const classroomForm = ref({ name: "", capacity: "" });
const instructorForm = ref({ name: "", email: "" });
const courseForm = ref({ 
  title: "", 
  classroom_id: "", 
  instructor_id: "", 
  start_time: "", 
  end_time: "" 
});

// 編輯狀態
const editingClassroom = ref<any>(null);
const editingInstructor = ref<any>(null);
const editingCourse = ref<any>(null);

// 載入數據 - 確保帶上認證 header
async function loadClassrooms() {
  try {
    const res = await api.get("/classrooms", {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    classrooms.value = res.data;
  } catch (err) {
    console.error("載入教室失敗:", err);
  }
}

async function loadInstructors() {
  try {
    const res = await api.get("/instructors", {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    instructors.value = res.data;
  } catch (err) {
    console.error("載入講師失敗:", err);
  }
}

async function loadCourses() {
  try {
    const res = await api.get("/courses", {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    courses.value = res.data;
  } catch (err) {
    console.error("載入課程失敗:", err);
  }
}

// 教室功能
async function addClassroom() {
  try {
    await api.post("/classrooms", classroomForm.value, {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    classroomForm.value = { name: "", capacity: "" };
    loadClassrooms();
    alert("教室新增成功");
  } catch (err: any) {
    console.error("新增教室失敗:", err.response?.data);
    alert("新增失敗: " + (err.response?.data?.error || err.message));
  }
}

function editClassroom(classroom: any) {
  editingClassroom.value = { ...classroom };
}

async function updateClassroom() {
  try {
    await api.put(`/classrooms/${editingClassroom.value.classroom_id}`, editingClassroom.value, {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    editingClassroom.value = null;
    loadClassrooms();
    alert("教室更新成功");
  } catch (err: any) {
    alert("更新失敗: " + (err.response?.data?.error || err.message));
  }
}

function cancelEditClassroom() {
  editingClassroom.value = null;
}

// 講師功能
async function addInstructor() {
  try {
    await api.post("/instructors", instructorForm.value, {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    instructorForm.value = { name: "", email: "" };
    loadInstructors();
    alert("講師新增成功");
  } catch (err: any) {
    console.error("新增講師失敗:", err.response?.data);
    alert("新增失敗: " + (err.response?.data?.error || err.message));
  }
}

function editInstructor(instructor: any) {
  editingInstructor.value = { ...instructor };
}

async function updateInstructor() {
  try {
    await api.put(`/instructors/${editingInstructor.value.instructor_id}`, editingInstructor.value, {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    editingInstructor.value = null;
    loadInstructors();
    alert("講師更新成功");
  } catch (err: any) {
    alert("更新失敗: " + (err.response?.data?.error || err.message));
  }
}

function cancelEditInstructor() {
  editingInstructor.value = null;
}

// 課程功能
async function addCourse() {
  try {
    console.log("🔍 嘗試新增課程:", courseForm.value);
    console.log("🔑 使用 token:", auth.token);
    
    await api.post("/courses", courseForm.value, {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    
    courseForm.value = { 
      title: "", 
      classroom_id: "", 
      instructor_id: "", 
      start_time: "", 
      end_time: "" 
    };
    loadCourses();
    alert("課程新增成功");
  } catch (err: any) {
    console.error("新增課程失敗:", err.response?.data);
    alert("新增失敗: " + (err.response?.data?.error || err.message));
  }
}

function editCourse(course: any) {
  // 🔧 轉換時間格式為 datetime-local 所需的格式
  const startTime = new Date(course.start_time).toISOString().slice(0, 16);
  const endTime = new Date(course.end_time).toISOString().slice(0, 16);
  
  console.log("🔍 編輯課程:", {
    原始: { start: course.start_time, end: course.end_time },
    轉換後: { start: startTime, end: endTime }
  });
  
  editingCourse.value = {
    ...course,
    start_time: startTime,
    end_time: endTime
  };
}

async function updateCourse() {
  try {
    await api.put(`/courses/${editingCourse.value.course_id}`, editingCourse.value, {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    editingCourse.value = null;
    loadCourses();
    alert("課程更新成功");
  } catch (err: any) {
    alert("更新失敗: " + (err.response?.data?.error || err.message));
  }
}

function cancelEditCourse() {
  editingCourse.value = null;
}

// 🔧 課程複製功能
function copyCourse(course: any) {
  // 複製課程資料到新增表單，但不包含 ID 和時間
  courseForm.value = {
    title: `${course.title} (複製)`,  // 標記為複製
    classroom_id: course.classroom_id || "",
    instructor_id: course.instructor_id || "",
    start_time: "",  // 清空時間，讓用戶重新設定
    end_time: ""
  };
  
  // 切換到課程管理分頁（如果不在的話）
  if (activeTab.value !== 'courses') {
    activeTab.value = 'courses';
  }
  
  // 提示用戶
  alert(`已複製課程「${course.title}」到新增表單，請設定時間後新增。`);
  
  console.log("🔍 課程複製:", {
    原始課程: course.title,
    複製到表單: courseForm.value
  });
}

// 刪除功能 - 確保帶上認證 header
async function deleteClassroom(id: number) {
  if (confirm("確定要刪除此教室？")) {
    try {
      await api.delete(`/classrooms/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      loadClassrooms();
      alert("刪除成功");
    } catch (err: any) {
      console.error("刪除教室失敗:", err.response?.data);
      alert("刪除失敗: " + (err.response?.data?.error || err.message));
    }
  }
}

async function deleteInstructor(id: number) {
  if (confirm("確定要刪除此講師？")) {
    try {
      await api.delete(`/instructors/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      loadInstructors();
      alert("刪除成功");
    } catch (err: any) {
      console.error("刪除講師失敗:", err.response?.data);
      alert("刪除失敗: " + (err.response?.data?.error || err.message));
    }
  }
}

async function deleteCourse(id: number) {
  if (confirm("確定要刪除此課程？")) {
    try {
      await api.delete(`/courses/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      loadCourses();
      alert("刪除成功");
    } catch (err: any) {
      console.error("刪除課程失敗:", err.response?.data);
      alert("刪除失敗: " + (err.response?.data?.error || err.message));
    }
  }
}

onMounted(() => {
  loadClassrooms();
  loadInstructors();
  loadCourses();
});
</script>

<template>
  <div class="admin-dashboard">
    <h1>🔧 管理員面板</h1>
    
    <!-- 分頁標籤 -->
    <div class="tabs">
      <button 
        @click="activeTab = 'classrooms'" 
        :class="{ active: activeTab === 'classrooms' }"
      >
        教室管理
      </button>
      <button 
        @click="activeTab = 'instructors'" 
        :class="{ active: activeTab === 'instructors' }"
      >
        講師管理
      </button>
      <button 
        @click="activeTab = 'courses'" 
        :class="{ active: activeTab === 'courses' }"
      >
        課程管理
      </button>
    </div>

    <!-- 教室管理 -->
    <div v-if="activeTab === 'classrooms'" class="tab-content">
      <h2>🏫 教室管理</h2>
      
      <!-- 新增表單 -->
      <div class="form-section">
        <h3>新增教室</h3>
        <div class="form-row">
          <input v-model="classroomForm.name" placeholder="教室名稱" />
          <input v-model="classroomForm.capacity" type="number" placeholder="容量" />
          <button @click="addClassroom">新增</button>
        </div>
      </div>

      <!-- 教室列表 -->
      <div class="list-section">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>名稱</th>
              <th>容量</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="classroom in classrooms" :key="classroom.classroom_id">
              <td>{{ classroom.classroom_id }}</td>
              <td>
                <span v-if="editingClassroom?.classroom_id !== classroom.classroom_id">
                  {{ classroom.name }}
                </span>
                <input v-else v-model="editingClassroom.name" />
              </td>
              <td>
                <span v-if="editingClassroom?.classroom_id !== classroom.classroom_id">
                  {{ classroom.capacity }}
                </span>
                <input v-else v-model="editingClassroom.capacity" type="number" />
              </td>
              <td>
                <div v-if="editingClassroom?.classroom_id !== classroom.classroom_id">
                  <button @click="editClassroom(classroom)" class="edit-btn">
                    編輯
                  </button>
                  <button @click="deleteClassroom(classroom.classroom_id)" class="delete-btn">
                    刪除
                  </button>
                </div>
                <div v-else>
                  <button @click="updateClassroom()" class="save-btn">
                    儲存
                  </button>
                  <button @click="cancelEditClassroom()" class="cancel-btn">
                    取消
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 講師管理 -->
    <div v-if="activeTab === 'instructors'" class="tab-content">
      <h2>👨🏫 講師管理</h2>
      
      <!-- 新增表單 -->
      <div class="form-section">
        <h3>新增講師</h3>
        <div class="form-row">
          <input v-model="instructorForm.name" placeholder="講師姓名" />
          <input v-model="instructorForm.email" type="email" placeholder="Email" />
          <button @click="addInstructor">新增</button>
        </div>
      </div>

      <!-- 講師列表 -->
      <div class="list-section">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>姓名</th>
              <th>Email</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="instructor in instructors" :key="instructor.instructor_id">
              <td>{{ instructor.instructor_id }}</td>
              <td>
                <span v-if="editingInstructor?.instructor_id !== instructor.instructor_id">
                  {{ instructor.name }}
                </span>
                <input v-else v-model="editingInstructor.name" />
              </td>
              <td>
                <span v-if="editingInstructor?.instructor_id !== instructor.instructor_id">
                  {{ instructor.email }}
                </span>
                <input v-else v-model="editingInstructor.email" type="email" />
              </td>
              <td>
                <div v-if="editingInstructor?.instructor_id !== instructor.instructor_id">
                  <button @click="editInstructor(instructor)" class="edit-btn">
                    編輯
                  </button>
                  <button @click="deleteInstructor(instructor.instructor_id)" class="delete-btn">
                    刪除
                  </button>
                </div>
                <div v-else>
                  <button @click="updateInstructor()" class="save-btn">
                    儲存
                  </button>
                  <button @click="cancelEditInstructor()" class="cancel-btn">
                    取消
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 課程管理 -->
    <div v-if="activeTab === 'courses'" class="tab-content">
      <h2>📚 課程管理</h2>
      
      <!-- 新增表單 -->
      <div class="form-section">
        <h3>新增課程</h3>
        <div class="form-grid">
          <input v-model="courseForm.title" placeholder="課程標題" />
          
          <select v-model="courseForm.classroom_id">
            <option value="">選擇教室</option>
            <option v-for="classroom in classrooms" :key="classroom.classroom_id" :value="classroom.classroom_id">
              {{ classroom.name }}
            </option>
          </select>
          
          <select v-model="courseForm.instructor_id">
            <option value="">選擇講師</option>
            <option v-for="instructor in instructors" :key="instructor.instructor_id" :value="instructor.instructor_id">
              {{ instructor.name }}
            </option>
          </select>
          
          <input v-model="courseForm.start_time" type="datetime-local" />
          <input v-model="courseForm.end_time" type="datetime-local" />
          
          <button @click="addCourse">新增課程</button>
        </div>
      </div>

      <!-- 課程列表 -->
      <div class="list-section">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>標題</th>
              <th>教室</th>
              <th>講師</th>
              <th>開始時間</th>
              <th>結束時間</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="course in courses" :key="course.course_id">
              <td>{{ course.course_id }}</td>
              <td>
                <span v-if="editingCourse?.course_id !== course.course_id">
                  {{ course.title }}
                </span>
                <input v-else v-model="editingCourse.title" />
              </td>
              <td>
                <span v-if="editingCourse?.course_id !== course.course_id">
                  {{ course.Classroom?.name || '未指定' }}
                </span>
                <select v-else v-model="editingCourse.classroom_id">
                  <option value="">選擇教室</option>
                  <option v-for="classroom in classrooms" :key="classroom.classroom_id" :value="classroom.classroom_id">
                    {{ classroom.name }}
                  </option>
                </select>
              </td>
              <td>
                <span v-if="editingCourse?.course_id !== course.course_id">
                  {{ course.Instructor?.name || '未指定' }}
                </span>
                <select v-else v-model="editingCourse.instructor_id">
                  <option value="">選擇講師</option>
                  <option v-for="instructor in instructors" :key="instructor.instructor_id" :value="instructor.instructor_id">
                    {{ instructor.name }}
                  </option>
                </select>
              </td>
              <td>
                <span v-if="editingCourse?.course_id !== course.course_id">
                  {{ new Date(course.start_time).toLocaleString() }}
                </span>
                <input v-else v-model="editingCourse.start_time" type="datetime-local" />
              </td>
              <td>
                <span v-if="editingCourse?.course_id !== course.course_id">
                  {{ new Date(course.end_time).toLocaleString() }}
                </span>
                <input v-else v-model="editingCourse.end_time" type="datetime-local" />
              </td>
              <td>
                <div v-if="editingCourse?.course_id !== course.course_id">
                  <button @click="copyCourse(course)" class="copy-btn">
                    複製
                  </button>
                  <button @click="editCourse(course)" class="edit-btn">
                    編輯
                  </button>
                  <button @click="deleteCourse(course.course_id)" class="delete-btn">
                    刪除
                  </button>
                </div>
                <div v-else>
                  <button @click="updateCourse()" class="save-btn">
                    儲存
                  </button>
                  <button @click="cancelEditCourse()" class="cancel-btn">
                    取消
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.tabs button {
  padding: 10px 20px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

.tabs button.active {
  background: #1976d2;
  color: white;
}

.form-section {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.form-row {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  align-items: center;
}

input, select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #1976d2;
  color: white;
}

.copy-btn {
  background: #2196f3;
  margin-right: 5px;
}

.edit-btn {
  background: #ff9800;
  margin-right: 5px;
}

.save-btn {
  background: #4caf50;
  margin-right: 5px;
}

.cancel-btn {
  background: #9e9e9e;
  margin-right: 5px;
}

.delete-btn {
  background: #e53935;
}

td div {
  display: flex;
  gap: 5px;
}

td input, td select {
  width: 100%;
  min-width: 120px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background: #f5f5f5;
  font-weight: bold;
}
</style>