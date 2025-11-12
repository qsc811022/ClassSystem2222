"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
var sequelize_1 = require("sequelize");
var sequelize_js_1 = require("../config/sequelize.js");
var Classroom_js_1 = require("./Classroom.js");
var Instructor_js_1 = require("./Instructor.js");
// 定義 Course Model
var Course = /** @class */ (function (_super) {
    __extends(Course, _super);
    function Course() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Course;
}(sequelize_1.Model));
exports.Course = Course;
Course.init({
    course_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false,
    },
    start_time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    end_time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    classroom_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: "Classrooms", key: "classroom_id" },
        onDelete: "SET NULL",
    },
    instructor_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: "Instructors", key: "instructor_id" },
        onDelete: "SET NULL",
    },
}, {
    sequelize: sequelize_js_1.sequelize,
    tableName: "Courses",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
});
// 關聯：Course 屬於 Classroom 與 Instructor
Course.belongsTo(Classroom_js_1.Classroom, { foreignKey: "classroom_id" });
Course.belongsTo(Instructor_js_1.Instructor, { foreignKey: "instructor_id" });
// 如果要反查：
// Classroom.hasMany(Course, { foreignKey: "classroom_id" });
// Instructor.hasMany(Course, { foreignKey: "instructor_id" });
