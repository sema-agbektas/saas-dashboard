import axios from "axios";

// API Base URL - Environment variable'dan oku, yoksa localhost kullan
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
// Her istekten önce çalışır, localStorage'dan token'ı alıp Authorization header'ına ekler
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
// Her cevaptan sonra çalışır, 401 (Unauthorized) dönerse token'ı siler ve login'e yönlendirir
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      // Eğer zaten login sayfasında değilsek yönlendir
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
