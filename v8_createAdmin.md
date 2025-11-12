你遇到的問題很常見！這是因為 create-admin.js 是 JavaScript 文件，但它嘗試導入 TypeScript 文件。讓我教你幾種解決方案：

🎯 問題分析
// ❌ 問題：JS 文件導入 TS 文件
import { User } from "./src/models/User.js";  // User.ts 還沒編譯成 User.js

Copy
🔧 解決方案
方案 1：使用 tsx 執行（推薦）
創建 TypeScript 版本的管理員創建腳本

create-admin.ts
+38
-0

Undo
方案 2：修改 package.json 添加腳本
在 package.json 中添加管理員創建腳本

package.json
+1
-0

Undo
📚 教學：為什麼會有這個問題
1. 文件類型問題
create-admin.js     ← JavaScript 文件
src/models/User.ts  ← TypeScript 文件

Copy
問題 ：JavaScript 無法直接導入 TypeScript 文件

2. 編譯過程
TypeScript (.ts) → 編譯 → JavaScript (.js)

Copy
選項 ：

選項 A ：先編譯 TS → JS，再執行 JS

選項 B ：直接用 tsx 執行 TS 文件

3. 不同執行方式
方式 1：使用 tsx（推薦）
# 直接執行 TypeScript 文件
npx tsx create-admin.ts

# 或使用 npm script
npm run create-admin

Copy
bash
方式 2：編譯後執行
# 步驟 1：編譯 TypeScript
npx tsc

# 步驟 2：執行編譯後的 JavaScript
node create-admin.js

Copy
bash
方式 3：修改為純 JavaScript
創建純 JavaScript 版本的管理員創建腳本

create-admin-js.js
+91
-0

Undo
🎯 推薦使用方式
最簡單的方法：
# 使用 npm script（推薦）
npm run create-admin
D:\ClassSystem>npm run create-admin

> classsystem@1.0.0 create-admin
> tsx create-admin.ts

[dotenv@17.2.1] injecting env (9) from .env -- tip: 🔐 prevent committing .env to code: https://dotenvx.com/precommit
🔍 檢查管理員帳號...
Executing (default): SELECT `user_id`, `google_id`, `username`, `email`, `password`, `role`, `name`, `created_at` FROM `Users` AS `User` WHERE `User`.`email` = 'admin@example.com';
🔧 創建管理員帳號...
Executing (default): INSERT INTO `Users` (`user_id`,`email`,`password`,`role`,`name`,`created_at`) VALUES (DEFAULT,?,?,?,?,?);
✅ 管理員帳號創建成功!
📧 Email: admin@example.com
🔑 Password: admin123

D:\ClassSystem>

# 或直接使用 tsx
npx tsx create-admin.ts

Copy
bash
如果要用純 JavaScript：
node create-admin-js.js

Copy
bash
💡 學習重點
1. TypeScript vs JavaScript 執行
TypeScript：需要 tsx 或先編譯

JavaScript：可以直接用 node 執行

2. 依賴關係
create-admin.js → User.ts → 需要編譯
create-admin.ts → User.ts → tsx 可以處理
create-admin-js.js → 自包含 → 直接執行

Copy
3. 最佳實踐
開發環境：使用 tsx 執行 TypeScript

生產環境：編譯後執行 JavaScript

工具腳本：添加到 package.json 的 scripts