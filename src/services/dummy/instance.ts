import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import env from "@/env";
import { CookieStorage } from "@/utils/storage";

const getAccessToken = () => CookieStorage.get("atk");
const getRefreshToken = () => CookieStorage.get("rtk");
const storeAccessToken = (token: string) => CookieStorage.set("atk", token);
const storeRefreshToken = (token: string) => CookieStorage.set("rtk", token);
const logout = () => {
  CookieStorage.remove("atk");
  CookieStorage.remove("rtk");
  location.reload;
};

const DummyInstance = axios.create({
  baseURL: env.service.dummy.baseUrl,
});

const refreshAuthLogic = async (failedRequest: any) => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    logout();
    return Promise.reject();
  }

  try {
    const { data } = await DummyInstance.post(
      `/auth/refresh`,
      JSON.stringify({
        refreshToken,
        expiresInMins: 30,
      }),
      { headers: { "Content-Type": "application/json" } },
    );

    storeAccessToken(data.accessToken);
    storeRefreshToken(data.refreshToken);

    failedRequest.response.config.headers.Authorization = `Bearer ${data.accessToken}`;
    return Promise.resolve();
  } catch (error) {
    logout();
    return Promise.reject(error);
  }
};

createAuthRefreshInterceptor(DummyInstance, refreshAuthLogic, {
  statusCodes: [401],
  pauseInstanceWhileRefreshing: true,
});

DummyInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default DummyInstance;
