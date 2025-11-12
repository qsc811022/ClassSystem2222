import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.js";   // 驗證登入
import { authorizeRole } from "../middlewares/role.js";     // 驗證角色
import {
  getTodayCourses,
  getWeekCourses,
  getMonthCourses,
  getAllCourses,
  createCourse,
  updateCourse,   // ✅ 新增
  deleteCourse,   // ✅ 新增
} from "../controllers/courseController.js";

const router = Router();

// 查詢
router.get("/today", getTodayCourses);
router.get("/week", getWeekCourses);
router.get("/month", getMonthCourses);

// 學生 & 管理員都能查詢全部課程
router.get("/", authenticateJWT, getAllCourses);

// 只有管理員能新增 / 修改 / 刪除
router.post("/", authenticateJWT, authorizeRole(["admin"]), createCourse);
router.put("/:id", authenticateJWT, authorizeRole(["admin"]), updateCourse);   // ✅ 修改課程
router.delete("/:id", authenticateJWT, authorizeRole(["admin"]), deleteCourse); // ✅ 刪除課程

export default router;
