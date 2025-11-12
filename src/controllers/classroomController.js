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
exports.createClassroom = createClassroom;
exports.getAllClassrooms = getAllClassrooms;
exports.getClassroomById = getClassroomById;
exports.updateClassroom = updateClassroom;
exports.deleteClassroom = deleteClassroom;
var Classroom_js_1 = require("../models/Classroom.js");
/**
 * 建立新教室
 * POST /api/classrooms
 */
function createClassroom(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name_1, capacity, classroom, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, name_1 = _a.name, capacity = _a.capacity;
                    return [4 /*yield*/, Classroom_js_1.Classroom.create({ name: name_1, capacity: capacity })];
                case 1:
                    classroom = _b.sent();
                    res.status(201).json(classroom);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.error("❌ Error creating classroom:", error_1);
                    res.status(500).json({ error: "Unable to create classroom" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * 查詢所有教室
 * GET /api/classrooms
 */
function getAllClassrooms(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var classrooms, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Classroom_js_1.Classroom.findAll()];
                case 1:
                    classrooms = _a.sent();
                    res.json(classrooms);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error("❌ Error fetching classrooms:", error_2);
                    res.status(500).json({ error: "Unable to fetch classrooms" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * 查詢單一教室
 * GET /api/classrooms/:id
 */
function getClassroomById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var classroom, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Classroom_js_1.Classroom.findByPk(req.params.id)];
                case 1:
                    classroom = _a.sent();
                    if (!classroom)
                        return [2 /*return*/, res.status(404).json({ error: "Classroom not found" })];
                    res.json(classroom);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error("❌ Error fetching classroom:", error_3);
                    res.status(500).json({ error: "Unable to fetch classroom" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * 更新教室
 * PUT /api/classrooms/:id
 */
function updateClassroom(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name_2, capacity, classroom, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, name_2 = _a.name, capacity = _a.capacity;
                    return [4 /*yield*/, Classroom_js_1.Classroom.findByPk(req.params.id)];
                case 1:
                    classroom = _b.sent();
                    if (!classroom)
                        return [2 /*return*/, res.status(404).json({ error: "Classroom not found" })];
                    classroom.name = name_2 !== null && name_2 !== void 0 ? name_2 : classroom.name;
                    classroom.capacity = capacity !== null && capacity !== void 0 ? capacity : classroom.capacity;
                    return [4 /*yield*/, classroom.save()];
                case 2:
                    _b.sent();
                    res.json(classroom);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _b.sent();
                    console.error("❌ Error updating classroom:", error_4);
                    res.status(500).json({ error: "Unable to update classroom" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * 刪除教室
 * DELETE /api/classrooms/:id
 */
function deleteClassroom(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var classroom, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, Classroom_js_1.Classroom.findByPk(req.params.id)];
                case 1:
                    classroom = _a.sent();
                    if (!classroom)
                        return [2 /*return*/, res.status(404).json({ error: "Classroom not found" })];
                    return [4 /*yield*/, classroom.destroy()];
                case 2:
                    _a.sent();
                    res.json({ message: "Classroom deleted successfully" });
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    console.error("❌ Error deleting classroom:", error_5);
                    res.status(500).json({ error: "Unable to delete classroom" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
