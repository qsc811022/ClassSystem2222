import type { Request, Response } from "express";
import { Op } from "sequelize";
import { Course } from "../models/Course.js";
import { Classroom } from "../models/Classroom.js";
import { Instructor } from "../models/Instructor.js";

/**
 * 查詢今天課程 (已完成)
 */
export async function getTodayCourses(req: Request, res: Response) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const courses = await Course.findAll({
      where: {
        start_time: {
          [Op.gte]: today,
          [Op.lt]: tomorrow,
        },
      },
      include: [
        { model: Classroom, attributes: ["name"] },
        { model: Instructor, attributes: ["name"] },
      ],
    });

    res.json(courses);
  } catch (error) {
    console.error("❌ Error fetching today courses:", error);
    res.status(500).json({ error: "Unable to fetch today's courses" });
  }
}

/**
 * 查詢本週課程
 * - 使用 Sequelize where 條件，找出本週第一天 (週一 00:00) 到 下週一 00:00 的課程
 */
export async function getWeekCourses(req: Request, res: Response) {
  try {
    const now = new Date();

    // 找出本週週一 00:00
    const firstDayOfWeek = new Date(now);
    const day = firstDayOfWeek.getDay(); // 0=週日, 1=週一, ...
    const diff = day === 0 ? -6 : 1 - day; // 讓週一是第一天
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() + diff);
    firstDayOfWeek.setHours(0, 0, 0, 0);

    // 下週一 00:00
    const nextWeek = new Date(firstDayOfWeek);
    nextWeek.setDate(firstDayOfWeek.getDate() + 7);

    // 查詢這一週的課程
    const courses = await Course.findAll({
      where: {
        start_time: {
          [Op.gte]: firstDayOfWeek, // 本週一 00:00 起
          [Op.lt]: nextWeek,        // 下週一 00:00 前
        },
      },
      include: [
        { model: Classroom, attributes: ["name"] },
        { model: Instructor, attributes: ["name"] },
      ],
    });

    res.json(courses);
  } catch (error) {
    console.error("❌ Error fetching week courses:", error);
    res.status(500).json({ error: "Unable to fetch week courses" });
  }
}

/**
 * 查詢本月課程
 * - 找出「本月 1 號 00:00」~「下個月 1 號 00:00」的課程
 */
export async function getMonthCourses(req: Request, res: Response) {
  try {
    const now = new Date();

    // 本月第一天 (1號 00:00)
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    firstDayOfMonth.setHours(0, 0, 0, 0);

    // 下個月第一天 (1號 00:00)
    const firstDayNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    firstDayNextMonth.setHours(0, 0, 0, 0);

    // 查詢這個月的課程
    const courses = await Course.findAll({
      where: {
        start_time: {
          [Op.gte]: firstDayOfMonth,   // 大於等於本月1號 00:00
          [Op.lt]: firstDayNextMonth,  // 小於下個月1號 00:00
        },
      },
      include: [
        { model: Classroom, attributes: ["name"] },
        { model: Instructor, attributes: ["name"] },
      ],
    });

    res.json(courses);
  } catch (error) {
    console.error("❌ Error fetching month courses:", error);
    res.status(500).json({ error: "Unable to fetch month courses" });
  }

  
}
/**
 * 建立新課程
 * POST /api/courses
 */
export async function createCourse(req: Request, res: Response) {
  try {
    const { title, start_time, end_time, classroom_id, instructor_id } = req.body;

    // ====== 基本驗證 ======
    if (!title || !start_time || !end_time) {
      return res.status(400).json({ error: "Title, start_time, and end_time are required" });
    }

    // 確認 start_time < end_time
    if (new Date(start_time) >= new Date(end_time)) {
      return res.status(400).json({ error: "start_time must be earlier than end_time" });
    }

    // ====== 外鍵驗證 ======
    if (classroom_id) {
      const classroom = await Classroom.findByPk(classroom_id);
      if (!classroom) {
        return res.status(400).json({ error: "Invalid classroom_id" });
      }
    }

    if (instructor_id) {
      const instructor = await Instructor.findByPk(instructor_id);
      if (!instructor) {
        return res.status(400).json({ error: "Invalid instructor_id" });
      }
    }

    // ====== 建立課程 ======
    const course = await Course.create({
      title,
      start_time,
      end_time,
      classroom_id,
      instructor_id,
    });

    res.status(201).json(course);
  } catch (error) {
    console.error("❌ Error creating course:", error);
    res.status(500).json({ error: "Unable to create course" });
  }
}

/**
 * 查詢所有課程
 * 
 */
/**
 * 查詢所有課程
 * GET /api/courses
 */
export async function getAllCourses(req: Request, res: Response) {
  try {
    // 從資料庫撈出所有課程，並且 include Classroom & Instructor
    const courses = await Course.findAll({
      include: [
        { model: Classroom, attributes: ["name"] },   // 只取教室名稱
        { model: Instructor, attributes: ["name"] },  // 只取講師名稱
      ],
    });

    res.json(courses); // 直接回傳
  } catch (error) {
    console.error("❌ Error fetching courses:", error);
    res.status(500).json({ error: "Unable to fetch courses" });
  }
}

// 🟢 修改課程 (PUT /api/courses/:id)
export async function updateCourse(req: Request, res: Response) {
  try {
    const { id } = req.params; // URL 帶的課程 ID
    const { title, start_time, end_time, classroom_id, instructor_id } = req.body;

    // 找出課程
    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // 驗證時間
    if (new Date(start_time) >= new Date(end_time)) {
      return res.status(400).json({ error: "start_time must be earlier than end_time" });
    }

    // 更新課程
    await course.update({
      title,
      start_time,
      end_time,
      classroom_id,
      instructor_id,
    });

    res.json(course);
  } catch (error) {
    console.error("❌ Error updating course:", error);
    res.status(500).json({ error: "Unable to update course" });
  }
}

// 🔴 刪除課程 (DELETE /api/courses/:id)
export async function deleteCourse(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    await course.destroy();
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting course:", error);
    res.status(500).json({ error: "Unable to delete course" });
  }
}

