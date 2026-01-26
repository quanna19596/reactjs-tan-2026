import type { StateCreator } from "zustand";

export type TAuthSlice = {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
};

export const createAuthSlice: StateCreator<TAuthSlice> = (set) => ({
  token: null,
  setToken: (token) => set({ token }),
  logout: () => set({ token: null }),
});
