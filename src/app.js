"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_session_1 = require("express-session");
var passport_1 = require("passport");
// 🔧 重要：先導入 authRoutes，這樣 Passport 策略配置就會被載入
var authRoutes_js_1 = require("./routes/authRoutes.js");
var courseRoutes_js_1 = require("./routes/courseRoutes.js");
var classroomRoutes_js_1 = require("./routes/classroomRoutes.js");
var instructorRoutes_js_1 = require("./routes/instructorRoutes.js");
var cors_1 = require("cors");
var app = (0, express_1.default)();
// ✅ 解析 JSON
app.use(express_1.default.json());
// ✅ CORS 設定（這個一定要加）
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // 前端執行的網址
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
// 啟用 session
app.use((0, express_session_1.default)({
    secret: "my_secret", // 請換成更安全的字串
    resave: false,
    saveUninitialized: true,
}));
// 初始化 Passport
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// 掛上各種路由
app.use("/api/auth", authRoutes_js_1.default);
app.use("/api/courses", courseRoutes_js_1.default);
app.use("/api/classrooms", classroomRoutes_js_1.default);
app.use("/api/instructors", instructorRoutes_js_1.default);
exports.default = app;
