import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import env from "@/env";
import Utils from "./utils";

const DummyInstance = axios.create({
  baseURL: env.service.dummy.baseUrl,
});

const refreshAuthLogic = async (failedRequest: any) => {
  const refreshToken = Utils.getRefreshToken();

  if (!refreshToken) {
    Utils.logout();
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

    Utils.storeAccessToken(data.accessToken);
    Utils.storeRefreshToken(data.refreshToken);

    failedRequest.response.config.headers.Authorization = `Bearer ${data.accessToken}`;
    return Promise.resolve();
  } catch (error) {
    Utils.logout();
    return Promise.reject(error);
  }
};

createAuthRefreshInterceptor(DummyInstance, refreshAuthLogic, {
  statusCodes: [401],
  pauseInstanceWhileRefreshing: true,
});

DummyInstance.interceptors.request.use((config) => {
  const token = Utils.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default DummyInstance;
