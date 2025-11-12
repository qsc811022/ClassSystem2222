import type { Request, Response } from "express"; 
// 匯入 Express 的 Request / Response 型別，確保 API 函式參數有正確型別提示

import { Instructor } from "../models/Instructor.js"; 
// 匯入 Instructor 模型 (對應資料庫中的 instructors 資料表)

/**
 * 建立新講師
 * POST /api/instructors
 */
export async function createInstructor(req: Request, res: Response) {
  try {
    // 從 request body 取出 name 與 email
    const { name, email } = req.body;

    // 使用 Sequelize 建立一筆新講師資料 (INSERT INTO instructors ...)
    const instructor = await Instructor.create({ name, email });

    // 回傳新建的資料，HTTP 狀態碼 201 = Created
    res.status(201).json(instructor);
  } catch (error) {
    console.error("❌ Error creating instructor:", error);
    res.status(500).json({ error: "Unable to create instructor" });
  }
}

/**
 * 查詢所有講師
 * GET /api/instructors
 */
export async function getAllInstructors(req: Request, res: Response) {
  try {
    // 查詢所有講師資料 (SELECT * FROM instructors)
    const instructors = await Instructor.findAll();
    res.json(instructors); // 回傳所有講師 JSON 陣列
  } catch (error) {
    console.error("❌ Error fetching instructors:", error);
    res.status(500).json({ error: "Unable to fetch instructors" });
  }
}

/**
 * 查詢單一講師
 * GET /api/instructors/:id
 */
export async function getInstructorById(req: Request, res: Response) {
  try {
    // 使用主鍵查詢單一講師 (SELECT * FROM instructors WHERE id = :id)
    const instructor = await Instructor.findByPk(req.params.id);

    // 如果找不到講師，回傳 404 Not Found
    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    // 找到的話回傳講師資料
    res.json(instructor);
  } catch (error) {
    console.error("❌ Error fetching instructor:", error);
    res.status(500).json({ error: "Unable to fetch instructor" });
  }
}

/**
 * 更新講師
 * PUT /api/instructors/:id
 */
export async function updateInstructor(req: Request, res: Response) {
  try {
    const { name, email } = req.body;

    // 先查詢該講師
    const instructor = await Instructor.findByPk(req.params.id);
    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    // 更新欄位（如果沒有傳入就保留原本的值）
    instructor.name = name ?? instructor.name;
    instructor.email = email ?? instructor.email;

    // 儲存更新後的資料 (UPDATE instructors SET ...)
    await instructor.save();

    res.json(instructor);
  } catch (error) {
    console.error("❌ Error updating instructor:", error);
    res.status(500).json({ error: "Unable to update instructor" });
  }
}

/**
 * 刪除講師
 * DELETE /api/instructors/:id
 */
export async function deleteInstructor(req: Request, res: Response) {
  try {
    // 查詢要刪除的講師
    const instructor = await Instructor.findByPk(req.params.id);
    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    // 刪除該講師 (DELETE FROM instructors WHERE id = :id)
    await instructor.destroy();

    // 回傳刪除成功訊息
    res.json({ message: "Instructor deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting instructor:", error);
    res.status(500).json({ error: "Unable to delete instructor" });
  }
}
