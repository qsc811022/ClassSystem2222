import express from "express";
import session from "express-session";
import passport from "passport";
// 🔧 重要：先導入 authRoutes，這樣 Passport 策略配置就會被載入
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import classroomRoutes from "./routes/classroomRoutes.js";
import instructorRoutes from "./routes/instructorRoutes.js";
import cors from "cors";

const app = express();

// ✅ 解析 JSON
app.use(express.json());

// ✅ CORS 設定（這個一定要加）
app.use(cors({
  origin: [
    "http://192.168.35.113:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// 啟用 session
app.use(session({
  secret: "my_secret", // 請換成更安全的字串
  resave: false,
  saveUninitialized: true,
}));

// 初始化 Passport
app.use(passport.initialize());
app.use(passport.session());

// 掛上各種路由
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/classrooms", classroomRoutes);
app.use("/api/instructors", instructorRoutes);

export default app;
