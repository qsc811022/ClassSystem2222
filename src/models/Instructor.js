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
exports.Instructor = void 0;
var sequelize_1 = require("sequelize");
var sequelize_js_1 = require("../config/sequelize.js");
// 定義 Instructor Model
var Instructor = /** @class */ (function (_super) {
    __extends(Instructor, _super);
    function Instructor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Instructor;
}(sequelize_1.Model));
exports.Instructor = Instructor;
Instructor.init({
    instructor_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true, // email 可以是 null
    },
}, {
    sequelize: sequelize_js_1.sequelize,
    tableName: "Instructors",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
});
