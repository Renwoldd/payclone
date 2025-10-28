import axios from "axios";

// ✅ Read CSRF token from cookie
function getCsrfTokenFromCookie() {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Attach CSRF token to every request
api.interceptors.request.use(config => {
  const token = getCsrfTokenFromCookie();
  if (token) {
    config.headers["X-XSRF-TOKEN"] = token;
  }
  return config;
});

export default api;
