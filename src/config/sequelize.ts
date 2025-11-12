import { Sequelize } from "sequelize";
import { requiredEnv } from "./env.js";   // 注意要用 .js

export const sequelize = new Sequelize({
  dialect: "mysql",
  host: requiredEnv("DB_HOST"),
  username: requiredEnv("DB_USER"),
  password: requiredEnv("DB_PASSWORD"),
  database: requiredEnv("DB_NAME"),
  logging: console.log,
});

export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully with Sequelize!");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1);
  }
}
