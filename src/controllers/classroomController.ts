import type { Request, Response } from "express"; 
// 匯入 Express 提供的 Request 與 Response 型別，方便打 API 時有型別提示

import { Classroom } from "../models/Classroom.js";
// 匯入 Classroom 模型 (對應到資料庫的 "Classroom" 資料表)

// ==================== 建立新教室 ====================
/**
 * 建立新教室
 * 對應 API：POST /api/classrooms
 */
export async function createClassroom(req: Request, res: Response) {
  try {
    const { name, capacity } = req.body; 
    // 從前端請求 (req.body) 取出教室名稱和容量

    const classroom = await Classroom.create({ name, capacity });
    // 使用 Sequelize 建立一筆新資料 (INSERT INTO classrooms ...)

    res.status(201).json(classroom); 
    // 回傳 201 (建立成功)，並送回剛建立的教室資料
  } catch (error) {
    console.error("❌ Error creating classroom:", error); 
    res.status(500).json({ error: "Unable to create classroom" });
    // 如果有錯誤，回傳 500 (伺服器錯誤)
  }
}

// ==================== 查詢所有教室 ====================
/**
 * 查詢所有教室
 * 對應 API：GET /api/classrooms
 */
export async function getAllClassrooms(req: Request, res: Response) {
  try {
    const classrooms = await Classroom.findAll();
    // 使用 Sequelize 查詢所有教室 (SELECT * FROM classrooms)

    res.json(classrooms); 
    // 回傳查詢結果 (JSON 格式)
  } catch (error) {
    console.error("❌ Error fetching classrooms:", error);
    res.status(500).json({ error: "Unable to fetch classrooms" });
  }
}

// ==================== 查詢單一教室 ====================
/**
 * 查詢單一教室
 * 對應 API：GET /api/classrooms/:id
 */
export async function getClassroomById(req: Request, res: Response) {
  try {
    const classroom = await Classroom.findByPk(req.params.id);
    // 使用主鍵 (PK, Primary Key) 查詢教室
    // 相當於 SELECT * FROM classrooms WHERE id = :id

    if (!classroom) 
      return res.status(404).json({ error: "Classroom not found" });
      // 如果找不到，回傳 404 (Not Found)

    res.json(classroom);
    // 找到的話，回傳資料
  } catch (error) {
    console.error("❌ Error fetching classroom:", error);
    res.status(500).json({ error: "Unable to fetch classroom" });
  }
}

// ==================== 更新教室 ====================
/**
 * 更新教室
 * 對應 API：PUT /api/classrooms/:id
 */
export async function updateClassroom(req: Request, res: Response) {
  try {
    const { name, capacity } = req.body;
    // 從請求中取得更新的資料

    const classroom = await Classroom.findByPk(req.params.id);
    // 先查出要更新的那筆資料

    if (!classroom) 
      return res.status(404).json({ error: "Classroom not found" });

    // 如果有傳新的 name，就更新；沒有就保留原值
    classroom.name = name ?? classroom.name;
    classroom.capacity = capacity ?? classroom.capacity;

    await classroom.save(); 
    // 把更新後的資料存回資料庫 (UPDATE classrooms ...)

    res.json(classroom);
    // 回傳更新後的資料
  } catch (error) {
    console.error("❌ Error updating classroom:", error);
    res.status(500).json({ error: "Unable to update classroom" });
  }
}

// ==================== 刪除教室 ====================
/**
 * 刪除教室
 * 對應 API：DELETE /api/classrooms/:id
 */
export async function deleteClassroom(req: Request, res: Response) {
  try {
    const classroom = await Classroom.findByPk(req.params.id);
    // 找到要刪除的那筆資料

    if (!classroom) 
      return res.status(404).json({ error: "Classroom not found" });

    await classroom.destroy();
    // 執行刪除 (DELETE FROM classrooms WHERE id = :id)

    res.json({ message: "Classroom deleted successfully" });
    // 回傳刪除成功訊息
  } catch (error) {
    console.error("❌ Error deleting classroom:", error);
    res.status(500).json({ error: "Unable to delete classroom" });
  }
}
