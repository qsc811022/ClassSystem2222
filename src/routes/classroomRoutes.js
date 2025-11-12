"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_js_1 = require("../middlewares/auth.js");
var role_js_1 = require("../middlewares/role.js");
var classroomController_js_1 = require("../controllers/classroomController.js");
var router = (0, express_1.Router)();
/**
 * Classroom CRUD API - 添加認證保護
 */
// 查詢功能 - 所有登入用戶都可以使用
router.get("/", auth_js_1.authenticateJWT, classroomController_js_1.getAllClassrooms);
router.get("/:id", auth_js_1.authenticateJWT, classroomController_js_1.getClassroomById);
// 管理功能 - 只有管理員可以使用
router.post("/", auth_js_1.authenticateJWT, (0, role_js_1.authorizeRole)(["admin"]), classroomController_js_1.createClassroom);
router.put("/:id", auth_js_1.authenticateJWT, (0, role_js_1.authorizeRole)(["admin"]), classroomController_js_1.updateClassroom);
router.delete("/:id", auth_js_1.authenticateJWT, (0, role_js_1.authorizeRole)(["admin"]), classroomController_js_1.deleteClassroom);
exports.default = router;
