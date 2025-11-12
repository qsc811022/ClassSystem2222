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
exports.User = void 0;
var sequelize_1 = require("sequelize");
var sequelize_js_1 = require("../config/sequelize.js");
// 定義 User Model
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return User;
}(sequelize_1.Model));
exports.User = User;
// 初始化 User Model
User.init({
    user_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    google_id: {
        type: sequelize_1.DataTypes.STRING(255),
        unique: true,
        allowNull: true, // 傳統帳號可以不用
    },
    username: {
        type: sequelize_1.DataTypes.STRING(100),
        unique: true,
        allowNull: true, // Google 帳號可能沒有 username
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        unique: true,
        allowNull: true, // 有些舊資料可能沒有 email
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true, // Google 登入不需要密碼
    },
    role: {
        type: sequelize_1.DataTypes.ENUM("admin", "student"),
        allowNull: false,
        defaultValue: "student", // 預設新帳號都是學生
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: sequelize_js_1.sequelize,
    tableName: "Users",
    timestamps: false, // 你資料表裡沒有 updated_at，所以先關閉
});
