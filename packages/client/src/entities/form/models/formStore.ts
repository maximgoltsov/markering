import create from "zustand";
import client from "../../../shared/api/client";
import { User } from "./types/user";

interface FormStore {
  user: User;
  updateUser: (user: User) => void;
  submitUser: (user: User) => void;
  getUser: () => void;
  isLoading: boolean;
}

export const useFormStore = create<FormStore>((set, get) => ({
  user: { id: 0, shared: false, email: "" },
  isLoading: false,
  submitUser: async (user) => {
    set({ user: get().user, isLoading: true });
    try {
      await client.updateUser.mutate(user);
    } finally {
      set({ user, isLoading: false });
    }
  },
  updateUser: async (user) => {
    await client.updateUser.mutate(user);
    set({ user: user });
  },
  getUser: async () => {
    set({ user: get().user, isLoading: true });
    try {
      if (get().user.id === 0) {
        const data = await client.getUser.query();
        set({ user: data });
      }
    } finally {
      set({ user: get().user, isLoading: false});
    }
  },
}));
