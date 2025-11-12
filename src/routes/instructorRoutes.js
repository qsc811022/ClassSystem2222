"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_js_1 = require("../middlewares/auth.js");
var role_js_1 = require("../middlewares/role.js");
var instructorController_js_1 = require("../controllers/instructorController.js");
var router = (0, express_1.Router)();
/**
 * Instructor CRUD API - 添加認證保護
 */
// 查詢功能 - 所有登入用戶都可以使用
router.get("/", auth_js_1.authenticateJWT, instructorController_js_1.getAllInstructors);
router.get("/:id", auth_js_1.authenticateJWT, instructorController_js_1.getInstructorById);
// 管理功能 - 只有管理員可以使用
router.post("/", auth_js_1.authenticateJWT, (0, role_js_1.authorizeRole)(["admin"]), instructorController_js_1.createInstructor);
router.put("/:id", auth_js_1.authenticateJWT, (0, role_js_1.authorizeRole)(["admin"]), instructorController_js_1.updateInstructor);
router.delete("/:id", auth_js_1.authenticateJWT, (0, role_js_1.authorizeRole)(["admin"]), instructorController_js_1.deleteInstructor);
exports.default = router;
