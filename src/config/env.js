"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requiredEnv = requiredEnv;
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
/**
 * 強制要求環境變數存在
 */
function requiredEnv(key) {
    var value = process.env[key];
    if (!value) {
        throw new Error("\u274C Missing environment variable: ".concat(key));
    }
    return value;
}
