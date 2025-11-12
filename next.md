✅ 已完成

後端 API

/auth/register 註冊

/auth/login 登入 (Email/Password)

/auth/google → /auth/google/callback Google OAuth 登入

JWT 產生與驗證

User 資料表 Sequelize Model

CORS 問題已解決

前端

登入頁面 (Login.vue)

註冊頁面 (Register.vue)

Google 登入按鈕，能導向後端

登入成功 → 自動跳轉 /courses

登出 → 清除 Token 與 User

課程清單 (CourseList.vue) 可正常顯示資料

⚠️ 尚未完成 / 可補強

使用者體驗 (UI/UX)

課程清單的畫面目前比較簡單（需要美化 / 卡片式排版）

沒有 Dashboard 首頁（登入後除了課程清單，還能有「使用者資訊」、「快速導覽」）

角色區分

Admin / Student 目前後端有 Role 欄位，但前端還沒做 權限控制（例如只有 Admin 能新增課程）

錯誤處理

註冊失敗 / 登入失敗的錯誤提示需要更友好（目前只是 alert）

例如「Email 已存在」顯示在表單下方紅字

額外功能 (可選)

課程詳細頁面 (點進去課程可以看到更多資訊)

Admin 可以新增 / 編輯 / 刪除課程

學生可以留言、報名課程（如果你要做完整系統）

👉 建議下一步：

先加一個 Dashboard.vue 畫面：

登入後會先進到 Dashboard

顯示「歡迎，XXX（role）」

有按鈕連到「課程清單」

再來補上 權限控制：

Admin 可以看到「課程管理」按鈕

Student 只能看到「課程清單」

要不要我先幫你做一個 Dashboard.vue + router 配置，讓登入後不是直接跳到 /courses，而是跳到 /dashboard？