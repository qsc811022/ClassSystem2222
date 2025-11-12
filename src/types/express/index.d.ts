import "express";  
// 匯入 express 模組，這樣才能對它的型別做擴充 (declaration merging)

// 🔧 使用 declaration merging 擴充 Express Request 型別
declare module "express-serve-static-core" {
  interface Request {
    // 在 Request 上自訂一個 user 屬性
    // 這個 user 通常會由 JWT 或 Passport Middleware 設定
    user?: {
      user_id: number; // 使用者在資料庫的 ID
      role: string;    // 使用者角色 (例如 admin, student, teacher)
      email: string;   // 使用者的 email
    };
  }
}
