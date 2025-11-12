import { Router } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import type { Profile } from "passport-google-oauth20";
import type { Profile as FacebookProfile } from "passport-facebook";
import { User } from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcryptjs";

const router = Router();

// 🔧 配置 Google OAuth 策略
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile: Profile, done) => {
      try {
        // 檢查用戶是否已存在
        let user = await User.findOne({ where: { email: profile.emails?.[0]?.value } });
        
        if (!user) {
          // 如果不存在，創建新用戶
          user = await User.create({
            email: profile.emails?.[0]?.value || "",
            name: profile.displayName || "",
            password: "", // Google 登入不需要密碼
            role: "student", // 預設為學生
          });
        }
        
        return done(null, user);
      } catch (error) {
        return done(error, undefined);
      }
    }
  )
);

// 🔧 配置 Facebook OAuth 策略
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID || "",
      clientSecret: process.env.FACEBOOK_APP_SECRET || "",
      callbackURL: "/api/auth/facebook/callback",
      profileFields: ["id", "displayName", "email"], // 指定需要的欄位
    },
    async (accessToken, refreshToken, profile: FacebookProfile, done) => {
      try {
        // 檢查用戶是否已存在
        let user = await User.findOne({ where: { email: profile.emails?.[0]?.value } });
        
        if (!user) {
          // 如果不存在，創建新用戶
          user = await User.create({
            email: profile.emails?.[0]?.value || "",
            name: profile.displayName || "",
            password: "", // Facebook 登入不需要密碼
            role: "student", // 預設為學生
          });
        }
        
        return done(null, user);
      } catch (error) {
        return done(error, undefined);
      }
    }
  )
);

// 🔧 Passport 序列化設定（雖然我們用 JWT，但還是需要這個）
passport.serializeUser((user: any, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// 🔧 Google 登入入口
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// 🔧 Google 登入回調 - 重定向到前端
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "http://192.168.35.113:5173/login?error=auth_failed" }),
  (req, res) => {
    const user = req.user as User;

    // 產生 JWT
    const token = generateToken({
      user_id: user.user_id,
      role: user.role,
      email: user.email,
    });

    // 重定向回前端，帶上用戶資訊
    const redirectUrl = `http://192.168.35.113:5173/login?token=${token}&name=${encodeURIComponent(
      user.name ?? ""
    )}&email=${encodeURIComponent(user.email ?? "")}&role=${user.role}`;

    res.redirect(redirectUrl);
  }
);

// 🔧 Facebook 登入入口
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

// 🔧 Facebook 登入回調 - 重定向到前端
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false, failureRedirect: "http://192.168.0.205:5173/login?error=auth_failed" }),
  (req, res) => {
    const user = req.user as User;

    // 產生 JWT
    const token = generateToken({
      user_id: user.user_id,
      role: user.role,
      email: user.email,
    });

    // 重定向回前端，帶上用戶資訊
    const redirectUrl = `http://192.168.0.205:5173/login?token=${token}&name=${encodeURIComponent(
      user.name ?? ""
    )}&email=${encodeURIComponent(user.email ?? "")}&role=${user.role}`;

    res.redirect(redirectUrl);
  }
);

// 🔧 一般登入（email + password）
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "請提供 email 和 password" });
    }

    // 查找用戶
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "帳號或密碼錯誤" });
    }

    // 驗證密碼
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "帳號或密碼錯誤" });
    }

    // 產生 JWT
    const token = generateToken({
      user_id: user.user_id,
      role: user.role,
      email: user.email,
    });

    res.json({
      message: "登入成功",
      token,
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("❌ 登入失敗:", err);
    res.status(500).json({ error: "伺服器錯誤" });
  }
});

// 註冊
router.post("/register", async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: "缺少必要欄位" });
    }

    // 檢查是否已存在
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email 已被註冊" });
    }

    // Hash 密碼
    const hashed = await bcrypt.hash(password, 10);

    // 建立新帳號
    const user = await User.create({
      email,
      password: hashed,
      name,
      role: role || "student", // 預設 student
    });

    res.status(201).json({
      message: "✅ 註冊成功",
      user: {
        id: user.user_id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("❌ 註冊失敗:", err);
    res.status(500).json({ error: "伺服器錯誤" });
  }
});

export default router;