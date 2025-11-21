import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

export const authApi = {
  login: (username: string, password: string) => {
    return api.post("/auth/login", { username, password });
  },
};

export const userApi = {
  getAll: () => api.get("/users"),
  getById: (id: number) => api.get(`/users/${id}`),
  create: (user: any) => api.post("/users", user),
  update: (id: number, user: any) => api.put(`/users/${id}`, user),
  delete: (id: number) => api.delete(`/users/${id}`),
};
