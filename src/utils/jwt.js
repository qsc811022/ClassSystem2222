"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
var jsonwebtoken_1 = require("jsonwebtoken");
var JWT_SECRET = process.env.JWT_SECRET || "my_secret_key"; // ⚠️ 請用更安全的隨機字串
// 產生 Token
function generateToken(payload) {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: "7d" }); // 預設 7 天過期
}
// 驗證 Token
function verifyToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (err) {
        return null;
    }
}
