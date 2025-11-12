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
exports.getTodayCourses = getTodayCourses;
exports.getWeekCourses = getWeekCourses;
exports.getMonthCourses = getMonthCourses;
exports.createCourse = createCourse;
exports.getAllCourses = getAllCourses;
exports.updateCourse = updateCourse;
exports.deleteCourse = deleteCourse;
var sequelize_1 = require("sequelize");
var Course_js_1 = require("../models/Course.js");
var Classroom_js_1 = require("../models/Classroom.js");
var Instructor_js_1 = require("../models/Instructor.js");
/**
 * 查詢今天課程 (已完成)
 */
function getTodayCourses(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var today, tomorrow, courses, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    today = new Date();
                    today.setHours(0, 0, 0, 0);
                    tomorrow = new Date(today);
                    tomorrow.setDate(today.getDate() + 1);
                    return [4 /*yield*/, Course_js_1.Course.findAll({
                            where: {
                                start_time: (_a = {},
                                    _a[sequelize_1.Op.gte] = today,
                                    _a[sequelize_1.Op.lt] = tomorrow,
                                    _a),
                            },
                            include: [
                                { model: Classroom_js_1.Classroom, attributes: ["name"] },
                                { model: Instructor_js_1.Instructor, attributes: ["name"] },
                            ],
                        })];
                case 1:
                    courses = _b.sent();
                    res.json(courses);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.error("❌ Error fetching today courses:", error_1);
                    res.status(500).json({ error: "Unable to fetch today's courses" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * 查詢本週課程
 * - 使用 Sequelize where 條件，找出本週第一天 (週一 00:00) 到 下週一 00:00 的課程
 */
function getWeekCourses(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var now, firstDayOfWeek, day, diff, nextWeek, courses, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    now = new Date();
                    firstDayOfWeek = new Date(now);
                    day = firstDayOfWeek.getDay();
                    diff = day === 0 ? -6 : 1 - day;
                    firstDayOfWeek.setDate(firstDayOfWeek.getDate() + diff);
                    firstDayOfWeek.setHours(0, 0, 0, 0);
                    nextWeek = new Date(firstDayOfWeek);
                    nextWeek.setDate(firstDayOfWeek.getDate() + 7);
                    return [4 /*yield*/, Course_js_1.Course.findAll({
                            where: {
                                start_time: (_a = {},
                                    _a[sequelize_1.Op.gte] = firstDayOfWeek,
                                    _a[sequelize_1.Op.lt] = nextWeek,
                                    _a),
                            },
                            include: [
                                { model: Classroom_js_1.Classroom, attributes: ["name"] },
                                { model: Instructor_js_1.Instructor, attributes: ["name"] },
                            ],
                        })];
                case 1:
                    courses = _b.sent();
                    res.json(courses);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    console.error("❌ Error fetching week courses:", error_2);
                    res.status(500).json({ error: "Unable to fetch week courses" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * 查詢本月課程
 * - 找出「本月 1 號 00:00」~「下個月 1 號 00:00」的課程
 */
function getMonthCourses(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var now, firstDayOfMonth, firstDayNextMonth, courses, error_3;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    now = new Date();
                    firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                    firstDayOfMonth.setHours(0, 0, 0, 0);
                    firstDayNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
                    firstDayNextMonth.setHours(0, 0, 0, 0);
                    return [4 /*yield*/, Course_js_1.Course.findAll({
                            where: {
                                start_time: (_a = {},
                                    _a[sequelize_1.Op.gte] = firstDayOfMonth,
                                    _a[sequelize_1.Op.lt] = firstDayNextMonth,
                                    _a),
                            },
                            include: [
                                { model: Classroom_js_1.Classroom, attributes: ["name"] },
                                { model: Instructor_js_1.Instructor, attributes: ["name"] },
                            ],
                        })];
                case 1:
                    courses = _b.sent();
                    res.json(courses);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _b.sent();
                    console.error("❌ Error fetching month courses:", error_3);
                    res.status(500).json({ error: "Unable to fetch month courses" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * 建立新課程
 * POST /api/courses
 */
function createCourse(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, title, start_time, end_time, classroom_id, instructor_id, classroom, instructor, course, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    _a = req.body, title = _a.title, start_time = _a.start_time, end_time = _a.end_time, classroom_id = _a.classroom_id, instructor_id = _a.instructor_id;
                    // ====== 基本驗證 ======
                    if (!title || !start_time || !end_time) {
                        return [2 /*return*/, res.status(400).json({ error: "Title, start_time, and end_time are required" })];
                    }
                    // 確認 start_time < end_time
                    if (new Date(start_time) >= new Date(end_time)) {
                        return [2 /*return*/, res.status(400).json({ error: "start_time must be earlier than end_time" })];
                    }
                    if (!classroom_id) return [3 /*break*/, 2];
                    return [4 /*yield*/, Classroom_js_1.Classroom.findByPk(classroom_id)];
                case 1:
                    classroom = _b.sent();
                    if (!classroom) {
                        return [2 /*return*/, res.status(400).json({ error: "Invalid classroom_id" })];
                    }
                    _b.label = 2;
                case 2:
                    if (!instructor_id) return [3 /*break*/, 4];
                    return [4 /*yield*/, Instructor_js_1.Instructor.findByPk(instructor_id)];
                case 3:
                    instructor = _b.sent();
                    if (!instructor) {
                        return [2 /*return*/, res.status(400).json({ error: "Invalid instructor_id" })];
                    }
                    _b.label = 4;
                case 4: return [4 /*yield*/, Course_js_1.Course.create({
                        title: title,
                        start_time: start_time,
                        end_time: end_time,
                        classroom_id: classroom_id,
                        instructor_id: instructor_id,
                    })];
                case 5:
                    course = _b.sent();
                    res.status(201).json(course);
                    return [3 /*break*/, 7];
                case 6:
                    error_4 = _b.sent();
                    console.error("❌ Error creating course:", error_4);
                    res.status(500).json({ error: "Unable to create course" });
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
/**
 * 查詢所有課程
 *
 */
/**
 * 查詢所有課程
 * GET /api/courses
 */
function getAllCourses(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var courses, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Course_js_1.Course.findAll({
                            include: [
                                { model: Classroom_js_1.Classroom, attributes: ["name"] }, // 只取教室名稱
                                { model: Instructor_js_1.Instructor, attributes: ["name"] }, // 只取講師名稱
                            ],
                        })];
                case 1:
                    courses = _a.sent();
                    res.json(courses); // 直接回傳
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    console.error("❌ Error fetching courses:", error_5);
                    res.status(500).json({ error: "Unable to fetch courses" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// 🟢 修改課程 (PUT /api/courses/:id)
function updateCourse(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, _a, title, start_time, end_time, classroom_id, instructor_id, course, error_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    id = req.params.id;
                    _a = req.body, title = _a.title, start_time = _a.start_time, end_time = _a.end_time, classroom_id = _a.classroom_id, instructor_id = _a.instructor_id;
                    return [4 /*yield*/, Course_js_1.Course.findByPk(id)];
                case 1:
                    course = _b.sent();
                    if (!course) {
                        return [2 /*return*/, res.status(404).json({ error: "Course not found" })];
                    }
                    // 驗證時間
                    if (new Date(start_time) >= new Date(end_time)) {
                        return [2 /*return*/, res.status(400).json({ error: "start_time must be earlier than end_time" })];
                    }
                    // 更新課程
                    return [4 /*yield*/, course.update({
                            title: title,
                            start_time: start_time,
                            end_time: end_time,
                            classroom_id: classroom_id,
                            instructor_id: instructor_id,
                        })];
                case 2:
                    // 更新課程
                    _b.sent();
                    res.json(course);
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _b.sent();
                    console.error("❌ Error updating course:", error_6);
                    res.status(500).json({ error: "Unable to update course" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// 🔴 刪除課程 (DELETE /api/courses/:id)
function deleteCourse(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, course, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    id = req.params.id;
                    return [4 /*yield*/, Course_js_1.Course.findByPk(id)];
                case 1:
                    course = _a.sent();
                    if (!course) {
                        return [2 /*return*/, res.status(404).json({ error: "Course not found" })];
                    }
                    return [4 /*yield*/, course.destroy()];
                case 2:
                    _a.sent();
                    res.json({ message: "Course deleted successfully" });
                    return [3 /*break*/, 4];
                case 3:
                    error_7 = _a.sent();
                    console.error("❌ Error deleting course:", error_7);
                    res.status(500).json({ error: "Unable to delete course" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
