import { create } from "zustand";
import { createAuthSlice, type TAuthSlice } from "./authSlice";
import { createCartSlice, type TCartSlice } from "./cartSlice";

type TAppState = TAuthSlice & TCartSlice;

const useStore = create<TAppState>()((...a) => ({
  ...createAuthSlice(...a),
  ...createCartSlice(...a),
}));

export default useStore;
