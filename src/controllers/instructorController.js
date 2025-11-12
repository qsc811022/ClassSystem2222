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
exports.createInstructor = createInstructor;
exports.getAllInstructors = getAllInstructors;
exports.getInstructorById = getInstructorById;
exports.updateInstructor = updateInstructor;
exports.deleteInstructor = deleteInstructor;
var Instructor_js_1 = require("../models/Instructor.js");
/**
 * 建立新講師
 * POST /api/instructors
 */
function createInstructor(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name_1, email, instructor, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, name_1 = _a.name, email = _a.email;
                    return [4 /*yield*/, Instructor_js_1.Instructor.create({ name: name_1, email: email })];
                case 1:
                    instructor = _b.sent();
                    // 回傳新建的資料，狀態碼 201 = Created
                    res.status(201).json(instructor);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.error("❌ Error creating instructor:", error_1);
                    res.status(500).json({ error: "Unable to create instructor" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * 查詢所有講師
 * GET /api/instructors
 */
function getAllInstructors(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var instructors, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Instructor_js_1.Instructor.findAll()];
                case 1:
                    instructors = _a.sent();
                    res.json(instructors);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error("❌ Error fetching instructors:", error_2);
                    res.status(500).json({ error: "Unable to fetch instructors" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * 查詢單一講師
 * GET /api/instructors/:id
 */
function getInstructorById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var instructor, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Instructor_js_1.Instructor.findByPk(req.params.id)];
                case 1:
                    instructor = _a.sent();
                    if (!instructor) {
                        return [2 /*return*/, res.status(404).json({ error: "Instructor not found" })];
                    }
                    res.json(instructor);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error("❌ Error fetching instructor:", error_3);
                    res.status(500).json({ error: "Unable to fetch instructor" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * 更新講師
 * PUT /api/instructors/:id
 */
function updateInstructor(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name_2, email, instructor, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, name_2 = _a.name, email = _a.email;
                    return [4 /*yield*/, Instructor_js_1.Instructor.findByPk(req.params.id)];
                case 1:
                    instructor = _b.sent();
                    if (!instructor) {
                        return [2 /*return*/, res.status(404).json({ error: "Instructor not found" })];
                    }
                    // 更新欄位（如果沒有傳入就保留原本的值）
                    instructor.name = name_2 !== null && name_2 !== void 0 ? name_2 : instructor.name;
                    instructor.email = email !== null && email !== void 0 ? email : instructor.email;
                    return [4 /*yield*/, instructor.save()];
                case 2:
                    _b.sent();
                    res.json(instructor);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _b.sent();
                    console.error("❌ Error updating instructor:", error_4);
                    res.status(500).json({ error: "Unable to update instructor" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * 刪除講師
 * DELETE /api/instructors/:id
 */
function deleteInstructor(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var instructor, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, Instructor_js_1.Instructor.findByPk(req.params.id)];
                case 1:
                    instructor = _a.sent();
                    if (!instructor) {
                        return [2 /*return*/, res.status(404).json({ error: "Instructor not found" })];
                    }
                    return [4 /*yield*/, instructor.destroy()];
                case 2:
                    _a.sent();
                    res.json({ message: "Instructor deleted successfully" });
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    console.error("❌ Error deleting instructor:", error_5);
                    res.status(500).json({ error: "Unable to delete instructor" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
