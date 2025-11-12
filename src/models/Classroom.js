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
exports.Classroom = void 0;
var sequelize_1 = require("sequelize");
var sequelize_js_1 = require("../config/sequelize.js");
// 定義 Classroom Model
var Classroom = /** @class */ (function (_super) {
    __extends(Classroom, _super);
    function Classroom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Classroom;
}(sequelize_1.Model));
exports.Classroom = Classroom;
Classroom.init({
    classroom_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    capacity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true, // 可以允許 null（因為有些教室可能不設定容量）
    },
}, {
    sequelize: sequelize_js_1.sequelize,
    tableName: "Classrooms",
    timestamps: true, // 會加 createdAt / updatedAt
    createdAt: "created_at",
    updatedAt: false, // 只需要 created_at
});
