"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_js_1 = require("./config/sequelize.js");
var app_js_1 = require("./app.js");
var PORT = process.env.PORT || 3000;
/**
 * 專案入口點
 * 1. 測試資料庫連線
 * 2. 啟動 Express 伺服器
 */
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var server_1, gracefulShutdown, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                // 確認 DB 可用
                console.log("🔍 正在測試資料庫連線...");
                return [4 /*yield*/, (0, sequelize_js_1.testConnection)()];
            case 1:
                _a.sent();
                console.log("✅ 資料庫連線成功");
                server_1 = app_js_1.default.listen(PORT, function () {
                    console.log("\uD83D\uDE80 Server running on http://localhost:".concat(PORT));
                    console.log("\uD83D\uDCE1 Press Ctrl+C to stop the server");
                });
                gracefulShutdown = function () {
                    console.log('\n🛑 正在關閉伺服器...');
                    server_1.close(function (err) {
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
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error("❌ 伺服器啟動失敗:", error_1);
                process.exit(1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })();
// 🔧 捕獲未處理的異常 - 增強版本
process.on('uncaughtException', function (error) {
    console.error('❌ 未捕獲的異常:', error);
    console.error('Stack:', error.stack);
    // 給一點時間讓日誌輸出完成
    setTimeout(function () {
        process.exit(1);
    }, 100);
});
process.on('unhandledRejection', function (reason, promise) {
    console.error('❌ 未處理的 Promise 拒絕 at:', promise);
    console.error('Reason:', reason);
    // 不要立即退出，而是記錄錯誤
    // 在生產環境中可能需要退出，但開發時保持運行更有助於調試
    if (process.env.NODE_ENV === 'production') {
        setTimeout(function () {
            process.exit(1);
        }, 100);
    }
});
