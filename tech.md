前端：Vue.js（使用 Vue 3 和 Composition API）
後端：TypeScript + Express
資料庫：MySQL

npx tsx src/index.ts


npm套件:
npm install express mysql2 typescript ts-node @types/express @types/node dotenv bcrypt jsonwebtoken
npm install --save-dev nodemon
npm install sequelize @types/sequelize
npm install mysql2
npm install passport passport-google-oauth20 express-session
npm install --save-dev @types/express-session
npm install --save-dev @types/passport @types/passport-google-oauth20
npm install jsonwebtoken
npm install --save-dev @types/jsonwebtoken

npm -y


express：Web 框架。
mysql2：MySQL 連線套件，支援 Promise。
typescript 和 ts-node：支援 TypeScript 開發。
@types/express 和 @types/node：Express 和 Node.js 的 TypeScript 型別定義。
dotenv：管理環境變數。
bcrypt：用於密碼加密（使用者認證）。
jsonwebtoken：用於 JWT 認證（區分管理員和學生）。
nodemon：開發時自動重啟伺服器。


npx tsc --init
npm install -D tsx


npx tsx index.ts 

方法 3：用 tsx（我推薦）

安裝 tsx
，專門處理這種狀況：

npm install -D tsx


然後執行：

npx tsx src/index.ts


👉 tsx 幫你解決 TS + ESM + .js 副檔名 的所有問題，開發體驗最好。

🚀 建議 SOP

正式環境：npx tsc && node dist/index.js

開發環境：裝 tsx，用 npx tsx src/index.ts