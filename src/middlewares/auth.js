"use strict";
// authenticateJWT.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = authenticateJWT;
var jwt_js_1 = require("../utils/jwt.js");
// JWT 驗證 Middleware
function authenticateJWT(req, res, next) {
    var authHeader = req.headers.authorization;
    // 1. 檢查 header 是否存在
    if (!authHeader) {
        return res.status(401).json({ error: "Missing Authorization header" });
    }
    var parts = authHeader.split(" ");
    // 2. 檢查 header 格式是否為 "Bearer <token>"
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ error: "Invalid Authorization header format" });
    }
    var token = parts[1];
    try {
        var decoded = (0, jwt_js_1.verifyToken)(token); // 建議用 try...catch 包起來，以防 verifyToken 拋出錯誤
        if (!decoded) {
            return res.status(401).json({ error: "Invalid token" });
        }
        // 3. 將解碼後的 payload 附加到 req.user 上 (不需要 @ts-ignore 了)
        req.user = decoded;
        // 4. 只呼叫一次 next()
        next();
    }
    catch (error) {
        // 如果 token 格式錯誤或過期，json-web-token 庫可能會拋出錯誤
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}
