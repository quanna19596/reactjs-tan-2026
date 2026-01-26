import type { StateCreator } from "zustand";

export type TCartSlice = {
  items: number[];
  addItem: (item: number) => void;
};

export const createCartSlice: StateCreator<TCartSlice> = (set) => ({
  items: [],
  addItem: (item: number): void => {
    set((state) => ({ items: [...state.items, item] }));
  },
});
