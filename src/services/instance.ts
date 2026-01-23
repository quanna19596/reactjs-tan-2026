import axios, { AxiosError } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import env from "@/env";
import {
  getAccessToken,
  getRefreshToken,
  logout,
  storeAccessToken,
  storeRefreshToken,
} from "@/utils/auth";

const instance = axios.create({
  baseURL: "YOUR_BASE_URL",
});

// 1. Hàm này sẽ được gọi TỰ ĐỘNG khi gặp lỗi 401
const refreshAuthLogic = async (failedRequest: any) => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    logout();
    return Promise.reject();
  }

  try {
    const { data } = await axios.get(
      `${env.service.xedapviethung.baseUrl}/auth/refresh`,
      {
        headers: { Authorization: `Bearer ${refreshToken}` },
      },
    );

    storeAccessToken(data.accessToken);
    storeRefreshToken(data.refreshToken);

    // QUAN TRỌNG: Cập nhật token cho request bị lỗi để nó retry ngay lập tức
    failedRequest.response.config.headers["Authorization"] =
      `Bearer ${data.accessToken}`;
    return Promise.resolve();
  } catch (error) {
    logout();
    return Promise.reject(error);
  }
};

// 2. Kích hoạt plugin
createAuthRefreshInterceptor(instance, refreshAuthLogic, {
  statusCodes: [401], // Chỉ bắt lỗi 401
  pauseInstanceWhileRefreshing: true, // Tạm dừng mọi request khác khi đang refresh (thay thế isRefreshingAccessToken)
});

// 3. Interceptor thường để gắn token (như cũ)
instance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
