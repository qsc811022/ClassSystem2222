import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.js";
import { authorizeRole } from "../middlewares/role.js";
import {
  createInstructor,
  getAllInstructors,
  getInstructorById,
  updateInstructor,
  deleteInstructor,
} from "../controllers/instructorController.js";

const router = Router();

/**
 * Instructor CRUD API - 添加認證保護
 */
// 查詢功能 - 所有登入用戶都可以使用
router.get("/", authenticateJWT, getAllInstructors);
router.get("/:id", authenticateJWT, getInstructorById);

// 管理功能 - 只有管理員可以使用
router.post("/", authenticateJWT, authorizeRole(["admin"]), createInstructor);
router.put("/:id", authenticateJWT, authorizeRole(["admin"]), updateInstructor);
router.delete("/:id", authenticateJWT, authorizeRole(["admin"]), deleteInstructor);

export default router;
