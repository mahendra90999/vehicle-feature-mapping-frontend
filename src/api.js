import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080", // my backend
});


// JWT token to every request if its exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


// Response interceptor for auto-refresh
API.interceptors.response.use(
  (response) => response,
  async (error) => {

    const originalRequest = error.config;

    // If 401 and not already retried
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        // Call refresh-token endpoint
        const res = await axios.post(
          "http://localhost:8080/api/refresh-token",
          { refreshToken }
        );

        const newAccessToken = res.data.data; // because you return ApiResponseDto<String>

        localStorage.setItem("accessToken", newAccessToken);

        // Attach new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return API(originalRequest); // Retry original request

      } catch (refreshError) {
        // Refresh token also expired → logout
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;