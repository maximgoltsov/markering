import create from "zustand";
import client from "../../../shared/api/client";
import { User } from "./types/user";

interface FormStore {
  user: User;
  updateUser: (user: User) => void;
  getUser: () => void;
}

export const useFormStore = create<FormStore>((set, get) => ({
  user: { id: 0, shared: false, email: "" },
  updateUser: async (user) => {
    await client.updateUser.mutate(user);
    set({ user: user });
  },
  getUser: async () => {
    if (get().user.id === 0) {
      const data = await client.getUser.query();
      set({ user: data });
    }
  },
}));
