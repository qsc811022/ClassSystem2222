import jwt from "jsonwebtoken"; 
// 匯入 jsonwebtoken 套件，用來產生 (sign) 與驗證 (verify) JWT

// 從環境變數讀取 JWT_SECRET，若沒設定就用 "my_secret_key" (⚠️ 正式環境請務必用更安全的隨機字串)
const JWT_SECRET = process.env.JWT_SECRET || "my_secret_key"; 

// ================== 產生 JWT Token ==================
/**
 * 產生一個 JWT
 * @param payload 需要寫進 token 的資料 (例如 user_id, role, email)
 * @returns string - JWT token
 */
export function generateToken(payload: object) {
  // 使用 jwt.sign 建立 Token
  // - payload：要放進 token 的使用者資料
  // - JWT_SECRET：用來簽署 token 的秘密字串
  // - { expiresIn: "7d" }：設定 token 7 天後過期
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" }); 
}

// ================== 驗證 JWT Token ==================
/**
 * 驗證 JWT 是否有效
 * @param token 前端傳來的 JWT
 * @returns 解碼後的 payload，如果無效則回傳 null
 */
export function verifyToken(token: string) {
  try {
    // 使用 jwt.verify 檢查 token 是否正確 & 是否過期
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // 如果驗證失敗 (例如過期 / 被竄改)，回傳 null
    return null;
  }
}
