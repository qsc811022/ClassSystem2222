import { testConnection } from "./config/sequelize.js";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

/**
 * 專案入口點
 * 1. 測試資料庫連線
 * 2. 啟動 Express 伺服器
 */
(async () => {
  try {
    // 確認 DB 可用
    console.log("🔍 正在測試資料庫連線...");
    await testConnection();
    console.log("✅ 資料庫連線成功");

    // 啟動伺服器
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📡 Press Ctrl+C to stop the server`);
    });

    // 優雅關閉處理
    const gracefulShutdown = () => {
      console.log('\n🛑 正在關閉伺服器...');
      server.close((err) => {
        if (err) {
          console.error('❌ 伺服器關閉時發生錯誤:', err);
          process.exit(1);
        }
        console.log('✅ 伺服器已安全關閉');
        process.exit(0);
      });
    };

    // 監聽關閉信號
    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);

  } catch (error) {
    console.error("❌ 伺服器啟動失敗:", error);
    process.exit(1);
  }
})();

// 🔧 捕獲未處理的異常 - 增強版本
process.on('uncaughtException', (error) => {
  console.error('❌ 未捕獲的異常:', error);
  console.error('Stack:', error.stack);
  // 給一點時間讓日誌輸出完成
  setTimeout(() => {
    process.exit(1);
  }, 100);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ 未處理的 Promise 拒絕 at:', promise);
  console.error('Reason:', reason);
  // 不要立即退出，而是記錄錯誤
  // 在生產環境中可能需要退出，但開發時保持運行更有助於調試
  if (process.env.NODE_ENV === 'production') {
    setTimeout(() => {
      process.exit(1);
    }, 100);
  }
});