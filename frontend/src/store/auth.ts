import { defineStore } from "pinia";

/**
 * 認證狀態管理 Store
 * 負責處理用戶登入、登出及認證相關的狀態管理
 */
export const useAuthStore = defineStore("auth", {
  /**
   * 狀態定義
   * 包含用戶認證相關的所有狀態數據
   */
  state: () => ({
    /** 
     * JWT token 或其他認證令牌
     * 從 localStorage 中讀取，如果不存在則為 null
     */
    token: localStorage.getItem("token") || null,
    
    /** 
     * 用戶資訊物件
     * 從 localStorage 中讀取 JSON 格式的用戶數據
     * 包含 id, name, email, role 等用戶基本資訊
     */
    user: JSON.parse(localStorage.getItem("user") || "null"),
  }),

  /**
   * 計算屬性（Getters）
   * 基於 state 計算出的衍生狀態，具有快取功能
   */
  getters: {
    /**
     * 檢查用戶是否已認證
     * @param state - 當前 store 的狀態
     * @returns {boolean} 如果有 token 則返回 true，否則返回 false
     */
    isAuthenticated: (state) => !!state.token,

    /**
     * 檢查用戶是否為管理員
     * @param state - 當前 store 的狀態
     * @returns {boolean} 如果用戶角色為 admin 則返回 true
     */
    isAdmin: (state) => state.user?.role === "admin",

    /**
     * 檢查用戶是否為學生
     * @param state - 當前 store 的狀態
     * @returns {boolean} 如果用戶角色為 student 則返回 true
     */
    isStudent: (state) => state.user?.role === "student",
  },

  /**
   * 動作方法（Actions）
   * 用於修改狀態的同步或異步方法
   */
  actions: {
    /**
     * 設置認證令牌
     * 同時更新 state 和 localStorage
     * @param token - JWT token 或其他認證令牌
     */
    setToken(token: string) {
      // 更新 store 中的 token 狀態
      this.token = token;
      // 將 token 持久化到 localStorage，頁面刷新後仍然保持登入狀態
      localStorage.setItem("token", token);
    },

    /**
     * 設置用戶資訊
     * 同時更新 state 和 localStorage
     * @param user - 用戶資訊物件，包含 id, name, email, role 等
     */
    setUser(user: any) {
      // 更新 store 中的用戶狀態
      this.user = user;
      // 將用戶資訊序列化後存儲到 localStorage
      localStorage.setItem("user", JSON.stringify(user));
    },

    /**
     * 用戶登出
     * 清除所有認證相關的狀態和本地存儲
     * 這是推薦使用的登出方法
     */
    logout() {
      // 清除 store 中的認證狀態
      this.token = null;
      this.user = null;
      
      // 清除 localStorage 中的持久化數據
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    /**
     * 清除認證狀態（向後兼容方法）
     * 內部調用 logout 方法，保持 API 一致性
     * @deprecated 建議使用 logout() 方法
     */
    clearAuth() {
      // 調用新的 logout 方法以保持功能一致
      this.logout();
    },
  },
});