// import { defineStore } from "pinia";

// export const useAuthStore = defineStore("auth", {
//   state: () => ({
//     token: localStorage.getItem("token") || "",
//   }),
//   actions: {
//     setToken(token: string) {
//       this.token = token;
//       localStorage.setItem("token", token);
//     },
//     clearToken() {
//       this.token = "";
//       localStorage.removeItem("token");
//     },
//   },
// });

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
