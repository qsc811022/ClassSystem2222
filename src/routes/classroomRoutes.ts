import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.js";
import { authorizeRole } from "../middlewares/role.js";
import {
  createClassroom,
  getAllClassrooms,
  getClassroomById,
  updateClassroom,
  deleteClassroom,
} from "../controllers/classroomController.js";

const router = Router();

/**
 * Classroom CRUD API - 添加認證保護
 */
// 查詢功能 - 所有登入用戶都可以使用
router.get("/", authenticateJWT, getAllClassrooms);
router.get("/:id", authenticateJWT, getClassroomById);

// 管理功能 - 只有管理員可以使用
router.post("/", authenticateJWT, authorizeRole(["admin"]), createClassroom);
router.put("/:id", authenticateJWT, authorizeRole(["admin"]), updateClassroom);
router.delete("/:id", authenticateJWT, authorizeRole(["admin"]), deleteClassroom);

export default router;
