import axios from "axios";
import { useAuthStore } from "@/store/auth";



const api = axios.create({
  baseURL: "http://localhost:5555/api",
  withCredentials: true 
}); 

api.interceptors.request.use((config) => {
  const auth = useAuthStore();
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

export default api;
