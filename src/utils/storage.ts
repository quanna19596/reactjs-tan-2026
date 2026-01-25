import env from "@/env";
import Cookies from "js-cookie";

const cookieOptions = {
  path: "/",
  domain: env.cookie.domain,
};

export const CookieStorage = {
  set: (key: string, value: string): string | undefined =>
    Cookies.set(key, value, cookieOptions),
  get: (key: string): string | undefined => Cookies.get(key),
  remove: (key: string): void => Cookies.remove(key, cookieOptions),
};

export const LocalStorage = {
  set: (key: string, value: any): void =>
    localStorage.setItem(key, JSON.stringify(value)),
  get: <T = string>(key: string): T | undefined => {
    const data = localStorage.getItem(key);

    if (!data) return undefined;
    return JSON.parse(data);
  },
  remove: (key: string): void => localStorage.removeItem(key),
};

export const SessionStorage = {
  set: (key: string, value: any): void =>
    sessionStorage.setItem(key, JSON.stringify(value)),
  get: <T = string>(key: string): T | undefined => {
    const data = sessionStorage.getItem(key);

    if (!data) return undefined;
    return JSON.parse(data);
  },
  remove: (key: string): void => sessionStorage.removeItem(key),
};
