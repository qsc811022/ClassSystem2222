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
var express_1 = require("express");
var passport_1 = require("passport");
var passport_google_oauth20_1 = require("passport-google-oauth20");
var User_js_1 = require("../models/User.js");
var jwt_js_1 = require("../utils/jwt.js");
var bcryptjs_1 = require("bcryptjs");
var router = (0, express_1.Router)();
// 🔧 配置 Google OAuth 策略
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    callbackURL: "/api/auth/google/callback",
}, function (accessToken, refreshToken, profile, done) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_1;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 4, , 5]);
                return [4 /*yield*/, User_js_1.User.findOne({ where: { email: (_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value } })];
            case 1:
                user = _e.sent();
                if (!!user) return [3 /*break*/, 3];
                return [4 /*yield*/, User_js_1.User.create({
                        email: ((_d = (_c = profile.emails) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.value) || "",
                        name: profile.displayName || "",
                        password: "", // Google 登入不需要密碼
                        role: "student", // 預設為學生
                    })];
            case 2:
                // 如果不存在，創建新用戶
                user = _e.sent();
                _e.label = 3;
            case 3: return [2 /*return*/, done(null, user)];
            case 4:
                error_1 = _e.sent();
                return [2 /*return*/, done(error_1, undefined)];
            case 5: return [2 /*return*/];
        }
    });
}); }));
// 🔧 Passport 序列化設定（雖然我們用 JWT，但還是需要這個）
passport_1.default.serializeUser(function (user, done) {
    done(null, user.user_id);
});
passport_1.default.deserializeUser(function (id, done) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User_js_1.User.findByPk(id)];
            case 1:
                user = _a.sent();
                done(null, user);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                done(error_2, null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// 🔧 Google 登入入口
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
// 🔧 Google 登入回調 - 重定向到前端
router.get("/google/callback", passport_1.default.authenticate("google", { session: false, failureRedirect: "http://localhost:5173/login?error=auth_failed" }), function (req, res) {
    var _a, _b;
    var user = req.user;
    // 產生 JWT
    var token = (0, jwt_js_1.generateToken)({
        user_id: user.user_id,
        role: user.role,
        email: user.email,
    });
    // 重定向回前端，帶上用戶資訊
    var redirectUrl = "http://localhost:5173/login?token=".concat(token, "&name=").concat(encodeURIComponent((_a = user.name) !== null && _a !== void 0 ? _a : ""), "&email=").concat(encodeURIComponent((_b = user.email) !== null && _b !== void 0 ? _b : ""), "&role=").concat(user.role);
    res.redirect(redirectUrl);
});
// 🔧 一般登入（email + password）
router.post("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isValid, token, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    return [2 /*return*/, res.status(400).json({ error: "請提供 email 和 password" })];
                }
                return [4 /*yield*/, User_js_1.User.findOne({ where: { email: email } })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(401).json({ error: "帳號或密碼錯誤" })];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 2:
                isValid = _b.sent();
                if (!isValid) {
                    return [2 /*return*/, res.status(401).json({ error: "帳號或密碼錯誤" })];
                }
                token = (0, jwt_js_1.generateToken)({
                    user_id: user.user_id,
                    role: user.role,
                    email: user.email,
                });
                res.json({
                    message: "登入成功",
                    token: token,
                    user: {
                        id: user.user_id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                console.error("❌ 登入失敗:", err_1);
                res.status(500).json({ error: "伺服器錯誤" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// 註冊
router.post("/register", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, name_1, role, existing, hashed, user, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, email = _a.email, password = _a.password, name_1 = _a.name, role = _a.role;
                if (!email || !password || !name_1) {
                    return [2 /*return*/, res.status(400).json({ error: "缺少必要欄位" })];
                }
                return [4 /*yield*/, User_js_1.User.findOne({ where: { email: email } })];
            case 1:
                existing = _b.sent();
                if (existing) {
                    return [2 /*return*/, res.status(400).json({ error: "Email 已被註冊" })];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 2:
                hashed = _b.sent();
                return [4 /*yield*/, User_js_1.User.create({
                        email: email,
                        password: hashed,
                        name: name_1,
                        role: role || "student", // 預設 student
                    })];
            case 3:
                user = _b.sent();
                res.status(201).json({
                    message: "✅ 註冊成功",
                    user: {
                        id: user.user_id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    },
                });
                return [3 /*break*/, 5];
            case 4:
                err_2 = _b.sent();
                console.error("❌ 註冊失敗:", err_2);
                res.status(500).json({ error: "伺服器錯誤" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
