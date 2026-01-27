import { CookieStorage } from "@/utils/storage";

export default {
  getAccessToken: () => CookieStorage.get("atk"),
  getRefreshToken: () => CookieStorage.get("rtk"),
  storeAccessToken: (token: string) => {
    CookieStorage.set("atk", token);
  },
  storeRefreshToken: (token: string) => {
    CookieStorage.set("rtk", token);
  },
  removeAccessToken: () => CookieStorage.remove("atk"),
  removeRefreshToken: () => CookieStorage.remove("rtk"),
  clearAuthTokens: () => {
    CookieStorage.remove("atk");
    CookieStorage.remove("rtk");
  },
};
