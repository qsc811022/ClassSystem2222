import { config } from "dotenv";  
// 從 dotenv 套件匯入 config 函式，用來載入 .env 檔案裡的環境變數

config();  
// 呼叫 config()，把 .env 裡的內容載入到 process.env 中
// 之後你就能用 process.env.KEY 來取環境變數
// 例如：.env 裡有 PORT=3000，就可以用 process.env.PORT

/**
 * 強制要求環境變數存在的工具函式
 * @param key 環境變數名稱 (例如 "PORT" 或 "DB_URL")
 * @returns string (環境變數的值)
 * @throws 如果環境變數不存在，會直接拋出錯誤，讓程式無法繼續執行
 */
export function requiredEnv(key: string): string {
  const value = process.env[key]; // 從 process.env 讀取指定的環境變數
  if (!value) {
    // 如果環境變數不存在 (undefined 或空字串)，拋出錯誤
    throw new Error(`❌ Missing environment variable: ${key}`);
  }
  return value; // 如果有值，回傳該值
}
