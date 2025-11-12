"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = authorizeRole;
// 檢查使用者角色
function authorizeRole(roles) {
    return function (req, res, next) {
        // @ts-ignore (因為 req.user 是我們自己加的)
        var user = req.user;
        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        if (!roles.includes(user.role)) {
            return res.status(403).json({ error: "Forbidden: insufficient permissions" });
        }
        next();
    };
}
//如果還是報錯，可以先改成 預設匯出，這樣就不會被 Node 搞混
exports.default = authorizeRole;
