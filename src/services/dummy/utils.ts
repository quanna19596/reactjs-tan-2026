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
  logout: () => {
    CookieStorage.remove("atk");
    CookieStorage.remove("rtk");
    location.reload();
  },
};
