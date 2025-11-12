CLASSSYSTEM/
├── dist/                     # 編譯後輸出
├── frontend/                 # 前端（React/Vue + FullCalendar）
│   └── ...
├── src/
│   ├── config/               # 設定
│   │   ├── env.ts            # 環境變數檢查
│   │   └── sequelize.ts      # Sequelize 初始化
│   │
│   ├── models/               # Sequelize Model 對應資料表
│   │   ├── User.ts
│   │   ├── Classroom.ts
│   │   ├── Instructor.ts
│   │   └── Course.ts
│   │
│   ├── controllers/          # 控制器（處理 API 請求邏輯）
│   │   ├── userController.ts        # Admin 建立/管理使用者
│   │   ├── classroomController.ts   # Admin 管理教室
│   │   ├── instructorController.ts # Admin 管理講師
│   │   └── courseController.ts     # Admin 管理課程 + 學生查詢課程
│   │
│   ├── routes/               # 路由（API endpoints）
│   │   ├── userRoutes.ts
│   │   ├── classroomRoutes.ts
│   │   ├── instructorRoutes.ts
│   │   └── courseRoutes.ts
│   │
│   ├── middlewares/          # 中介層（共用邏輯）
│   │   ├── authMiddleware.ts      # JWT / 角色驗證 (admin/student)
│   │   └── errorMiddleware.ts     # 錯誤處理
│   │
│   ├── services/             # 業務邏輯（避免 controller 過重）
│   │   ├── courseService.ts       # 包含「今日課程」、「週課程」、「月課程」查詢
│   │   └── userService.ts
│   │
│   ├── utils/                # 共用工具
│   │   ├── bcrypt.ts             # 密碼 hash/驗證
│   │   └── logger.ts             # log 工具
│   │
│   ├── app.ts                # Express app 註冊中介層、路由
│   └── index.ts              # 入口，啟動 server
│
├── .env
├── package.json
├── tsconfig.json
├── table.sql                 # schema 定義
├── ReadMe.md
└── tech.md                   # 技術筆記