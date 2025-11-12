"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_js_1 = require("../middlewares/auth.js"); // 驗證登入
var role_js_1 = require("../middlewares/role.js"); // 驗證角色
var courseController_js_1 = require("../controllers/courseController.js");
var router = (0, express_1.Router)();
// 查詢
router.get("/today", courseController_js_1.getTodayCourses);
router.get("/week", courseController_js_1.getWeekCourses);
router.get("/month", courseController_js_1.getMonthCourses);
// 學生 & 管理員都能查詢全部課程
router.get("/", auth_js_1.authenticateJWT, courseController_js_1.getAllCourses);
// 只有管理員能新增 / 修改 / 刪除
router.post("/", auth_js_1.authenticateJWT, (0, role_js_1.authorizeRole)(["admin"]), courseController_js_1.createCourse);
router.put("/:id", auth_js_1.authenticateJWT, (0, role_js_1.authorizeRole)(["admin"]), courseController_js_1.updateCourse); // ✅ 修改課程
router.delete("/:id", auth_js_1.authenticateJWT, (0, role_js_1.authorizeRole)(["admin"]), courseController_js_1.deleteCourse); // ✅ 刪除課程
exports.default = router;
