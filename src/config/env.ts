import { config } from "dotenv";
config();

/**
 * 強制要求環境變數存在
 */
export function requiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Missing environment variable: ${key}`);
  }
  return value;
}
